import { onMounted, onUnmounted, watch } from 'vue';
import { useLocaleStore } from '@/store/localeStore';
import { translateLegacyText } from '@/i18n';

const observedTextNodes = new WeakMap<Text, string>();
const observedAttributes = new WeakMap<Element, Map<string, string>>();

const TEXT_SKIP_SELECTOR = [
  '[data-i18n-skip]',
  'pre',
  'code',
  '.monaco-editor',
  '.monaco-hover',
  '.view-lines',
  '.message-render-skip',
].join(', ');

const ATTRIBUTE_NAMES = ['placeholder', 'title', 'aria-label'];

const isTextNodeTranslatable = (node: Text) => {
  const parentElement = node.parentElement;
  if (!parentElement) {
    return false;
  }

  if (parentElement.closest(TEXT_SKIP_SELECTOR)) {
    return false;
  }

  const tagName = parentElement.tagName.toLowerCase();
  return tagName !== 'script' && tagName !== 'style';
};

const translateTextNode = (node: Text, locale: 'zh-CN' | 'en-US') => {
  if (!isTextNodeTranslatable(node)) {
    return;
  }

  if (!observedTextNodes.has(node)) {
    observedTextNodes.set(node, node.nodeValue ?? '');
  }

  const originalText = observedTextNodes.get(node) ?? '';
  const nextText = locale === 'en-US'
    ? translateLegacyText(originalText, locale)
    : originalText;

  if (node.nodeValue !== nextText) {
    node.nodeValue = nextText;
  }
};

const translateElementAttributes = (element: Element, locale: 'zh-CN' | 'en-US') => {
  let originalValues = observedAttributes.get(element);
  if (!originalValues) {
    originalValues = new Map<string, string>();
    observedAttributes.set(element, originalValues);
  }

  ATTRIBUTE_NAMES.forEach((attributeName) => {
    const currentValue = element.getAttribute(attributeName);
    if (currentValue === null) {
      return;
    }

    if (!originalValues!.has(attributeName)) {
      originalValues!.set(attributeName, currentValue);
    }

    const originalValue = originalValues!.get(attributeName) ?? currentValue;
    const nextValue = locale === 'en-US'
      ? translateLegacyText(originalValue, locale)
      : originalValue;

    if (currentValue !== nextValue) {
      element.setAttribute(attributeName, nextValue);
    }
  });
};

const walkAndTranslate = (root: Node, locale: 'zh-CN' | 'en-US') => {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text, locale);
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const element = root as Element;
  translateElementAttributes(element, locale);

  if (element.matches(TEXT_SKIP_SELECTOR)) {
    return;
  }

  for (const childNode of Array.from(element.childNodes)) {
    walkAndTranslate(childNode, locale);
  }
};

export const useLegacyDomTranslation = () => {
  const localeStore = useLocaleStore();
  let observer: MutationObserver | null = null;

  const runTranslation = () => {
    if (typeof document === 'undefined') {
      return;
    }

    walkAndTranslate(document.body, localeStore.locale);
  };

  onMounted(() => {
    if (typeof document === 'undefined') {
      return;
    }

    runTranslation();

    observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          translateTextNode(mutation.target as Text, localeStore.locale);
          return;
        }

        if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          translateElementAttributes(mutation.target, localeStore.locale);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          walkAndTranslate(node, localeStore.locale);
        });
      });
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRIBUTE_NAMES,
    });
  });

  watch(() => localeStore.locale, () => {
    runTranslation();
  });

  onUnmounted(() => {
    observer?.disconnect();
    observer = null;
  });
};

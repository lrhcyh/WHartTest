import { onMounted, onUnmounted, watch } from 'vue';
import { useLocaleStore } from '@/store/localeStore';
import { translateLegacyText } from '@/i18n';

const observedTextNodes = new WeakMap<Text, string>();
const observedAttributes = new WeakMap<Element, Map<string, string>>();

const TEXT_SKIP_SELECTOR = [
  '[data-i18n-skip]',
  'pre',
  'code',
  '[contenteditable="true"]',
  '.arco-select',
  '.arco-select-dropdown',
  '.arco-cascader',
  '.arco-cascader-panel',
  '.arco-tree-select',
  '.arco-dropdown',
  '.arco-trigger-menu',
  '.arco-input-wrapper',
  '.arco-input-tag',
  '.arco-picker',
  '.arco-pagination',
  '.arco-auto-complete',
  '.monaco-editor',
  '.monaco-hover',
  '.view-lines',
  '.message-render-skip',
].join(', ');

const ATTRIBUTE_NAMES = ['placeholder', 'title', 'aria-label'];

interface TranslationOptions {
  restoreOriginal?: boolean;
}

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

const translateTextNode = (
  node: Text,
  locale: 'zh-CN' | 'en-US',
  options: TranslationOptions = {},
) => {
  if (!isTextNodeTranslatable(node)) {
    return;
  }

  const currentText = node.nodeValue ?? '';
  if (!observedTextNodes.has(node)) {
    observedTextNodes.set(node, currentText);
  }

  const originalText = observedTextNodes.get(node) ?? currentText;

  if (locale === 'zh-CN') {
    if (options.restoreOriginal) {
      if (currentText !== originalText) {
        node.nodeValue = originalText;
      }
      return;
    }

    if (currentText !== originalText) {
      observedTextNodes.set(node, currentText);
    }
    return;
  }

  const translatedOriginalText = translateLegacyText(originalText, locale);
  if (currentText === translatedOriginalText) {
    return;
  }

  if (currentText !== originalText) {
    observedTextNodes.set(node, currentText);
    const translatedCurrentText = translateLegacyText(currentText, locale);
    if (currentText !== translatedCurrentText) {
      node.nodeValue = translatedCurrentText;
    }
    return;
  }

  if (currentText !== translatedOriginalText) {
    node.nodeValue = translatedOriginalText;
  }
};

const translateAttributeValue = (
  element: Element,
  attributeName: string,
  locale: 'zh-CN' | 'en-US',
  options: TranslationOptions = {},
) => {
  const currentValue = element.getAttribute(attributeName);
  if (currentValue === null) {
    return;
  }

  let originalValues = observedAttributes.get(element);
  if (!originalValues) {
    originalValues = new Map<string, string>();
    observedAttributes.set(element, originalValues);
  }

  if (!originalValues.has(attributeName)) {
    originalValues.set(attributeName, currentValue);
  }

  const originalValue = originalValues.get(attributeName) ?? currentValue;

  if (locale === 'zh-CN') {
    if (options.restoreOriginal) {
      if (currentValue !== originalValue) {
        element.setAttribute(attributeName, originalValue);
      }
      return;
    }

    if (currentValue !== originalValue) {
      originalValues.set(attributeName, currentValue);
    }
    return;
  }

  const translatedOriginalValue = translateLegacyText(originalValue, locale);
  if (currentValue === translatedOriginalValue) {
    return;
  }

  if (currentValue !== originalValue) {
    originalValues.set(attributeName, currentValue);
    const translatedCurrentValue = translateLegacyText(currentValue, locale);
    if (currentValue !== translatedCurrentValue) {
      element.setAttribute(attributeName, translatedCurrentValue);
    }
    return;
  }

  if (currentValue !== translatedOriginalValue) {
    element.setAttribute(attributeName, translatedOriginalValue);
  }
};

const translateElementAttributes = (
  element: Element,
  locale: 'zh-CN' | 'en-US',
  options: TranslationOptions = {},
) => {
  if (element.closest(TEXT_SKIP_SELECTOR)) {
    return;
  }

  ATTRIBUTE_NAMES.forEach((attributeName) => {
    translateAttributeValue(element, attributeName, locale, options);
  });
};

const walkAndTranslate = (
  root: Node,
  locale: 'zh-CN' | 'en-US',
  options: TranslationOptions = {},
) => {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text, locale, options);
    return;
  }

  if (root.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const element = root as Element;
  if (element.matches(TEXT_SKIP_SELECTOR)) {
    return;
  }

  translateElementAttributes(element, locale, options);

  for (const childNode of Array.from(element.childNodes)) {
    walkAndTranslate(childNode, locale, options);
  }
};

export const useLegacyDomTranslation = () => {
  const localeStore = useLocaleStore();
  let observer: MutationObserver | null = null;

  const runTranslation = () => {
    if (typeof document === 'undefined') {
      return;
    }

    walkAndTranslate(document.body, localeStore.locale, { restoreOriginal: true });
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

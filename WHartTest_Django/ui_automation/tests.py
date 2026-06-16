from django.contrib.auth.models import User
from django.test import TestCase

from projects.models import Project
from ui_automation.models import (
    UiElement,
    UiModule,
    UiPage,
    UiPageSteps,
    UiPageStepsDetailed,
)
from ui_automation.serializers import UiPageStepsExecuteSerializer


class UiPageStepsExecuteDataTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='tester', password='secret')
        self.project = Project.objects.create(name='Demo Project')
        self.module = UiModule.objects.create(
            project=self.project,
            name='Module A',
            creator=self.user,
        )
        self.page = UiPage.objects.create(
            project=self.project,
            module=self.module,
            name='Login Page',
            url='/login',
            creator=self.user,
        )
        self.element = UiElement.objects.create(
            page=self.page,
            name='Submit Button',
            locator_type='css',
            locator_value='button[type="submit"]',
            locator_index=2,
            is_iframe=True,
            iframe_locator='iframe.login-frame',
            creator=self.user,
        )
        self.page_step = UiPageSteps.objects.create(
            project=self.project,
            page=self.page,
            module=self.module,
            name='Submit Login',
            creator=self.user,
        )
        UiPageStepsDetailed.objects.create(
            page_step=self.page_step,
            element=self.element,
            ope_key='click',
            step_sort=0,
        )

    def test_execute_data_includes_iframe_fields(self):
        response = UiPageStepsExecuteSerializer(self.page_step).data
        self.assertEqual(len(response['step_details']), 1)
        detail = response['step_details'][0]
        self.assertEqual(detail['locator_index'], 2)
        self.assertTrue(detail['is_iframe'])
        self.assertEqual(detail['iframe_locator'], 'iframe.login-frame')

import {
  Button,
  CollectionNoticeGateView,
  Paragraph,
  Screen,
  ScreenContext,
  ScreenHeader,
  ScreenTitle,
  SkipLink,
  StickyActionBar,
  Text,
  UiProvider,
  UI_TOKENS,
  XStack,
  YStack,
  resolveCollectionNoticeGate,
} from '@project/ui';
import type { CollectionNoticeGate, RuntimeNotice } from '@project/ui';
import { AppShell, LoginScreen } from '@project/screens';

const notice: RuntimeNotice = {
  active: true,
  legallyValidated: true,
  version: 'test',
  controller: 'Test',
  purpose: 'Test',
  legalBasis: 'Test',
  retention: 'Test',
  rights: 'Test',
  contact: 'test@example.test',
};
const gate: CollectionNoticeGate = { canSubmit: true, notice, proofVersion: notice.version };

void [
  AppShell,
  Button,
  CollectionNoticeGateView,
  LoginScreen,
  Paragraph,
  Screen,
  ScreenContext,
  ScreenHeader,
  ScreenTitle,
  SkipLink,
  StickyActionBar,
  Text,
  UiProvider,
  UI_TOKENS,
  XStack,
  YStack,
  gate,
  resolveCollectionNoticeGate('development', undefined),
];

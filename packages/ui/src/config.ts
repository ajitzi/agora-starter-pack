import { createTamagui, createTokens } from 'tamagui';

export const UI_TOKENS = {
  color: {
    surfaceBase: '#F7F6F1', surfaceRaised: '#FFFFFF', surfaceSubtle: '#ECEBE3', surfaceDangerSubtle: '#FBE9E7',
    inkPrimary: '#1D2A1F', inkSecondary: '#536055', inkDisabled: '#8A928B',
    borderSubtle: '#D7D9D1', actionPrimary: '#285B35', actionPrimaryPressed: '#1D4728', actionDanger: '#A9362A', actionDangerPressed: '#81261D', actionOnPrimary: '#FFFFFF',
    statusSuccess: '#216E39', statusWarning: '#8A5A00', statusDanger: '#A9362A', statusInfo: '#245D85',
    focusRing: '#245D85', focusOnPrimary: '#FFFFFF',
  },
  typography: {
    display: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
    title: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
    section: { fontSize: 14, lineHeight: 20, fontWeight: '700', letterSpacing: '0.04em' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
    meta: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32, xxxl: 48, true: 16 },
  radius: { sm: 8, md: 12, lg: 16, full: 9999 },
} as const;

const tokens = createTokens({
  color: {
    'surface-base': UI_TOKENS.color.surfaceBase, 'surface-raised': UI_TOKENS.color.surfaceRaised, 'surface-subtle': UI_TOKENS.color.surfaceSubtle, 'surface-danger-subtle': UI_TOKENS.color.surfaceDangerSubtle,
    'ink-primary': UI_TOKENS.color.inkPrimary, 'ink-secondary': UI_TOKENS.color.inkSecondary, 'ink-disabled': UI_TOKENS.color.inkDisabled,
    'border-subtle': UI_TOKENS.color.borderSubtle, 'action-primary': UI_TOKENS.color.actionPrimary, 'action-primary-pressed': UI_TOKENS.color.actionPrimaryPressed, 'action-danger': UI_TOKENS.color.actionDanger, 'action-danger-pressed': UI_TOKENS.color.actionDangerPressed,
    'action-on-primary': UI_TOKENS.color.actionOnPrimary, 'status-success': UI_TOKENS.color.statusSuccess, 'status-warning': UI_TOKENS.color.statusWarning,
    'status-danger': UI_TOKENS.color.statusDanger, 'status-info': UI_TOKENS.color.statusInfo, 'focus-ring': UI_TOKENS.color.focusRing,
    'focus-on-primary': UI_TOKENS.color.focusOnPrimary,
  },
  space: UI_TOKENS.space,
  size: { 0: 0, 1: 1, focusRing: 3, sm: 8, md: 12, lg: 16, full: 9999, display: 28, title: 22, section: 14, body: 16, meta: 14, true: 16 },
  radius: UI_TOKENS.radius,
  zIndex: { 0: 0, 1: 1 },
});

export const config = createTamagui({
  tokens,
  defaultFont: 'body',
  fonts: {
    body: {
      family: 'system-ui',
      size: { 1: 14, 2: 16, 3: 22, 4: 28 },
      lineHeight: { 1: 20, 2: 24, 3: 28, 4: 34 },
      weight: { 4: '400', 7: '700' },
      letterSpacing: { 1: 0, 2: 0, 3: 0, 4: 0 },
    },
    heading: {
      family: 'system-ui',
      size: { 1: 14, 2: 16, 3: 22, 4: 28 },
      lineHeight: { 1: 20, 2: 24, 3: 28, 4: 34 },
      weight: { 4: '400', 7: '700' },
      letterSpacing: { 1: 0, 2: 0, 3: 0, 4: 0 },
    },
  },
  themes: { light: { background: UI_TOKENS.color.surfaceBase, color: UI_TOKENS.color.inkPrimary, borderColor: UI_TOKENS.color.borderSubtle } },
  media: { wide: { minWidth: 768 } },
});

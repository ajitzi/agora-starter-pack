export type RuntimeNotice = {
  active: boolean;
  legallyValidated: boolean;
  version: string;
  controller: string;
  purpose: string;
  legalBasis: string;
  retention: string;
  rights: string;
  contact: string;
};

export type CollectionNoticeGate = {
  canSubmit: boolean;
  message?: string;
  notice?: RuntimeNotice;
  proofVersion?: string;
};

export function resolveCollectionNoticeGate(
  environment: string,
  notice?: RuntimeNotice,
): CollectionNoticeGate;

export function resolveCollectionNoticeGate(environment, notice) {
  if (environment !== 'production') return { canSubmit: true };

  const complete = notice?.active === true && notice.legallyValidated === true && [
    notice.version,
    notice.controller,
    notice.purpose,
    notice.legalBasis,
    notice.retention,
    notice.rights,
    notice.contact,
  ].every((value) => typeof value === 'string' && value.trim().length > 0);
  if (!complete) {
    return {
      canSubmit: false,
      message: 'La collecte est indisponible tant que l’information de confidentialité n’est pas validée.',
    };
  }
  return { canSubmit: true, notice, proofVersion: notice.version };
}

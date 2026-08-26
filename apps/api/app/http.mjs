function correlationId(value) {
  if (value && /^[a-zA-Z0-9-]{1,128}$/.test(value)) return value;
  return crypto.randomUUID();
}

export function problem(status, title, detail, requestId) {
  return {
    type: `https://la-cabane-du-merle.invalid/problems/${status}`,
    title,
    status,
    detail,
    correlationId: correlationId(requestId),
  };
}

export function createApiResponse(path, requestId) {
  const id = correlationId(requestId);
  if (path === '/v1/health') {
    return {
      status: 200,
      headers: { 'content-type': 'application/json', 'x-correlation-id': id },
      body: { status: 'ok' },
    };
  }

  const body = problem(404, 'Ressource introuvable', 'La ressource demandée est introuvable.', id);
  return {
    status: 404,
    headers: { 'content-type': 'application/problem+json', 'x-correlation-id': body.correlationId },
    body,
  };
}

export interface paths {
  '/api/health': {
    get: { responses: { 200: { content: { 'application/json': components['schemas']['Health'] } } } };
  };
}

export interface components {
  schemas: {
    Health: { status: 'ok' };
  };
}

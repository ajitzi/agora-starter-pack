export type ApiProblem = {
  type: string;
  title: string;
  status: number;
  detail: string;
  correlationId: string;
};

export function problem(status: number, title: string, detail: string, requestId?: string): ApiProblem;
export function createApiResponse(path: string, requestId?: string): {
  status: number;
  headers: Record<string, string>;
  body: { status: 'ok' } | ApiProblem;
};

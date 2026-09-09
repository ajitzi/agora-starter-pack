export class HttpError extends Error {
  constructor(message: string, public readonly status: number, public readonly route: string) {
    super(message);
    this.name = 'HttpError';
  }
}

export async function request<T>(baseUrl: string, route: string): Promise<T> {
  const response = await fetch(`${baseUrl.replace(/\/$/u, '')}${route}`);
  if (!response.ok) throw new HttpError(`HTTP ${response.status} for ${route}`, response.status, route);
  return response.json() as Promise<T>;
}

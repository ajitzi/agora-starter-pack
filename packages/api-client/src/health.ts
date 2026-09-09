import type { components } from './openapi';
import { request } from './http';

export function getHealth(baseUrl: string) {
  return request<components['schemas']['Health']>(baseUrl, '/api/health');
}

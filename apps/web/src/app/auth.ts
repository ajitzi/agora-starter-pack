import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireRole(role: 'admin' | 'amap') {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) redirect('/connexion');
  const response = await fetch(`${apiUrl}/v1/auth/session`, {
    headers: { cookie: (await cookies()).toString() },
    cache: 'no-store',
  });
  if (!response.ok || (await response.json() as { role: string }).role !== role) redirect('/connexion');
}

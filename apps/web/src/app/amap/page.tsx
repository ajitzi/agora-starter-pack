import { AppShell } from '@project/screens';
import { requireRole } from '../auth';

export default async function AmapPage() {
  await requireRole('amap');
  return <AppShell />;
}

import { AppShell } from '@project/screens';
import { requireRole } from '../auth';

export default async function AdministrationPage() {
  await requireRole('admin');
  return <AppShell />;
}

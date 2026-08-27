import { graph } from './workspace-graph.mjs';

export function boundaryViolations(edges) {
  const violations = [];
  for (const { from, target, fromOwner, targetOwner, deep, crossRelative } of edges) {
    if ((target === 'tamagui' || target.startsWith('tamagui/')) && fromOwner !== 'ui') {
      violations.push(`${from}: seul @project/ui peut importer Tamagui`);
      continue;
    }
    if (deep || crossRelative) violations.push(`${from}: import profond interdit vers ${target}`);
    if (fromOwner === 'core' && targetOwner) violations.push(`${from}: @project/core ne peut dependre d'un package projet`);
    if (fromOwner === 'domains' && ((targetOwner && targetOwner !== 'core') || /^(?:@adonisjs\/|next|react|tamagui|.*http)/.test(target))) violations.push(`${from}: @project/domains importe une dependance interdite`);
    if (fromOwner === 'screens' && targetOwner && targetOwner !== fromOwner && !['domains', 'ui', 'api-client'].includes(targetOwner)) violations.push(`${from}: @project/screens importe une couche interdite`);
    if (fromOwner === 'screens' && /^(?:next|react-router|expo-router)/.test(target)) violations.push(`${from}: @project/screens ne peut importer de routeur`);
  }
  return violations;
}

const violations = boundaryViolations(await graph());
if (violations.length) throw new Error(violations.join('\n'));

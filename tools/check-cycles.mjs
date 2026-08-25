import { graph } from './workspace-graph.mjs';

export function findCycles(graph) {
  const visiting = new Set();
  const visited = new Set();
  const cycles = [];
  function visit(node, trail) {
    if (visiting.has(node)) {
      cycles.push([...trail, node].join(' -> '));
      return;
    }
    if (visited.has(node)) return;
    visiting.add(node);
    for (const target of graph[node] ?? []) visit(target, [...trail, node]);
    visiting.delete(node);
    visited.add(node);
  }
  for (const node of Object.keys(graph)) visit(node, []);
  return cycles;
}

const edges = await graph();
const dependencyGraph = {};
for (const { fromOwner, targetOwner } of edges) if (fromOwner && targetOwner && fromOwner !== targetOwner) (dependencyGraph[fromOwner] ??= []).push(targetOwner);
const cycles = findCycles(dependencyGraph);
if (cycles.length) throw new Error(`Cycles interdits:\n${cycles.join('\n')}`);

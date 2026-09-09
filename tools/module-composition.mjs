function invalid(message) {
  throw new Error(`Composition de modules invalide: ${message}`);
}

function validateStringList(values, label) {
  const seen = new Set();
  for (const value of values) {
    if (typeof value !== 'string' || !value) invalid(`${label} doit contenir uniquement des chaines non vides`);
    if (seen.has(value)) invalid(`${label} contient un doublon: ${value}`);
    seen.add(value);
  }
}

function descriptorMap(descriptors) {
  const byKey = new Map();
  for (const descriptor of descriptors) {
    if (!descriptor || typeof descriptor.key !== 'string' || !descriptor.key) invalid('chaque descripteur doit avoir une cle non vide');
    if (byKey.has(descriptor.key)) invalid(`cle module dupliquee: ${descriptor.key}`);
    if (!Array.isArray(descriptor.dependsOn) || !Array.isArray(descriptor.resources) || !Array.isArray(descriptor.provides)) {
      invalid(`descripteur incomplet pour ${descriptor.key}`);
    }
    validateStringList(descriptor.dependsOn, `dependsOn de ${descriptor.key}`);
    validateStringList(descriptor.resources, `resources de ${descriptor.key}`);
    validateStringList(descriptor.provides, `provides de ${descriptor.key}`);
    byKey.set(descriptor.key, descriptor);
  }
  return byKey;
}

/** Resout la fermeture active sans acceder au systeme de fichiers ni a Strapi. */
export function resolveModuleComposition(manifest, descriptors) {
  if (!manifest || !Array.isArray(manifest.modules) || !Array.isArray(descriptors)) invalid('le manifeste doit declarer un tableau modules');
  validateStringList(manifest.modules, 'modules du manifeste');
  const byKey = descriptorMap(descriptors);
  const active = new Set();
  const visiting = new Set();

  function visit(key, trail) {
    const descriptor = byKey.get(key);
    if (!descriptor) invalid(`dependance absente: ${key}`);
    if (visiting.has(key)) invalid(`cycle de dependances: ${[...trail, key].join(' -> ')}`);
    if (active.has(key)) return;
    visiting.add(key);
    for (const dependency of [...descriptor.dependsOn].sort()) visit(dependency, [...trail, key]);
    visiting.delete(key);
    active.add(key);
  }

  for (const key of [...manifest.modules].sort()) visit(key, []);

  const resources = new Map();
  const slots = new Map();
  for (const key of [...active].sort()) {
    const descriptor = byKey.get(key);
    for (const resource of descriptor.resources) {
      if (resources.has(resource)) invalid(`ressource possedee par plusieurs modules: ${resource} (${resources.get(resource)}, ${key})`);
      resources.set(resource, key);
    }
    for (const slot of descriptor.provides) {
      if (slots.has(slot)) invalid(`slot fourni par plusieurs modules: ${slot} (${slots.get(slot)}, ${key})`);
      slots.set(slot, key);
    }
  }

  return { modules: [...active].sort() };
}

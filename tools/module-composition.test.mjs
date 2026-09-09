import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveModuleComposition } from './module-composition.mjs';

const module = (key, dependsOn = [], resources = [], provides = []) => ({ key, dependsOn, resources, provides });

test('compose un manifeste base vide de maniere stable', () => {
  assert.deepEqual(resolveModuleComposition({ modules: [] }, []), { modules: [] });
});

test('resout chaque dependance transitive une fois dans un ordre stable', () => {
  const descriptors = [module('orders', ['catalog']), module('catalog', ['core-data']), module('core-data')];
  assert.deepEqual(resolveModuleComposition({ modules: ['orders'] }, descriptors), { modules: ['catalog', 'core-data', 'orders'] });
  assert.deepEqual(resolveModuleComposition({ modules: ['orders'] }, descriptors), { modules: ['catalog', 'core-data', 'orders'] });
});

test('refuse une dependance absente', () => {
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', ['catalog'])]), /dependance absente: catalog/);
});

test('refuse un cycle de dependances', () => {
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', ['catalog']), module('catalog', ['orders'])]), /cycle de dependances.*orders.*catalog.*orders/);
});

test('refuse une cle module dupliquee', () => {
  assert.throws(() => resolveModuleComposition({ modules: [] }, [module('orders'), module('orders')]), /cle module dupliquee: orders/);
});

test('refuse une ressource possedee deux fois', () => {
  assert.throws(() => resolveModuleComposition({ modules: ['catalog', 'orders'] }, [module('catalog', [], ['content-type:api::order.order']), module('orders', [], ['content-type:api::order.order'])]), /ressource possedee par plusieurs modules/);
});

test('refuse plusieurs fournisseurs pour un slot', () => {
  assert.throws(() => resolveModuleComposition({ modules: ['local-storage', 's3-storage'] }, [module('local-storage', [], [], ['object-storage']), module('s3-storage', [], [], ['object-storage'])]), /slot fourni par plusieurs modules/);
});

test('refuse les entrees non textuelles, vides ou dupliquees avant la resolution', () => {
  assert.throws(() => resolveModuleComposition({ modules: [42] }, []), /modules du manifeste doit contenir uniquement des chaines non vides/);
  assert.throws(() => resolveModuleComposition({ modules: [''] }, []), /modules du manifeste doit contenir uniquement des chaines non vides/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders', 'orders'] }, [module('orders')]), /modules du manifeste contient un doublon: orders/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', [42])]), /dependsOn de orders doit contenir uniquement des chaines non vides/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', ['catalog', 'catalog'])]), /dependsOn de orders contient un doublon: catalog/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', [], [''])]), /resources de orders doit contenir uniquement des chaines non vides/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', [], ['route:orders', 'route:orders'])]), /resources de orders contient un doublon: route:orders/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', [], [], [null])]), /provides de orders doit contenir uniquement des chaines non vides/);
  assert.throws(() => resolveModuleComposition({ modules: ['orders'] }, [module('orders', [], [], ['storage', 'storage'])]), /provides de orders contient un doublon: storage/);
});

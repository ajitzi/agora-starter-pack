import { Ignitor, prettyPrintError } from '@adonisjs/core';

const appRoot = new URL('../', import.meta.url);
const importer = (filePath: string) => filePath.startsWith('.')
  ? import(new URL(filePath, appRoot).href)
  : import(filePath);

new Ignitor(appRoot, { importer })
  .tap((app) => {
    app.booting(async () => {
      await import('#start/env');
    });
    app.listen('SIGTERM', () => app.terminate());
  })
  .ace()
  .handle(process.argv.splice(2))
  .catch((error) => {
    process.exitCode = 1;
    prettyPrintError(error);
  });

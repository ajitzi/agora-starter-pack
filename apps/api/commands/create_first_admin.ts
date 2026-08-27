import { BaseCommand } from '@adonisjs/core/ace';
import hash from '@adonisjs/core/services/hash';
import { randomUUID } from 'node:crypto';
import db from '@adonisjs/lucid/services/db';
import { validateLoginInput } from '../app/validators/auth.js';

export default class CreateFirstAdmin extends BaseCommand {
  static commandName = 'auth:create-first-admin';
  static description = 'Crée le premier administrateur à partir de saisies interactives.';

  async run() {
    const email = await this.prompt.ask('Email de l’administrateur');
    const password = await this.prompt.secure('Mot de passe');
    const input = validateLoginInput({ email, password });
    if (!input) {
      this.logger.error('L’email et le mot de passe sont requis.');
      this.exitCode = 1;
      return;
    }
    const now = new Date();
    try {
      await db.table('accounts').insert({
        id: randomUUID(), email: input.email, password_hash: await hash.make(input.password), role: 'admin', active: true, created_at: now, updated_at: now,
      });
      this.logger.success('Premier administrateur créé.');
    } catch {
      this.logger.error('Impossible de créer ce compte.');
      this.exitCode = 1;
    }
  }
}

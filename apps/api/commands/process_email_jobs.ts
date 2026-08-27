import { BaseCommand } from '@adonisjs/core/ace';
import { processPasswordRecoveryEmailJobs } from '../app/password_recovery.js';

export default class ProcessEmailJobs extends BaseCommand {
  static commandName = 'email:process';
  static description = 'Envoie les emails transactionnels en attente.';
  static options = { startApp: true };

  async run() {
    await processPasswordRecoveryEmailJobs();
  }
}

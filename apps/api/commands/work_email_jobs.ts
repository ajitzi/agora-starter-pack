import { BaseCommand } from '@adonisjs/core/ace';
import { processPasswordRecoveryEmailJobs } from '../app/password_recovery.js';

export default class WorkEmailJobs extends BaseCommand {
  static commandName = 'email:work';
  static description = 'Traite la file transactionnelle toutes les minutes.';
  static options = { startApp: true };

  async run() {
    for (;;) {
      await processPasswordRecoveryEmailJobs();
      await new Promise((resolve) => setTimeout(resolve, 60_000));
    }
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('password_reset_tokens', (table) => {
      table.uuid('id').primary();
      table.uuid('account_id').notNullable().references('id').inTable('accounts').onDelete('cascade');
      table.string('token_digest', 64).notNullable().unique();
      table.timestamp('expires_at', { useTz: true }).notNullable();
      table.timestamp('used_at', { useTz: true }).nullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.index(['account_id', 'used_at']);
    });
    this.schema.createTable('password_recovery_attempts', (table) => {
      table.uuid('id').primary();
      table.string('email', 320).notNullable();
      table.string('ip', 64).notNullable();
      table.timestamp('attempted_at', { useTz: true }).notNullable();
      table.index(['email', 'attempted_at']);
      table.index(['ip', 'attempted_at']);
    });
    this.schema.createTable('email_jobs', (table) => {
      table.uuid('id').primary();
      table.string('kind', 64).notNullable();
      table.uuid('account_id').notNullable().references('id').inTable('accounts').onDelete('cascade');
      table.uuid('password_reset_token_id').notNullable().references('id').inTable('password_reset_tokens').onDelete('cascade');
      table.enum('state', ['pending', 'sent', 'failed', 'cancelled']).notNullable().defaultTo('pending');
      table.timestamp('sent_at', { useTz: true }).nullable();
      table.integer('attempts').notNullable().defaultTo(0);
      table.timestamp('available_at', { useTz: true }).notNullable();
      table.string('locked_by', 128).nullable();
      table.timestamp('locked_at', { useTz: true }).nullable();
      table.timestamp('lock_expires_at', { useTz: true }).nullable();
      table.timestamp('failed_at', { useTz: true }).nullable();
      table.string('last_error', 64).nullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.index(['state', 'available_at']);
      table.index(['state', 'lock_expires_at']);
    });
  }

  async down() {
    this.schema.dropTable('email_jobs');
    this.schema.dropTable('password_recovery_attempts');
    this.schema.dropTable('password_reset_tokens');
  }
}

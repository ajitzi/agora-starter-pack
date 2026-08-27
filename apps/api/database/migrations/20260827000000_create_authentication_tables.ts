import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('accounts', (table) => {
      table.uuid('id').primary();
      table.string('email', 320).notNullable();
      table.string('password_hash', 255).notNullable();
      table.enum('role', ['admin', 'amap']).notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
    this.schema.raw('create unique index accounts_email_normalized_unique on accounts (lower(email))');
    this.schema.createTable('login_attempts', (table) => {
      table.uuid('id').primary();
      table.string('email', 320).notNullable();
      table.string('ip', 64).notNullable();
      table.timestamp('attempted_at', { useTz: true }).notNullable();
      table.index(['email', 'attempted_at']);
      table.index(['ip', 'attempted_at']);
    });
    this.schema.createTable('sessions', (table) => {
      table.string('id').primary();
      table.text('data').notNullable();
      table.string('user_id').nullable().index();
      table.timestamp('expires_at', { useTz: true }).notNullable().index();
    });
    this.schema.createTable('security_audit_proofs', (table) => {
      table.uuid('id').primary();
      table.uuid('account_id').nullable().references('id').inTable('accounts').onDelete('set null');
      table.string('action', 64).notNullable();
      table.timestamp('occurred_at', { useTz: true }).notNullable();
    });
  }

  async down() {
    this.schema.dropTable('security_audit_proofs');
    this.schema.dropTable('sessions');
    this.schema.dropTable('login_attempts');
    this.schema.dropTable('accounts');
  }
}

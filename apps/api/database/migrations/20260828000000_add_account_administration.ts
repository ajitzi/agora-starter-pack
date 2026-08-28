import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('account_roles', (table) => {
      table.uuid('account_id').notNullable().references('id').inTable('accounts').onDelete('cascade');
      table.string('role', 64).notNullable();
      table.primary(['account_id', 'role']);
    });
    this.schema.raw("insert into account_roles (account_id, role) select id, role from accounts");
    this.schema.alterTable('accounts', (table) => {
      table.integer('version').notNullable().defaultTo(1);
      table.timestamp('last_activity_at', { useTz: true }).nullable();
      table.dropColumn('role');
    });
    this.schema.createTable('account_mutations', (table) => {
      table.uuid('id').primary();
      table.uuid('principal_id').notNullable().references('id').inTable('accounts').onDelete('cascade');
      table.string('operation', 64).notNullable();
      table.string('idempotency_key', 128).notNullable();
      table.string('request_fingerprint', 64).notNullable();
      table.jsonb('result').notNullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.unique(['principal_id', 'operation', 'idempotency_key']);
    });
    this.schema.alterTable('security_audit_proofs', (table) => {
      table.uuid('actor_id').nullable().references('id').inTable('accounts').onDelete('set null');
      table.string('object_type', 64).nullable();
      table.uuid('object_id').nullable();
      table.jsonb('before').nullable();
      table.jsonb('after').nullable();
    });
  }

  async down() {
    this.schema.alterTable('security_audit_proofs', (table) => {
      table.dropColumn('after'); table.dropColumn('before'); table.dropColumn('object_id'); table.dropColumn('object_type'); table.dropColumn('actor_id');
    });
    this.schema.alterTable('accounts', (table) => {
      table.enum('role', ['admin', 'amap']).nullable();
      table.dropColumn('last_activity_at'); table.dropColumn('version');
    });
    this.schema.raw("update accounts set role = case when exists (select 1 from account_roles where account_roles.account_id = accounts.id and account_roles.role = 'admin') then 'admin' else 'amap' end");
    this.schema.alterTable('accounts', (table) => table.specificType('role', "varchar(16)").notNullable().alter());
    this.schema.dropTable('account_mutations');
    this.schema.dropTable('account_roles');
  }
}

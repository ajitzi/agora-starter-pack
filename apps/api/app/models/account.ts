import { BaseModel, column } from '@adonisjs/lucid/orm';
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'passwordHash',
});

export default class Account extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true }) declare id: string;
  @column() declare email: string;
  @column({ serializeAs: null }) declare passwordHash: string;
  @column() declare active: boolean;
  @column() declare version: number;
  @column.dateTime() declare lastActivityAt: Date | null;
}

export type PasswordRecoveryEmail = { to: string; resetUrl: string; farmName: string; idempotencyKey: string };

export interface TransactionalEmailPort {
  sendPasswordRecovery(message: PasswordRecoveryEmail): Promise<void>;
}

export class ResendEmailAdapter implements TransactionalEmailPort {
  constructor(private readonly apiKey: string, private readonly from: string) {}

  async sendPasswordRecovery({ to, resetUrl, farmName, idempotencyKey }: PasswordRecoveryEmail) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${this.apiKey}`, 'content-type': 'application/json', 'idempotency-key': idempotencyKey },
      body: JSON.stringify({
        from: this.from,
        to: [to],
        subject: `Reinitialisation de votre mot de passe - ${farmName}`,
        text: `${farmName}\n\nPour choisir une nouvelle phrase de passe, ouvrez ce lien valable une heure :\n${resetUrl}\n\nSi vous n'avez pas demande cette reinitialisation, ignorez cet email.`,
      }),
    });
    if (!response.ok) throw new Error('Le fournisseur email a refuse la demande.');
  }
}

export default ({ env }: { env: (name: string, fallback?: string) => string }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env('DATABASE_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false,
    },
  },
});

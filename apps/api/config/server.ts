export default ({ env }: { env: (name: string, fallback?: string) => string }) => ({
  host: env('HOST', '0.0.0.0'),
  port: Number(env('PORT', '1337')),
  app: { keys: [env('APP_KEYS')] },
});

const apiUrl = process.env.API_URL?.replace(/\/+$/, '');
const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim().toLowerCase())
  .filter((origin) => /^[a-z0-9.-]+(?::\d{1,5})?$/u.test(origin));

export default {
  allowedDevOrigins,
  async rewrites() {
    if (!apiUrl) return [];
    return [{ source: '/v1/:path*', destination: `${apiUrl}/v1/:path*` }];
  },
};

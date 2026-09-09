const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '');
const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim().toLowerCase())
  .filter((origin) => /^[a-z0-9.-]+(?::\d{1,5})?$/u.test(origin));

export default {
  allowedDevOrigins,
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
    },
  },
  async rewrites() {
    if (!apiUrl) return [];
    return [{ source: '/api/:path*', destination: `${apiUrl}/api/:path*` }];
  },
};

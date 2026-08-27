const apiUrl = process.env.API_URL;

export default {
  async rewrites() {
    if (!apiUrl) return [];
    return [{ source: '/v1/:path*', destination: `${apiUrl}/v1/:path*` }];
  },
};

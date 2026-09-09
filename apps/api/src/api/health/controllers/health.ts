export default {
  index(ctx: { body: unknown }) {
    ctx.body = { status: 'ok' };
  },
};

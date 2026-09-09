module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [['@tamagui/babel-plugin', { components: ['@project/ui'], config: '../../packages/ui/src/config.ts', logTimings: false }]],
  };
};

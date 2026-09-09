const path = require('node:path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Workspace packages must use Expo's React instance, never a nested copy.
config.resolver.extraNodeModules = {
  '@tamagui/core': path.join(__dirname, 'node_modules/@tamagui/core'),
  react: path.join(__dirname, 'node_modules/react'),
  'react-native': path.join(__dirname, 'node_modules/react-native'),
  tamagui: path.join(__dirname, 'node_modules/tamagui'),
};

module.exports = config;

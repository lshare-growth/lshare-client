const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack4',
  },
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@common': path.resolve(__dirname, '../src/components/common'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@style': path.resolve(__dirname, '../src/style'),
      '@assets': path.resolve(__dirname, '../src/assets'),
    };
    return config;
  },
};

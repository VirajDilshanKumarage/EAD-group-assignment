// webpack.config.ts

import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  // Other configuration options...

  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
    },
  },

  // Other configuration options...
};

export default config;

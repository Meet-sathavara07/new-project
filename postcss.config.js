const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer({
      overrideBrowserslist: [
        'last 2 versions',
        'Firefox ESR',
        'not ie < 9',
        'not dead',
        'not ios_saf < 8',
        'not android < 4',
      ],
    }),
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    ...(process.env.NODE_ENV === 'production' ? [cssnano()] : []),
  ],
};

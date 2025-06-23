module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'de',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html',
      title: 'IURISPRUDENTIA | A journey through time',
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
};

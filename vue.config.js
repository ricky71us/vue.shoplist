module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://phpapi.bmgtech.ca/index.php/api/',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '.' : '/',
};

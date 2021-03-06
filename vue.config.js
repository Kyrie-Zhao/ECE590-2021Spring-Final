module.exports = {
    publicPath: './', 
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://10.56.12.173:8080',
          pathRewrite: {'^/api': ''},
          changeOrigin: true,
          logLevel: "debug",
        },
      },
    },
};
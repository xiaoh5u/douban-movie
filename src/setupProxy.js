const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  
    app.use(
        proxy(
            '/douban/api/', {
                target: 'http://api.douban.com/v2/movie/',
                changeOrigin: true,
                pathRewrite: {
                    '^/douban/api/': ''
                }
            },
        )
    )
   

}
const { resolve } = require('path');

const Koa = require('koa');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const serve = require('koa-static');
const views = require('koa-views');

const router = require('./routes');

const app = new Koa();

app.use(logger());
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
  const koaWebpack = require('koa-webpack');
  const webpackConfig = require('../config/webpack/development.js');

  (async () => {
    const middleware = await koaWebpack({
      config: webpackConfig,
      devMiddleware: {
        colors: true,
        contentBase: 'public',
        publicPath: '/',
        stats: 'minimal',
      },
      hotClient: {
        hmr: true,
        host: 'localhost',
      },
    });
    app.use(middleware);
    app.use(async (ctx) => {
      const filename = resolve(webpackConfig.output.path, 'index.html');
      ctx.response.type = 'html';
      ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
    });
  })();
} else {
  app.use(serve(__rootdir + '/public'));
}

app.use(views(__dirname + '/views', {
  map: {
    html: 'nunjucks'
  }
}));

app.use(router.routes());

module.exports = app;

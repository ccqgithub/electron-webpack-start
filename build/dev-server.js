/**
 * dev-server entry
 */
const path = require('path');
const rm = require('rimraf');
const Koa = require('koa');
const staticServe = require('koa-static');
const rewrite = require('koa-rewrite');
const proxy = require('koa-proxy');
const cors = require('@koa/cors');
const escapeStringRegexp = require('escape-string-regexp');
const webpack = require('webpack');
const hotMiddleware = require('koa-webpack-hot');

const webpackConfig = require('./webpack.conf');
const config = require('./config');

// 清理目录
function clearDist(callback) {
  if (!config.clearOut) return callback();

  rm(path.join(config.outPath), (err) => {
    if (err) throw err;
    callback();
  });
}

// new app
const app = new Koa();
// 如果为 true，则解析 "Host" 的 header 域，并支持 X-Forwarded-Host
app.proxy = true;
// 默认为2，表示 .subdomains 所忽略的字符偏移量。
app.subdomainOffset = 2;

/* == WEBPACK == */
const compiler = webpack(webpackConfig);
clearDist(() => {
  compiler.watch(
    {
      // config
    },
    (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          err.details.errors.map((error) => console.error(error));
          // console.error(err.details);
        }
        return;
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        info.errors.map((error) => console.error(error));
        // console.error(info.errors);
      } else if (stats.hasWarnings()) {
        info.warnings.map((warn) => console.warn(warn));
        // console.warn(info.warnings);
      } else {
        console.log(stats.toString({ colors: true }));
      }
    }
  );
});

// hot reload socket
app.use(rewrite(/^\/.+\/__webpack_hmr/, '/__webpack_hmr'));
app.use(
  hotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr'
    // heartbeat: 10 * 1000
  })
);

/* == PROXY == */
// cors
const proxyCors = config.proxyCors || {};
app.use(
  cors({
    allowHeaders: config.allowHeaders || [],
    exposeHeaders: config.exposeHeaders || []
  })
);
// proxies
const proxies = config.proxies || [];
proxies.forEach((item) => {
  app.use(proxy(item));
});

// rewrites
let rewrites = config.rewrites || [];
rewrites.forEach((item) => {
  app.use(rewrite(item[0], item[1]));
});

/* == REWRITE PUBLIC PATH TO DIST  == */
if (config.publicPath !== '/') {
  let publicPath = escapeStringRegexp(config.publicPath);
  let exp = new RegExp(`^${publicPath}(.+)$`);
  app.use(rewrite(exp, '/$1'));
}

/* == DIST STATIC  == */
app.use(staticServe(config.outPath));

/* == NOT FOUND  == */
app.use(async (ctx) => {
  console.log('404', ctx.path);
  ctx.throw('Not Found!', 404);
});

/* == LISTEN  == */
console.log('Please visit: ', `http://localhost:${config.port}/`);
app.listen(config.port);

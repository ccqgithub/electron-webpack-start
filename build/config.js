const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = path.resolve(__dirname, '../');
const port = 8080;

// 设置环境变量给系统用
let defines = {};
if (isProduction) {
  defines = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.APP_URL': JSON.stringify(
      path.resolve(rootDir, './out/renderer/index.html')
    ),
    'process.env.APP_ROOT': JSON.stringify(rootDir)
  };
} else {
  defines = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.APP_URL': JSON.stringify(
      `http://localhost:${port}/renderer/index.html`
    ),
    'process.env.APP_ROOT': JSON.stringify(`http://localhost:${port}/`)
  };
}

module.exports = {
  port,
  defines,
  isProduction,
  rootDir,
  electronVersion: '4.0.5',
  clearOut: true,
  contextPath: path.resolve(rootDir, './src'),
  outPath: path.resolve(rootDir, './out'),
  publicPath: isProduction ? path.resolve(rootDir, './out/') : '/'
};

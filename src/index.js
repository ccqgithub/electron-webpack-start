const path = require('path');
const amdLoader = require('monaco-editor/min/vs/loader');
const amdRequire = amdLoader.require;
// const amdDefine = amdLoader.require.define;
const novel = require('./language.novel');

function uriFromPath(_path) {
  let pathName = path.resolve(_path).replace(/\\/g, '/');
  if (pathName.length > 0 && pathName.charAt(0) !== '/') {
    pathName = '/' + pathName;
  }
  return encodeURI('file://' + pathName);
}

// workaround monaco-css not understanding the environment
self.module = undefined;
amdRequire.config({
  baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
});

// amdRequire(['vs/editor/editor.main'], function(monaco) {
//   novel.registerLanguage(monaco);
//   const editor = monaco.editor.create(document.getElementById('container'), {
//     theme: 'myCoolTheme',
//     value: [
//       'hello world!',
//     ].join('\n'),
//     language: 'novel'
//   });
// });

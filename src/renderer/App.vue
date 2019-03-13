<template>
  <div id="app" class="sw">
    <div class="sw-title">
      神剑码字
    </div>
    <div class="sw-main">
      <div class="sw-activitybar">
        <div class="item">书籍</div>
        <div class="item">账号</div>
      </div>
      <div class="sw-sidebar" />
      <div class="sw-editor">
        <div class="sw-etitle">
          <div class="sw-etabs">
            <div class="tab">index.css</div>
            <div class="tab">main.js</div>
            <div class="tab">index.js</div>
            <div class="tab">index.html</div>
          </div>
          <div class="sw-epath">
            <span class="path">src</span>
            <span class="path">index.html</span>
            <span class="path">body</span>
          </div>
        </div>
        <div class="sw-econtent">
          <div class="editor" ref="editor"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import novel from './lib/language.novel';

export default {
  data() {
    return {
      test: 'hello'
    };
  },
  mounted() {
    novel.registerLanguage(monaco);
    const editor = monaco.editor.create(this.$refs.editor, {
      theme: 'myCoolTheme',
      value: ['hello world!'].join('\n'),
      language: 'novel'
    });
  }
};
</script>

<style lang="less" scoped>
.editor {
  height: 500px;
}
</style>

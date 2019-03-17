<template>
  <div id="app" class="sw">
    <div class="sw-title">
      Electron -start
    </div>

    <div class="sw-container">
      <div class="sw-loading" v-if="loading">
        <div>loading...</div>
      </div>

      <div class="sw-init" v-if="!loading && !bookRoot">
        <div class="wrap">
          <div class="ins">
            <input
              type="text"
              readonly
              v-model="dir"
              @click="selectDir"
              placeholder="选择文件"
            />
          </div>
          <div class="btn">
            <button @click="saveDir">确定</button>
          </div>
        </div>
      </div>

      <div class="sw-main" v-if="!loading && bookRoot">
        <div class="sw-activitybar">
          <activity-bar></activity-bar>
        </div>

        <div class="sw-sidebar">
          <books></books>
        </div>

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
  </div>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { mapState, mapActions } from 'vuex';
import { remote } from 'electron';

import * as api from './data/api';
import novel from './lib/language.novel';
import ActivityBar from './component/ActivityBar.vue';
import Books from './component/Books.vue';

const { dialog } = remote;

export default {
  name: 'App',
  components: {
    ActivityBar,
    Books
  },
  data() {
    return {
      loading: true,
      dir: ''
    };
  },
  computed: {
    ...mapState({
      bookRoot: 'bookRoot'
    })
  },
  mounted() {
    this.initEnv()
      .then(() => {
        this.loading = false;
        console.log('initEnv');
        api
          .getDB()
          .then((db) => {
            console.log(db);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    ...mapActions({
      initEnv: 'initEnv',
      setBookRoot: 'setBookRoot'
    }),
    selectDir() {
      console.log('selectDir');
      dialog.showOpenDialog(
        {
          title: '选择目录',
          properties: [
            'openFile',
            'openDirectory',
            'multiSelections',
            'createDirectory'
          ]
        },
        (filePaths) => {
          if (!filePaths) {
            // cancel
            return;
          }
          this.dir = filePaths[0];
        }
      );
    },
    saveDir() {
      this.setBookRoot(this.dir)
        .then((data) => {
          console.log('saveDir success');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initEditor() {
      // novel.registerLanguage(monaco);
      // const editor = monaco.editor.create(this.$refs.editor, {
      //   theme: 'myCoolTheme',
      //   value: ['hello world!'].join('\n'),
      //   language: 'novel'
      // });
    }
  }
};
</script>

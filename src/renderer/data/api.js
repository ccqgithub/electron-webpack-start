import path from 'path';
import fs, { mkdir } from 'fs';
import { remote } from 'electron';
import Store from 'electron-store';
import sqlite3 from 'sqlite3';

import { mkdirsSync } from '../../common/utils';
import mainStore from './store/main';

// sqlite db instance
let SQLITE_DB_INSTANCE = null;

// verbose
const sqlite = sqlite3.verbose();
const { app } = remote;
const configStore = new Store({
  cwd: path.resolve(app.getPath('userData'), 'sword'),
  name: 'config'
});

// get book root dir
export function getBookRoot() {
  const bookRoot = configStore.get('bookRoot', null);
  if (!fs.existsSync(bookRoot)) {
    return Promise.resolve(null);
  }
  return Promise.resolve(bookRoot);
}

// set book root dir
export function setBookRoot(root) {
  configStore.set('bookRoot', root);
  return Promise.resolve(root);
}

// get sqlit db instance
export function getDB() {
  if (SQLITE_DB_INSTANCE) return Promise.resolve(SQLITE_DB_INSTANCE);

  const { bookRoot } = mainStore.state;
  const dir = path.resolve(bookRoot, './data');
  const filename = path.join(dir, 'data.db');

  // mkdir
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(
      path.join(bookRoot, '不要更改、删除[data]文件夹里的内容.txt'),
      '不要更改、删除[data]文件夹里的内容'
    );
    mkdirsSync(dir);
  }

  // get db
  return new Promise((resolve, reject) => {
    SQLITE_DB_INSTANCE = new sqlite.Database(filename, (err) => {
      if (err) {
        SQLITE_DB_INSTANCE = null;
        reject(err);
      }
      resolve(SQLITE_DB_INSTANCE);
    });
  });
}

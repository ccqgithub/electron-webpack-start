import path from 'path';
import { remote } from 'electron';
import Store from 'electron-store';

const { app } = remote;
const configStore = new Store({
  cwd: path.resolve(app.getPath('userData'), 'sword'),
  name: 'config'
});

export function getBookRoot() {
  const bookRoot = configStore.get('bookRoot', null);
  return Promise.resolve(bookRoot);
}

export function setBookRoot(root) {
  configStore.set('bookRoot', root);
  return Promise.resolve(root);
}

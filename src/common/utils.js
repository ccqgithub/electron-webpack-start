import fs from 'fs';
import path from 'path';

// 递归创建目录 同步方法
export function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }

  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}

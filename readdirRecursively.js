const fs = require("fs");

// https://blog.araya.dev/posts/2019-05-09/node-recursive-readdir.html
const readdirRecursively = (dir, files = []) => {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
    if (dirent.isFile()) files.push(`${dir}/${dirent.name}`);
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
};

module.exports = readdirRecursively;

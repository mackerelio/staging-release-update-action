const io = require('@actions/io');
const fs = require('fs');

const read = require('fs-readdir-recursive');

test('read assets', async () => {
  await io.rmRF('tmp-readdir/');
  await io.mkdirP('tmp-readdir/1/2/');
  const files = [
    'tmp-readdir/1.txt',
    'tmp-readdir/1/2.txt',
    'tmp-readdir/1/2/3.txt',
  ];
  for (let filename of files) {
    fs.writeFile(filename, 'Hello', (err) => {
      if (err) throw err;
    });
  }

  const result = read('.', () => true, [], 'tmp-readdir/');
  expect(result).toEqual(expect.arrayContaining(files));
});


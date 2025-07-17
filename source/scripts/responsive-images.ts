const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

const directory = 'source/images/site/';

for (const file of readAllFiles(directory)) {
  console.log('hellow file:', file)
  sharp(`${file}`)
    .resize(200, 100) // width, height
    .toFile(`${file}-small.jpg`);
};

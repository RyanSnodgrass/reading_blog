const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const SOURCE_DIRECTORY = 'source/images/site/';
const OUTPUT_DIRECTORY = 'dist/images/'; // New directory for output images
const IMAGE_WIDTHS = [256, 288, 320, 384, 2000]; // Desired widths for responsive images
const WEBP_QUALITY = 80; // WebP compression quality (0-100)

// --- Helper Functions ---

/**
 * Recursively reads all file paths in a given directory.
 * @param {string} dir - The directory to read from.
 * @returns {Generator<string>} A generator that yields file paths.
 */
function* readAllFiles(dir: string): Generator<string>  {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      yield* readAllFiles(fullPath);
    } else {
      yield fullPath;
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

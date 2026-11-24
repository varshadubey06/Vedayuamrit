const sharp = require('sharp');
const fs = require('fs');

async function processLogo() {
  const { data, info } = await sharp('public/images/vedayu-logo-gold.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const rgba = Buffer.alloc(width * height * 4);

  // We can do a flood fill from the borders to remove ONLY the background checkerboard
  // and not touch anything inside the logo!
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackground(x, y) {
    const idx = (y * width + x) * 3;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Checkerboard pixels are neutral grey:
    // (r ~ 207, g ~ 207, b ~ 207) or (r ~ 143, g ~ 143, b ~ 143) or slight compression artifacts
    // The logo elements have distinct color saturation:
    // Greens have high G compared to R and B.
    // Golds/yellows have high R and G, low B.
    // Wood browns have high R, moderate G, low B.
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return maxDiff < 14 && r > 100 && r < 240;
  }

  // Push border pixels
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) {
      queue.push([x, 0]);
      visited[0 * width + x] = 1;
    }
    if (isBackground(x, height - 1)) {
      queue.push([x, height - 1]);
      visited[(height - 1) * width + x] = 1;
    }
  }
  for (let y = 0; y < height; y++) {
    if (isBackground(0, y)) {
      queue.push([0, y]);
      visited[y * width + 0] = 1;
    }
    if (isBackground(width - 1, y)) {
      queue.push([width - 1, y]);
      visited[y * width + (width - 1)] = 1;
    }
  }

  // Breadth-first search flood fill
  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1]
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nPos = ny * width + nx;
        if (!visited[nPos] && isBackground(nx, ny)) {
          visited[nPos] = 1;
          queue.push([nx, ny]);
        }
      }
    }
  }

  // Build transparent RGBA
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 3;
      const dstIdx = (y * width + x) * 4;
      const isBg = visited[y * width + x] === 1;

      rgba[dstIdx] = data[srcIdx];
      rgba[dstIdx + 1] = data[srcIdx + 1];
      rgba[dstIdx + 2] = data[srcIdx + 2];
      rgba[dstIdx + 3] = isBg ? 0 : 255;
    }
  }

  // Save as high-res transparent PNG
  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
    .trim() // Trim transparent boundaries for tight, perfect fitting!
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/images/vedayu-logo-transparent.png');

  console.log('Successfully created public/images/vedayu-logo-transparent.png!');
}

processLogo().catch(err => console.error(err));


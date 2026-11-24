const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadsDir = 'C:/Users/ABC/.gemini/antigravity/brain/adb80a40-f852-474d-a2df-5118d6bf2240/.user_uploaded';

async function processImages() {
  console.log('Processing all 7 uploaded images for VEDAYU AMRIT...');

  // 1. Image 2: Hero Banner Background (as requested: "use 2nd image as banner background")
  const img2Path = path.join(uploadsDir, 'media_1794391175226_99e0dcae.jpg');
  await sharp(img2Path)
    .resize(1920, 1080, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.95, saturation: 1.05 })
    .jpeg({ quality: 95 })
    .toFile('public/images/vedayu-hero-banner.jpg');
  console.log('✓ 1. Deployed 2nd image as Hero Banner Background (public/images/vedayu-hero-banner.jpg)');

  // 2. Image 7: Single Luxury Flagship Spotlight Product for Hero
  const img7Path = path.join(uploadsDir, 'media_1794391236720_ea74474c.jpg');
  await sharp(img7Path)
    .resize(900, 900, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toFile('public/images/vedayu-single-hero.jpg');
  console.log('✓ 2. Deployed 7th image as Hero Flagship Spotlight (public/images/vedayu-single-hero.jpg)');

  // 3. Image 4: 100% NATURAL Badge with transparent alpha
  const img4Path = path.join(uploadsDir, 'media_1794391202399_263a9e27.jpg');
  const { data: bData, info: bInfo } = await sharp(img4Path).raw().toBuffer({ resolveWithObject: true });
  const bRgba = Buffer.alloc(bInfo.width * bInfo.height * 4);

  for (let y = 0; y < bInfo.height; y++) {
    for (let x = 0; x < bInfo.width; x++) {
      const srcIdx = (y * bInfo.width + x) * 3;
      const dstIdx = (y * bInfo.width + x) * 4;
      const r = bData[srcIdx];
      const g = bData[srcIdx + 1];
      const b = bData[srcIdx + 2];

      const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
      const avg = (r + g + b) / 3;

      // Checkerboard is light grey/white with minimal color saturation
      const isCheckerboard = maxDiff <= 8 && avg >= 210;

      bRgba[dstIdx] = r;
      bRgba[dstIdx + 1] = g;
      bRgba[dstIdx + 2] = b;
      bRgba[dstIdx + 3] = isCheckerboard ? 0 : 255;
    }
  }

  await sharp(bRgba, { raw: { width: bInfo.width, height: bInfo.height, channels: 4 } })
    .trim()
    .png({ palette: false, quality: 100 })
    .toFile('public/images/badge-100-natural.png');
  console.log('✓ 3. Deployed 4th image as transparent 100% NATURAL seal (public/images/badge-100-natural.png)');

  // 4. Image 5: Granite Mortar & Pestle for Ayurvedic Heritage & Story section
  const img5Path = path.join(uploadsDir, 'media_1794391211623_0011430f.jpg');
  await sharp(img5Path)
    .resize(900, 900, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile('public/images/heritage-mortar.jpg');
  console.log('✓ 4. Deployed 5th image for Ayurvedic Heritage (public/images/heritage-mortar.jpg)');

  // 5. Image 1: Skin Care Ayurvedic Facial Mask
  const img1Path = path.join(uploadsDir, 'media_1794391114510_a3ed0006.jpg');
  await sharp(img1Path)
    .resize(800, 1000, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 95 })
    .toFile('public/images/skincare-facial.jpg');
  console.log('✓ 5. Deployed 1st image for Ayurvedic Skin Care (public/images/skincare-facial.jpg)');

  // 6. Image 3: Traditional Herbal Oils on Wooden Tray
  const img3Path = path.join(uploadsDir, 'media_1794391190794_02e52b64.jpg');
  await sharp(img3Path)
    .resize(800, 1000, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toFile('public/images/herbal-oils-tray.jpg');
  console.log('✓ 6. Deployed 3rd image for Herbal Oils (public/images/herbal-oils-tray.jpg)');

  // 7. Image 6: Holistic Botanical Body / Tridosha Balance
  const img6Path = path.join(uploadsDir, 'media_1794391223714_fa2d8b6d.jpg');
  await sharp(img6Path)
    .resize(900, 900, { fit: 'cover' })
    .jpeg({ quality: 95 })
    .toFile('public/images/ayurveda-dosha-body.jpg');
  console.log('✓ 7. Deployed 6th image for Doshas & Holistic Wellness (public/images/ayurveda-dosha-body.jpg)');

  console.log('All 7 images processed and ready!');
}

processImages().catch(console.error);


const fs = require('fs');

let code = fs.readFileSync('src/data/products.ts', 'utf8');

// Replace every primary image property with its corresponding branded product image
code = code.replace(/id:\s*'(va-\d+)',[\s\S]*?slug:\s*'([^']+)',[\s\S]*?image:\s*'[^']+',/g, (match, id, slug) => {
  return match.replace(/image:\s*'[^']+',/, `image: '/images/products/${slug}.jpg',`);
});

fs.writeFileSync('src/data/products.ts', code, 'utf8');
console.log('Successfully updated product images in src/data/products.ts!');


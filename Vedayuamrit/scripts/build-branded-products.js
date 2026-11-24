const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// We have reliable local authentic master images:
// 1. 'public/images/vedayu-bottles-hero.jpg' (Dark green glass bottles with gold caps)
// 2. 'public/images/vedayu-range-banner.jpg' (Authentic pouches & capsules lineup)
// 3. 'public/images/vedayu-hero-banner.jpg' (Panoramic brass mortar, golden bokeh & dewdrops)

const PRODUCT_LIST = [
  // 1. Ayurvedic Health Products
  { slug: 'ashwagandha-powder', title: 'ASHWAGANDHA POWDER', badge: 'Withania Somnifera • Stress & Ojas', type: 'Pure Organic Churna 200g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'amla-powder', title: 'WILD AMLA POWDER', badge: 'Emblica Officinalis • Vitamin C', type: 'Shade-Dried Gooseberry 250g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'shatavari', title: 'ORGANIC SHATAVARI', badge: 'Asparagus Racemosus • Hormonal Balance', type: 'Rejuvenating Extract 200g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'triphala-churna', title: 'TRIPHALA CHURNA', badge: 'Amalaki + Bibhitaki + Haritaki', type: 'Classic Colon Cleanse 250g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'brahmi', title: 'BRAHMI VEG CAPSULES', badge: 'Bacopa Monnieri • 20% Bacosides', type: '60 Vegetarian Capsules', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'safed-musli', title: 'SAFED MUSLI POWDER', badge: 'Chlorophytum Borivilianum • Vigor', type: 'Wild Forest Tuber 100g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'chyawanprash', title: 'GOLD CHYAWANPRASH', badge: '51 Classical Botanicals • Kesar', type: 'Copper Vessel Cooked 500g', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'moringa', title: 'MORINGA SUPERFOOD', badge: 'Moringa Oleifera • 90+ Nutrients', type: 'Cold-Dehydrated Leaf 200g', fallback: 'public/images/vedayu-range-banner.jpg' },

  // 2. Herbal Juices & Immunity Products
  { slug: 'aloe-vera-juice', title: 'ALOE VERA JUICE', badge: 'Aloe Barbadensis • With Natural Pulp', type: 'Cold-Pressed Juice 1000ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'turmeric-capsules', title: 'CURCUMIN TURMERIC', badge: '95% Standardized Curcuminoids', type: '60 Capsules with BioPerine', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'immunity-powder', title: 'AYUSH KWATH KADHA', badge: 'Tulsi, Dalchini, Sunthi & Marich', type: 'Respiratory Shield 150g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'neem-juice', title: 'PURE NEEM JUICE', badge: 'Azadirachta Indica • Sarva Roga', type: 'Fresh Leaf Extract 500ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'tulsi-drops', title: 'PANCHA TULSI ARK', badge: '5 Sacred Holy Basils Hydro-Steam', type: 'Dropper Bottle 30ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },

  // 3. Herbal Tea & Natural Drinks
  { slug: 'herbal-tea', title: 'STRESS-RELIEF TEA', badge: 'Rose, Chamomile & Shankhpushpi', type: 'Whole Flower Tisane 100g', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'green-tea', title: 'HIMALAYAN GREEN TEA', badge: 'Single Estate High Altitude Leaves', type: 'Rich in EGCG 150g', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'tulsi-tea', title: 'SACRED TULSI TEA', badge: 'Krishna Tulsi, Ginger & Mulethi', type: 'Aromatic Agni Infusion 100g', fallback: 'public/images/vedayu-hero-banner.jpg' },

  // 4. Skin Care Products
  { slug: 'face-wash', title: 'NEEM & TEA TREE WASH', badge: 'Deep Pore Clarifier • pH 5.5', type: 'Gentle Gel Cleanser 150ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'multani-mitti', title: 'PURIFIED MULTANI MITTI', badge: 'Triple-Sifted Mineral Fuller Clay', type: 'Oil Balance & Tan Removal 200g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'lip-balm', title: 'GHEE & ROSE LIP BALM', badge: 'Shata Dhauta Ghrita (100x Washed)', type: 'Pure Damask Rose Balm 10g', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'aloe-vera-gel', title: 'ORGANIC ALOE VERA GEL', badge: '99% Pure Transparent Aloe Pulp', type: 'Multi-Purpose Soother 200g', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'herbal-scrub', title: 'WALNUT & SANDALWOOD SCRUB', badge: 'Kashmiri Walnut & Mysore Chandan', type: 'Velvety Skin Polish 150g', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'rose-water', title: 'KANNAUJ GULAB JAL', badge: 'Hydro-Distilled Desi Damask Rose', type: 'Pure Deg-Bhapka Mist 200ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'sandalwood-face-pack', title: 'ROYAL SANDALWOOD PACK', badge: 'Mysore Chandan & Kashmiri Kesar', type: 'Bridal Radiance Ubtan 100g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'turmeric-face-pack', title: 'WILD KASTURI MANJAL', badge: 'Non-Staining Curcuma Aromatica', type: 'Complexion Brightener 100g', fallback: 'public/images/vedayu-range-banner.jpg' },

  // 5. Hair Care Products
  { slug: 'herbal-shampoo', title: 'BHRINGRAJ & SHIKAKAI SHAMPOO', badge: 'Reetha Saponin Foaming Cleanser', type: 'Sulphate-Free Formula 300ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'herbal-conditioner', title: 'HIBISCUS CONDITIONER', badge: 'Red Japa Pushpa & Fenugreek', type: 'Silky Frizz Detangler 250ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'hair-oil', title: '18-HERB AYURVEDIC OIL', badge: 'Kshirpak Vidhi 48-Hour Simmered', type: 'Deep Root Tailam 200ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'bhringraj-oil', title: 'PURE BHRINGRAJ OIL', badge: 'Eclipta Alba Juice & Black Sesame', type: 'King of Hair Growth 200ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'amla-hair-oil', title: 'COLD-PRESSED AMLA OIL', badge: 'Wild Indian Gooseberry Infusion', type: 'Melanin & Shine Booster 200ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'brahmi-oil', title: 'BRAHMI CALMING OIL', badge: 'Brahmi, Shankhpushpi & Camphor', type: 'Siro-Abhyanga Night Oil 200ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'hair-serum', title: 'HERBAL HAIR SERUM', badge: 'Moroccan Argan & Rosemary Oils', type: 'Botanical Heat Shield 50ml', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'shikakai-powder', title: 'PURE SHIKAKAI POWDER', badge: 'Acacia Concinna Wild Harvest Pods', type: 'Natural Scalp Cleanser 250g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'reetha-powder', title: 'ORGANIC REETHA POWDER', badge: 'Sapindus Mukorossi Shells', type: 'Plant Saponin Wash 250g', fallback: 'public/images/vedayu-range-banner.jpg' },

  // 6. Herbal Personal & Body Care
  { slug: 'herbal-soap', title: 'NEEM & TULSI SOAP', badge: '45-Day Cured Cold Process Bar', type: 'Handcrafted Bath Bar 125g', fallback: 'public/images/vedayu-hero-banner.jpg' },
  { slug: 'neem-oil', title: 'VIRGIN NEEM SEED OIL', badge: '1st Cold-Press Unrefined Extract', type: 'High Azadirachtin 100ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'herbal-massage-oil', title: 'DHANWANTHARAM TAILA', badge: '28 Classical Rejuvenating Herbs', type: 'Abhyanga Body Oil 250ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },
  { slug: 'foot-massage-oil', title: 'KANSA PADABHYANGA OIL', badge: 'Castor, Sariva & Lavender', type: 'Deep Sleep & Heel Repair 100ml', fallback: 'public/images/vedayu-bottles-hero.jpg' },

  // 7. Herbal Nutrition & Superfoods
  { slug: 'wheatgrass-powder', title: 'WHEATGRASS POWDER', badge: '7th-Day Sprouted Chlorophyll', type: 'Alkaline Green Blood 200g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'beetroot-powder', title: 'BEETROOT SUPERFOOD', badge: 'Beta Vulgaris Pure Dehydrated', type: 'Natural Nitric Oxide 200g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'flax-seeds', title: 'ORGANIC FLAX SEEDS', badge: 'High Plant Omega-3 ALA & Lignans', type: 'Unpolished Whole Alsi 250g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'sunflower-seeds', title: 'SHELLED SUNFLOWER SEEDS', badge: 'Raw Jumbo Kernels • Vitamin E', type: 'Natural Selenium Snack 250g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'millet-health-mix', title: 'MILLET HEALTH MIX', badge: 'Sprouted 14 Multi-Grains & Nuts', type: 'Ancient Sathu Maavu 500g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'herbal-protein-mix', title: 'HERBAL PLANT PROTEIN', badge: '24g Complete Vegan Protein + Ashwagandha', type: 'Restorative Protein 500g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'pumpkin-seeds', title: 'RAW PUMPKIN SEEDS', badge: 'AAA Emerald Kernels • Zinc & Magnesium', type: 'Prostate & Sleep Snack 250g', fallback: 'public/images/vedayu-range-banner.jpg' },
  { slug: 'chia-seeds', title: 'ORGANIC CHIA SEEDS', badge: 'Salvia Hispanica • 10x Water Binding', type: 'Raw Superfood Seeds 250g', fallback: 'public/images/vedayu-range-banner.jpg' },

  // 8. Herbal Natural Foods
  { slug: 'amla-candy', title: 'CHATPATA AMLA CANDY', badge: 'Sun-Dried Wild Gooseberry Morsels', type: 'Desi Khand Sweetened 300g', fallback: 'public/images/vedayu-range-banner.jpg' }
];

function xmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function run() {
  console.log(`Starting branded compilation for all ${PRODUCT_LIST.length} products...`);

  // Load logo watermark
  const logoBuffer = await sharp('public/images/vedayu-logo-transparent.png')
    .resize(175, null, { fit: 'inside' })
    .png()
    .toBuffer();

  for (const item of PRODUCT_LIST) {
    const rawBuffer = fs.readFileSync(item.fallback);
    const titleEsc = xmlEscape(item.title);
    const badgeEsc = xmlEscape(item.badge);
    const typeEsc = xmlEscape(item.type);

    const overlaySvg = Buffer.from(`
      <svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="topG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#081C11" stop-opacity="0.88"/>
            <stop offset="45%" stop-color="#081C11" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#081C11" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="botG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#081C11" stop-opacity="0"/>
            <stop offset="45%" stop-color="#081C11" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#081C11" stop-opacity="0.96"/>
          </linearGradient>
          <linearGradient id="goldG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F5DF9E"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#9A7416"/>
          </linearGradient>
        </defs>

        <!-- Top Vignette -->
        <rect x="0" y="0" width="800" height="240" fill="url(#topG)"/>

        <!-- Bottom Vignette -->
        <rect x="0" y="520" width="800" height="280" fill="url(#botG)"/>

        <!-- Gold Border -->
        <rect x="22" y="22" width="756" height="756" fill="none" stroke="url(#goldG)" stroke-width="2" rx="24" opacity="0.45"/>

        <!-- AYUSH Certificate Pill -->
        <g transform="translate(564, 34)">
          <rect width="198" height="34" rx="17" fill="#0A2416" stroke="#D4AF37" stroke-width="1.5" opacity="0.94"/>
          <text x="99" y="22" font-family="Poppins, sans-serif" font-size="11" font-weight="bold" fill="#F5DF9E" text-anchor="middle" letter-spacing="1">
            AYUSH APPROVED
          </text>
        </g>

        <!-- Bottom Plaque with Product Name & Type -->
        <g transform="translate(36, 676)">
          <rect width="728" height="88" rx="18" fill="#081C11" stroke="#D4AF37" stroke-width="1.5" opacity="0.95"/>
          <text x="364" y="36" font-family="Poppins, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">
            ${titleEsc}
          </text>
          <text x="364" y="64" font-family="Poppins, sans-serif" font-size="12" font-weight="600" fill="#D4AF37" text-anchor="middle" letter-spacing="0.5">
            ${badgeEsc} • ${typeEsc}
          </text>
        </g>
      </svg>
    `);

    const outPath = path.join('public', 'images', 'products', `${item.slug}.jpg`);

    await sharp(rawBuffer)
      .resize(800, 800, { fit: 'cover', position: 'center' })
      .composite([
        { input: logoBuffer, top: 26, left: 34 },
        { input: overlaySvg, top: 0, left: 0 }
      ])
      .jpeg({ quality: 92 })
      .toFile(outPath);
  }

  console.log(`ALL ${PRODUCT_LIST.length} branded images generated successfully in public/images/products/!`);
}

run().catch(console.error);

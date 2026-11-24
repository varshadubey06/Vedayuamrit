const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 46 Distinct Product Configurations
const PRODUCT_CONFIGS = {
  // Classical Ayurvedic Health
  'ashwagandha-powder': { type: 'jar', bg: ['#1e140d', '#3d2516', '#a16207'], herb: 'Withania Somnifera', form: 'Organic Root Powder', vol: '200g', badge: 'Pure Withanolides' },
  'amla-powder': { type: 'pouch', bg: ['#0f2415', '#1e482b', '#22c55e'], herb: 'Wild Emblica', form: 'Raw Fruit Churna', vol: '200g', badge: 'Natural Vitamin C' },
  'shatavari': { type: 'jar', bg: ['#23151c', '#4a2538', '#f472b6'], herb: 'Asparagus Racemosus', form: 'Root Extract Churna', vol: '150g', badge: 'Women Hormonal Care' },
  'triphala-churna': { type: 'pouch', bg: ['#1f180e', '#3f2e1b', '#d97706'], herb: 'Tri-Herb Blend', form: 'Classical Churna', vol: '250g', badge: 'Digestive Detox' },
  'brahmi': { type: 'amber-bottle', bg: ['#0d1d28', '#163b52', '#38bdf8'], herb: 'Bacopa Monnieri', form: 'Herbal Capsules', vol: '60 Caps', badge: 'Brain & Memory' },
  'safed-musli': { type: 'amber-bottle', bg: ['#1f1a14', '#42362b', '#e2e8f0'], herb: 'Chlorophytum Borivilianum', form: 'Pure Extract Caps', vol: '60 Caps', badge: 'Stamina & Vigor' },
  'chyawanprash': { type: 'brass-jar', bg: ['#1b0d05', '#3a1a09', '#f59e0b'], herb: '52-Herb Rasayana', form: 'Classical Herbal Jam', vol: '500g', badge: 'Ancient Charaka Recipe' },
  'moringa': { type: 'pouch', bg: ['#072210', '#114a24', '#4ade80'], herb: 'Moringa Oleifera', form: 'Superleaf Powder', vol: '200g', badge: 'Multi-Nutrient Green' },

  // Juices & Immunity
  'aloe-vera-juice': { type: 'juice-bottle', bg: ['#062320', '#0e4a44', '#2dd4bf'], herb: 'Aloe Barbadensis', form: 'Cold-Pressed Juice', vol: '1000ml', badge: '99% Pure Inner Leaf' },
  'turmeric-capsules': { type: 'amber-bottle', bg: ['#281206', '#5e250b', '#fb923c'], herb: 'Curcuma Longa (95% Curcumin)', form: 'Vegetarian Capsules', vol: '60 Caps', badge: 'Joint & Immunity' },
  'immunity-powder': { type: 'jar', bg: ['#221606', '#4d300c', '#fbbf24'], herb: 'Giloy, Tulsi & Spices', form: 'Kadha Churna', vol: '200g', badge: 'Daily Defense' },
  'neem-juice': { type: 'juice-bottle', bg: ['#071f0f', '#124120', '#16a34a'], herb: 'Azadirachta Indica', form: 'Wild Neem Leaf Juice', vol: '1000ml', badge: 'Blood Purifier' },
  'tulsi-drops': { type: 'dropper', bg: ['#1b1026', '#3b1f54', '#c084fc'], herb: 'Panch Tulsi Extract', form: 'Liquid Drops', vol: '30ml', badge: '5 Holy Basil Types' },

  // Herbal Teas
  'herbal-tea': { type: 'tin', bg: ['#231208', '#492310', '#f97316'], herb: 'Cinnamon & Herbs', form: 'Loose Leaf Tea', vol: '100g', badge: 'Caffeine-Free Infusion' },
  'green-tea': { type: 'tin', bg: ['#0b1f13', '#1b4528', '#84cc16'], herb: 'Camellia Sinensis', form: 'Whole Green Leaf Tea', vol: '100g', badge: 'Antioxidant Rich' },
  'tulsi-tea': { type: 'tin', bg: ['#1a1024', '#381c4e', '#a855f7'], herb: 'Rama & Krishna Tulsi', form: 'Sacred Herbal Tea', vol: '100g', badge: 'Stress Relieving' },

  // Skin Care
  'face-wash': { type: 'pump', bg: ['#072421', '#104944', '#14b8a6'], herb: 'Neem & Tea Tree', form: 'Clarifying Cleanser', vol: '150ml', badge: 'Blemish Defense' },
  'multani-mitti': { type: 'pouch', bg: ['#221911', '#463322', '#d97706'], herb: 'Fullers Earth Clay', form: 'Mineral Clay Powder', vol: '250g', badge: 'Oil Control & Glow' },
  'lip-balm': { type: 'lip-tin', bg: ['#261017', '#521d2e', '#fb7185'], herb: 'Beeswax & Rose Petals', form: 'Nourishing Lip Butter', vol: '15g', badge: '100% Edible Natural' },
  'aloe-vera-gel': { type: 'jar', bg: ['#04251d', '#0c4d3b', '#10b981'], herb: 'Pure Aloe Vera Gel', form: 'Cooling Hydration Gel', vol: '200g', badge: 'Multi-Purpose Soothing' },
  'herbal-scrub': { type: 'jar', bg: ['#1e140d', '#422a1b', '#b45309'], herb: 'Walnut & Apricot', form: 'Exfoliating Scrub', vol: '150g', badge: 'Deep Pore Polish' },
  'rose-water': { type: 'spray', bg: ['#2a101b', '#571e35', '#f43f5e'], herb: 'Kannauj Damask Rose', form: 'Steam-Distilled Hydrosol', vol: '200ml', badge: 'Pure Gulab Jal' },
  'sandalwood-face-pack': { type: 'jar', bg: ['#241a0b', '#4e3816', '#facc15'], herb: 'Mysore Sandalwood', form: 'Radiance Ubtan Paste', vol: '150g', badge: 'Bridal Golden Glow' },
  'turmeric-face-pack': { type: 'jar', bg: ['#261507', '#572c0d', '#f59e0b'], herb: 'Wild Kasturi Manjal', form: 'Clarifying Face Pack', vol: '150g', badge: 'Even Skin Tone' },

  // Hair Care
  'herbal-shampoo': { type: 'pump', bg: ['#08201a', '#144637', '#34d399'], herb: 'Shikakai & Reetha', form: 'Sulphate-Free Shampoo', vol: '250ml', badge: 'Anti-Dandruff & Volume' },
  'herbal-conditioner': { type: 'pump', bg: ['#22111b', '#482136', '#e879f9'], herb: 'Aloe & Fenugreek', form: 'Moisture Conditioner', vol: '250ml', badge: 'Frizz-Free Silk Shine' },
  'hair-oil': { type: 'oil-bottle', bg: ['#1e140b', '#422a15', '#d97706'], herb: '18 Ayurvedic Herbs', form: 'Classical Hair Oil', vol: '200ml', badge: 'Deep Scalp Care' },
  'bhringraj-oil': { type: 'oil-bottle', bg: ['#071d13', '#114029', '#10b981'], herb: 'Mahabhringraj & Sesame', form: 'Kshirpak Hair Oil', vol: '200ml', badge: 'Anti-Hair Fall' },
  'amla-hair-oil': { type: 'oil-bottle', bg: ['#0a1f12', '#184728', '#22c55e'], herb: 'Indian Gooseberry Oil', form: 'Cold-Pressed Hair Oil', vol: '200ml', badge: 'Root Strengthening' },
  'brahmi-oil': { type: 'oil-bottle', bg: ['#071c22', '#103d4b', '#06b6d4'], herb: 'Gotu Kola & Camphor', form: 'Cooling Scalp Oil', vol: '200ml', badge: 'Scalp Heat Relief' },
  'hair-serum': { type: 'dropper', bg: ['#201507', '#492f0e', '#fbbf24'], herb: 'Argan & Onion Seed', form: 'Non-Greasy Hair Serum', vol: '50ml', badge: 'Split-End Repair' },
  'shikakai-powder': { type: 'pouch', bg: ['#1e130c', '#3f2717', '#a16207'], herb: 'Acacia Concinna', form: 'Raw Pod Powder', vol: '250g', badge: 'Natural Hair Wash' },
  'reetha-powder': { type: 'pouch', bg: ['#20170d', '#45301a', '#ca8a04'], herb: 'Sapindus Mukorossi', form: 'Pure Soapnut Powder', vol: '250g', badge: 'Organic Plant Saponins' },

  // Body Care
  'herbal-soap': { type: 'soap', bg: ['#0d1e12', '#1e4024', '#4ade80'], herb: 'Neem & Essential Oils', form: 'Cold-Pressed Soap Bar', vol: '125g', badge: 'Paraben Free Bar' },
  'neem-oil': { type: 'oil-bottle', bg: ['#0b1c0b', '#1f3c1e', '#65a30d'], herb: 'Azadirachta Indica', form: 'Cold-Pressed Seed Oil', vol: '100ml', badge: 'Therapeutic Grade' },
  'herbal-massage-oil': { type: 'oil-bottle', bg: ['#211308', '#482710', '#ea580c'], herb: 'Bala & Ashwagandha', form: 'Abhyanga Body Oil', vol: '250ml', badge: 'Muscle Tension Relief' },
  'foot-massage-oil': { type: 'oil-bottle', bg: ['#171020', '#322245', '#818cf8'], herb: 'Castor & Herbs', form: 'Padabhyanga Oil', vol: '100ml', badge: 'Deep Sleep Ritual' },

  // Superfoods & Nutrition
  'wheatgrass-powder': { type: 'pouch', bg: ['#08220c', '#144c19', '#4ade80'], herb: 'Triticum Aestivum', form: 'Sprout Leaf Powder', vol: '150g', badge: 'Chlorophyll Detox' },
  'beetroot-powder': { type: 'pouch', bg: ['#250712', '#540f28', '#e11d48'], herb: 'Beta Vulgaris', form: 'Beet Juice Powder', vol: '200g', badge: 'Stamina & Blood Flow' },
  'flax-seeds': { type: 'pouch', bg: ['#1f140c', '#422a19', '#d97706'], herb: 'Linum Usitatissimum', form: 'Raw Golden Flax', vol: '250g', badge: 'Omega-3 Fiber' },
  'sunflower-seeds': { type: 'pouch', bg: ['#231b05', '#4d390a', '#facc15'], herb: 'Helianthus Annuus', form: 'Raw Hulled Kernels', vol: '250g', badge: 'Natural Vitamin E' },
  'millet-health-mix': { type: 'pouch', bg: ['#1e1810', '#423321', '#a8a29e'], herb: '9 Ancient Millets', form: 'Multigrain Sattu Mix', vol: '500g', badge: 'High Protein Breakfast' },
  'herbal-protein-mix': { type: 'jar', bg: ['#1b110c', '#3a2419', '#78716c'], herb: 'Pea & Ayurvedic Herbs', form: 'Plant Protein Blend', vol: '500g', badge: '25g Protein Per Scoop' },
  'pumpkin-seeds': { type: 'pouch', bg: ['#0a1d0f', '#194121', '#16a34a'], herb: 'Cucurbita Pepo', form: 'Raw Green Pepitas', vol: '250g', badge: 'Zinc & Magnesium' },
  'chia-seeds': { type: 'pouch', bg: ['#14161a', '#2b3340', '#94a3b8'], herb: 'Salvia Hispanica', form: 'Organic Chia Seeds', vol: '250g', badge: 'Soluble Fiber Power' },
  'amla-candy': { type: 'pouch', bg: ['#231505', '#522e0a', '#d97706'], herb: 'Wild Gooseberry & Cumin', form: 'Dried Herbal Bites', vol: '250g', badge: 'Chatpata Digestion' },
};

function xmlEscape(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generatePackagingSvg(title, cfg) {
  const [bgDark, bgMid, accentColor] = cfg.bg;
  const safeTitle = xmlEscape(title);
  const safeHerb = xmlEscape(cfg.herb);
  const safeForm = xmlEscape(cfg.form);
  const safeVol = xmlEscape(cfg.vol);
  const safeBadge = xmlEscape(cfg.badge);

  let packagingMarkup = '';

  switch (cfg.type) {
    case 'pouch':
      packagingMarkup = `
        <!-- Stand-up Pouch with Matte Foil Finish -->
        <g id="single-pouch" filter="url(#shadow)">
          <!-- Main Pouch Body -->
          <path d="M 270 210 Q 400 195 530 210 L 555 640 Q 400 665 245 640 Z" fill="url(#pouchGradient)" stroke="#c59b27" stroke-width="2.5" />
          <!-- Top Sealed Zipper Header -->
          <path d="M 268 210 L 260 170 Q 400 160 540 170 L 532 210 Z" fill="#2d2218" stroke="#d4af37" stroke-width="2" />
          <line x1="280" y1="188" x2="520" y2="188" stroke="#e6c666" stroke-width="2" stroke-dasharray="4,3" />
          <!-- Notch Left & Right -->
          <polygon points="262,192 272,192 267,196" fill="#150f0a" />
          <polygon points="538,192 528,192 533,196" fill="#150f0a" />

          <!-- Center Label Panel -->
          <rect x="290" y="240" width="220" height="340" rx="16" fill="#fdfbf7" stroke="#c59b27" stroke-width="2" />
          <!-- Inner Label Golden Frame -->
          <rect x="298" y="248" width="204" height="324" rx="12" fill="none" stroke="#d4af37" stroke-width="1.2" stroke-dasharray="6,3" />

          <!-- Brand Emblem -->
          <circle cx="400" cy="285" r="24" fill="#0f2b1d" stroke="#c59b27" stroke-width="1.5" />
          <text x="400" y="282" font-family="Arial, sans-serif" font-size="11" font-weight="900" fill="#fef08a" text-anchor="middle">VEDAYU</text>
          <text x="400" y="295" font-family="Arial, sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">AMRIT</text>

          <!-- Divider -->
          <line x1="320" y1="320" x2="480" y2="320" stroke="#c59b27" stroke-width="1" />

          <!-- Product Name on Pouch -->
          <text x="400" y="348" font-family="'Poppins', sans-serif" font-size="16" font-weight="800" fill="#143927" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="370" font-family="'Poppins', sans-serif" font-size="10.5" font-weight="600" fill="#854d0e" text-anchor="middle" font-style="italic">${safeHerb}</text>
          <text x="400" y="388" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#15803d" text-anchor="middle">${safeForm}</text>

          <!-- Clear Window with Botanical Ingredients -->
          <g transform="translate(325, 405)">
            <rect x="0" y="0" width="150" height="75" rx="10" fill="#2d2218" stroke="#c59b27" stroke-width="1.5" />
            <circle cx="40" cy="38" r="18" fill="${accentColor}" opacity="0.8" />
            <circle cx="75" cy="36" r="22" fill="#c59b27" opacity="0.75" />
            <circle cx="110" cy="38" r="18" fill="${accentColor}" opacity="0.8" />
            <text x="75" y="42" font-family="'Poppins', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">100% PURE</text>
          </g>

          <!-- Net Weight / Quality Seal -->
          <rect x="330" y="495" width="140" height="24" rx="12" fill="#0f2b1d" stroke="#c59b27" stroke-width="1" />
          <text x="400" y="511" font-family="'Poppins', sans-serif" font-size="10" font-weight="700" fill="#fef08a" text-anchor="middle">NET WT. ${safeVol} • AYUSH</text>

          <!-- Bottom Gusset Fold -->
          <path d="M 270 610 Q 400 630 530 610" stroke="#1f1810" stroke-width="2" fill="none" opacity="0.6" />
        </g>
      `;
      break;

    case 'amber-bottle':
      packagingMarkup = `
        <!-- Pharmaceutical Amber Glass Bottle -->
        <g id="amber-bottle" filter="url(#shadow)">
          <!-- Gold Metallic Screw Cap -->
          <rect x="340" y="210" width="120" height="45" rx="5" fill="url(#goldCap)" stroke="#b45309" stroke-width="1.5" />
          <line x1="355" y1="210" x2="355" y2="255" stroke="#fff" opacity="0.4" stroke-width="2" />
          <line x1="375" y1="210" x2="375" y2="255" stroke="#fff" opacity="0.3" stroke-width="2" />
          <line x1="425" y1="210" x2="425" y2="255" stroke="#000" opacity="0.3" stroke-width="2" />
          <!-- Neck -->
          <rect x="350" y="255" width="100" height="25" fill="#3a1d0d" />
          <!-- Bottle Body -->
          <path d="M 320 300 Q 350 280 400 280 Q 450 280 480 300 L 485 620 Q 400 635 315 620 Z" fill="url(#amberGlass)" stroke="#221207" stroke-width="2" />
          
          <!-- Glossy Bottle Highlight Left -->
          <path d="M 330 315 L 325 610" stroke="#ffffff" stroke-width="6" opacity="0.25" stroke-linecap="round" />
          
          <!-- Luxury Wrap-Around Label -->
          <rect x="330" y="330" width="140" height="250" rx="8" fill="#0d2417" stroke="#c59b27" stroke-width="2" />
          <rect x="336" y="336" width="128" height="238" rx="6" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="4,2" />

          <!-- Emblem on Label -->
          <circle cx="400" cy="370" r="22" fill="#c59b27" stroke="#ffffff" stroke-width="1" />
          <text x="400" y="367" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#0f2b1d" text-anchor="middle">VEDAYU</text>
          <text x="400" y="378" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#0f2b1d" text-anchor="middle">AMRIT</text>

          <!-- Product Details -->
          <text x="400" y="420" font-family="'Poppins', sans-serif" font-size="14.5" font-weight="800" fill="#fef08a" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="440" font-family="'Poppins', sans-serif" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="460" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#86efac" text-anchor="middle">${safeForm}</text>

          <!-- Badge Pill -->
          <rect x="345" y="480" width="110" height="24" rx="12" fill="#c59b27" />
          <text x="400" y="496" font-family="'Poppins', sans-serif" font-size="9" font-weight="800" fill="#0f2b1d" text-anchor="middle">${safeBadge}</text>

          <!-- Bottle Volume -->
          <text x="400" y="540" font-family="'Poppins', sans-serif" font-size="10" font-weight="700" fill="#e2e8f0" text-anchor="middle">${safeVol} • GMP TESTED</text>
        </g>
      `;
      break;

    case 'juice-bottle':
      packagingMarkup = `
        <!-- Tall Sleek Glass Juice Bottle -->
        <g id="juice-bottle" filter="url(#shadow)">
          <!-- Gold Metal Crown Cap -->
          <rect x="360" y="160" width="80" height="35" rx="4" fill="url(#goldCap)" stroke="#b45309" stroke-width="1.5" />
          <!-- Slender Glass Neck -->
          <path d="M 370 195 L 365 290 Q 340 330 330 370 L 330 635 Q 400 650 470 635 L 470 370 Q 460 330 435 290 L 430 195 Z" fill="url(#juiceGlass)" stroke="#09281a" stroke-width="2.5" />
          
          <!-- Juice Liquid Level inside -->
          <path d="M 334 380 Q 400 375 466 380 L 466 630 Q 400 642 334 630 Z" fill="${accentColor}" opacity="0.65" />
          
          <!-- Glossy Reflection Stripe -->
          <path d="M 345 350 L 340 625" stroke="#ffffff" stroke-width="8" opacity="0.35" stroke-linecap="round" />

          <!-- Front Vertical Tall Label -->
          <rect x="345" y="380" width="110" height="210" rx="10" fill="#fdfbf7" stroke="#c59b27" stroke-width="2" />
          <rect x="350" y="385" width="100" height="200" rx="8" fill="none" stroke="#15803d" stroke-width="1" />

          <!-- Emblem -->
          <circle cx="400" cy="415" r="18" fill="#0f2b1d" stroke="#c59b27" stroke-width="1.5" />
          <text x="400" y="413" font-family="Arial, sans-serif" font-size="7.5" font-weight="900" fill="#fef08a" text-anchor="middle">VEDAYU</text>
          <text x="400" y="422" font-family="Arial, sans-serif" font-size="6.5" font-weight="700" fill="#fff" text-anchor="middle">AMRIT</text>

          <text x="400" y="455" font-family="'Poppins', sans-serif" font-size="13.5" font-weight="800" fill="#143927" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="475" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#15803d" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="492" font-family="'Poppins', sans-serif" font-size="8.5" font-weight="700" fill="#854d0e" text-anchor="middle">${safeForm}</text>

          <rect x="355" y="515" width="90" height="20" rx="10" fill="#143927" />
          <text x="400" y="528" font-family="'Poppins', sans-serif" font-size="8" font-weight="800" fill="#fef08a" text-anchor="middle">COLD PRESSED</text>
          <text x="400" y="555" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#0f2b1d" text-anchor="middle">${safeVol} • 100% PURE</text>
        </g>
      `;
      break;

    case 'oil-bottle':
      packagingMarkup = `
        <!-- Traditional Ayurvedic Glass Oil Bottle -->
        <g id="oil-bottle" filter="url(#shadow)">
          <!-- Golden Screw Cap -->
          <rect x="360" y="210" width="80" height="40" rx="6" fill="url(#goldCap)" stroke="#92400e" stroke-width="2" />
          <!-- Fluted Bottle Shoulder -->
          <path d="M 370 250 L 365 295 Q 320 330 315 380 L 315 625 Q 400 640 485 625 L 485 380 Q 480 330 435 295 L 430 250 Z" fill="url(#oilAmber)" stroke="#1f140a" stroke-width="2.5" />
          
          <!-- Liquid Oil Shimmer inside -->
          <path d="M 322 360 Q 400 350 478 360 L 478 615 Q 400 630 322 615 Z" fill="${accentColor}" opacity="0.5" />

          <!-- Glass Specular Highlight -->
          <path d="M 330 340 L 325 610" stroke="#ffffff" stroke-width="7" opacity="0.3" stroke-linecap="round" />

          <!-- Imperial Dark Emerald & Gold Label -->
          <rect x="330" y="360" width="140" height="230" rx="12" fill="#0f2818" stroke="#c59b27" stroke-width="2" />
          <rect x="336" y="366" width="128" height="218" rx="8" fill="none" stroke="#d4af37" stroke-width="1.2" stroke-dasharray="5,2" />

          <!-- Emblem -->
          <circle cx="400" cy="400" r="22" fill="#c59b27" stroke="#ffffff" stroke-width="1.2" />
          <text x="400" y="397" font-family="Arial, sans-serif" font-size="8.5" font-weight="900" fill="#0f2b1d" text-anchor="middle">VEDAYU</text>
          <text x="400" y="408" font-family="Arial, sans-serif" font-size="7" font-weight="700" fill="#0f2b1d" text-anchor="middle">AMRIT</text>

          <text x="400" y="445" font-family="'Poppins', sans-serif" font-size="14.5" font-weight="800" fill="#fef08a" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="468" font-family="'Poppins', sans-serif" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="488" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#86efac" text-anchor="middle">${safeForm}</text>

          <rect x="345" y="510" width="110" height="24" rx="12" fill="#c59b27" />
          <text x="400" y="526" font-family="'Poppins', sans-serif" font-size="8.5" font-weight="800" fill="#0f2818" text-anchor="middle">${safeBadge}</text>

          <text x="400" y="560" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#e2e8f0" text-anchor="middle">${safeVol} • KSHIRPAK VIDHI</text>
        </g>
      `;
      break;

    case 'dropper':
      packagingMarkup = `
        <!-- Glass Tincture Bottle with Gold & Rubber Dropper Pipette -->
        <g id="dropper-bottle" filter="url(#shadow)">
          <!-- Rubber Bulb Top -->
          <path d="M 385 160 Q 400 135 415 160 L 415 190 L 385 190 Z" fill="#171717" stroke="#000" stroke-width="1.5" />
          <!-- Gold Pipette Collar -->
          <rect x="365" y="190" width="70" height="35" rx="4" fill="url(#goldCap)" stroke="#b45309" stroke-width="1.5" />
          <rect x="375" y="225" width="50" height="20" fill="#2d170b" />
          <!-- Bottle Body -->
          <path d="M 340 270 Q 365 250 400 250 Q 435 250 460 270 L 465 620 Q 400 635 335 620 Z" fill="url(#amberGlass)" stroke="#1a0f05" stroke-width="2" />
          
          <path d="M 345 285 L 340 605" stroke="#ffffff" stroke-width="6" opacity="0.3" stroke-linecap="round" />

          <!-- Label -->
          <rect x="345" y="320" width="110" height="250" rx="10" fill="#1a1026" stroke="#c59b27" stroke-width="2" />
          <rect x="350" y="325" width="100" height="240" rx="8" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="4,2" />

          <!-- Emblem -->
          <circle cx="400" cy="365" r="20" fill="#c59b27" stroke="#fff" stroke-width="1" />
          <text x="400" y="363" font-family="Arial, sans-serif" font-size="8" font-weight="900" fill="#0f2b1d" text-anchor="middle">VEDAYU</text>
          <text x="400" y="373" font-family="Arial, sans-serif" font-size="6.5" font-weight="700" fill="#0f2b1d" text-anchor="middle">AMRIT</text>

          <text x="400" y="415" font-family="'Poppins', sans-serif" font-size="13.5" font-weight="800" fill="#fef08a" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="438" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="600" fill="#e9d5ff" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="458" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#86efac" text-anchor="middle">${safeForm}</text>

          <rect x="355" y="485" width="90" height="22" rx="11" fill="#c59b27" />
          <text x="400" y="500" font-family="'Poppins', sans-serif" font-size="8" font-weight="800" fill="#1a1026" text-anchor="middle">${safeBadge}</text>

          <text x="400" y="540" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#f3e8ff" text-anchor="middle">${safeVol} • DROPPER</text>
        </g>
      `;
      break;

    case 'tin':
      packagingMarkup = `
        <!-- Luxury Matte Tea Canister / Caddy Tin -->
        <g id="tea-caddy" filter="url(#shadow)">
          <!-- Gold Rimmed Lid -->
          <rect x="310" y="200" width="180" height="55" rx="10" fill="url(#goldCap)" stroke="#b45309" stroke-width="2" />
          <line x1="310" y1="235" x2="490" y2="235" stroke="#92400e" stroke-width="1.5" />
          <!-- Cylindrical Body -->
          <rect x="315" y="255" width="170" height="375" rx="12" fill="url(#tinBody)" stroke="#c59b27" stroke-width="2.5" />
          
          <!-- Subtle Metallic Sheen Stripe -->
          <rect x="330" y="260" width="20" height="365" fill="#ffffff" opacity="0.1" />

          <!-- Front Golden Label Shield -->
          <rect x="335" y="310" width="130" height="260" rx="12" fill="#0f2b1d" stroke="#c59b27" stroke-width="2" />
          <rect x="342" y="317" width="116" height="246" rx="8" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="4,2" />

          <!-- Emblem -->
          <circle cx="400" cy="355" r="22" fill="#c59b27" stroke="#ffffff" stroke-width="1.5" />
          <text x="400" y="352" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#0f2b1d" text-anchor="middle">VEDAYU</text>
          <text x="400" y="363" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#0f2b1d" text-anchor="middle">AMRIT</text>

          <text x="400" y="405" font-family="'Poppins', sans-serif" font-size="14" font-weight="800" fill="#fef08a" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="428" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="600" fill="#fef9c3" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="448" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#86efac" text-anchor="middle">${safeForm}</text>

          <rect x="350" y="475" width="100" height="24" rx="12" fill="#c59b27" />
          <text x="400" y="491" font-family="'Poppins', sans-serif" font-size="8.5" font-weight="800" fill="#0f2b1d" text-anchor="middle">${safeBadge}</text>

          <text x="400" y="535" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#ffffff" text-anchor="middle">${safeVol} • WHOLE LEAF</text>
        </g>
      `;
      break;

    case 'pump':
      packagingMarkup = `
        <!-- Modern Matte Dispenser Pump Bottle -->
        <g id="pump-bottle" filter="url(#shadow)">
          <!-- Dispenser Pump Head -->
          <path d="M 400 160 L 440 160 L 440 175 L 415 175 L 415 200 L 385 200 L 385 175 L 360 175 L 360 160 Z" fill="#1c1917" stroke="#444" stroke-width="1.5" />
          <rect x="380" y="200" width="40" height="30" fill="url(#goldCap)" stroke="#b45309" stroke-width="1.5" />
          <!-- Bottle Body -->
          <rect x="330" y="230" width="140" height="400" rx="20" fill="url(#dispenserBody)" stroke="#c59b27" stroke-width="2.5" />
          
          <!-- Highlight Curve -->
          <path d="M 345 250 L 340 610" stroke="#ffffff" stroke-width="6" opacity="0.2" stroke-linecap="round" />

          <!-- Center Label -->
          <rect x="345" y="310" width="110" height="260" rx="12" fill="#fdfbf7" stroke="#c59b27" stroke-width="1.5" />

          <!-- Emblem -->
          <circle cx="400" cy="350" r="20" fill="#0f2b1d" stroke="#c59b27" stroke-width="1.5" />
          <text x="400" y="347" font-family="Arial, sans-serif" font-size="8" font-weight="900" fill="#fef08a" text-anchor="middle">VEDAYU</text>
          <text x="400" y="358" font-family="Arial, sans-serif" font-size="6.5" font-weight="700" fill="#ffffff" text-anchor="middle">AMRIT</text>

          <text x="400" y="398" font-family="'Poppins', sans-serif" font-size="13" font-weight="800" fill="#143927" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="420" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#15803d" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="440" font-family="'Poppins', sans-serif" font-size="8.5" font-weight="700" fill="#854d0e" text-anchor="middle">${safeForm}</text>

          <rect x="355" y="465" width="90" height="22" rx="11" fill="#143927" />
          <text x="400" y="480" font-family="'Poppins', sans-serif" font-size="8" font-weight="800" fill="#fef08a" text-anchor="middle">${safeBadge}</text>

          <text x="400" y="525" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#0f2b1d" text-anchor="middle">${safeVol} • AYUSH</text>
        </g>
      `;
      break;

    case 'spray':
      packagingMarkup = `
        <!-- Luxury Mist Spray Bottle (Rose Water) -->
        <g id="spray-bottle" filter="url(#shadow)">
          <!-- Mist Nozzle Atomizer -->
          <rect x="390" y="165" width="20" height="30" fill="#fff" stroke="#999" stroke-width="1" />
          <rect x="375" y="195" width="50" height="35" rx="3" fill="url(#goldCap)" stroke="#b45309" stroke-width="1.5" />
          <!-- Clear Amber Glass Bottle Body -->
          <rect x="340" y="230" width="120" height="400" rx="16" fill="url(#amberGlass)" stroke="#221207" stroke-width="2" />
          
          <path d="M 350 250 L 345 615" stroke="#ffffff" stroke-width="6" opacity="0.3" stroke-linecap="round" />

          <!-- Delicate Botanical Rose Label -->
          <rect x="350" y="310" width="100" height="260" rx="12" fill="#fff1f2" stroke="#e11d48" stroke-width="1.5" />
          <rect x="355" y="315" width="90" height="250" rx="8" fill="none" stroke="#fda4af" stroke-width="1" stroke-dasharray="4,2" />

          <!-- Emblem -->
          <circle cx="400" cy="355" r="18" fill="#e11d48" stroke="#ffffff" stroke-width="1.5" />
          <text x="400" y="353" font-family="Arial, sans-serif" font-size="7" font-weight="900" fill="#ffffff" text-anchor="middle">VEDAYU</text>
          <text x="400" y="362" font-family="Arial, sans-serif" font-size="6" font-weight="700" fill="#ffe4e6" text-anchor="middle">AMRIT</text>

          <text x="400" y="400" font-family="'Poppins', sans-serif" font-size="13" font-weight="800" fill="#881337" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="422" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#be123c" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="440" font-family="'Poppins', sans-serif" font-size="8.5" font-weight="700" fill="#9f1239" text-anchor="middle">${safeForm}</text>

          <rect x="360" y="470" width="80" height="20" rx="10" fill="#be123c" />
          <text x="400" y="484" font-family="'Poppins', sans-serif" font-size="7.5" font-weight="800" fill="#ffffff" text-anchor="middle">STEAM DISTILLED</text>

          <text x="400" y="530" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#881337" text-anchor="middle">${safeVol} • 100% PURE</text>
        </g>
      `;
      break;

    case 'soap':
      packagingMarkup = `
        <!-- Artisan Cold-Pressed Soap Bar -->
        <g id="soap-bar" filter="url(#shadow)">
          <!-- Soap Block -->
          <rect x="270" y="310" width="260" height="240" rx="24" fill="url(#soapGradient)" stroke="#c59b27" stroke-width="2.5" />
          
          <!-- Textured Handcrafted Edge -->
          <line x1="285" y1="315" x2="515" y2="315" stroke="#ffffff" opacity="0.3" stroke-width="3" />

          <!-- Paper Belly Band Wrap -->
          <rect x="320" y="300" width="160" height="260" rx="4" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
          <line x1="320" y1="305" x2="320" y2="555" stroke="#92400e" stroke-width="1.5" stroke-dasharray="3,2" />
          <line x1="480" y1="305" x2="480" y2="555" stroke="#92400e" stroke-width="1.5" stroke-dasharray="3,2" />

          <!-- Emblem on Band -->
          <circle cx="400" cy="355" r="22" fill="#0f2b1d" stroke="#c59b27" stroke-width="1.5" />
          <text x="400" y="352" font-family="Arial, sans-serif" font-size="8.5" font-weight="900" fill="#fef08a" text-anchor="middle">VEDAYU</text>
          <text x="400" y="363" font-family="Arial, sans-serif" font-size="7" font-weight="700" fill="#ffffff" text-anchor="middle">AMRIT</text>

          <text x="400" y="410" font-family="'Poppins', sans-serif" font-size="14.5" font-weight="800" fill="#143927" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="432" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="600" fill="#854d0e" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="452" font-family="'Poppins', sans-serif" font-size="9" font-weight="700" fill="#15803d" text-anchor="middle">${safeForm}</text>

          <rect x="345" y="475" width="110" height="22" rx="11" fill="#143927" />
          <text x="400" y="490" font-family="'Poppins', sans-serif" font-size="8" font-weight="800" fill="#fef08a" text-anchor="middle">${safeBadge}</text>

          <text x="400" y="530" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#78350f" text-anchor="middle">NET WT. ${safeVol} • HANDCRAFTED</text>
        </g>
      `;
      break;

    case 'lip-tin':
      packagingMarkup = `
        <!-- Compact Golden Pocket Lip Tin -->
        <g id="lip-tin" filter="url(#shadow)">
          <!-- Tin Rim Base -->
          <ellipse cx="400" cy="460" rx="140" ry="80" fill="#92400e" stroke="#78350f" stroke-width="2" />
          <ellipse cx="400" cy="445" rx="140" ry="75" fill="url(#goldCap)" stroke="#b45309" stroke-width="2.5" />
          
          <!-- Inner Mirror Rim -->
          <ellipse cx="400" cy="440" rx="120" ry="60" fill="#1c1917" stroke="#d4af37" stroke-width="1.5" />

          <!-- Emblem on Tin Lid -->
          <circle cx="400" cy="425" r="22" fill="#c59b27" stroke="#ffffff" stroke-width="1.5" />
          <text x="400" y="422" font-family="Arial, sans-serif" font-size="8.5" font-weight="900" fill="#0f2b1d" text-anchor="middle">VEDAYU</text>
          <text x="400" y="433" font-family="Arial, sans-serif" font-size="7" font-weight="700" fill="#0f2b1d" text-anchor="middle">AMRIT</text>

          <text x="400" y="465" font-family="'Poppins', sans-serif" font-size="14" font-weight="800" fill="#fef08a" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="482" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="600" fill="#ffffff" text-anchor="middle">${safeHerb} • ${safeVol}</text>
        </g>
      `;
      break;

    case 'brass-jar':
    case 'jar':
    default:
      packagingMarkup = `
        <!-- Wide-Mouth Apothecary / Cosmetic Jar with Gold Lid -->
        <g id="cosmetic-jar" filter="url(#shadow)">
          <!-- Polished Gold Screw Lid -->
          <rect x="300" y="270" width="200" height="60" rx="12" fill="url(#goldCap)" stroke="#b45309" stroke-width="2" />
          <line x1="300" y1="310" x2="500" y2="310" stroke="#78350f" stroke-width="1.5" />
          <line x1="320" y1="275" x2="320" y2="325" stroke="#fff" opacity="0.4" stroke-width="2" />
          
          <!-- Jar Body -->
          <rect x="290" y="330" width="220" height="280" rx="20" fill="url(#jarBody)" stroke="#c59b27" stroke-width="2.5" />
          
          <!-- Specular Highlight Curve -->
          <path d="M 310 345 L 305 595" stroke="#ffffff" stroke-width="7" opacity="0.25" stroke-linecap="round" />

          <!-- Center Label -->
          <rect x="310" y="360" width="180" height="210" rx="14" fill="#0f2b1d" stroke="#c59b27" stroke-width="2" />
          <rect x="318" y="368" width="164" height="194" rx="10" fill="none" stroke="#d4af37" stroke-width="1.2" stroke-dasharray="4,2" />

          <!-- Emblem -->
          <circle cx="400" cy="405" r="22" fill="#c59b27" stroke="#ffffff" stroke-width="1.5" />
          <text x="400" y="402" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#0f2b1d" text-anchor="middle">VEDAYU</text>
          <text x="400" y="413" font-family="Arial, sans-serif" font-size="7.5" font-weight="700" fill="#0f2b1d" text-anchor="middle">AMRIT</text>

          <text x="400" y="450" font-family="'Poppins', sans-serif" font-size="14.5" font-weight="800" fill="#fef08a" text-anchor="middle">${safeTitle}</text>
          <text x="400" y="472" font-family="'Poppins', sans-serif" font-size="10" font-weight="600" fill="#ffffff" text-anchor="middle">${safeHerb}</text>
          <text x="400" y="492" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#86efac" text-anchor="middle">${safeForm}</text>

          <rect x="340" y="515" width="120" height="24" rx="12" fill="#c59b27" />
          <text x="400" y="531" font-family="'Poppins', sans-serif" font-size="9" font-weight="800" fill="#0f2b1d" text-anchor="middle">${safeBadge}</text>

          <text x="400" y="555" font-family="'Poppins', sans-serif" font-size="9.5" font-weight="700" fill="#e2e8f0" text-anchor="middle">${safeVol} • AYUSH CERTIFIED</text>
        </g>
      `;
      break;
  }

  return `
    <svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Radial Studio Lighting Background -->
        <radialGradient id="studioBg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="${bgMid}" />
          <stop offset="60%" stop-color="${bgDark}" />
          <stop offset="100%" stop-color="#0a0705" />
        </radialGradient>

        <!-- Polished Pedestal Linear Gradient -->
        <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3d2716" />
          <stop offset="25%" stop-color="#281a0e" />
          <stop offset="100%" stop-color="#120c06" />
        </linearGradient>

        <!-- Gold Metal Foil Cap Gradient -->
        <linearGradient id="goldCap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309" />
          <stop offset="25%" stop-color="#fef08a" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="75%" stop-color="#fef9c3" />
          <stop offset="100%" stop-color="#92400e" />
        </linearGradient>

        <!-- Amber Pharmaceutical Glass Gradient -->
        <linearGradient id="amberGlass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2c1409" />
          <stop offset="30%" stop-color="#582a12" />
          <stop offset="60%" stop-color="#7c3a1d" />
          <stop offset="100%" stop-color="#231006" />
        </linearGradient>

        <!-- Amber Herbal Oil Gradient -->
        <linearGradient id="oilAmber" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#291807" />
          <stop offset="35%" stop-color="#603710" />
          <stop offset="70%" stop-color="#8a4f17" />
          <stop offset="100%" stop-color="#1e1104" />
        </linearGradient>

        <!-- Juice Glass Gradient -->
        <linearGradient id="juiceGlass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0f2b1d" />
          <stop offset="40%" stop-color="#1e5439" />
          <stop offset="100%" stop-color="#07170f" />
        </linearGradient>

        <!-- Stand-up Pouch Texture Gradient -->
        <linearGradient id="pouchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#18120b" />
          <stop offset="25%" stop-color="#342517" />
          <stop offset="55%" stop-color="#4a3521" />
          <stop offset="85%" stop-color="#281c11" />
          <stop offset="100%" stop-color="#120c07" />
        </linearGradient>

        <!-- Jar Body Gradient -->
        <linearGradient id="jarBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#14100b" />
          <stop offset="30%" stop-color="#2c1d12" />
          <stop offset="70%" stop-color="#3f2b1c" />
          <stop offset="100%" stop-color="#120d08" />
        </linearGradient>

        <!-- Dispenser Body Gradient -->
        <linearGradient id="dispenserBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0c2317" />
          <stop offset="30%" stop-color="#18422d" />
          <stop offset="70%" stop-color="#225e40" />
          <stop offset="100%" stop-color="#081810" />
        </linearGradient>

        <!-- Soap Gradient -->
        <linearGradient id="soapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3b25" />
          <stop offset="50%" stop-color="#2b5234" />
          <stop offset="100%" stop-color="#122517" />
        </linearGradient>

        <!-- Heavy Drop Shadow Filter -->
        <filter id="shadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000000" flood-opacity="0.8" />
        </filter>

        <!-- Golden Glow Filter -->
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- 1. Background -->
      <rect width="800" height="800" fill="url(#studioBg)" />

      <!-- Subtle Botanical Ambient Background Particles -->
      <circle cx="150" cy="180" r="140" fill="${accentColor}" opacity="0.08" filter="url(#goldGlow)" />
      <circle cx="650" cy="220" r="160" fill="#facc15" opacity="0.06" filter="url(#goldGlow)" />
      
      <!-- Top Brand Ribbon -->
      <g transform="translate(40, 36)">
        <rect x="0" y="0" width="160" height="28" rx="14" fill="#0f2b1d" stroke="#c59b27" stroke-width="1.5" />
        <text x="80" y="18" font-family="'Poppins', sans-serif" font-size="11" font-weight="800" fill="#fef08a" text-anchor="middle">VEDAYU AMRIT</text>
      </g>
      
      <!-- AYUSH Certified Pill Top Right -->
      <g transform="translate(590, 36)">
        <rect x="0" y="0" width="170" height="28" rx="14" fill="#14532d" stroke="#4ade80" stroke-width="1.2" />
        <text x="85" y="18" font-family="'Poppins', sans-serif" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">★ AYUSH CERTIFIED</text>
      </g>

      <!-- 2. Polished Showcase Pedestal on Bottom -->
      <g id="pedestal">
        <!-- Oval Top Surface of Pedestal -->
        <ellipse cx="400" cy="650" rx="310" ry="60" fill="url(#pedestalGrad)" stroke="#c59b27" stroke-width="2" />
        <!-- Pedestal Rim Highlight -->
        <ellipse cx="400" cy="648" rx="290" ry="50" fill="none" stroke="#d4af37" stroke-width="1.5" opacity="0.4" />
        <!-- Drop Shadow underneath single product -->
        <ellipse cx="400" cy="635" rx="160" ry="32" fill="#000000" opacity="0.75" />
      </g>

      <!-- 3. The Single Product Unit (Only ONE package standing in center) -->
      ${packagingMarkup}

      <!-- 4. Fresh Raw Botanical Leaves & Fruit at Pedestal Foot -->
      <g id="botanical-accents" transform="translate(180, 620)">
        <!-- Left Herbal Leaf -->
        <path d="M 0 0 C -40 -30 -50 20 0 25 C 20 20 30 -10 0 0 Z" fill="#15803d" stroke="#86efac" stroke-width="1.5" opacity="0.85" />
        <path d="M 0 0 C -20 -15 -25 10 0 25" stroke="#4ade80" stroke-width="1" fill="none" opacity="0.7" />
      </g>
      <g id="botanical-accents-right" transform="translate(620, 620)">
        <!-- Right Herbal Leaf -->
        <path d="M 0 0 C 40 -30 50 20 0 25 C -20 20 -30 -10 0 0 Z" fill="#166534" stroke="#86efac" stroke-width="1.5" opacity="0.85" />
        <path d="M 0 0 C 20 -15 25 10 0 25" stroke="#4ade80" stroke-width="1" fill="none" opacity="0.7" />
      </g>

      <!-- 5. Bottom Gold Identity Bar -->
      <g transform="translate(50, 720)">
        <rect x="0" y="0" width="700" height="52" rx="16" fill="#0b1e14" stroke="#c59b27" stroke-width="2" />
        <text x="24" y="32" font-family="'Poppins', sans-serif" font-size="16" font-weight="800" fill="#ffffff">${safeTitle}</text>
        <text x="24" y="44" font-family="'Poppins', sans-serif" font-size="10.5" font-weight="600" fill="#c59b27">${safeHerb} • ${safeForm}</text>
        <text x="676" y="33" font-family="'Poppins', sans-serif" font-size="13" font-weight="800" fill="#fef08a" text-anchor="end">100% PURE &amp; NATURAL</text>
      </g>
    </svg>
  `;
}

async function generateAll() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'products');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const slugs = Object.keys(PRODUCT_CONFIGS);
  console.log(`Generating ${slugs.length} distinct single-product images...`);

  for (const slug of slugs) {
    const cfg = PRODUCT_CONFIGS[slug];
    // Formulate a nice clean product name
    const title = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const svg = generatePackagingSvg(title, cfg);
    const destPath = path.join(outputDir, `${slug}.jpg`);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(destPath);

    console.log(`✓ Generated: ${slug}.jpg (${cfg.type}, single product)`);
  }

  // Also generate the Single Flagship Hero Product image!
  console.log('Generating Single Flagship Hero showcase image (vedayu-single-hero.jpg)...');
  const heroSvg = generatePackagingSvg('Ashwagandha Gold Rasayana', {
    type: 'brass-jar',
    bg: ['#0d2317', '#1a4a32', '#c59b27'],
    herb: 'Classical Withania Somnifera',
    form: 'Single Flagship Formulation',
    vol: '500g',
    badge: '100% Ayurvedic'
  });

  await sharp(Buffer.from(heroSvg))
    .jpeg({ quality: 96 })
    .toFile(path.join(__dirname, '..', 'public', 'images', 'vedayu-single-hero.jpg'));

  console.log('✓ Successfully created vedayu-single-hero.jpg!');
}

generateAll().catch(console.error);


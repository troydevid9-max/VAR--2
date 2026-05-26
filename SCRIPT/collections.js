/* ========================
   COLLECTIONS.JS — Firebase Edition
   VAR Accessories
======================== */

import { db, ref, set, get, child } from '/SCRIPT/firebase.js';

const WA_NUMBER = '+2348066477021';
const DB_PATH   = 'products';

// ─── DEFAULT PRODUCTS (used only if Firebase is empty) ───────────────────────
const DEFAULT_PRODUCTS = [
  // ORIGINALS
  { id:1,  category:'perfume',    name:'Gold Perfume',              price:8000,  rating:5, reviews:42, image:'/IMAGES/black perfume.jpg',   description:'A bold, luxurious fragrance with warm gold undertones. Long-lasting and unforgettable.',                          popular:true,  views:0 },
  { id:2,  category:'bags',       name:'Ladies Bags',               price:9800,  rating:4, reviews:28, image:'/IMAGES/expensive bag.jpg',   description:'Elegant and spacious ladies bag. Perfect for work, school, or outings.',                                          popular:true,  views:0 },
  { id:3,  category:'bags',       name:'Classic Tote Bag',          price:7500,  rating:4, reviews:15, image:'/IMAGES/color bags.jpg',      description:'A versatile, classic tote bag that works with every outfit.',                                                      popular:false, views:0 },
  { id:4,  category:'watches',    name:'Premium Watch',             price:15000, rating:5, reviews:56, image:'/IMAGES/img1.jpeg',           description:'A sleek, premium timepiece. Modern design meets reliable quality.',                                                 popular:true,  views:0 },
  { id:5,  category:'jewellery',  name:'Fancy Cups',                price:3500,  rating:5, reviews:33, image:'/IMAGES/cups.jpg',            description:'Delicate gold-tone piece. Light, elegant, and stunning on any neckline.',                                           popular:true,  views:0 },
  { id:6,  category:'jewellery',  name:'Pearl Earrings',            price:4200,  rating:4, reviews:18, image:'/IMAGES/img3.jpeg',           description:'Classic pearl earrings that elevate any look — casual or formal.',                                                  popular:false, views:0 },
  { id:7,  category:'perfume',    name:'Rose Mist Perfume',         price:6500,  rating:4, reviews:22, image:'/IMAGES/black perfume.jpg',   description:'A fresh, floral rose mist with light citrus notes. Perfect for everyday wear.',                                     popular:false, views:0 },
  { id:8,  category:'cosmetics',  name:'Lip Gloss Set',             price:3500,  rating:5, reviews:47, image:'/IMAGES/img2.jpeg',           description:'A set of 4 gorgeous lip glosses in trending shades. Hydrating and long-lasting.',                                   popular:true,  views:0 },
  { id:9,  category:'dress',      name:'Summer Dress',              price:12000, rating:4, reviews:19, image:'/IMAGES/Sunray gown.jpeg',    description:'Light, breezy summer dress in a flattering silhouette. Sizes S–XL.',                                               popular:false, views:0 },
  { id:10, category:'watches',    name:'Minimalist Watch',          price:11500, rating:5, reviews:61, image:'/IMAGES/img3.jpeg',           description:'Clean, minimalist design. The perfect everyday wrist companion.',                                                   popular:true,  views:0 },
  // PENS (11)
  { id:11, category:'stationery', name:'Classic Ballpoint Pen',     price:1000,  rating:4, reviews:12, image:'/IMAGES/img1.jpeg',           description:'Smooth-writing ballpoint pen. Perfect for students and everyday note-taking. Available in blue, black and red.',   popular:false, views:0 },
  { id:12, category:'stationery', name:'Elegant Ink Pen',           price:1200,  rating:5, reviews:8,  image:'/IMAGES/img1.jpeg',           description:'A beautiful ink pen with a comfortable grip. Ideal for journals, assignments and everyday use.',                   popular:false, views:0 },
  { id:13, category:'stationery', name:'Glitter Gel Pen Set',       price:1500,  rating:5, reviews:21, image:'/IMAGES/img2.jpeg',           description:'Set of 5 vibrant glitter gel pens. Great for creative writing, highlighting and decorating notes.',                popular:true,  views:0 },
  { id:14, category:'stationery', name:'Slim Rollerball Pen',       price:1100,  rating:4, reviews:6,  image:'/IMAGES/img1.jpeg',           description:'Slim, lightweight rollerball pen. Writes smoothly and comfortably for long study sessions.',                      popular:false, views:0 },
  { id:15, category:'stationery', name:'Pastel Colour Pen Set',     price:1400,  rating:5, reviews:17, image:'/IMAGES/img2.jpeg',           description:'Set of 6 pastel-coloured pens. Beautiful for bullet journaling, note decoration and study planning.',             popular:true,  views:0 },
  { id:16, category:'stationery', name:'Fine-Tip Writing Pen',      price:1000,  rating:4, reviews:9,  image:'/IMAGES/img1.jpeg',           description:'Precision fine-tip pen. Great for neat handwriting and detailed note-taking.',                                      popular:false, views:0 },
  { id:17, category:'stationery', name:'Retractable Click Pen',     price:1050,  rating:4, reviews:14, image:'/IMAGES/img1.jpeg',           description:'Reliable retractable click pen. No cap to lose — just click and write. Student favourite.',                         popular:false, views:0 },
  { id:18, category:'stationery', name:'Dual-Tip Marker Pen',       price:1700,  rating:5, reviews:30, image:'/IMAGES/img2.jpeg',           description:'Dual-tip marker pen with fine and broad ends. Perfect for headers, diagrams and creative projects.',               popular:true,  views:0 },
  { id:19, category:'stationery', name:'Metallic Shine Pen',        price:1300,  rating:4, reviews:11, image:'/IMAGES/img2.jpeg',           description:'Metallic-ink pen that writes on dark paper. Stunning for cards, art and creative schoolwork.',                    popular:false, views:0 },
  { id:20, category:'stationery', name:'Luxury Gold-Trim Pen',      price:1600,  rating:5, reviews:25, image:'/IMAGES/img1.jpeg',           description:'A premium-looking pen with elegant gold trim. A great gift for students who love beautiful stationery.',           popular:true,  views:0 },
  { id:21, category:'stationery', name:'Mini Pocket Pen',           price:1000,  rating:3, reviews:5,  image:'/IMAGES/img1.jpeg',           description:'Compact mini pen that fits in any pocket or pencil case. Handy for quick notes on the go.',                       popular:false, views:0 },
  // NOTEBOOKS (6)
  { id:22, category:'stationery', name:'Hardcover Journal',         price:4500,  rating:5, reviews:38, image:'/IMAGES/student Book.jpg',   description:'Beautiful A5 hardcover journal with 200 lined pages. Perfect for diaries, study notes and personal writing.',    popular:true,  views:0 },
  { id:23, category:'stationery', name:'Spiral Student Notebook',   price:3000,  rating:4, reviews:22, image:'/IMAGES/student Book.jpg',   description:'Durable spiral notebook with 100 pages. Easy to lay flat while writing — great for lectures and classes.',        popular:false, views:0 },
  { id:24, category:'stationery', name:'Floral Print Diary',        price:5500,  rating:5, reviews:44, image:'/IMAGES/student Book.jpg',   description:'Lovely floral-print diary with a ribbon bookmark and elastic closure. A must-have for style-forward students.',   popular:true,  views:0 },
  { id:25, category:'stationery', name:'Grid Paper Notebook',       price:3500,  rating:4, reviews:16, image:'/IMAGES/student Book.jpg',   description:'Graph-grid notebook ideal for science, maths and technical drawings. 160 pages of quality grid paper.',           popular:false, views:0 },
  { id:26, category:'stationery', name:'Pastel Softcover Notepad',  price:3200,  rating:4, reviews:19, image:'/IMAGES/student Book.jpg',   description:'Soft pastel-cover notepad in assorted colours. Light, portable and great for everyday class use.',                popular:false, views:0 },
  { id:27, category:'stationery', name:'Premium Leather Notebook',  price:6000,  rating:5, reviews:51, image:'/IMAGES/student Book.jpg',   description:'Elegant faux-leather notebook with 250 pages. A luxurious writing experience for serious students.',               popular:true,  views:0 },
  // MINI FANS (7)
  { id:28, category:'gadgets',    name:'USB Mini Desk Fan',         price:5000,  rating:4, reviews:33, image:'/IMAGES/phone holder.jpg',   description:'Compact USB-powered desk fan. Quiet, energy-saving and perfect for your study desk or dorm room.',               popular:false, views:0 },
  { id:29, category:'gadgets',    name:'Handheld Rechargeable Fan', price:7500,  rating:5, reviews:48, image:'/IMAGES/phone holder.jpg',   description:'Portable rechargeable fan you can carry anywhere. 3 speed settings and a long-lasting battery.',                 popular:true,  views:0 },
  { id:30, category:'gadgets',    name:'Clip-On Bed Fan',           price:6000,  rating:4, reviews:27, image:'/IMAGES/phone holder.jpg',   description:'Flexible clip-on fan — attach it to your bed frame, desk shelf or wardrobe rail. 360° rotation.',               popular:false, views:0 },
  { id:31, category:'gadgets',    name:'Foldable Pocket Fan',       price:5500,  rating:4, reviews:20, image:'/IMAGES/phone holder.jpg',   description:'Ultra-slim foldable fan that fits into your bag or pocket. Perfect for hot days on campus.',                     popular:false, views:0 },
  { id:32, category:'gadgets',    name:'Tower Mini Fan',            price:12000, rating:5, reviews:55, image:'/IMAGES/phone holder.jpg',   description:'Elegant mini tower fan with oscillation and 3 speeds. Ideal for dorm rooms and small spaces.',                  popular:true,  views:0 },
  { id:33, category:'gadgets',    name:'Neck Fan (Wearable)',       price:18000, rating:5, reviews:62, image:'/IMAGES/phone holder.jpg',   description:'Hands-free wearable neck fan with bladeless design. Lightweight, rechargeable and super trendy for students.',  popular:true,  views:0 },
  { id:34, category:'gadgets',    name:'Solar Mini Fan',            price:20000, rating:4, reviews:14, image:'/IMAGES/phone holder.jpg',   description:'Eco-friendly solar-powered mini fan. No electricity needed — great for outdoor use and Nigerian heat!',          popular:false, views:0 },
  // BANGLES (5)
  { id:35, category:'jewellery',  name:'Gold-Tone Stackable Bangle',price:1500,  rating:5, reviews:29, image:'/IMAGES/img2.jpeg',          description:'Beautiful gold-tone stackable bangle. Lightweight and stylish — wear one or stack several for a bold look.',     popular:true,  views:0 },
  { id:36, category:'jewellery',  name:'Beaded Charm Bangle',       price:2000,  rating:4, reviews:18, image:'/IMAGES/img3.jpeg',          description:'Colourful beaded bangle with cute charm detail. A fun, affordable accessory for any outfit.',                   popular:false, views:0 },
  { id:37, category:'jewellery',  name:'Silver Cuff Bangle',        price:2500,  rating:4, reviews:22, image:'/IMAGES/img3.jpeg',          description:'Classic open-cuff bangle in silver tone. Adjustable fit. Elegant enough for formal events.',                    popular:false, views:0 },
  { id:38, category:'jewellery',  name:'Crystal Studded Bangle',    price:3000,  rating:5, reviews:35, image:'/IMAGES/img2.jpeg',          description:'Gorgeous bangle with crystal-stud detailing. Catches light beautifully — perfect for occasions.',               popular:true,  views:0 },
  { id:39, category:'jewellery',  name:'Twisted Wire Bangle Set',   price:1800,  rating:4, reviews:12, image:'/IMAGES/img3.jpeg',          description:'Set of 3 twisted-wire bangles in gold, silver and rose gold tones. Mix and match for any look.',                popular:false, views:0 },
  // NAILS (8)
  { id:40, category:'cosmetics',  name:'Nude Press-On Nails',       price:1500,  rating:5, reviews:41, image:'/IMAGES/img2.jpeg',          description:'Set of 24 nude press-on nails in assorted sizes. Easy to apply, long-lasting and salon-quality finish.',        popular:true,  views:0 },
  { id:41, category:'cosmetics',  name:'French Tip Nails',          price:1800,  rating:5, reviews:36, image:'/IMAGES/img2.jpeg',          description:'Classic French tip press-on nails. Elegant, timeless and perfect for any occasion.',                            popular:true,  views:0 },
  { id:42, category:'cosmetics',  name:'Glitter Acrylic Nails',     price:2200,  rating:4, reviews:28, image:'/IMAGES/img2.jpeg',          description:'Sparkly glitter acrylic nails in bold designs. Makes a statement without the salon price tag.',                popular:false, views:0 },
  { id:43, category:'cosmetics',  name:'Ombre Gradient Nails',      price:2000,  rating:4, reviews:19, image:'/IMAGES/img2.jpeg',          description:'Beautiful ombre gradient press-on nails. Trendy, affordable and perfect for special events.',                   popular:false, views:0 },
  { id:44, category:'cosmetics',  name:'Floral Design Nails',       price:2500,  rating:5, reviews:47, image:'/IMAGES/img2.jpeg',          description:'Cute floral-print press-on nails. Feminine and stylish — great for photoshoots and occasions.',                popular:true,  views:0 },
  { id:45, category:'cosmetics',  name:'Coffin Shape Long Nails',   price:2800,  rating:4, reviews:23, image:'/IMAGES/img2.jpeg',          description:'Trendy long coffin-shaped press-on nails. Bold, dramatic and ready to wear in minutes.',                        popular:false, views:0 },
  { id:46, category:'cosmetics',  name:'Matte Black Nails',         price:1700,  rating:5, reviews:31, image:'/IMAGES/img2.jpeg',          description:'Edgy matte-black press-on nails. A fierce, chic look at a very affordable price.',                             popular:true,  views:0 },
  { id:47, category:'cosmetics',  name:'Rainbow Holographic Nails', price:2300,  rating:5, reviews:52, image:'/IMAGES/img2.jpeg',          description:'Holographic rainbow press-on nails that shimmer with every angle. A must-have for the bold and beautiful.',     popular:true,  views:0 },
  // LIP GLOVES (3)
  { id:48, category:'cosmetics',  name:'Plumping Lip Glove',        price:2500,  rating:5, reviews:38, image:'/IMAGES/img2.jpeg',          description:'Nourishing lip glove with a plumping formula. Gives lips a fuller, glossy look. Available in 3 shades.',        popular:true,  views:0 },
  { id:49, category:'cosmetics',  name:'Tinted Lip Glove',          price:2200,  rating:4, reviews:24, image:'/IMAGES/img2.jpeg',          description:'Sheer tinted lip glove that adds a hint of colour and shine. Moisturising and lightweight.',                    popular:false, views:0 },
  { id:50, category:'cosmetics',  name:'Glitter Lip Glove',         price:2800,  rating:5, reviews:44, image:'/IMAGES/img2.jpeg',          description:'Glamorous glitter lip glove for a sparkly pout. Long-lasting and non-sticky formula.',                          popular:true,  views:0 },
  // LIP BALMS (4)
  { id:51, category:'cosmetics',  name:'Honey & Shea Lip Balm',     price:1000,  rating:5, reviews:67, image:'/IMAGES/img2.jpeg',          description:'Rich honey and shea butter lip balm. Deeply moisturising and gentle on sensitive lips.',                        popular:true,  views:0 },
  { id:52, category:'cosmetics',  name:'Strawberry Lip Balm',       price:800,   rating:4, reviews:43, image:'/IMAGES/img2.jpeg',          description:'Sweet strawberry-scented lip balm. Soft, hydrating and deliciously fragrant.',                                  popular:false, views:0 },
  { id:53, category:'cosmetics',  name:'Vanilla Mint Lip Balm',     price:900,   rating:5, reviews:55, image:'/IMAGES/img2.jpeg',          description:'Cooling vanilla mint lip balm. Freshens breath and keeps lips soft all day.',                                   popular:true,  views:0 },
  { id:54, category:'cosmetics',  name:'Rose Petal Lip Balm',       price:1100,  rating:4, reviews:29, image:'/IMAGES/img2.jpeg',          description:'Gentle rose petal lip balm with a light tint. Nourishes, protects and adds a soft rosy glow.',                 popular:false, views:0 },
  // EYELASHES (11)
  { id:55, category:'cosmetics',  name:'Natural Wispy Lashes',      price:1500,  rating:5, reviews:72, image:'/IMAGES/img2.jpeg',          description:'Natural-looking wispy false lashes. Lightweight and comfortable — great for everyday glam.',                    popular:true,  views:0 },
  { id:56, category:'cosmetics',  name:'Dramatic Volume Lashes',    price:2000,  rating:5, reviews:58, image:'/IMAGES/img2.jpeg',          description:'Full, dramatic volume lashes for a bold look. Perfect for events, parties and photo shoots.',                  popular:true,  views:0 },
  { id:57, category:'cosmetics',  name:'Fluffy Cat-Eye Lashes',     price:1800,  rating:4, reviews:45, image:'/IMAGES/img2.jpeg',          description:'Fluffy cat-eye false lashes that elongate and lift the outer corners. Sultry and elegant.',                    popular:false, views:0 },
  { id:58, category:'cosmetics',  name:'Magnetic Eyelashes',        price:3500,  rating:5, reviews:81, image:'/IMAGES/img2.jpeg',          description:'Reusable magnetic false lashes — no glue needed! Easy to apply and remove in seconds.',                         popular:true,  views:0 },
  { id:59, category:'cosmetics',  name:'Mega Glam Lashes',          price:2200,  rating:5, reviews:63, image:'/IMAGES/img2.jpeg',          description:'Extra long and full mega-glam lashes. For when you want all eyes on you.',                                      popular:true,  views:0 },
  { id:60, category:'cosmetics',  name:'Baby Doll Lashes',          price:1500,  rating:4, reviews:37, image:'/IMAGES/img2.jpeg',          description:'Cute baby doll false lashes for a wide-eyed, innocent look. Super lightweight and comfortable.',                popular:false, views:0 },
  { id:61, category:'cosmetics',  name:'Mink-Style Lashes',         price:2500,  rating:5, reviews:94, image:'/IMAGES/img2.jpeg',          description:'Luxurious mink-style false lashes. Soft, feathery and incredibly natural-looking. Reusable up to 20 times.',    popular:true,  views:0 },
  { id:62, category:'cosmetics',  name:'Coloured Fantasy Lashes',   price:1700,  rating:4, reviews:28, image:'/IMAGES/img2.jpeg',          description:'Fun coloured fantasy lashes in assorted shades. Great for themed events, parties and cosplay.',                 popular:false, views:0 },
  { id:63, category:'cosmetics',  name:'Half-Lash Strip Set',       price:1200,  rating:4, reviews:33, image:'/IMAGES/img2.jpeg',          description:'Half-lash strips for subtle, targeted enhancement. Ideal for beginners and minimalist looks.',                  popular:false, views:0 },
  { id:64, category:'cosmetics',  name:'Cluster Lash Pack',         price:2800,  rating:5, reviews:49, image:'/IMAGES/img2.jpeg',          description:'Cluster lash pack with 40 individual lash clusters. Build your own customised lash look.',                     popular:true,  views:0 },
  { id:65, category:'cosmetics',  name:'Classic Full-Strip Lashes', price:1600,  rating:4, reviews:41, image:'/IMAGES/img2.jpeg',          description:'Classic full-strip false lashes. A staple for every makeup kit — adds instant definition and length.',           popular:false, views:0 },
];

// ─── STATE ───────────────────────────────────────────────────────────────────
let liveProducts      = [];
let currentCategory   = 'all';
let currentSort       = 'default';
let currentSearch     = '';
let currentPriceRange = 'all';

// ─── FIREBASE LOAD ────────────────────────────────────────────────────────────
async function loadProducts() {
  try {
    const snapshot = await get(ref(db, DB_PATH));
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Firebase stores arrays as objects; convert back
      liveProducts = Array.isArray(data) ? data : Object.values(data);
    } else {
      // First run: seed the database with all default products
      await set(ref(db, DB_PATH), DEFAULT_PRODUCTS);
      liveProducts = DEFAULT_PRODUCTS;
    }
  } catch (e) {
    console.warn('Firebase load failed, using defaults:', e);
    liveProducts = DEFAULT_PRODUCTS;
  }
}

// ─── FIREBASE SAVE ────────────────────────────────────────────────────────────
async function saveProducts() {
  try {
    await set(ref(db, DB_PATH), liveProducts);
    return true;
  } catch (e) {
    console.error('Firebase save failed:', e);
    return false;
  }
}

// ─── SETTERS ─────────────────────────────────────────────────────────────────
function setCategory(cat)   { currentCategory   = cat; }
function setSort(sort)       { currentSort       = sort; }
function setSearch(q)        { currentSearch     = q.toLowerCase().trim(); }
function setPriceRange(r)    { currentPriceRange = r; }

// ─── FILTER & SORT ───────────────────────────────────────────────────────────
function getFilteredProducts() {
  let items = [...liveProducts];
  if (currentCategory && currentCategory !== 'all')
    items = items.filter(p => p.category === currentCategory);
  if (currentSearch)
    items = items.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch));
  if (currentPriceRange !== 'all') {
    if      (currentPriceRange === '1000-5000')   items = items.filter(p => p.price >= 1000  && p.price <  5000);
    else if (currentPriceRange === '5000-10000')  items = items.filter(p => p.price >= 5000  && p.price <  10000);
    else if (currentPriceRange === '10000-30000') items = items.filter(p => p.price >= 10000 && p.price <  30000);
    else if (currentPriceRange === '30000-70000') items = items.filter(p => p.price >= 30000 && p.price <= 70000);
    else if (currentPriceRange === '70000+')      items = items.filter(p => p.price >  70000);
  }
  if      (currentSort === 'popular')    items.sort((a,b) => (b.views||0)-(a.views||0));
  else if (currentSort === 'price-low')  items.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-high') items.sort((a,b) => b.price - a.price);
  return items;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function renderStars(r) { let s=''; for(let i=1;i<=5;i++) s+=i<=r?'★':'☆'; return s; }
function formatPrice(n) { return '₦'+n.toLocaleString('en-NG'); }

// ─── TRACK VIEWS ─────────────────────────────────────────────────────────────
async function trackView(id) {
  const p = liveProducts.find(x=>x.id===id);
  if (!p) return;
  p.views = (p.views||0)+1;
  saveProducts();
}

// ─── SKELETON ────────────────────────────────────────────────────────────────
function buildSkeletonCards(count=8) {
  return Array.from({length:count},()=>`
    <div class="skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line medium"></div>
        <div class="skeleton skeleton-line long"></div>
        <div class="skeleton skeleton-line price"></div>
      </div>
    </div>`).join('');
}

// ─── BUILD CARD ──────────────────────────────────────────────────────────────
function buildCard(product, index) {
  const delay = (index%8)*60;
  return `
    <div class="product-card" style="animation-delay:${delay}ms" onclick="openModal(${product.id})">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.src='/IMAGES/img1.jpeg'">
        ${product.popular?'<span class="product-badge">Popular</span>':''}
        <div class="product-overlay">
          <button class="quick-buy-btn" onclick="event.stopPropagation();orderOnWhatsApp(${product.id})">
            <i class="fa-brands fa-whatsapp"></i> Quick Order
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${formatPrice(product.price)}</span>
          <button class="buy-btn" onclick="event.stopPropagation();orderOnWhatsApp(${product.id})">
            <i class="fa-brands fa-whatsapp"></i> Order
          </button>
        </div>
      </div>
    </div>`;
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
async function renderCollections() {
  const container = document.getElementById('collectionsContainer');
  if (!container) return;
  container.innerHTML = buildSkeletonCards(8);
  await loadProducts();
  const items = getFilteredProducts();
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = `${items.length} item${items.length!==1?'s':''} found`;
  if (items.length===0) {
    container.innerHTML=`<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h3>No items found</h3><p>Try a different search or category.</p></div>`;
    return;
  }
  container.innerHTML = items.map((p,i)=>buildCard(p,i)).join('');
}

async function renderPopular() {
  const container = document.getElementById('popularContainer');
  if (!container) return;
  container.innerHTML = buildSkeletonCards(4);
  await loadProducts();
  const popular = liveProducts.filter(p=>p.popular).slice(0,4);
  container.innerHTML = popular.map((p,i)=>buildCard(p,i)).join('');
}

async function renderHome() {
  const container = document.getElementById('collectionsContainer');
  if (!container) return;
  container.innerHTML = buildSkeletonCards(8);
  await loadProducts();
  container.innerHTML = liveProducts.slice(0,8).map((p,i)=>buildCard(p,i)).join('');
}

// ─── SEARCH SUGGESTIONS ───────────────────────────────────────────────────────
function initSearchSuggestions() {
  const wrapper = document.querySelector('.search-wrapper');
  const input   = document.getElementById('search');
  if (!wrapper||!input) return;
  const box = document.createElement('div');
  box.className='search-suggestions'; box.id='searchSuggestions';
  wrapper.appendChild(box);
  input.addEventListener('input',()=>{
    const q=input.value.toLowerCase().trim();
    if(!q){box.classList.remove('open');return;}
    const matches=liveProducts.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)).slice(0,6);
    if(matches.length===0){
      box.innerHTML=`<div class="suggestion-empty">No results for "<strong>${input.value}</strong>"</div>`;
    } else {
      box.innerHTML=matches.map(p=>{
        const hl=p.name.replace(new RegExp(`(${q})`,'gi'),'<mark>$1</mark>');
        return `<div class="suggestion-item" onclick="selectSuggestion(${p.id})">
          <img class="suggestion-thumb" src="${p.image}" alt="${p.name}" onerror="this.src='/IMAGES/img1.jpeg'">
          <div class="suggestion-info"><div class="suggestion-name">${hl}</div><div class="suggestion-cat">${p.category}</div></div>
          <span class="suggestion-price">${formatPrice(p.price)}</span>
        </div>`;
      }).join('');
    }
    box.classList.add('open');
  });
  document.addEventListener('click',e=>{if(!wrapper.contains(e.target))box.classList.remove('open');});
  input.addEventListener('keydown',e=>{if(e.key==='Escape')box.classList.remove('open');});
}

function selectSuggestion(id){document.getElementById('searchSuggestions')?.classList.remove('open');openModal(id);}

// ─── WHATSAPP ─────────────────────────────────────────────────────────────────
function orderOnWhatsApp(id){
  const p=liveProducts.find(x=>x.id===id); if(!p)return;
  const msg=`Hello VAR Accessories! 👋\n\nI'd like to order:\n\n*${p.name}*\nCategory: ${p.category}\nPrice: ${formatPrice(p.price)}\n\n${p.description}\n\nPlease confirm availability and delivery details. Thank you!`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,'_blank');
  showToast('Opening WhatsApp...');
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function openModal(id){
  const p=liveProducts.find(x=>x.id===id); if(!p)return;
  trackView(id);
  document.getElementById('modalImage').src=p.image;
  document.getElementById('modalImage').alt=p.name;
  document.getElementById('modalCategory').textContent=p.category.toUpperCase();
  document.getElementById('modalName').textContent=p.name;
  document.getElementById('modalStars').textContent=renderStars(p.rating);
  document.getElementById('modalRatingCount').textContent=`(${p.reviews} reviews)`;
  document.getElementById('modalPrice').textContent=formatPrice(p.price);
  document.getElementById('modalDesc').textContent=p.description;
  document.getElementById('modalOrderBtn').onclick=()=>orderOnWhatsApp(p.id);
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){document.getElementById('productModal')?.classList.remove('open');document.body.style.overflow='';}

document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('modalClose')?.addEventListener('click',closeModal);
  document.getElementById('productModal')?.addEventListener('click',e=>{if(e.target===document.getElementById('productModal'))closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
  initSearchSuggestions();
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg){
  const t=document.getElementById('toast'); if(!t)return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}

// ─── EXPORTS (used by inline scripts in HTML pages) ──────────────────────────
export {
  loadProducts, saveProducts, liveProducts,
  renderCollections, renderPopular, renderHome,
  setCategory, setSort, setSearch, setPriceRange,
  openModal, closeModal, orderOnWhatsApp, showToast,
  renderStars, formatPrice, getFilteredProducts,
  DEFAULT_PRODUCTS
};

/* ========================
   COLLECTIONS.JS
   Products · Filter · Sort · Modal · WhatsApp · JSONBin sync
======================== */

// ---- CONFIG ----
const WA_NUMBER = '+2340000000000'; // Replace with your WhatsApp number

const JSONBIN_CONFIG = {
  binId: '6a11d1dd6877513b27be714b',       // Replace after creating your JSONBin
  apiKey: 'YOUR_X_ACCESS_KEY', // Replace with your VAR2 X-ACCESS-KEY
  get url() { return `https://api.jsonbin.io/v3/b/${this.binId}`; }
};

// ---- DEFAULT PRODUCTS (fallback if JSONBin not set up yet) ----
const DEFAULT_PRODUCTS = [
  { id: 1, category: 'perfume', name: 'Gold Perfume', price: 8000, rating: 5, reviews: 42, image: '/IMAGES/black-perfume.jpg', description: 'A bold, luxurious fragrance with warm gold undertones. Long-lasting and unforgettable.', popular: true, views: 0 },
  { id: 2, category: 'bags', name: 'Ladies Bags', price: 9800, rating: 4, reviews: 28, image: '/IMAGES/ladies-bags.jpg', description: 'Elegant and spacious ladies bag. Perfect for work, school, or outings.', popular: true, views: 0 },
  { id: 3, category: 'bags', name: 'Classic Tote Bag', price: 7500, rating: 4, reviews: 15, image: '/IMAGES/ladies-bags.jpg', description: 'A versatile, classic tote bag that works with every outfit.', popular: false, views: 0 },
  { id: 4, category: 'watches', name: 'Premium Watch', price: 15000, rating: 5, reviews: 56, image: '/IMAGES/img1.jpeg', description: 'A sleek, premium timepiece. Modern design meets reliable quality.', popular: true, views: 0 },
  { id: 5, category: 'jewellery', name: 'Gold Necklace', price: 5500, rating: 5, reviews: 33, image: '/IMAGES/img2.jpeg', description: 'Delicate gold-tone necklace. Light, elegant, and stunning on any neckline.', popular: true, views: 0 },
  { id: 6, category: 'jewellery', name: 'Pearl Earrings', price: 4200, rating: 4, reviews: 18, image: '/IMAGES/img3.jpeg', description: 'Classic pearl earrings that elevate any look — casual or formal.', popular: false, views: 0 },
  { id: 7, category: 'perfume', name: 'Rose Mist Perfume', price: 6500, rating: 4, reviews: 22, image: '/IMAGES/black-perfume.jpg', description: 'A fresh, floral rose mist with light citrus notes. Perfect for everyday wear.', popular: false, views: 0 },
  { id: 8, category: 'cosmetics', name: 'Lip Gloss Set', price: 3500, rating: 5, reviews: 47, image: '/IMAGES/img2.jpeg', description: 'A set of 4 gorgeous lip glosses in trending shades. Hydrating and long-lasting.', popular: true, views: 0 },
  { id: 9, category: 'dress', name: 'Summer Dress', price: 12000, rating: 4, reviews: 19, image: '/IMAGES/img1.jpeg', description: 'Light, breezy summer dress in a flattering silhouette. Sizes S–XL.', popular: false, views: 0 },
  { id: 10, category: 'watches', name: 'Minimalist Watch', price: 11500, rating: 5, reviews: 61, image: '/IMAGES/img3.jpeg', description: 'Clean, minimalist design. The perfect everyday wrist companion.', popular: true, views: 0 },
];

// ---- LIVE PRODUCTS (loaded from JSONBin or fallback) ----
let liveProducts = [];

async function loadProducts() {
  if (JSONBIN_CONFIG.binId === 'YOUR_BIN_ID') {
    liveProducts = DEFAULT_PRODUCTS;
    return;
  }
  try {
    const res = await fetch(JSONBIN_CONFIG.url + '/latest', {
      headers: { 'X-Access-Key': JSONBIN_CONFIG.apiKey }
    });
    const data = await res.json();
    liveProducts = data.record.products || DEFAULT_PRODUCTS;
  } catch (e) {
    console.warn('JSONBin load failed, using defaults:', e);
    liveProducts = DEFAULT_PRODUCTS;
  }
}

// ---- STATE ----
let currentCategory = 'all';
let currentSort = 'default';
let currentSearch = '';
let currentPriceRange = 'all';

function setCategory(cat) { currentCategory = cat; }
function setSort(sort) { currentSort = sort; }
function setSearch(q) { currentSearch = q.toLowerCase().trim(); }
function setPriceRange(range) { currentPriceRange = range; }

// ---- FILTER & SORT ----
function getFilteredProducts() {
  let items = [...liveProducts];
  if (currentCategory && currentCategory !== 'all') {
    items = items.filter(p => p.category.includes(currentCategory));
  }
  if (currentSearch) {
    items = items.filter(p =>
      p.name.toLowerCase().includes(currentSearch) ||
      p.category.toLowerCase().includes(currentSearch) ||
      p.description.toLowerCase().includes(currentSearch)
    );
  }
  if (currentPriceRange !== 'all') {
    if (currentPriceRange === '0-5000') items = items.filter(p => p.price < 5000);
    else if (currentPriceRange === '5000-10000') items = items.filter(p => p.price >= 5000 && p.price <= 10000);
    else if (currentPriceRange === '10000-20000') items = items.filter(p => p.price > 10000 && p.price <= 20000);
    else if (currentPriceRange === '20000+') items = items.filter(p => p.price > 20000);
  }
  if (currentSort === 'popular') items.sort((a, b) => (b.views || 0) - (a.views || 0));
  else if (currentSort === 'price-low') items.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-high') items.sort((a, b) => b.price - a.price);
  return items;
}

// ---- HELPERS ----
function renderStars(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) s += i <= rating ? '★' : '☆';
  return s;
}
function formatPrice(n) { return '₦' + n.toLocaleString('en-NG'); }

// ---- TRACK VIEWS ----
async function trackView(id) {
  const p = liveProducts.find(x => x.id === id);
  if (!p) return;
  p.views = (p.views || 0) + 1;
  if (JSONBIN_CONFIG.binId !== 'YOUR_BIN_ID') {
    try {
      await fetch(JSONBIN_CONFIG.url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Access-Key': JSONBIN_CONFIG.apiKey },
        body: JSON.stringify({ products: liveProducts })
      });
    } catch (e) { /* silent fail */ }
  }
}

// ---- SKELETON LOADERS ----
function buildSkeletonCards(count = 8) {
  return Array.from({ length: count }, () => `
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

// ---- BUILD CARD ----
function buildCard(product, index) {
  const delay = (index % 8) * 60;
  return `
    <div class="product-card" style="animation-delay:${delay}ms" onclick="openModal(${product.id})">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.popular ? '<span class="product-badge">Popular</span>' : ''}
        <div class="product-overlay">
          <button class="quick-buy-btn" onclick="event.stopPropagation(); orderOnWhatsApp(${product.id})">
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
          <button class="buy-btn" onclick="event.stopPropagation(); orderOnWhatsApp(${product.id})">
            <i class="fa-brands fa-whatsapp"></i> Order
          </button>
        </div>
      </div>
    </div>`;
}

// ---- RENDER FUNCTIONS ----
async function renderCollections() {
  const container = document.getElementById('collectionsContainer');
  if (!container) return;
  container.innerHTML = buildSkeletonCards(8);
  await loadProducts();
  const items = getFilteredProducts();
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = `${items.length} item${items.length !== 1 ? 's' : ''} found`;
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h3>No items found</h3><p>Try a different search or category.</p></div>`;
    return;
  }
  container.innerHTML = items.map((p, i) => buildCard(p, i)).join('');
}

async function renderPopular() {
  const container = document.getElementById('popularContainer');
  if (!container) return;
  container.innerHTML = buildSkeletonCards(4);
  await loadProducts();
  const popular = liveProducts.filter(p => p.popular).slice(0, 4);
  container.innerHTML = popular.map((p, i) => buildCard(p, i)).join('');
}

async function renderHome() {
  const container = document.getElementById('collectionsContainer');
  if (!container) return;
  container.innerHTML = buildSkeletonCards(8);
  await loadProducts();
  container.innerHTML = liveProducts.slice(0, 8).map((p, i) => buildCard(p, i)).join('');
}

// ---- SEARCH SUGGESTIONS ----
function initSearchSuggestions() {
  const wrapper = document.querySelector('.search-wrapper');
  const input = document.getElementById('search');
  if (!wrapper || !input) return;

  const box = document.createElement('div');
  box.className = 'search-suggestions';
  box.id = 'searchSuggestions';
  wrapper.appendChild(box);

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { box.classList.remove('open'); return; }

    const matches = liveProducts.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (matches.length === 0) {
      box.innerHTML = `<div class="suggestion-empty">No results for "<strong>${input.value}</strong>"</div>`;
    } else {
      box.innerHTML = matches.map(p => {
        const highlighted = p.name.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
        return `
          <div class="suggestion-item" onclick="selectSuggestion(${p.id})">
            <img class="suggestion-thumb" src="${p.image}" alt="${p.name}">
            <div class="suggestion-info">
              <div class="suggestion-name">${highlighted}</div>
              <div class="suggestion-cat">${p.category}</div>
            </div>
            <span class="suggestion-price">${formatPrice(p.price)}</span>
          </div>`;
      }).join('');
    }
    box.classList.add('open');
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) box.classList.remove('open');
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') box.classList.remove('open');
  });
}

function selectSuggestion(id) {
  document.getElementById('searchSuggestions')?.classList.remove('open');
  openModal(id);
}

// ---- WHATSAPP ORDER ----
function orderOnWhatsApp(id) {
  const p = liveProducts.find(x => x.id === id);
  if (!p) return;
  const message =
    `Hello VAR Accessories! 👋\n\n` +
    `I'd like to order:\n\n` +
    `*${p.name}*\n` +
    `Category: ${p.category}\n` +
    `Price: ${formatPrice(p.price)}\n\n` +
    `${p.description}\n\n` +
    `Please confirm availability and delivery details. Thank you!`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  showToast('Opening WhatsApp...');
}

// ---- MODAL ----
function openModal(id) {
  const p = liveProducts.find(x => x.id === id);
  if (!p) return;
  trackView(id);

  document.getElementById('modalImage').src = p.image;
  document.getElementById('modalImage').alt = p.name;
  document.getElementById('modalCategory').textContent = p.category.toUpperCase();
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalStars').textContent = renderStars(p.rating);
  document.getElementById('modalRatingCount').textContent = `(${p.reviews} reviews)`;
  document.getElementById('modalPrice').textContent = formatPrice(p.price);
  document.getElementById('modalDesc').textContent = p.description;
  document.getElementById('modalOrderBtn').onclick = () => orderOnWhatsApp(p.id);

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('productModal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('productModal')) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  initSearchSuggestions();
});

// ---- TOAST ----
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

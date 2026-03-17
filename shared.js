// ─── PRODUCT DATA ───
const PRODUCTS = [
  { id:1,  name:'Cashmere Overcoat',     category:'clothing',    emoji:'🧥', price:8999,  oldPrice:14999, rating:5, reviews:128, badge:'New',  desc:'Luxuriously soft pure cashmere overcoat. Tailored for a modern silhouette, this investment piece will last a lifetime. Dry clean only.', sizes:['XS','S','M','L','XL'], colors:['Camel','Charcoal','Navy'], meta:{Material:'100% Cashmere',Fit:'Regular',Care:'Dry Clean Only',Origin:'Italy'} },
  { id:2,  name:'Leather Crossbody',     category:'accessories', emoji:'👜', price:4599,  oldPrice:6999,  rating:4, reviews:89,  badge:'Sale', desc:'Hand-stitched full-grain leather crossbody bag. Brass hardware, suede lining, and three interior pockets.', sizes:null, colors:['Tan','Black','Burgundy'], meta:{Material:'Full-grain Leather',Hardware:'Solid Brass',Lining:'Italian Suede',Origin:'Spain'} },
  { id:3,  name:'Handcrafted Sneakers',  category:'footwear',    emoji:'👟', price:3299,  oldPrice:null,  rating:5, reviews:214, badge:null,   desc:'Artisan-crafted leather sneakers with memory foam insoles. Available in UK sizes 6–12. Ethically sourced materials throughout.', sizes:['UK 6','UK 7','UK 8','UK 9','UK 10','UK 11','UK 12'], colors:['White','Cream','Bone'], meta:{Material:'Nappa Leather',Sole:'Recycled Rubber',Insole:'Memory Foam',Origin:'Portugal'} },
  { id:4,  name:'Marble Candle Set',     category:'home',        emoji:'🕯️', price:1299,  oldPrice:null,  rating:4, reviews:67,  badge:null,   desc:'A trio of hand-poured soy wax candles in marble-effect glass. Notes of sandalwood, cedarwood, and vanilla. 40-hour burn time each.', sizes:null, colors:['Ivory','Blush','Slate'], meta:{Wax:'100% Soy',Scent:'Sandalwood & Vanilla',Burn:'40 hours each',Handmade:'Yes'} },
  { id:5,  name:'Gold Hoop Earrings',    category:'accessories', emoji:'💎', price:2199,  oldPrice:2999,  rating:5, reviews:341, badge:'Sale', desc:'14k gold-plated sterling silver hoop earrings. Lightweight, tarnish-resistant, and hypoallergenic. Perfect for everyday wear.', sizes:['Small 25mm','Medium 35mm','Large 50mm'], colors:null, meta:{Material:'925 Sterling Silver',Plating:'14k Gold','Hypoallergenic':'Yes',Weight:'3.2g'} },
  { id:6,  name:'Merino Sweater',        category:'clothing',    emoji:'🧣', price:2799,  oldPrice:null,  rating:4, reviews:92,  badge:'New',  desc:'Feather-light merino wool sweater. Temperature-regulating, machine washable, and incredibly soft. A wardrobe essential.', sizes:['XS','S','M','L','XL','XXL'], colors:['Oatmeal','Forest','Rust'], meta:{Material:'100% Merino Wool',Weight:'Lightweight',Care:'Machine Washable',Origin:'New Zealand'} },
  { id:7,  name:'Ceramic Tea Set',       category:'home',        emoji:'🍵', price:3499,  oldPrice:4999,  rating:5, reviews:55,  badge:'Sale', desc:'Hand-thrown ceramic tea set for two. Each piece individually crafted and glazed, making it utterly unique. Includes teapot, two cups, and tray.', sizes:null, colors:['White','Sage','Slate Blue'], meta:{Pieces:'5 (Teapot + 2 Cups + 2 Saucers)',Material:'Stoneware',Safe:'Dishwasher Safe',Origin:'Japan'} },
  { id:8,  name:'Leather Derby Shoes',   category:'footwear',    emoji:'👞', price:5499,  oldPrice:7499,  rating:4, reviews:76,  badge:'Sale', desc:'Classic Goodyear-welted Derby shoes in full-grain calfskin. Built to last a decade with proper care. Includes cedar shoe trees.', sizes:['UK 6','UK 7','UK 8','UK 9','UK 10','UK 11'], colors:['Tan','Dark Brown','Black'], meta:{Material:'Full-grain Calfskin',Construction:'Goodyear Welt',Sole:'Leather',Origin:'England'} },
  { id:9,  name:'Vitamin C Serum',       category:'beauty',      emoji:'🌿', price:1799,  oldPrice:null,  rating:5, reviews:203, badge:'New',  desc:'A potent blend of vitamin C, niacinamide, and hyaluronic acid. Brightens, hydrates, and protects for visibly radiant skin.', sizes:['30ml','50ml'], colors:null, meta:{Key:'Vit C + Niacinamide',Skin:'All Skin Types',Cruelty:'Cruelty-Free',Origin:'India'} },
  { id:10, name:'Wireless Earbuds Pro',  category:'tech',        emoji:'🎧', price:6999,  oldPrice:8999,  rating:5, reviews:489, badge:'Sale', desc:'Premium ANC wireless earbuds with 32-hour battery life, spatial audio, and IPX5 water resistance.', sizes:null, colors:['Midnight Black','Pearl White','Sage Green'], meta:{Battery:'32 Hours (ANC On)',Connectivity:'Bluetooth 5.3',ANC:'Yes — Adaptive',Water:'IPX5'} },
  { id:11, name:'Silk Scarf',            category:'accessories', emoji:'🎀', price:1499,  oldPrice:null,  rating:4, reviews:134, badge:null,   desc:'100% pure mulberry silk scarf. Hand-rolled edges, printed with an original botanical motif. 90×90cm.', sizes:null, colors:['Ivory','Sky Blue','Terracotta'], meta:{Material:'100% Mulberry Silk',Size:'90×90cm',Print:'Botanical',Origin:'France'} },
  { id:12, name:'Oak Side Table',        category:'home',        emoji:'🪑', price:9499,  oldPrice:12999, rating:5, reviews:38,  badge:'Sale', desc:'Solid white oak side table with a hand-rubbed oil finish. Minimalist design that complements any interior.', sizes:null, colors:['Natural Oak','Walnut Stain','Ebony'], meta:{Material:'Solid White Oak',Finish:'Hand-rubbed Oil',Dimensions:'45×45×55cm',Assembly:'Easy'} },
];

// ─── CART ───
function getCart() {
  try { return JSON.parse(localStorage.getItem('luxe_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('luxe_cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(product, qty = 1, size = null, color = null) {
  const cart = getCart();
  const key = `${product.id}-${size}-${color}`;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty += qty;
  else cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, qty, size, color, key });
  saveCart(cart);
  showToast(`🛍️ ${product.name} added to cart!`);
}
function getCartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}
function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = getCart().reduce((s, i) => s + i.qty, 0);
}

// ─── WISHLIST ───
function getWishlist() {
  try { return JSON.parse(localStorage.getItem('luxe_wishlist') || '[]'); } catch { return []; }
}
function toggleWishlist(productId) {
  let w = getWishlist();
  const idx = w.indexOf(productId);
  if (idx > -1) { w.splice(idx, 1); showToast('Removed from wishlist'); }
  else { w.push(productId); showToast('♡ Added to wishlist!'); }
  localStorage.setItem('luxe_wishlist', JSON.stringify(w));
}

// ─── TOAST ───
let toastTimer;
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('#toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── STARS ───
function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => `<span class="star ${i < rating ? '' : 'empty'}">★</span>`).join('');
}

// ─── PRODUCT CARD ───
function productCardHTML(p) {
  return `
    <a class="product-card" href="product.html?id=${p.id}">
      <div class="product-img">
        <span style="position:relative;z-index:1">${p.emoji}</span>
        ${p.badge ? `<div class="product-badge ${p.badge==='Sale'?'sale':''}">${p.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">${renderStars(p.rating)} <span style="font-size:11px;color:var(--muted);margin-left:4px">(${p.reviews})</span></div>
        <div class="product-price-row">
          <div>
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.oldPrice ? `<span class="product-price-old"> ₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="event.preventDefault();event.stopPropagation();addToCart(PRODUCTS.find(x=>x.id===${p.id}))">+ Cart</button>
        </div>
      </div>
    </a>`;
}

// ─── NAV MARKUP ───
function renderNav(activePage) {
  const pages = [
    { id: 'home',    label: 'Home',    href: 'index.html' },
    { id: 'shop',    label: 'Shop',    href: 'shop.html' },
    { id: 'about',   label: 'About',   href: 'about.html' },
    { id: 'contact', label: 'Contact', href: 'contact.html' },
  ];
  return `
    <nav>
      <a class="nav-logo" href="index.html">LUXE</a>
      <div class="nav-links">
        ${pages.map(p => `<a href="${p.href}" class="${p.id===activePage?'active':''}">${p.label}</a>`).join('')}
      </div>
      <div class="nav-actions">
        <div class="search-bar">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input placeholder="Search products…" onkeydown="if(event.key==='Enter')window.location='shop.html?q='+this.value"/>
        </div>
        <a class="nav-icon-btn" href="cart.html" title="Cart">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span class="cart-badge" id="cartBadge">0</span>
        </a>
        <a class="nav-icon-btn" href="wishlist.html" title="Wishlist">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </a>
      </div>
    </nav>`;
}

// ─── FOOTER MARKUP ───
function renderFooter() {
  return `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="nav-logo" href="index.html">LUXE</a>
          <p>Premium goods for discerning individuals. Curated with care, delivered with love. Based in Hyderabad, India.</p>
          <div class="social-links">
            <a class="social-link" title="Instagram">📷</a>
            <a class="social-link" title="Twitter">🐦</a>
            <a class="social-link" title="Facebook">👤</a>
            <a class="social-link" title="Pinterest">📌</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="shop.html?cat=clothing">Clothing</a>
          <a href="shop.html?cat=accessories">Accessories</a>
          <a href="shop.html?cat=footwear">Footwear</a>
          <a href="shop.html?cat=home">Home & Décor</a>
          <a href="shop.html?cat=beauty">Beauty</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Sustainability</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Return Policy</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 LUXE Store. All rights reserved.</span>
        <span>Made with ♥ in Hyderabad</span>
      </div>
    </footer>`;
}

// ─── TOAST HTML ───
function toastHTML() {
  return `<div class="toast" id="toast"><span id="toastMsg">Done!</span></div>`;
}

// Init badge on load
document.addEventListener('DOMContentLoaded', updateCartBadge);

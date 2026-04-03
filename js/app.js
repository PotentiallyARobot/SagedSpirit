// ═══════════════════════════════════════════════════════════
// sagedspirit — app.js
// ═══════════════════════════════════════════════════════════

// ─── STRIPE CONFIG ──────────────────────────────────────────
// 1. Go to https://dashboard.stripe.com/products — create each product with a price
// 2. Copy each price ID (starts with price_) and paste below
// 3. Replace the publishable key with yours from https://dashboard.stripe.com/apikeys
const STRIPE_PK = 'pk_live_51MpyGdJTLzTiUThCHzvER1rG5h9nLSrmzplFbTsEEsoRjwqDL2EubfSMEBH0hU1nGdKIJgl6Vh3X4dDR7ryY5pii00B9aIeDCx';
const stripe = Stripe(STRIPE_PK);

// ─── PRODUCT DATA ───────────────────────────────────────────
// stripePrice: paste your Stripe Price ID for each product
const products = [
  { id:1, name:"Amethyst Tower", tags:"Clarity · Calm", cat:"crystal", price:28,
    img:"assets/amethyst_tower.webp",
    stripePrice:"price_1TIDswJTLzTiUThCfvtemlTV",
    desc:"Cool to the touch, with a weight that settles in your palm.",
    long:"A polished amethyst point with deep violet-to-lavender gradient. Silicon dioxide with iron impurities — that's what produces the color. Formed under sustained heat and pressure over tens of millions of years.",
    details:{Origin:"Brazil",Hardness:"7 Mohs",Weight:"120–180g",Formation:"Volcanic cavities"} },
  { id:2, name:"Black Tourmaline, Raw", tags:"Protection · Strength", cat:"crystal", price:16,
    img:"assets/black_tourmaline_raw.webp",
    stripePrice:"price_1TIDswJTLzTiUThCDfp04eIe",
    desc:"Rough, striated edges. Feels like a boundary you can hold.",
    long:"Unpolished tourmaline with its natural striations intact. Tourmaline is piezoelectric — it generates a measurable electrical charge under mechanical pressure. One of the densest common minerals you can hold in one hand.",
    details:{Origin:"Brazil",Hardness:"7 Mohs",Weight:"80–140g",Formation:"Pegmatite veins"} },
  { id:3, name:"White Sage Bundle", tags:"Cleansing · Renewal", cat:"sage", price:12,
    img:"assets/white_sage_bundle.webp",
    stripePrice:"price_1TIDsxJTLzTiUThCgtRSygIr",
    desc:"Dry, silvered leaves. The scent of starting clean.",
    long:"Hand-harvested California white sage (Salvia apiana), air-dried and bundled with cotton thread. Used for millennia across indigenous traditions as a ceremonial smoke. The aromatic compounds — primarily camphor and cineole — are released when burned.",
    details:{Origin:"Southern California",Size:"4-inch bundle",Scent:"Warm, herbaceous, bright",Burn:"30–40 minutes"} },
  { id:4, name:"Selenite Wand", tags:"Intuition · Moon", cat:"crystal", price:22,
    img:"assets/selenite_wand.webp",
    stripePrice:"price_1TIDsxJTLzTiUThCtfuOWlmi",
    desc:"Glass-smooth. Catches the light the way water does.",
    long:"A polished selenite wand — hydrous calcium sulfate, named after Selene, the Greek moon goddess. Softer than most crystals at 2 Mohs, selenite has a translucent, almost liquid appearance. It's the same mineral family as gypsum, formed from evaporated ancient seas.",
    details:{Origin:"Morocco",Hardness:"2 Mohs",Weight:"60–100g",Formation:"Evaporite deposits"} },
  { id:5, name:"Smoky Quartz Point", tags:"Grounding · Focus", cat:"crystal", price:34,
    img:"assets/smoky_quartz_point.webp",
    stripePrice:"price_1TIDsyJTLzTiUThCgQ1VE1g3",
    desc:"Dense, warm amber. Like holding something ancient and patient.",
    long:"A natural smoky quartz point with warm brown-to-amber translucency. The color comes from natural irradiation of silicon dioxide — free silicon atoms created by aluminum impurities absorb light, producing the signature smoke. Millions of years of slow exposure.",
    details:{Origin:"Madagascar",Hardness:"7 Mohs",Weight:"150–220g",Formation:"Granite pegmatites"} },
  { id:6, name:"Citrine Cluster", tags:"Joy · Abundance", cat:"crystal", price:38,
    img:"assets/citrine_cluster.webp",
    stripePrice:"price_1TIDsyJTLzTiUThCkjW9jF5I",
    desc:"Warm gold facets. Afternoon sun in your palm.",
    long:"A natural citrine cluster with honey-gold terminations. True citrine gets its color from trace amounts of ferric iron in the quartz lattice. It's one of the few minerals that doesn't accumulate or retain negative environmental charge — a natural resistor.",
    details:{Origin:"Brazil",Hardness:"7 Mohs",Weight:"100–160g",Formation:"Hydrothermal veins"} },
  { id:7, name:"Palo Santo & Sage Set", tags:"Cleansing · Sacred", cat:"sage", price:18,
    img:"assets/palo_santo_sage_set.webp",
    stripePrice:"price_1TIDszJTLzTiUThCmQL6lLMr",
    desc:"Warm resin meets dry herb. Ritual in a single breath.",
    long:"Two palo santo sticks (Bursera graveolens) paired with a mini white sage bundle. Palo santo is harvested only from naturally fallen trees in Ecuador — the wood must cure for 4–10 years on the forest floor before developing its signature aromatic compounds: limonene, terpineol, and carvone.",
    details:{Origin:"Ecuador & California",Scent:"Sweet resin, bright herb",Burn:"Palo santo: relight as needed",Contents:"2 palo santo, 1 mini sage"} },
  { id:8, name:"Labradorite Palm Stone", tags:"Intuition · Vision", cat:"crystal", price:26,
    img:"assets/labradorite_palm_stone.webp",
    stripePrice:"price_1TIDszJTLzTiUThCaZA9GPoO",
    desc:"Dark surface, hidden flash. It reveals itself slowly.",
    long:"A polished palm-sized labradorite with iridescent flash (labradorescence). The optical effect is caused by light diffracting between twinned layers of different feldspar compositions — each layer is only 50–200 nanometers thick. The stone looks different every time you turn it.",
    details:{Origin:"Madagascar",Hardness:"6 Mohs",Weight:"80–130g",Flash:"Blue, gold, green"} },
  { id:9, name:"Cedar & Rosemary Bundle", tags:"Protection · Warmth", cat:"sage", price:14,
    img:"assets/cedar_rosemary_bundle.webp",
    stripePrice:"price_1TIDt0JTLzTiUThC5zw4dCc0",
    desc:"Woodsy, warm, grounding. Smells like a forest floor.",
    long:"Hand-tied bundle of dried cedar and rosemary. Cedar (Thuja plicata) has been used in Pacific Northwest traditions for purification, while rosemary (Salvia rosmarinus) has been associated with memory and clarity since ancient Greece — modern research confirms its aroma can support alertness.",
    details:{Origin:"Pacific Northwest",Size:"5-inch bundle",Scent:"Woody, herbal, warm",Burn:"25–35 minutes"} },
  { id:10, name:"Clear Quartz Point", tags:"Clarity · Amplification", cat:"crystal", price:24,
    img:"assets/clear_quartz_point.webp",
    stripePrice:"price_1TIDt0JTLzTiUThCfTwmgHgI",
    desc:"Pure mineral geometry. The most orderly structure in nature.",
    long:"A natural clear quartz point — pure SiO₂ with its signature hexagonal lattice. Quartz oscillates at such a precise frequency that it's used in every digital watch and most electronic circuits on earth. When you hold one, you hold the same mineral that keeps time for modern civilization.",
    details:{Origin:"Arkansas, USA",Hardness:"7 Mohs",Weight:"60–120g",Formation:"Hydrothermal veins"} },
  { id:11, name:"Nag Champa Incense", tags:"Meditation · Space", cat:"incense", price:8,
    img:"assets/nag_champa_incense.webp",
    stripePrice:"price_1TIDt0JTLzTiUThCWOC6kJcP",
    desc:"Sandalwood and frangipani. Marks a moment.",
    long:"Traditional hand-rolled nag champa incense from Bangalore, India. Made with sandalwood paste, halmaddi resin, and frangipani flower — a recipe refined over generations. The scent is dense, sweet, and slightly earthy. Each stick burns for approximately 30 minutes.",
    details:{Origin:"Bangalore, India",Count:"15 sticks",Burn:"30 min each",Base:"Sandalwood & halmaddi"} },
  { id:12, name:"Rose Quartz Heart", tags:"Love · Softness", cat:"crystal", price:20,
    img:"assets/rose_quartz_heart.webp",
    stripePrice:"price_1TIDt1JTLzTiUThCyZqJ9cdn",
    desc:"Pink, smooth, warm. Fits in a pocket, stays on your mind.",
    long:"A hand-carved rose quartz heart, polished to a soft satin finish. The pink color comes from trace amounts of titanium, iron, or manganese — or in some specimens, microscopic inclusions of dumortierite fibers. It's the softest-looking quartz, but it's still a 7 on the Mohs scale.",
    details:{Origin:"Madagascar",Hardness:"7 Mohs",Weight:"50–80g",Formation:"Pegmatite cores"} }
];

const kits = [
  { id:100, name:"The Grounding Kit", price:58,
    img:"assets/kit_grounding_unbox.webp",
    stripePrice:"price_1TIDt1JTLzTiUThCqX1KJTTQ",
    desc:"Everything to come back down when your mind is elsewhere.",
    items:"Smoky Quartz Point · Black Tourmaline · White Sage · Grounding Salt Jar · Intention Card" },
  { id:101, name:"The Clarity Kit", price:62,
    img:"assets/kit_clarity_unbox.webp",
    stripePrice:"price_1TIDt2JTLzTiUThCnteN6iPo",
    desc:"Tools for cutting through noise and finding what's true.",
    items:"Clear Quartz Tower · Selenite Wand · Rosemary Bundle · Lavender Incense · Intention Card" },
  { id:102, name:"The New Moon Kit", price:68,
    img:"assets/kit_new_moon_unbox.webp",
    stripePrice:"price_1TIDt2JTLzTiUThCTJRV1N4p",
    desc:"For beginnings. Something tangible to mark the reset.",
    items:"Labradorite Palm Stone · Amethyst Cluster · Palo Santo · Moon Phase Card · Black Salt Jar" }
];

const allItems = [...products, ...kits];

// ─── CART ────────────────────────────────────────────────────
let cart = [];

function updateCartCount() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 200);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty">Your bag is empty</div>';
    footer.style.display = 'none';
    return;
  }
  footer.style.display = 'block';
  container.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-tags">${item.tags||''}</div>
        <div class="cart-item-price-row">
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${idx},-1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx},1)">+</button>
          </div>
          <div class="cart-item-price">$${item.price * item.qty}</div>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('cartSubtotal').textContent = '$' + cart.reduce((s,i) => s + i.price * i.qty, 0);
}

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty++;
  else cart.push({...item, qty: 1});
  updateCartCount(); renderCart(); openCart();
}

function changeQty(idx, delta) {
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartCount(); renderCart();
}

function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
  document.getElementById('cartDrawer').classList.toggle('open');
  document.body.style.overflow = document.getElementById('cartDrawer').classList.contains('open') ? 'hidden' : '';
}
function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ─── STRIPE CHECKOUT ────────────────────────────────────────
function handleCheckout() {
  if (!cart.length) return;
  if (STRIPE_PK.includes('REPLACE')) {
    alert('Store is in preview mode. Checkout will be enabled soon.');
    return;
  }
  const lineItems = cart.map(item => ({
    price: item.stripePrice,
    quantity: item.qty
  }));
  stripe.redirectToCheckout({
    lineItems,
    mode: 'payment',
    shippingAddressCollection: {
      allowedCountries: ['US'],
    },
    successUrl: window.location.origin + '?checkout=success',
    cancelUrl: window.location.origin + '?checkout=cancel',
  }).then(result => {
    if (result.error) alert(result.error.message);
  });
}

// Show success/cancel message
if (window.location.search.includes('checkout=success')) {
  setTimeout(() => alert('Thank you for your order! You will receive a confirmation email shortly.'), 500);
  history.replaceState({}, '', window.location.pathname);
}
if (window.location.search.includes('checkout=cancel')) {
  history.replaceState({}, '', window.location.pathname);
}

// ─── RENDER PRODUCTS ────────────────────────────────────────
function renderProducts(filter) {
  filter = filter || 'all';
  const grid = document.getElementById('productGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="card reveal vis" data-id="${p.id}">
      <div class="card-img" onclick="openModal(${p.id})">
        <div class="card-img-inner"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="card-quick"><button class="quick-add" onclick="event.stopPropagation();addToCart(products.find(x=>x.id===${p.id}))">Add to Bag — $${p.price}</button></div>
      </div>
      <div class="card-body">
        <div class="card-tags">${p.tags}</div>
        <div class="card-name" onclick="openModal(${p.id})">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-price">$${p.price}</div>
      </div>
    </div>`).join('');
}

function renderKits() {
  document.getElementById('kitsGrid').innerHTML = kits.map(k => `
    <div class="kit reveal vis">
      <div class="kit-img"><img class="kit-img-inner" src="${k.img}" alt="${k.name}" loading="lazy"></div>
      <div class="kit-body">
        <div class="kit-label">Curated Kit</div>
        <div class="kit-name">${k.name}</div>
        <div class="kit-desc">${k.desc}</div>
        <div class="kit-contents">${k.items}</div>
        <div class="kit-bottom">
          <div class="kit-price">$${k.price}</div>
          <button class="kit-add" onclick="addToCart(kits.find(x=>x.id===${k.id}))">Add to Bag</button>
        </div>
      </div>
    </div>`).join('');
}

// ─── MODAL ──────────────────────────────────────────────────
function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalImg').innerHTML = `<img src="${p.img}" alt="${p.name}">`;
  const dets = Object.entries(p.details).map(([k,v]) => `<div class="modal-detail"><strong>${k}</strong><span>${v}</span></div>`).join('');
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-tags">${p.tags}</div>
    <div class="modal-name">${p.name}</div>
    <div class="modal-price">$${p.price}</div>
    <div class="modal-desc">${p.long}</div>
    <div class="modal-details">${dets}</div>
    <button class="modal-add" onclick="addToCart(products.find(x=>x.id===${p.id}));document.getElementById('modalOverlay').classList.remove('open');document.body.style.overflow='';">Add to Bag — $${p.price}</button>`;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = document.getElementById('cartDrawer').classList.contains('open') ? 'hidden' : '';
  }
}

// ─── INLINE SEARCH ──────────────────────────────────────────
function handleInlineSearch(query) {
  // Clear active filter
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (query.length < 1) {
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    renderProducts('all');
    return;
  }
  const q = query.toLowerCase();
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.tags && p.tags.toLowerCase().includes(q)) ||
    (p.desc && p.desc.toLowerCase().includes(q)) ||
    (p.cat && p.cat.includes(q))
  );
  const grid = document.getElementById('productGrid');
  if (!matches.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--smoke);font-size:0.88rem;">No products found</div>';
    return;
  }
  grid.innerHTML = matches.map(p => `
    <div class="card reveal vis" data-id="${p.id}">
      <div class="card-img" onclick="openModal(${p.id})">
        <div class="card-img-inner"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
        <div class="card-quick"><button class="quick-add" onclick="event.stopPropagation();addToCart(products.find(x=>x.id===${p.id}))">Add to Bag — $${p.price}</button></div>
      </div>
      <div class="card-body">
        <div class="card-tags">${p.tags}</div>
        <div class="card-name" onclick="openModal(${p.id})">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-price">$${p.price}</div>
      </div>
    </div>`).join('');
}

// ─── FILTERS ────────────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('inlineSearch').value = '';
    renderProducts(btn.dataset.filter);
  });
});

function filterAndScroll(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === cat);
  });
  document.getElementById('inlineSearch').value = '';
  renderProducts(cat);
  closeMobileMenu();
}

// ─── MOBILE MENU ────────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('active');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
}

// ─── SEARCH ─────────────────────────────────────────────────
function toggleSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.toggle('open');
  if (overlay.classList.contains('open')) {
    document.getElementById('searchInput').focus();
    document.body.style.overflow = 'hidden';
  } else {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
    document.body.style.overflow = '';
  }
}

function handleSearch(query) {
  const results = document.getElementById('searchResults');
  if (query.length < 2) { results.innerHTML = ''; return; }
  const q = query.toLowerCase();
  const matches = allItems.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.tags && p.tags.toLowerCase().includes(q)) ||
    (p.desc && p.desc.toLowerCase().includes(q)) ||
    (p.cat && p.cat.includes(q)) ||
    (p.items && p.items.toLowerCase().includes(q))
  );
  if (!matches.length) {
    results.innerHTML = '<div class="search-empty">No results found</div>';
    return;
  }
  results.innerHTML = matches.map(p => `
    <div class="search-result" onclick="toggleSearch();${p.id < 100 ? 'openModal('+p.id+')' : 'document.getElementById(\"kits-section\").scrollIntoView({behavior:\"smooth\"})'}">
      <img src="${p.img}" alt="${p.name}">
      <div>
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">$${p.price}</div>
      </div>
    </div>`).join('');
}

// ─── NEWSLETTER ─────────────────────────────────────────────
function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value;
  const btn = document.getElementById('nlBtn');
  // Store in localStorage as backup — connect to Mailchimp/ConvertKit later
  const subs = JSON.parse(localStorage.getItem('ss_subscribers') || '[]');
  subs.push({ email, date: new Date().toISOString() });
  localStorage.setItem('ss_subscribers', JSON.stringify(subs));
  btn.textContent = 'Subscribed ✓';
  btn.disabled = true;
  document.getElementById('nlEmail').value = '';
  setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; }, 3000);
}

// ─── SCROLL / REVEAL ────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 40);
});
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ─── INIT ───────────────────────────────────────────────────
renderProducts();
renderKits();

// ===== CONFIG =====
const API_URL = "https://script.google.com/macros/s/AKfycbw_ADy14JJgzuzO0VLcts9IDFGCg0CiUweofs0rMH9UOtx241T8GJcwVgcgmTNBRM72sQ/exec";

// ===== STATE =====
let cart = [];
let allProducts = [];

// ===== DOM =====
const track = document.getElementById('productTrack');
const search = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const drawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');

// ===== LOAD PRODUCTS FROM SHEET =====
async function loadProducts() {
  try {
    const res = await fetch(API_URL + "?action=products");
    const products = await res.json();
    allProducts = products;
    renderProducts(products);
  } catch (err) {
    console.error(err);
    track.innerHTML = '<p style="text-align:center;padding:40px;">Gagal load besties. Coba refresh ya ♡</p>';
  }
}

function renderProducts(products) {
  if (!products.length) {
    track.innerHTML = '<p style="text-align:center;padding:40px;">Belum ada bestie tersedia ♡</p>';
    return;
  }

  track.innerHTML = products.map(p => `
    <article class="product-card" data-name="${(p.name + ' ' + (p.description || '')).toLowerCase()}">
      <div class="product-photo ${getColorClass(p.color)}">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
        <img src="${p.image_url || 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 300 300\'%3E%3Ccircle cx=\'150\' cy=\'150\' r=\'80\' fill=\'%23f7a9c4\'/%3E%3C/svg%3E'}" alt="${p.name}">
      </div>
      <div class="product-info">
        <div>
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
        </div>
        <strong>${money(p.price)}</strong>
      </div>
      <button class="add-btn" 
              data-product="${p.name}" 
              data-price="${p.price}"
              ${p.stock <= 0 ? 'disabled' : ''}>
        ${p.stock <= 0 ? 'Habis' : '+ add bestie'}
      </button>
      ${p.stock > 0 && p.stock <= 3 ? `<small style="display:block;text-align:center;color:#e87;">sisa ${p.stock}</small>` : ''}
    </article>
  `).join('');

  // Re-bind add buttons
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.onclick = () => {
      if (btn.disabled) return;
      const name = btn.dataset.product;
      const price = +btn.dataset.price;
      cart.push({ name, price, qty: 1 });
      renderCart();
      openCart();
    };
  });
}

function getColorClass(color) {
  const c = (color || '').toLowerCase();
  if (c.includes('pink')) return 'pink-bg';
  if (c.includes('yellow')) return 'yellow-bg';
  if (c.includes('green') || c.includes('mint')) return 'green-bg';
  if (c.includes('cream') || c.includes('beige')) return 'cream-bg';
  if (c.includes('lilac') || c.includes('purple')) return 'lilac-bg';
  return 'pink-bg';
}

// ===== SEARCH =====
search.addEventListener('input', () => {
  const q = search.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.product-card');
  let shown = 0;
  cards.forEach(p => {
    const ok = p.dataset.name.includes(q);
    p.style.display = ok ? 'block' : 'none';
    if (ok) shown++;
  });
  noResults.style.display = shown ? 'none' : 'block';
});

// ===== SLIDER =====
document.getElementById('prevBtn').onclick = () => track.scrollBy({ left: -280, behavior: 'smooth' });
document.getElementById('nextBtn').onclick = () => track.scrollBy({ left: 280, behavior: 'smooth' });

// ===== CART =====
function openCart() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}
function closeCart() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
}
document.getElementById('cartBtn').onclick = openCart;
document.getElementById('closeCart').onclick = closeCart;
overlay.onclick = closeCart;

function money(n) {
  return 'Rp' + Number(n).toLocaleString('id-ID');
}

function renderCart() {
  document.getElementById('cartCount').textContent = cart.length;
  const box = document.getElementById('cartItems');
  if (!cart.length) {
    box.innerHTML = '<p class="empty">Your basket is waiting for a tiny friend ✦</p>';
  } else {
    box.innerHTML = cart.map((x, i) => `
      <div class="cart-row">
        <div class="cart-thumb">♡</div>
        <div><h4>${x.name}</h4><p>${money(x.price)}</p></div>
        <button class="cart-remove" onclick="removeCart(${i})">remove</button>
      </div>
    `).join('');
  }
  const total = cart.reduce((a, b) => a + b.price, 0);
  document.getElementById('subtotal').textContent = money(total);

  // Update checkout button to send order to sheet first
  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.onclick = async (e) => {
    e.preventDefault();
    if (!cart.length) return;

    const name = prompt("Nama kamu?");
    if (!name) return;
    const wa = prompt("Nomor WhatsApp? (contoh: 0812xxxx)");
    if (!wa) return;

    checkoutBtn.textContent = "Mengirim...";
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "order",
          items: cart,
          total: total,
          customer_name: name,
          whatsapp: wa,
          note: ""
        })
      });
      const result = await res.json();
      if (result.success) {
        const msg = `𝘩𝘢𝘪𝘺𝘪𝘦𝘦 𐙚 i 𝘸𝘢𝘯𝘯𝘢 𝘢𝘥𝘰𝘱𝘵 𝘢𝘯𝘥 𝘵𝘢𝘬𝘦 𝘤𝘢𝘳𝘦 𝘰𝘧 𝘵𝘩𝘪𝘴 𝘵𝘪𝘯𝘺 𝘣𝘦𝘴𝘵𝘪𝘦 ;\n\nOrder ID: ${result.order_id}\nMy besties: ${cart.map(x => x.name).join(', ')}\nTotal: ${money(total)}\nNama: ${name}`;
        window.open('https://wa.me/6282186945438?text=' + encodeURIComponent(msg), '_blank');
        cart = [];
        renderCart();
        closeCart();
        alert("Order berhasil dikirim! ♡");
      } else {
        alert("Gagal kirim order: " + (result.error || "coba lagi"));
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
    checkoutBtn.textContent = "adopt via WhatsApp →";
  };
}

window.removeCart = i => {
  cart.splice(i, 1);
  renderCart();
};

// ===== NEWSLETTER =====
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    if (!email) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "subscribe", email })
      });
      const result = await res.json();
      alert(result.message || "Berhasil join!");
      newsletterForm.reset();
    } catch (err) {
      alert("Gagal: " + err.message);
    }
  };
}

// ===== TRANSLATIONS =====
const translations = {
  id: { shop: 'Shop', about: 'About', promo: 'Promo', softness: 'Softness', reviews: 'Reviews', heroText: 'Boneka mini yang lembut, manis, dan siap jadi teman kecilmu. Pick a plush, give it a home, and make tiny memories.', adoptNow: 'Adopt a bestie ✦', ourStory: 'Our little story →' },
  en: { shop: 'Shop', about: 'About', promo: 'Promo', softness: 'Softness', reviews: 'Reviews', heroText: 'Tiny plushies that are soft, sweet, and ready to become your little bestie. Pick a plush, give it a home, and make tiny memories.', adoptNow: 'Adopt a bestie ✦', ourStory: 'Our little story →' },
  fr: { shop: 'Boutique', about: 'À propos', promo: 'Promo', softness: 'Douceur', reviews: 'Avis', heroText: 'De petits compagnons tout doux, adorables et prêts à devenir ton petit bestie. Choisis ton plush et crée de jolies petites mémoires.', adoptNow: 'Adopter un bestie ✦', ourStory: 'Notre histoire →' }
};
document.getElementById('language').addEventListener('change', e => {
  const t = translations[e.target.value];
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t[el.dataset.i18n]; });
});

// ===== INIT =====
loadProducts();

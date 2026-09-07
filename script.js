const products=[...document.querySelectorAll('.product-card')];
const track=document.getElementById('productTrack');
const search=document.getElementById('searchInput');
const noResults=document.getElementById('noResults');
search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();let shown=0;products.forEach(p=>{const ok=p.dataset.name.includes(q);p.style.display=ok?'block':'none';if(ok)shown++});noResults.style.display=shown?'none':'block'});
document.getElementById('prevBtn').onclick=()=>track.scrollBy({left:-280,behavior:'smooth'});
document.getElementById('nextBtn').onclick=()=>track.scrollBy({left:280,behavior:'smooth'});
let cart=[];const drawer=document.getElementById('cartDrawer'),overlay=document.getElementById('overlay');
function openCart(){drawer.classList.add('open');overlay.classList.add('open');drawer.setAttribute('aria-hidden','false')}
function closeCart(){drawer.classList.remove('open');overlay.classList.remove('open');drawer.setAttribute('aria-hidden','true')}
document.getElementById('cartBtn').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;overlay.onclick=closeCart;
document.querySelectorAll('.add-btn').forEach(btn=>btn.onclick=()=>{cart.push({name:btn.dataset.product,price:+btn.dataset.price});renderCart();openCart()});
function money(n){return 'Rp'+n.toLocaleString('id-ID')}
function renderCart(){document.getElementById('cartCount').textContent=cart.length;const box=document.getElementById('cartItems');if(!cart.length){box.innerHTML='<p class="empty">Your basket is waiting for a tiny friend ✦</p>'}else{box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div class="cart-thumb">♡</div><div><h4>${x.name}</h4><p>${money(x.price)}</p></div><button class="cart-remove" onclick="removeCart(${i})">remove</button></div>`).join('')}document.getElementById('subtotal').textContent=money(cart.reduce((a,b)=>a+b.price,0));const msg=cart.length?`𝘩𝘢𝘪𝘺𝘪𝘦𝘦 𐙚 i 𝘸𝘢𝘯𝘯𝘢 𝘢𝘥𝘰𝘱𝘵 𝘢𝘯𝘥 𝘵𝘢𝘬𝘦 𝘤𝘢𝘳𝘦 𝘰𝘧 𝘵𝘩𝘪𝘴 𝘵𝘪𝘯𝘺 𝘣𝘦𝘴𝘵𝘪𝘦 ;\n\nMy besties: ${cart.map(x=>x.name).join(', ')}\nTotal: ${money(cart.reduce((a,b)=>a+b.price,0))}`:'𝘩𝘢𝘪𝘺𝘪𝘦𝘦 𐙚 i 𝘸𝘢𝘯𝘯𝘢 𝘢𝘥𝘰𝘱𝘵 𝘢𝘯𝘥 𝘵𝘢𝘬𝘦 𝘤𝘢𝘳𝘦 𝘰𝘧 𝘵𝘩𝘪𝘴 𝘵𝘪𝘯𝘺 𝘣𝘦𝘴𝘵𝘪𝘦 ;`;document.getElementById('checkoutBtn').href='https://wa.me/6282186945438?text='+encodeURIComponent(msg)}
window.removeCart=i=>{cart.splice(i,1);renderCart()};
const translations={id:{shop:'Shop',about:'About',promo:'Promo',softness:'Softness',reviews:'Reviews',heroText:'Boneka mini yang lembut, manis, dan siap jadi teman kecilmu. Pick a plush, give it a home, and make tiny memories.',adoptNow:'Adopt a bestie ✦',ourStory:'Our little story →'},en:{shop:'Shop',about:'About',promo:'Promo',softness:'Softness',reviews:'Reviews',heroText:'Tiny plushies that are soft, sweet, and ready to become your little bestie. Pick a plush, give it a home, and make tiny memories.',adoptNow:'Adopt a bestie ✦',ourStory:'Our little story →'},fr:{shop:'Boutique',about:'À propos',promo:'Promo',softness:'Douceur',reviews:'Avis',heroText:'De petits compagnons tout doux, adorables et prêts à devenir ton petit bestie. Choisis ton plush et crée de jolies petites mémoires.',adoptNow:'Adopter un bestie ✦',ourStory:'Notre histoire →'}};
document.getElementById('language').addEventListener('change',e=>{const t=translations[e.target.value];document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t[el.dataset.i18n]});});

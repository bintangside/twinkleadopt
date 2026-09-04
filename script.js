const WA="6282186945438";
const waText="𝘩𝘢𝘪𝘺𝘪𝘦𝘦 𐙚 i 𝘸𝘢𝘯𝘯𝘢 𝘢𝘥𝘰𝘱𝘵 𝘢𝘯𝘥 𝘵𝘢𝘬𝘦 𝘤𝘢𝘳𝘦 𝘰𝘧 𝘵𝘩𝘪𝘴 𝘵𝘪𝘯𝘺 𝘣𝘦𝘴𝘵𝘪𝘦 ;";
const waBtn=document.getElementById("waBtn"); waBtn.href=`https://wa.me/${WA}?text=${encodeURIComponent(waText)}`;

let cart=[];
const panel=document.getElementById("cartPanel"), overlay=document.getElementById("overlay");
function money(n){return "Rp"+n.toLocaleString("id-ID")}
function renderCart(){
  const box=document.getElementById("cartItems"), count=document.getElementById("cartCount");
  count.textContent=cart.reduce((a,x)=>a+x.qty,0);
  if(!cart.length){box.innerHTML='<p class="empty">your basket is waiting for a tiny bestie ✦</p>'}
  else box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div><b>${x.name}</b><small>${money(x.price)} × ${x.qty}</small></div><button class="remove" onclick="removeItem(${i})">remove</button></div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}
function removeItem(i){cart.splice(i,1);renderCart()}
window.removeItem=removeItem;
document.querySelectorAll(".add").forEach(b=>b.addEventListener("click",()=>{
  const name=b.dataset.product, price=+b.dataset.price, found=cart.find(x=>x.name===name);
  found?found.qty++:cart.push({name,price,qty:1}); renderCart();
}));
function openCart(){panel.classList.add("open");overlay.classList.add("show")}
function closeCart(){panel.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart; document.getElementById("closeCart").onclick=closeCart; overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>{window.open(`https://wa.me/${WA}?text=${encodeURIComponent(waText+"\n\nBasket: "+cart.map(x=>`${x.name} x${x.qty}`).join(", "))}`,"_blank")};

let idx=0; const slides=[...document.querySelectorAll(".slide")], dots=document.getElementById("dots");
slides.forEach((_,i)=>{let d=document.createElement("i");d.className="dot";d.onclick=()=>show(i);dots.appendChild(d)});
function show(n){idx=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.style.display=(i>=idx&&i<idx+3)?"block":"none");[...dots.children].forEach((d,i)=>d.classList.toggle("on",i===idx))}
document.getElementById("prev").onclick=()=>show(idx-1);document.getElementById("next").onclick=()=>show(idx+1);show(0);

const input=document.getElementById("searchInput"), products=[...document.querySelectorAll(".product")], no=document.getElementById("noResults");
input.oninput=()=>{const q=input.value.toLowerCase().trim();let found=0;products.forEach(p=>{const ok=p.dataset.name.includes(q)||p.innerText.toLowerCase().includes(q);p.style.display=ok?"block":"none";if(ok)found++});no.style.display=found?"none":"block"};

const translations={
 id:{shop:"Shop",about:"About",promo:"Promo",softness:"Tekstur lembut",heroText:"Boneka mini dengan hati yang lembut, wajah manis, dan banyak ruang untuk dipeluk.",shopNow:"Belanja bestie →",ourStory:"Cerita kecil kami"},
 en:{shop:"Shop",about:"About",promo:"Promo",softness:"Softness",heroText:"Mini plushies with soft hearts, sweet faces, and lots of room for cuddles.",shopNow:"Shop besties →",ourStory:"Our little story"},
 fr:{shop:"Boutique",about:"À propos",promo:"Promo",softness:"Douceur",heroText:"De mini peluches aux cœurs doux, aux jolies bouilles et prêtes pour les câlins.",shopNow:"Choisir mon bestie →",ourStory:"Notre petite histoire"}
};
document.getElementById("language").onchange=e=>{const t=translations[e.target.value];document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(t[k])el.textContent=t[k]});const ph=e.target.value==="fr"?"où est mon bestie ?":e.target.value==="en"?"where’s my bestie ?":"where's my bestie ?";input.placeholder=ph};
document.getElementById("menuBtn").onclick=()=>document.querySelector(".links").classList.toggle("mobile-show");

// ===== BACKSOUND =====
// Add your own MP3 file beside index.html and name it "backsound.mp3".
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicPlaying = false;

musicBtn.addEventListener("click", async () => {
  if (!musicPlaying) {
    try {
      await bgMusic.play();
      musicPlaying = true;
      musicBtn.classList.add("playing");
      musicBtn.firstChild.textContent = "♫";
      musicBtn.title = "Pause backsound";
    } catch (err) {
      alert("Tambahkan file backsound.mp3 di folder website terlebih dahulu ♡");
    }
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove("playing");
    musicBtn.firstChild.textContent = "♫";
    musicBtn.title = "Play backsound";
  }
});

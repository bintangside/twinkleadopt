const WA="6282186945438", MSG="𝘩𝘢𝘪𝘺𝘪𝘦𝘦 𐙚 i 𝘸𝘢𝘯𝘯𝘢 𝘢𝘥𝘰𝘱𝘵 𝘢𝘯𝘥 𝘵𝘢𝘬𝘦 𝘤𝘢𝘳𝘦 𝘰𝘧 𝘵𝘩𝘪𝘴 𝘵𝘪𝘯𝘺 𝘣𝘦𝘴𝘵𝘪𝘦 ;", wa=`https://wa.me/${WA}?text=${encodeURIComponent(MSG)}`;
const P=[
{id:1,c:"rabbit",n:"Bunny Blush",p:129000,img:"https://images.pexels.com/photos/4886921/pexels-photo-4886921.jpeg?auto=compress&cs=tinysrgb&w=700"},
{id:2,c:"duck",n:"Ducky Sunny",p:119000,img:"https://images.pexels.com/photos/6999392/pexels-photo-6999392.jpeg?auto=compress&cs=tinysrgb&w=700"},
{id:3,c:"bear",n:"Teddy Cloud",p:139000,img:"https://images.unsplash.com/photo-1598063183638-4ffe73c6f5f3?auto=format&fit=crop&w=700&q=80"},
{id:4,c:"monkey",n:"Momo Monkey",p:125000,img:"https://images.unsplash.com/photo-1563901935883-cb61f7a2b1f0?auto=format&fit=crop&w=700&q=80"},
{id:5,c:"unicorn",n:"Luna Unicorn",p:149000,img:"https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=700&q=80"},
{id:6,c:"rabbit",n:"Marshmallow Bunny",p:135000,img:"https://images.pexels.com/photos/6999379/pexels-photo-6999379.jpeg?auto=compress&cs=tinysrgb&w=700"},
{id:7,c:"bear",n:"Pinkie Bear",p:145000,img:"https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=700&q=80"},
{id:8,c:"unicorn",n:"Sugar Star",p:155000,img:"https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=700&q=80"}];
const labels={rabbit:"Rabbit",duck:"Duck",bear:"Bear",monkey:"Monkey",unicorn:"Unicorn"}, money=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let cart=JSON.parse(localStorage.getItem("twinkleCartV2")||"[]"), wish=JSON.parse(localStorage.getItem("twinkleWishV2")||"[]"), offset=0;
function card(p){return `<article class="product"><button class="heart" onclick="toggleWish(${p.id})">${wish.includes(p.id)?"♥":"♡"}</button><img src="${p.img}" alt="${p.n}" loading="lazy"><div class="product-body"><small>${labels[p.c]}</small><h3>${p.n}</h3><div class="bottom"><span class="price">${money(p.p)}</span><button class="add" onclick="add(${p.id})">+</button></div></div></article>`}
function render(list=P){document.querySelector("#products").innerHTML=list.map(card).join("")}
function best(){document.querySelector("#bestGrid").innerHTML=P.slice(0,4).map(card).join("")}
function carousel(){let arr=[P[0],P[1],P[2],P[3],P[4]], shift=offset%5;arr=arr.slice(shift).concat(arr.slice(0,shift));document.querySelector("#carousel").innerHTML=arr.map(p=>`<article><img src="${p.img}" alt="${p.n}"><div><span>${p.n}</span><span>♡</span></div></article>`).join("")}
function save(){localStorage.setItem("twinkleCartV2",JSON.stringify(cart));localStorage.setItem("twinkleWishV2",JSON.stringify(wish));renderCart();renderWish();render();best();document.querySelector("#cartCount").textContent=cart.reduce((a,x)=>a+x.q,0);document.querySelector("#wishCount").textContent=wish.length}
function add(id){let x=cart.find(x=>x.id===id);x?x.q++:cart.push({id,q:1});save();open("cartDrawer")}
function qty(id,n){let x=cart.find(x=>x.id===id);x.q+=n;if(x.q<1)cart=cart.filter(y=>y.id!==id);save()}
function renderCart(){let box=document.querySelector("#cartItems");if(!cart.length){box.innerHTML='<div class="empty">Your cart is waiting for a tiny bestie ♡</div>';document.querySelector("#total").textContent="Rp0";return}let total=0;box.innerHTML=cart.map(x=>{let p=P.find(y=>y.id===x.id);total+=p.p*x.q;return `<div class="cart-item"><img src="${p.img}"><div><h4>${p.n}</h4><p>${money(p.p)}</p></div><div class="qty"><button onclick="qty(${p.id},-1)">−</button>${x.q}<button onclick="qty(${p.id},1)">+</button></div></div>`}).join("");document.querySelector("#total").textContent=money(total)}
function toggleWish(id){wish.includes(id)?wish=wish.filter(x=>x!==id):wish.push(id);save();open("wishDrawer")}
function renderWish(){let b=document.querySelector("#wishItems");if(!wish.length){b.innerHTML='<div class="empty">No tiny besties saved yet ♡</div>';return}b.innerHTML=wish.map(id=>{let p=P.find(x=>x.id===id);return `<div class="wish-item"><img src="${p.img}"><div><h4>${p.n}</h4><p>${money(p.p)}</p></div><button class="add" onclick="add(${p.id})">+</button></div>`}).join("")}
function open(id){document.querySelectorAll(".drawer").forEach(x=>x.classList.remove("open"));document.querySelector("#"+id).classList.add("open");document.querySelector("#overlay").classList.add("show")}
function close(){document.querySelectorAll(".drawer").forEach(x=>x.classList.remove("open"));document.querySelector("#overlay").classList.remove("show")}
document.querySelector("#cartBtn").onclick=()=>open("cartDrawer");document.querySelector("#wishBtn").onclick=()=>open("wishDrawer");document.querySelector("#closeCart").onclick=close;document.querySelector("#closeWish").onclick=close;document.querySelector("#overlay").onclick=close;
document.querySelector("#wa").href=wa;document.querySelector("#contactWa").href=wa;
document.querySelector("#checkout").onclick=()=>{if(!cart.length)return alert("Your cart is empty ♡");let lines=cart.map(x=>{let p=P.find(y=>y.id===x.id);return `${p.n} x${x.q} — ${money(p.p*x.q)}`}).join("%0A");window.open(`${wa}&text=${encodeURIComponent(MSG+"\n\nMy order:\n"+lines)}`,"_blank")};
document.querySelector("#searchBtn").onclick=()=>document.querySelector("#search").classList.toggle("show");
document.querySelector("#searchInput").oninput=e=>{let q=e.target.value.toLowerCase();render(P.filter(p=>(p.n+p.c).toLowerCase().includes(q)));document.querySelector("#shop").scrollIntoView({behavior:"smooth"})};
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");let c=b.dataset.cat;render(c==="all"?P:P.filter(p=>p.c===c))});
document.querySelector("#next").onclick=()=>{offset++;carousel()};document.querySelector("#prev").onclick=()=>{offset+=4;carousel()};
document.querySelector("#menuBtn").onclick=()=>{let n=document.querySelector("#nav");n.style.display=n.style.display==="flex"?"none":"flex";n.style.position="absolute";n.style.top="76px";n.style.left="0";n.style.right="0";n.style.padding="20px 5%";n.style.background="#fff8f0";n.style.flexDirection="column"};
render();best();carousel();save();

const products = [
  { name: "Phone", category: "electronics", price: 500, rating: 4.5, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406657/phone_e0cmlh.jpg" },
  { name: "Laptop", category: "electronics", price: 1200, rating: 4.7, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406655/laptop_zzkocj.webp" },
  { name: "SmartWatch", category: "electronics", price: 250, rating: 4.6, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406657/Smartwatch_o7jpgi.jpg" },
  { name: "Bluetooth Speaker", category: "electronics", price: 300, rating: 4.2, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406653/bluetooth_Speaker_qhzhif.webp" },
  { name: "Jeans", category: "clothing", price: 40, rating: 4.2, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406655/jeans_bmeope.jpg" },
  { name: "T-Shirt", category: "clothing", price: 25, rating: 4.0, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406657/t-shirt_lfagb9.jpg" },
  { name: "Jacket", category: "clothing", price: 60, rating: 4.4, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406656/jackect_hhszv4.webp" },
  { name: "Dress", category: "clothing", price: 90, rating: 4.3, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406653/dress_j1ykx6.jpg" },
  { name: "King Series", category: "books", price: 15, rating: 4.8, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406656/novel_i6lnyr.jpg" },
  { name: "Twisted Series", category: "books", price: 5, rating: 4.1, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406656/novel2_zdyxzx.jpg" },
  { name: "Perfume", category: "Accessories", price: 250, rating: 4.6, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406657/jessica-weiller-So4eFi-d1nc-unsplash_e6ugjk.jpg" },
  { name: "Chain", category: "Accessories", price: 300, rating: 4.2, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406654/chain_me74zp.webp" },
  { name: "Suit", category: "Accessories", price: 430, rating: 4.2, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406657/suit_pqz7jb.jpg" },
  { name: "Bracelet", category: "Accessories", price: 190, rating: 4.3, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406654/bracelet_r5kiia.jpg" },
  { name: "Hairclip", category: "Accessories", price: 150, rating: 4.8, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406654/hairclip_rz2yci.webp" },
  { name: "Sarees", category: "clothing", price: 340, rating: 4.2, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406656/saree_jrazon.jpg" },
  { name: "Anarkali", category: "clothing", price: 290, rating: 4.3, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406654/anarkali_wtky4b.webp" },
  { name: "Saree", category: "clothing", price: 159, rating: 4.8, image: "https://res.cloudinary.com/duracoq4p/image/upload/v1773406658/saree1_xzrj2y.webp" },
];


let cart = JSON.parse(localStorage.getItem('cart_v1')) || [];

let users = JSON.parse(localStorage.getItem('users_v1')) || []; 
let session = JSON.parse(localStorage.getItem('session_v1')) || null; 

function saveUsers(){ localStorage.setItem('users_v1', JSON.stringify(users)); }
function saveSession(){ localStorage.setItem('session_v1', JSON.stringify(session)); }

function updateCartSummary(){
  const totalItems = cart.reduce((s,it)=>s + (it.quantity||0),0);
  const totalPrice = cart.reduce((s,it)=>s + it.price*(it.quantity||0),0);
  document.getElementById("cartSummary").textContent = `Cart: ${totalItems} items ($${totalPrice.toFixed(2)})`;
  document.getElementById("cartTotal").textContent = totalPrice>0 ? `Total: $${totalPrice.toFixed(2)}` : "";
}
function saveCart(){ localStorage.setItem('cart_v1', JSON.stringify(cart)); updateCartSummary(); }

function toggleCart(name){
  // Check if user is logged in before allowing cart actions
  if(!session || !session.email){
    alert("Login to add items.");
    openLoginModal();
    return;
  }
  
  const idx = cart.findIndex(i=>i.name===name);
  if(idx===-1){
    const product = products.find(p=>p.name===name);
    if(!product) return;
    cart.push({...product, quantity:1});
  } else {
    cart.splice(idx,1);
  }
  saveCart();
  renderProducts(getCurrentFilteredProducts());
  renderCartItems();
}


function isInCart(productName){ return cart.some(i=>i.name===productName); }

function renderProducts(list){
  const container = document.getElementById("productList");
  container.innerHTML = "";
  if(!list || list.length===0){
    container.innerHTML = `<div class="no-results"><i class="fa-solid fa-magnifying-glass-location"></i> Item not found</div>`;
    return;
  }
  list.forEach(p=>{
    const inCart = isInCart(p.name);
    const buttonText = inCart ? "Remove from Cart" : "Add to Cart";
    const buttonClass = inCart ? "btn added" : "btn primary";
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price}</p>
      <p>Rating: ${p.rating}</p>
      <button class="${buttonClass}" onclick="toggleCart('${p.name}')">${buttonText}</button>
    `;
    container.appendChild(card);
  });
}

function getCurrentFilteredProducts(){
  const query = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categorySelect").value;
  return products.filter(product=>{
    const matchName = product.name.toLowerCase().includes(query);
    const matchCategory = category==='all' || product.category===category;
    return matchName && matchCategory;
  });
}
function searchProducts(){
  const category = document.getElementById("categorySelect").value;
  const title = category==='all' ? "All Products" : `Results in ${capitalize(category)}`;
  document.getElementById("sectionHeading").textContent = title;
  renderProducts(getCurrentFilteredProducts());
}
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

//  CART DRAWER 
function renderCartItems(){
  const itemsContainer = document.getElementById("cartItems");
  itemsContainer.innerHTML = "";
  if(cart.length===0){
    itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    updateCartSummary();
    return;
  }
  cart.forEach(item=>{
    const row = document.createElement('div');
    row.className='cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
      <div style="flex:1;min-width:0;">
        <h4 style="margin:0 0 6px 0;">${item.name}</h4>
        <div>Price: $${item.price.toFixed(2)}</div>
        <div class="qty-controls" aria-label="Quantity controls">
          <button onclick="decreaseQty('${escapeQuotes(item.name)}')" aria-label="Decrease">-</button>
          <span id="qty-${safeId(item.name)}">${item.quantity}</span>
          <button onclick="increaseQty('${escapeQuotes(item.name)}')" aria-label="Increase">+</button>
          <button class="remove-x" title="Remove item" onclick="removeFromCart('${escapeQuotes(item.name)}')">&times;</button>
        </div>
      </div>
      <div class="price">$${(item.price*item.quantity).toFixed(2)}</div>
    `;
    itemsContainer.appendChild(row);
  });
  updateCartSummary();
}
function safeId(name){ return name.replace(/\s+/g,'_').replace(/[^\w\-]/g,''); }
function escapeQuotes(s){ return s.replace(/'/g,"\\'").replace(/"/g,'\\"'); }

function increaseQty(name){
  const idx = cart.findIndex(i=>i.name===name);
  if(idx===-1) return;
  cart[idx].quantity = (cart[idx].quantity||0)+1;
  saveCart();
  document.getElementById(`qty-${safeId(name)}`).textContent = cart[idx].quantity;
  renderCartItems();
  renderProducts(getCurrentFilteredProducts());
}
function decreaseQty(name){
  const idx = cart.findIndex(i=>i.name===name);
  if(idx===-1) return;
  if(cart[idx].quantity>1) cart[idx].quantity--;
  else cart.splice(idx,1);
  saveCart();
  renderCartItems();
  renderProducts(getCurrentFilteredProducts());
}
function removeFromCart(name){
  cart = cart.filter(i=>i.name!==name);
  saveCart();
  renderCartItems();
  renderProducts(getCurrentFilteredProducts());
}
function buyNow(){
  if(cart.length===0){ alert("Your cart is empty!"); return; }
  const total = cart.reduce((s,i)=>s + i.price*(i.quantity||0),0);
  alert(`Total amount: ${total.toFixed(2)}\nReady for payment.`);
  const buyButton = document.querySelector(".cart-drawer .btn.primary");
  if(buyButton){ buyButton.textContent="Order Placed"; buyButton.disabled=true; buyButton.classList.remove('primary'); buyButton.classList.add('added'); }
  cart = [];
  saveCart();
  renderProducts(getCurrentFilteredProducts());
  renderCartItems();
  setTimeout(()=>{ if(buyButton){ buyButton.textContent="Buy Now"; buyButton.disabled=false; buyButton.classList.add('primary'); buyButton.classList.remove('added'); } },5000);
}
function toggleCartDrawer(){
  const drawer = document.getElementById("cartDrawer");
  drawer.classList.toggle('open');
  drawer.setAttribute('aria-hidden', drawer.classList.contains('open') ? 'false' : 'true');
  renderCartItems();
}

function openAuthMenu(e){
  e.stopPropagation();
  const menu = document.getElementById('signMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
function openLoginModal(){
  document.getElementById('signMenu').style.display = 'none';
  document.getElementById('loginModal').style.display = 'block';
  document.getElementById('loginModal').setAttribute('aria-hidden','false');
}
function closeLoginModal(){
  document.getElementById('loginModal').style.display = 'none';
  document.getElementById('loginModal').setAttribute('aria-hidden','true');
}
function openRegisterModal(){
  document.getElementById('signMenu').style.display = 'none';
  document.getElementById('registerModal').style.display = 'block';
  document.getElementById('registerModal').setAttribute('aria-hidden','false');
  document.getElementById('otpSection').style.display = 'none';
}
function closeRegisterModal(){
  document.getElementById('registerModal').style.display = 'none';
  document.getElementById('registerModal').setAttribute('aria-hidden','true');
}


function genOtp(){ return Math.floor(100000 + Math.random()*900000).toString(); }

// Simulate sending OTP - popup OTP on console.log only
function sendOtpToEmail(email, otp){
  alert("Check console for simulated OTP (in real app, it would be emailed).");
  console.log(`Simulated: OTP for ${email} => ${otp}`);
}

// Register form handling
let pendingOtp = null;
let pendingRegData = null;

document.getElementById('registerForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pwd = document.getElementById('regPassword').value;
  if(!name || !email || !pwd){ alert('All fields required'); return; }
  // check if already registered
  if(users.some(u=>u.email===email)){ alert('Email already registered. Please login.'); openLoginModal(); closeRegisterModal(); return; }
  pendingOtp = genOtp();
  pendingRegData = {name,email,password:pwd};
  sendOtpToEmail(email,pendingOtp);
  document.getElementById('otpSection').style.display = 'block';
});

// Confirm OTP
document.getElementById('confirmOtpBtn').addEventListener('click', function(){
  const entered = document.getElementById('regOtp').value.trim();
  if(!entered){ alert('Enter OTP'); return; }
  if(entered === pendingOtp){
    users.push({...pendingRegData});
    saveUsers();
    alert('Registration successful. Please login now.');
    pendingOtp = null;
    pendingRegData = null;
    document.getElementById('registerForm').reset();
    document.getElementById('otpSection').style.display = 'none';
    closeRegisterModal();
    openLoginModal();
  } else {
    alert('OTP incorrect. Check console and try again.');
  }
});

function togglePassword(id, icon){
  const field = document.getElementById(id);
  if(!field) return;
  if(field.type === 'password'){
    field.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    field.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Login handling
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pwd = document.getElementById('loginPassword').value;
  const user = users.find(u=>u.email===email && u.password===pwd);
  if(!user){ alert('Invalid credentials.'); return; }
  session = {email:user.email, name:user.name};
  saveSession();
  closeLoginModal();
  applyLoggedInUI();
  alert('Logged in successfully');
});

function applyLoggedInUI(){
  const signInEl = document.getElementById('signInBtn');
  const registerEl = document.getElementById('registerBtn');
  const logoutContainer = document.getElementById('logoutContainer');
  const signedNameEl = document.getElementById('signedName');
  const signBtn = document.getElementById('signBtn');

  if(session && session.name){
    signedNameEl.style.display = 'inline-block';
    signedNameEl.textContent = session.name.split(' ')[0]; 
    signInEl.style.display = 'none';
    registerEl.style.display = 'none';
    logoutContainer.style.display = 'block';
  } else {
    signedNameEl.style.display = 'none';
    signedNameEl.textContent = '';
    signInEl.style.display = 'block';
    registerEl.style.display = 'block';
    logoutContainer.style.display = 'none';
  }
  saveSession();
}

function signOut(){
  session = null;
  saveSession();
  applyLoggedInUI();
  alert('Signed out');
  document.getElementById('signMenu').style.display = 'none';
}

window.addEventListener('click', function(e){
  if(!e.target.closest('.signup') && !e.target.closest('#signMenu')){
    const m = document.getElementById('signMenu'); if(m) m.style.display = 'none';
  }
  if(e.target.id === 'loginModal') closeLoginModal();
});

renderProducts(products);
renderCartItems();
updateCartSummary();

try {
  const storedSession = JSON.parse(localStorage.getItem('session_v1'));
  if(storedSession && storedSession.name){
    session = storedSession;
  }
} catch(err){  }
applyLoggedInUI();

document.getElementById('searchInput').addEventListener('input', searchProducts);
document.getElementById('categorySelect').addEventListener('change', searchProducts);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => img.classList.add('fade-in'));
  });
});

let cartbtn = document.getElementById('cartbtn');
let count = document.getElementById('counter');
let category = document.getElementById('categories');
let sorting = document.getElementById('sorting');
let searchbox = document.getElementById('inputbox');
let totalamount = document.getElementById('total-price');
let closesidebarbtn = document.getElementById('close-cart-container');
let cartcontainer = document.getElementById('cart-container');
let container = document.getElementById('product-container');
let cartcontainerlist = document.getElementById('cart-list');
let cartcounter = document.getElementById('counter');

category.addEventListener('change', updateFilters);
sorting.addEventListener('change', updateFilters);
searchbox.addEventListener('input', updateFilters);


let overlay = document.createElement('div');
overlay.classList.add('cart-overlay');
document.body.appendChild(overlay);

cartbtn.addEventListener('click', () => {
    cartcontainer.style.width = '360px';
    overlay.classList.add('active');
});

closesidebarbtn.addEventListener('click', () => {
    cartcontainer.style.width = '0';
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartcontainer.style.width = '0';
    overlay.classList.remove('active');
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let AllProducts = [];


async function FethData() {
    container.innerHTML = 'Loading...';

    try {
        let response = await fetch('https://dummyjson.com/products?limit=200');
        let data = await response.json();

        AllProducts = data.products;

        let html = AllProducts.map((item) => {
            return `
                <div class='card'>
                    <div class='card-info-content'>
                        <img src='${item.thumbnail}' alt='${item.title}' loading='lazy'/>
                        <h3>${item.category || ''}</h3>
                        <p>${item.title}</p>
                    </div>
                    <div class='cart-bottom-content'>
                        <h3>$${item.price}</h3>
                        <button onclick="Addtocart(${item.id})">+ Add</button>
                    </div>
                </div>`;
        });

        container.innerHTML = html.join('');

    } catch (err) {
        container.innerHTML = 'Failed to load products.';
        console.log(err);
    }
}



FethData();

function renderProducts(products) {
    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }

    let html = products.map((item) => {
        return `
            <div class='card'>
                <div class='card-info-content'>
                    <img src='${item.thumbnail}' alt='${item.title}' loading='lazy'/>
                    <h3>${item.category || ''}</h3>
                    <p>${item.title}</p>
                </div>
                <div class='cart-bottom-content'>
                    <h3>$${item.price}</h3>
                    <button onclick="Addtocart(${item.id})">+ Add</button>
                </div>
            </div>`;
    });

    container.innerHTML = html.join('');
}


function Addtocart(id) {
    let existingitem = cart.find((item) => item.id == id);
    if (existingitem) {
        existingitem.quantity += 1;
    } else {
        let product = AllProducts.find((p) => p.id == id);
        cart.push({ ...product, quantity: 1 });
    }
    Renderitem();
    TotalItemPrice();
    itemcount();
    savedata();
    showtoast('Added to cart ✓');
}

function Renderitem() {
    if (cart.length === 0) {
        cartcontainerlist.innerHTML = `
            <div class='emptyCart'>
                <i class='ri-shopping-bag-line'></i>
                Your cart is empty
            </div>`;
        return;
    }

    let html = cart.map((item) => {
        return `
            <div class='cart-item'>
                <img src='${item.thumbnail}' alt='${item.title}'/>
                <div class='cart-item-content'>
                    <h3>${item.title}</h3>
                    <span class='item-price'>$${item.price}</span>
                </div>
                <div class='cart-btns'>
                    <button onclick="IncrementQ(${item.id})">+</button>
                    <h3>${item.quantity}</h3>
                    <button onclick="DecrementQ(${item.id})">-</button>
                    <button onclick='RemoveItem(${item.id})'>✕</button>
                </div>
            </div>`;
    });

    cartcontainerlist.innerHTML = html.join('');
}


function TotalItemPrice() {
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalamount.innerHTML = `$${total.toFixed(2)}`;
}


function itemcount() {
    let total = cart.reduce((acc, i) => acc + i.quantity, 0);
    count.textContent = `${total} Item${total !== 1 ? 's' : ''}`;
}


function IncrementQ(id) {
    let itemQ = cart.find((item) => item.id === id);
    itemQ.quantity += 1;
    Renderitem();
    TotalItemPrice();
    itemcount();
    savedata();
}


function DecrementQ(id) {
    let itemQ = cart.find((item) => item.id === id);
    if (itemQ.quantity > 1) {
        itemQ.quantity -= 1;
    } else {
        RemoveItem(id);
        return;
    }
    Renderitem();
    TotalItemPrice();
    itemcount();
    savedata();
}


function RemoveItem(id) {
    cart = cart.filter((item) => item.id !== id);
    Renderitem();
    TotalItemPrice();
    itemcount();
    savedata();
    showtoast('Item removed');
}


function savedata() {
    localStorage.setItem('cart', JSON.stringify(cart));
}



function updateFilters() {
    let inputvalue = searchbox.value.toLowerCase().trim();
    let sortvalue = sorting.value;
    let cat = category.value;

    let filtered = [...AllProducts];

    if (inputvalue) {
        filtered = filtered.filter((item) =>
            item.title.toLowerCase().includes(inputvalue)
        );
    }

    if (cat && cat !== 'all') {
        filtered = filtered.filter((item) => item.category === cat);
    }

    if (sortvalue === 'price-low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortvalue === 'price-high-low') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortvalue === 'A-Z') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortvalue === 'Z-A') {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderProducts(filtered);
}


function showtoast(msg) {
    let toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

Renderitem();
TotalItemPrice();
itemcount();

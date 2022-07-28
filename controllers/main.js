let productList = []
let carts = []

main()
function main() {
    apiGetProduct().then(function (respon) {
        const products = respon.data
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            products[i] = new Product(product.name, product.price, product.screen, product.blackCamera, product.frontCamera, product.img, product.desc, product.type)
        }
        productList = [...products]
        display(productList)

        // lấy data từ local
        carts = JSON.parse(localStorage.getItem("carts")) || [];
        // hiện mảng trong giỏ
        displayCart(carts)
    })
}
let branch = []
function myChoice() {
    const choice = document.getElementById("branch").value
    console.log('choice', choice)
    apiGetProduct().then(function (respon) {
        const products = respon.data
        console.log(products);

        // for (let i = 0; i < products.length; i++) {
        //     const product = products[i];
        //     products[i] = new Product(product.name, product.price, product.screen, product.blackCamera, product.frontCamera, product.img, product.desc, product.type)
        //     if (product.type === choice) {

        //     }
        // }
        branch = products.filter((product) => product.type === choice)

        console.log(branch);
        display(branch)
        if (choice == 0) {
            display(productList)
        }

    })
}
function checkid(id) {
    const list = carts;
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            return true
        }
    }
}


function addToCart(id) {
    console.log(carts);
    const index = productList.findIndex(item => +item.id === +id);
    if (index === -1) {
        alert("Ko tìm thay san pham")
        return;
    }

    const cart = productList[index];
    const cartItem = new Cart(cart.id, cart.img, cart.name, cart.price, cart.type, cart.quantity)

    const value = carts.findIndex((item) => item.id === cart.id)
    console.log(cart);
    if (value === -1) {
        cartItem.quantity = 1
        carts.push(cartItem)
        console.log(carts);

    } else {
        carts[value].quantity += 1
    }

    displayCart(carts)
    localStorage.setItem('carts', JSON.stringify((carts)))


}

function displayCart(carts) {
    console.log(carts);
    let tbodyEl = document.getElementById("tbody");
    let html = ""
    for (let i = 0; i < carts.length; i++) {
        const item = carts[i]
        html += ` <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><img src=${item.img} width="50px" height="50px"/></td>
            <td><button onclick="SumChangeQuantity('${item.id}')
            " class='btn btn-dark'>+</button>${item.quantity}<button onclick="SubChangeQuantity('${item.id}')" class='btn btn-dark'>-</button></td>
            <td>${item.quantity * item.price}</td>
            <td>
            <button class = 'btn btn-danger'onclick="removeProduct('${item.id}')">Xóa</button>
            </td>
        `;
        console.log(item.id);
        
    }
    ;
    // lưu data xuống local storage
    tbodyEl.innerHTML = html
}

function removeProduct(id) {
    console.log(carts);
    const cart = carts.filter((item) => item.id === id);
    carts.pop(cart)
    displayCart(carts)
}
function SumChangeQuantity(productId) {
    console.log(productId);
    const value = carts.findIndex((item) => item.id == productId)
    console.log(value);
    // const cart = carts[value]
    // cart = new Cart(cart.id, cart.img, cart.name, cart.pric, cart.type, cart.quantity)
    // cart.quantity +=1

    carts[value].quantity +=1
    displayCart(carts)
    
}
function SubChangeQuantity(productId) {
    console.log(productId);
    const value = carts.findIndex((item) => item.id == productId)
    console.log(value);
    // const cart = carts[value]
    // cart = new Cart(cart.id, cart.img, cart.name, cart.pric, cart.type, cart.quantity)
    // cart.quantity +=1

    carts[value].quantity -=1
    displayCart(carts)
    
}

function display(products) {
    let html = "";
    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        html += `
        <div class="col-sm-3" style = "margin-right:20px">
        <div class="card">
            <img height="300px"  src = "${product.img}"/>
            <div class="card-body">
            <h3 class="card-title">${product.name}</h3>
            <span class="card-text">${product.price}</span>
            <br/>
            <button class='btn btn-success addCart' onclick="addToCart('${product.id}')">Add to cart</button>
            </div>
            </div>
        </div>`
    }

    // Dom toi tbody va innerHTML  = html
    document.getElementById("carousel").innerHTML = html
}
function resetForm() {
    carts = []
    displayCart(carts)
    localStorage.setItem('carts', JSON.stringify((carts)))
}



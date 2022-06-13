let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Vintage Harley Davidson jacket',
        tag: 'vintageharleydavidsonjacket',
        price: 17,
        inCart: 0
    }]


    for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector("#cartVal").textContent = productNumbers;
    document.querySelector("#cartVal2").textContent = productNumbers;
  }
}

function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if( action ) {
      localStorage.setItem("cartNumbers", productNumbers - 1);
      document.querySelector('#cartVal').textContent = productNumbers - 1;
      document.querySelector('#cartVal2').textContent = productNumbers - 1;
      console.log("action running");
  } else if( productNumbers ) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
      document.querySelector('#cartVal').textContent = productNumbers + 1;
      document.querySelector('#cartVal2').textContent = productNumbers + 1;


  } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector('#cartVal').textContent =  1;
      document.querySelector('#cartVal2').textContent =  1;

  }
  setItems(product);
}

function setItems(product) {
let productNumbers = localStorage.getItem('cartNumbers')
productNumbers = parseInt(productNumbers)
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
  let cart = localStorage.getItem("totalCost");

  if (action) {
    cart = parseInt(cart);
    localStorage.setItem("totalCost", cart - product.price);
  } else if (cart != null){
    cart = parseInt(cart);

    localStorage.setItem("totalCost", cart + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let cart = localStorage.getItem("totalCost")
  cart = parseInt(cart)
  let productContainer = document.querySelector(".products");
  

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div style="display:flex;">
          <div class="product" >
             <ion-icon name="close-circle-outline" class="removeItemsBtn" ></ion-icon>
             <img src="../photos/${item.tag}.png">
             <span class="productName">${item.name}</span>
          </div>

             <div class="price">${item.price} JOD</div>

          <div class="quantity">
                <ion-icon name="caret-back-circle-outline" class="decrease"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle-outline" class="increase"></ion-icon>
          </div>
             <div class="total">${item.inCart * item.price} JOD</div>
             
             </div>
             </div>
            `;
    });

    productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total 
</h4>
<h4 class="basketTotal"> : JOD ${cart},00</h4>
</div>   `;
deleteButtons();
manageQuantity();

  }
}


function manageQuantity() {
  let decreaseButtons = document.querySelectorAll('.decrease');
  let increaseButtons = document.querySelectorAll('.increase');
  let currentQuantity = 0;
  let currentProduct = '';
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  for (let i = 0; i < increaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click', () => {
      console.log(cartItems);
      currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
      console.log(currentQuantity);
      currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
      console.log(currentProduct);

      if (cartItems[currentProduct].inCart > 1) {
        cartItems[currentProduct].inCart -= 1;
        cartNumbers(cartItems[currentProduct], "decrease");
        totalCost(cartItems[currentProduct], "decrease");
        localStorage.setItem('productsInCart',JSON.stringify(cartItems));
        displayCart();
      }
    });


    increaseButtons[i].addEventListener('click', () => {
      currentQuantity =  increaseButtons[i].parentElement.querySelector('span').textContent;
      currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();                 
      
      cartItems[currentProduct].inCart += 1;
      cartNumbers(cartItems[currentProduct]);
      totalCost(cartItems[currentProduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();
    })
    

} 
}


function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.removeItemsBtn');
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartCost = localStorage.getItem('totalCost');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productName;
  
  for (let i =0; i<deleteButtons.length; i ++) {
    deleteButtons[i].addEventListener('click', () => {
      productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();

      localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
      localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

      delete cartItems[productName];
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();

    })
  }

}






onLoadCartNumbers();

displayCart();

function openNav() {
  document.getElementById("mySidenav").style.transform = "translateX(0)";
}

function closeNav() {
  document.getElementById("mySidenav").style.transform = "translateX(-100%)";
}

function dropdownlist() {
  let dropdown = document.getElementsByClassName("sideMenu-dropdownButton");
  let i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.visibility === "visible") {
        (dropdownContent.style.visibility = "hidden"),
          (dropdownContent.style.maxHeight = "0"),
          (dropdownContent.style.opacity = "0");
      } else {
        (dropdownContent.style.visibility = "visible"),
          (dropdownContent.style.maxHeight = "1000px"),
          (dropdownContent.style.opacity = "1");
      }
    });
  }
}

dropdownlist();

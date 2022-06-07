let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Arizona sweater",
    tag: "arizonasweater",
    price: 15,
    inCart: 0,
  },
  {
    name: "Dolce & Gabbana sweater",
    tag: "dolce&gabbanasweater",
    price: 17,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers){
 
    document.querySelector('#cartVal').textContent = productNumbers;
    document.querySelector('#cartVal2').textContent = productNumbers;

  }

}



function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#cartVal").textContent = productNumbers + 1;
    document.querySelector("#cartVal2").textContent =
      productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#cartVal").textContent = 1;
    document.querySelector("#caerVal2").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
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

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            <div class="product">
             <ion-icon name="close-circle-outline"></ion-icon>
             <img src="../photos/${item.tag}.png">
             <span class="productName">${item.name}</span>
             <div class="price">${item.price} JOD</div>
             <div class="quantity">
                <ion-icon name="caret-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon name="caret-forward-circle-outline"></ion-icon>
</div>
             <div class="total">${item.inCart * item.price} JOD</div>
             
             </div>
             
            `;
    });

    productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total 
</h4>
<h4 class="basketTotal"> : JOD ${cartCost},00</h4>
</div>   `;
  }
}

onLoadCartNumbers();

displayCart();

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function dropdownlist() {
  let dropdown = document.getElementsByClassName("sideMenu-dropdownButton");
  let i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click" , function() {
      this.classList.toggle("active");
      let dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.visibility === "visible") {
        dropdownContent.style.visibility = "hidden", dropdownContent.style.maxHeight = "0", dropdownContent.style.opacity = "0";
      } else {
        dropdownContent.style.visibility = "visible", dropdownContent.style.maxHeight = "1000px", dropdownContent.style.opacity = "1"; 
      }
    });
  } 
}

dropdownlist();
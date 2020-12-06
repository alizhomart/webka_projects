
let carts = document.querySelectorAll('.add-cart');
let products = [
  {
    name : 'City of Girls',
    tag : 'book1',
    price : 19.00,
    inCart : 0
  },
  {
    name : 'Big Magic',
    tag : 'book2',
    price : 15.00,
    inCart : 0
  },{
    name : 'Committed',
    tag : 'book3',
    price : 17.00,
    inCart : 0
  },{
    name : 'Made Me Do It',
    tag : 'book4',
    price : 13.00,
    inCart : 0
  }, 
  {
    name : 'City of Girls',
    tag : 'book1',
    price : 19.00,
    inCart : 0
  },
  {
    name : 'Big Magic',
    tag : 'book2',
    price : 15.00,
    inCart : 0
  },
  {
    name : 'Committed',
    tag : 'book3',
    price : 17.00,
    inCart : 0
  },
  {
    name : 'Made Me Do It',
    tag : 'book4',
    price : 13.00,
    inCart : 0
  }

]

for( let i = 0; i < carts.length; i++){
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
  });
}

function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.nav-item span').textContent = productNumbers;
  }
}

function cartNumbers(product){
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.nav-item span').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.nav-item span').textContent = 1;
  }

  setItems(product);
}

function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
 
  if(cartItems != null){

    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  }else{
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }


  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
  // console.log("The product price is", product.price);
  let cartCost = localStorage.getItem('totalCost');
  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);

  if(cartCost != null){
    cartCost = parseInt(cartCost);  
    localStorage.setItem("totalCost", cartCost + product.price);
  }else{
    localStorage.setItem("totalCost", product.price);
  }

}




function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");

  console.log(cartItems);
  if( cartItems && productContainer){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class="product">
        <button  type="button" class="close" aria-label="Close" style="padding-right: 20px;">
          <span aria-hidden="true">&times;</span>
        </button>
          <img src="/images/${item.tag}.jpg" style="margin-left: 20px;"/>
          <span style="margin-left: 20px;">${item.name}</span> 
          <div class="price" style="margin-left: 20px; font-size: 24px;  position: relative;" >$${item.price},00</div>
          <div class="quantity">
            <i class="fa fa-arrow-circle-left" style="font-size:24px; margin-left: 40px;"></i>
            <span style="font-size:24px; margin-left: 10px;">${item.inCart}</span>
            <i class="fa fa-arrow-circle-right" style="font-size:24px; margin-left: 10px;"></i>
            <div class="total" style="margin-left: 50px; font-size: 24px;">$${item.inCart * item.price},00</div>
        </div>
        </div>
        `
    }); 

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h4 basketTotalTitle>Basket Total</h4>
      <h4 basketTotal>$${cartCost},00</h4>
    </div>`;
  }
}

onLoadCartNumbers();
displayCart();

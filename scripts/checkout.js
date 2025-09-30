// import cart and product module
// then use productId from cart to get other propertis of item from products
import { calculateCartQuantity, cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utilities/money.js";


// variable to store html code
let cartSummaryHTML = '';

// loop through cart array to get product id for retirivng required properties 
// & quantity
cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  // loop products. match product.id to productId of cart and store the product info in a variable
  products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product;
    };
  });

  // generating html & using matchingProduct to get required properties of products
  cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src=${matchingProduct.image}>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
              data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"
              data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link" 
              data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

});

document.querySelector('.js-cart-summary')
    .innerHTML = cartSummaryHTML;

// call delete button in checkout
const deleteLink = document.querySelectorAll('.js-delete-quantity-link');

// loop through delete button and create logic to delete items
deleteLink.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();

    checkoutQuantity(); // update cart quantity on delete clicked
  });
});

// call all update buttons in checkout
const updateLink = document.querySelectorAll('.js-update-quantity-link');

// loop update buttons to show quantity update
updateLink.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    // call the cart item container and add class to display input & save when click update
    const container = document.querySelector(`.js-cart-item-container-${productId}`)

    container.classList.add('is-editing-quantity');
  })
});

// call all save buttons
const saveLink = document.querySelectorAll('.js-save-quantity-link');

// loop through save link to update quantity once clicked
saveLink.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    
    let inputElement = document.querySelector(`.js-quantity-input-${productId}`);
    let newQuantity = Number(inputElement.value);

    updateQuantity(productId, newQuantity);

    // update quantity on page
    document.querySelector(`.js-quantity-label-${productId}`)
      .innerHTML = newQuantity;

    // call the cart item container and add class to display input & save when click update
    const container = document.querySelector(`.js-cart-item-container-${productId}`)

    container.classList.remove('is-editing-quantity');
  })
});


checkoutQuantity();

// update checkout items in the header
function checkoutQuantity() {
  
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}
  
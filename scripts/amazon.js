// we used accumaltor pattern (loop through each value in the data and then add it in this variable)
let productHtml = '';
// loop through products array for each item's data and display it in html using dom
products.forEach((product) => {
  productHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `
})

document.querySelector('.js-products-grid')
  .innerHTML = productHtml;

// add to cart function
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // we used dataset method to get values attached to data attribute then with '.' we can retrive exact value we need, and stored it into a variable
      const productId = button.dataset.productId;

      // we use above productId value here as these belong to button of selected item, it is basically product.id
      let quanitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`)
      let quanitySelector = Number(quanitySelectorElement.value);

      let matchingItem;
      // check if product is already in the cart then only increase the quantity. we loop through cart array and see if product is already in cart then store its value in a variable
      cart.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });

      // push data values into cart array in cart.js file. If product already exists increase only quantity
      if(matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
        productId: productId,
        quantity: quanitySelector
        });
      };

      // making cart quantity element interactive. loop through cart and store the quanity value in variable(accumaltor pattern)
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

    });
  });
export let cart = [];

// this adds items into cart
export function addToCart(productId, quanitySelector) {
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
    productId,
    quanitySelector
    });
  };
}
export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quanity: 1
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quanity: 1
  }
];

// this adds items into cart
export function addToCart(productId, quanitySelector) {
  let matchingItem;
  // check if product is already in the cart then only increase the quantity. we loop through cart array and see if product is already in cart then store its value in a variable
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
       matchingItem = cartItem;
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
};

// remove items from cart
export function removeFromCart(productId) {
  // create a new cart array to store updated reuslt
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // assign cart this new value
  cart = newCart;
}
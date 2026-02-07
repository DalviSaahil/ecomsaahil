// controllers/cartController.js
const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const userId = req.userId; // from auth middleware
  const { productId, name, price, image } = req.body;

  let cart = await Cart.findOne({ userId });

  // 1️⃣ If cart doesn't exist → create
  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, name, price, image, quantity: 1 }]
    });
  } else {
    // 2️⃣ Check if product already in cart
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // increase quantity
      cart.items[itemIndex].quantity += 1;
    } else {
      // add new product
      cart.items.push({ productId, name, price, image, quantity: 1 });
    }
  }

  await cart.save();
  res.json(cart);
};

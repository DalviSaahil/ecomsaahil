const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    console.log("Add to Cart Request:", req.body);
    console.log("User ID:", req.userId);
    const { productId, name, price, image, quantity } = req.body;
    const userId = req.userId;
    const qty = Number(quantity) || 1;


    let cart = await Cart.findOne({ userId });


    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }


    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );


    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({ productId, name, price, image, quantity: qty });
    }


    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;


    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );


    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
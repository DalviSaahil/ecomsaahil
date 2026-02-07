const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;
    const userId = req.userId;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    const itemIndex = wishlist.products.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      wishlist.products.push({ productId, name, price, image });
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.userId });
    console.log("GET WISHLIST:", JSON.stringify(wishlist, null, 2));
    res.json(wishlist || { products: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;
    console.log("Remove Request - User:", userId, "Product ID:", productId);

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ msg: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      p => {
        const pId = p.productId ? p.productId.toString() : "";
        const id = p._id ? p._id.toString() : "";
        console.log("Checking item:", pId, id);
        return pId !== productId && id !== productId;
      }
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    console.error("Remove Error:", err);
    res.status(500).json({ message: err.message, stack: err.stack });
  }
};

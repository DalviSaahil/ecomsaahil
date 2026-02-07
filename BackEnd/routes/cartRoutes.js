const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

// 👇 destructure the controller functions
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");

// routes/cartRoutes.js
router.post("/add", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/remove/:productId", auth, removeFromCart);


module.exports = router;

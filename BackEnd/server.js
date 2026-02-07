const express = require("express");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const connectDB = require("./config/db");



// MODELS
const User = require("./models/User");
const Cart = require("./models/Cart");
const Wishlist = require("./models/Wishlist");




const app = express();
const PORT = 5000;


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// ROUTES 
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const productRoute = require("./routes/productRoutes");
app.use("/api/products", productRoute);





app.get("/", (req, res) => {
  res.send("Backend with MongoDB is running 🚀");
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

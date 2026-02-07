const mongoose = require("mongoose");
const Product = require("../models/Product");

// 🔗 CONNECT DB
mongoose.connect("mongodb://localhost:27017/ecom");

// 🔹 PRODUCT DATA
const products = [
  //  ELECTRONICS
  {
    name: "Wireless Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Bluetooth headphones with noise cancellation"
  },
  {
    name: "Smart Watch",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "Smart watch with heart rate monitor"
  },
  {
    name: "Bluetooth Speaker",
    price: 1599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    description: "Portable speaker with deep bass"
  },
  {
    name: "Power Bank 20000mAh",
    price: 1799,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    description: "Fast charging power bank"
  },
  {
    name: "USB-C Fast Charger",
    price: 899,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
    description: "Fast charger with USB-C support"
  },
  {
    name: "Wireless Earbuds",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    description: "True wireless earbuds with mic"
  },

  //  ACCESSORIES
  {
    name: "Gaming Mouse",
    price: 799,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    description: "RGB gaming mouse with adjustable DPI"
  },
  {
    name: "Mechanical Keyboard",
    price: 2499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    description: "RGB mechanical keyboard"
  },
  {
    name: "Laptop Cooling Pad",
    price: 1299,
    category: "Accessories",
    image: "https://plus.unsplash.com/premium_photo-1664194583917-b0ba07c4ce2a?w=800&q=80",
    description: "Cooling pad with dual fans"
  },
  {
    name: "Webcam HD",
    price: 1899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    description: "HD webcam for video calls"
  },
  {
    name: "Mouse Pad XL",
    price: 499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1605218427306-635ba243971c?w=800&q=80",
    description: "Large mouse pad for gaming"
  },
  {
    name: "USB Hub",
    price: 699,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1655562746473-d513d760773f?w=800&q=80",
    description: "4-port USB hub"
  },

  //  MOBILE ACCESSORIES
  {
    name: "Mobile Back Cover",
    price: 299,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=800&q=80",
    description: "Shockproof mobile cover"
  },
  {
    name: "Screen Protector",
    price: 199,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1599309874558-4da523292419?w=800&q=80",
    description: "Tempered glass screen protector"
  },
  {
    name: "Car Mobile Holder",
    price: 499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
    description: "Dashboard car mobile holder"
  },

  //  HOME & OFFICE
  {
    name: "LED Desk Lamp",
    price: 999,
    category: "Home",
    image: "https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=800&q=80",
    description: "Adjustable LED desk lamp"
  },
  {
    name: "Office Chair",
    price: 7999,
    category: "Home",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
    description: "Ergonomic office chair"
  },
  {
    name: "Laptop Stand",
    price: 1299,
    category: "Home",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    description: "Aluminum adjustable laptop stand"
  },
  {
    name: "Study Table",
    price: 5999,
    category: "Home",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80",
    description: "Wooden study table"
  },

  //  MORE TECH
  {
    name: "VR Headset",
    price: 3499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1626388484126-77884eb77651?w=800&q=80",
    description: "Virtual reality headset"
  },
  {
    name: "Game Controller",
    price: 1599,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1600080972464-8cb008c5874e?w=800&q=80",
    description: "Wireless game controller"
  },
  {
    name: "External Hard Drive 1TB",
    price: 4499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=800&q=80",
    description: "Portable external hard disk"
  },
  {
    name: "Pendrive 64GB",
    price: 699,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1623949901865-35e4809ad28d?w=800&q=80",
    description: "USB 3.0 flash drive"
  },

  //  EXTRA
  {
    name: "Soundbar",
    price: 8999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1632738734346-778839b2e59e?w=800&q=80",
    description: "Home theater soundbar"
  },
  {
    name: "Smart LED Bulb",
    price: 599,
    category: "Home",
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80",
    description: "WiFi smart LED bulb"
  }
];

// 🚀 INSERT INTO DB
async function seedProducts() {
  try {
    await Product.deleteMany(); // optional: clear old data
    await Product.insertMany(products);
    console.log("✅ Products added to MongoDB");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seedProducts();

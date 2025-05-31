const router = require("express").Router();
const {
  createOrder,
  getOrderById,
} = require("../controllers/Order.Controller");

// Test API route
router.get("/", (req, res) => {
  res.send({ message: "OK, API is working" });
});

router.post("/create", createOrder);

router.get("/order/:id", getOrderById);

module.exports = router;

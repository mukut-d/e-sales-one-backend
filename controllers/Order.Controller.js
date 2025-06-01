require("dotenv").config();

const Order = require("../models/Order.model");
const sendEmail = require("../utils/mailer");
const successTemplate = require("../templates/orderSuccessTemplate.js");
const failureTemplate = require("../templates/orderFailureTemplate.js");

const createOrder = async (req, res) => {
  try {
    const {
      fullname,
      city,
      state,
      zip,
      address,
      phoneNo,
      email,
      name,
      id,
      price,
      quantity,
      color,
      status,
    } = req.body;

    if (
      !name ||
      !quantity ||
      !price ||
      !zip ||
      !state ||
      !phoneNo ||
      !fullname ||
      !email ||
      !city ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!!isNaN(id)) {
      return res.status(400).json({
        message: "id should be a number",
      });
    }

    if (!!isNaN(price)) {
      return res.status(400).json({
        message: "Price should be a number",
      });
    }

    if (!!isNaN(quantity)) {
      return res.status(400).json({
        message: "Quantity should be a number",
      });
    }

    const updatedData = {
      items: [
        {
          productId: id,
          productName: name,
          productColor: color,
          quantity: quantity,
          price: price,
        },
      ],
      totalAmount: price * quantity,
      shippingAddress: {
        fullname,
        address,
        city,
        state,
        zip,
        phoneNo,
        email,
      },
      paymentMethod: "ONLINE",
    };

    const order = new Order(updatedData);
    await order.save();

    if (status == 1) {
      await sendEmail(
        order.shippingAddress.email,
        "✅ Order Confirmed",
        successTemplate(order)
      );
    }

    if (status == 2 || status == 3) {
      await sendEmail(
        order.shippingAddress.email,
        "❌ Transaction Failed",
        failureTemplate(order)
      );
    }

    res.status(201).json({
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    console.error("Failed to create order");
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Orders successfully captured ", order });
  } catch (error) {
    console.error("🔥 Error in getOrderById:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
};

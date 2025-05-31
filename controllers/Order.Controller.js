const mongoose = require("mongoose");
require("dotenv").config();

const Order = require("../models/Order.model");

const createOrder = async (req, res) => {
  // console.log("req body " + JSON.stringify(req.body));
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
      status = 1,
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

    let paymentStatus = "Confirm";
    if (status === 1) {
      paymentStatus = "Confirm";
    }

    if (status === 2) {
      paymentStatus = "Declined";
    }

    if (status === 3) {
      paymentStatus = "Gateway Error";
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
      },
      paymentMethod: "ONLINE",
      paymentStatus: paymentStatus,
    };

    const order = new Order(updatedData);
    await order.save();

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

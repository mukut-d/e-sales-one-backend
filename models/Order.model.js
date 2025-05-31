const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: Number,
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        productColor: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      fullname: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },

      phoneNo: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      default: "ONLINE",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Confirm", "Failed", "Refunded"],
      default: "Pending",
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

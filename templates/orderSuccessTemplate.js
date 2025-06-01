// templates/orderSuccessTemplate.js
module.exports = (order) => `
  <h2>Order Confirmation - #${order._id}</h2>
  <p>Dear ${order.shippingAddress.fullname},</p>
  <p>Your transaction has been <strong>approved</strong>.</p>
  <p><strong>Product:</strong> ${order.items[0].productName}</p>
  <p><strong>Quantity:</strong> ${order.items[0].quantity}</p>
  <p><strong>Total:</strong> ₹${
    order.items[0].price * order.items[0].quantity
  }</p>
  <p>Shipping to: ${order.shippingAddress.address}, ${
  order.shippingAddress.city
}, ${order.shippingAddress.state} - ${order.shippingAddress.zip}</p>
  <p>Thank you for your order!</p>
`;

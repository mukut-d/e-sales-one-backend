// templates/orderFailureTemplate.js
module.exports = (order) => `
  <h2>Transaction Failed – Order #${order._id}</h2>
  <p>Dear ${order.shippingAddress.fullname},</p>

  <p>Unfortunately, your transaction was <strong>declined</strong>.</p>

  <p><strong>Product:</strong> ${order.items[0].productName}<br>
  <strong>Quantity:</strong> ${order.items[0].quantity}<br>
  <strong>Total:</strong> ₹${order.items[0].price * order.items[0].quantity}</p>

  <p>You can retry the transaction using the link below:</p>
  <p><a href="https://mukutcommerce.com/checkout/retry/${
    order._id
  }">Retry Transaction</a></p>

  <p>If you continue to experience issues, please contact our support team:<br>
  <a href="mailto:support@mukutcommerce.com">support@mukutcommerce.com</a></p>

  <p>Thank you,<br>The MukutCommerce Team</p>
`;

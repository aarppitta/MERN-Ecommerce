import Order from '../models/orderModel.js';
import Cart from '../models/cartModel.js';

/* CREATE ORDER (Manual, non-stripe) */
export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id })
    .populate("items.product");

  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart empty" });

  const totalAmount = cart.items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user.id,
    items: cart.items,
    totalAmount
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

/* GET USER ORDERS */
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};

/* GET SINGLE ORDER */
export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ message: "Order not found" });

  res.json(order);
};

/* GET ALL ORDERS (Admin) */
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "email");
  res.json(orders);
};

/* UPDATE ORDER STATUS */
export const updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(order);
};

/* DELETE ORDER */
export const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};
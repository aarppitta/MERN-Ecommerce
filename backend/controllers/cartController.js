import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

//get cart

export const getCart = async (req, res) => {
    let cart = await Cart.findOne({ userId: req.user.id })
    .populate('items.product')

    if(!cart) cart = await Cart.create({ user: req.user.id, items: [] })

    res.json(cart)
}

//add to cart

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if(!productId) return res.status(404).json({ message: "Product not found" })

    let cart = await Cart.findOne({ userId: req.user.id })

    if(!cart)
        cart = await Cart.create({ user: req.user.id, items: [] })

    const existingItem = cart.items.find((item)=> item.product.toString() === productId)

    if(existingItem){
        existingItem.quantity += quantity;
    }else{
        cart.items.push({ product: productId, quantity })
    }

    await cart.save();
  res.json(cart);
}

//update cart item

export const updateCartItem = async (req, res) => {
    const {quantity} = req.body;
    const cart = await Cart.findOne({ userId: req.user.id })
    const item = cart.items.id(req.params.itemId);

    if(!item) return res.status(404).json({ message: "Item not found in cart" })
        
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
}

/* REMOVE ITEM */
export const removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  cart.items = cart.items.filter(
    (item) => item._id.toString() !== req.params.itemId
  );

  await cart.save();
  res.json(cart);
};

/* CLEAR CART */
export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate(
    { user: req.user.id },
    { items: [] }
  );
  res.json({ message: "Cart cleared" });
};

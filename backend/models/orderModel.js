import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    items: Array,
    totalAmount: Number,
    paymentStatus: { type: String, default: "Pending" },
    stripeSessionId: String
}, 

{timestamp:true})

const Order = mongoose.model("Order", orderSchema);

export default Order;
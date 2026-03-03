import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

export const getAdminStats = async (req, res) => {
    try{

        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const paidOrders = await Order.countDocuments({paymentStatus: "Paid"});

        const totalSales = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        res.json({ totalUsers, totalOrders, totalSales });
        
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
}

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .populate("user", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get top products

export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: "$items" }, // break array
      {
        $group: {
          _id: "$items.product", // group by product id
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//monhly sale

export const getMonthlySales = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
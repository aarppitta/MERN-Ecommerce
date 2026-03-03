import React, { useEffect, useState } from "react";
import api from "../../api/axios"; // make sure this is your configured axios instance

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
          statsRes,
          recentRes,
          topRes,
          monthlyRes,
        ] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/recent-orders"),
          api.get("/admin/top-products"),
          api.get("/admin/monthly-sales"),
        ]);

        setStats(statsRes.data);
        setRecentOrders(recentRes.data);
        setTopProducts(topRes.data);
        setMonthlySales(monthlyRes.data);
      } catch (err) {
        console.error("Error fetching analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
      </div>
    );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card title="Total Sales" value={`$${stats.totalSales}`} />
        <Card title="Orders" value={stats.totalOrders} />
        <Card title="Users" value={stats.totalUsers} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders</p>
        ) : (
          recentOrders.map((order) => (
            <div
              key={order._id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{order.user?.name || "Unknown User"}</span>
              <span>${order.totalAmount}</span>
              <span className="text-green-600 capitalize">
                {order.paymentStatus}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Top Products */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>

        {topProducts.length === 0 ? (
          <p className="text-gray-500">No sales data</p>
        ) : (
          topProducts.map((product) => (
            <div
              key={product._id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{product._id}</span>
              <span>{product.totalSold} sold</span>
            </div>
          ))
        )}
      </div>

      {/* Monthly Sales */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>

        {monthlySales.length === 0 ? (
          <p className="text-gray-500">No monthly sales data</p>
        ) : (
          monthlySales.map((month) => (
            <div
              key={month._id}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>Month {month._id}</span>
              <span>${month.totalSales}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 shadow rounded-xl">
      <h2 className="text-gray-500 text-sm">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default Dashboard;
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/admin/orders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-white p-4 shadow rounded-xl">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex justify-between border-b py-3"
          >
            <span>{order.user.name}</span>
            <span>${order.totalAmount}</span>
            <span className="text-green-600">
              {order.paymentStatus}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
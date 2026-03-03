import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useCart } from "../../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              className="rounded-lg mb-4 h-40 w-full object-cover"
            />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-500">${product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
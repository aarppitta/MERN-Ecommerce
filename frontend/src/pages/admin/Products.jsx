import {useEffect, useState} from 'react'
import api from 'axios'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
    .then((res) => setProducts(res.data))
  }, [])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="bg-white shadow rounded-xl p-4">
        {products.map((product) => (
          <div key={product._id} className="flex justify-between border-b py-3"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products

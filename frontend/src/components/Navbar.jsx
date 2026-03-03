import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-black text-white p-4 flex gap-4">
      <Link to="/shop/home">Home</Link>
      <Link to="/shop/products">Products</Link>
      <Link to="/shop/cart">Cart</Link>
      <Link to="/admin/products">Admin</Link>
    </div>
  )
}

export default Navbar

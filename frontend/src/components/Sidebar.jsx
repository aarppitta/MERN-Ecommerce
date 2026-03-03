import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-64 bg-indigo-600 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">

        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        
      </ul>
    </div>
  )
}

export default Sidebar

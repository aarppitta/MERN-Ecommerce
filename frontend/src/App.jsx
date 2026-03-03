import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";

import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";

import Home from "./pages/client/Home";
import Profile from "./pages/client/Profile";
import Cart from "./pages/client/Cart";

function App() {
  return (
    <Routes>

      {/* Client Routes */}
      <Route path="/shop" element={<ClientLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
      </Route>

    </Routes>
  );
}

export default App;
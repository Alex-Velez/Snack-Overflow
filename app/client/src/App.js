import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CategoryPage from './pages/CategoryPage';
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import GroceryPage from './pages/GroceryPage';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState(() => {
  return localStorage.getItem("activeUser") || null;
});

  function setActiveUser(uid){
    setUser(uid);
    if (uid) {
    localStorage.setItem("activeUser", uid);
  } else {
    localStorage.removeItem("activeUser");
  }
  }
  
  return (
      <Routes>
          <Route path="/" element={<HomePage activeUser={user}/>} />
          <Route path="/:categorySlug" element={<CategoryPage activeUser={user} />} />
          <Route path="/cart" element={<CartPage activeUser={user}/>} />
          <Route path="/orders" element={<OrderHistoryPage activeUser={user}/>} />
          <Route path="/orders/:id" element={<OrderDetailPage activeUser={user}/>} />
          <Route path="/login" element={<AuthPage activeUser={user} setActiveUser={setActiveUser}/>}/>
          <Route path="/profile" element={<ProfilePage activeUser={user} setActiveUser={setActiveUser} />} />
          <Route path="/shop" element={<GroceryPage activeUser={user}/>} />
      </Routes>
  );
}

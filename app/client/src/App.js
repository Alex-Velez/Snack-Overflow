import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CategoryPage from './pages/CategoryPage';
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { useState } from 'react';

//Pass a test user onto cart to test it if awaiting log-in function
//let testUser = "b7dfd370-5b6a-11f0-bbe7-60dd8ec85f4f"

export default function App() {
  const [user, setUser] = useState();
  function setActiveUser(uid){
    setUser(uid);
  }
  
  return (
      <Routes>
          <Route path="/" element={<HomePage activeUser={user}/>} />
          <Route path="/category" element={<CategoryPage activeUser={user}/>} />
          <Route path="/cart" element={<CartPage activeUser={user}/>} />
          <Route path="/orders" element={<OrderHistoryPage activeUser={user}/>} />
          <Route path="/orders/:id" element={<OrderDetailPage activeUser={user}/>} />
          <Route path="/login" element={<AuthPage activeUser={user} setActiveUser={setActiveUser}/>}/>
          <Route path="/profile" element={<ProfilePage activeUser={user}/>} />
      </Routes>
  );
}

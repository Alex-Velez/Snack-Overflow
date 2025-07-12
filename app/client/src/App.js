import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          {/* later: <Route path="/cart" element={<CartPage />} /> */}
          {/* later: <Route path="/orders" element={<OrdersPage />} /> */}
          {/* later: <Route path="/login" element={<AuthPage />} /> */}
      </Routes>
  );
}

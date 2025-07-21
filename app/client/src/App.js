import { Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import CategoryPage from './pages/CategoryPage';
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

//Pass a test user onto cart to test it if awaiting log-in function
//let testUser = "b7dfd370-5b6a-11f0-bbe7-60dd8ec85f4f"

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
}

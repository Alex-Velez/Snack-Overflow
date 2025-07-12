import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<CategoryPage />} />
        {/* future routes here */}
      </Routes>
  );
}
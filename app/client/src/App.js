import { Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        {/* future routes here */}
      </Routes>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import './CategoryPage.css';

export default function CategoryPage({ activeUser }) {
  const navigate      = useNavigate();
  const { categorySlug } = useParams();

  const [category, setCategory] = useState(null);
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {

    (async () => {
      try {
        const res = await fetch(`/api/categories/${categorySlug}`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setCategory(data.category);
          setItems(data.items || []);
        }
      } catch (err) {
        setError('Failed to load category.');
      } finally {
        setLoading(false);
      }
    })();
  }, [activeUser, categorySlug, navigate]);

  return (
    <>
      <Header />
      <div className="category-container">
        {loading && <p>Loading…</p>}
        {error   && <p className="error">{error}</p>}

        {!loading && !error && category && (
          <>
            <h1 className="category-title">{category.name}</h1>
            {items.length === 0 ? (
              <p>No items in this category.</p>
            ) : (
              <ul className="category-items">
                {items.map((item) => (
                  <li key={item.sku} className="item-card">
                    <h2 className="item-name">{item.name}</h2>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    <p className="item-rating">{item.rating} ★</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}
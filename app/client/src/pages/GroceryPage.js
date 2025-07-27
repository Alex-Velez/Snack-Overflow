import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Page from '../components/Page/Page';
import './GroceryPage.css';

const CATEGORY_LABELS = [
  'Vegetables',
  'Snacks & Breads',
  'Fruits',
  'Meats',
  'Milk & Dairy'
];

export default function GroceryPage({ activeUser }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search')?.toLowerCase() || '';
  const categories = searchParams.get('categories')?.split(',') || [];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/items/search/${search}`);
        let data = await res.json();

        if (categories.length && categories[0] !== '') {
          data = data.filter(item =>
            categories.includes(item.category.toLowerCase())
          );
        }

        if (search) {
          data = data.filter(item =>
            item.item_name.toLowerCase().includes(search)
          );
        }

        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching items:', err);
        setItems([]);
      }
      setLoading(false);
    }

    load();
  }, [search, categories]);

  const handleCategoryChange = (catLabel) => {
    let updatedCategories = [...categories];
    const categoryKey = catLabel.toLowerCase();

    if (updatedCategories.includes(categoryKey)) {
      updatedCategories = updatedCategories.filter(c => c !== categoryKey);
    } else {
      updatedCategories.push(categoryKey);
    }

    const newParams = {};
    if (search) newParams.search = search;
    if (updatedCategories.length) newParams.categories = updatedCategories.join(',');

    setSearchParams(newParams);
  };

  return (
    <Page activeUser={activeUser}>
      <div className="gp-container">
        <aside className="gp-sidebar">
          <h3 className="gp-filters-title">Filters</h3>
          {CATEGORY_LABELS.map(label => {
            const key = label.toLowerCase();
            return (
              <label key={key} className="gp-checkbox-label">
                <input
                  type="checkbox"
                  checked={categories.includes(key)}
                  onChange={() => handleCategoryChange(label)}
                />
                {label}
              </label>
            );
          })}
        </aside>
        <main className="gp-main">
          <h1 className="gp-title">Groceries</h1>
          {loading && <p>Loading...</p>}
          {!loading && items.length === 0 && <p>No items found.</p>}
          <div className="gp-grid">
            {items.map(item => (
              <GroceryCard key={item.sku} item={item} />
            ))}
          </div>
        </main>
      </div>
    </Page>
  );
}

function GroceryCard({ item }) {
  return (
    <div className="gp-card">
      {item.img_path && (
        <img src={item.img_path} alt={item.item_name} className="gp-img" />
      )}
      <h3 className="gp-name">{item.item_name}</h3>
      <p className="gp-price">${Number(item.price).toFixed(2)}</p>
      <button className="gp-btn">Add to Cart</button>
    </div>
  );
}
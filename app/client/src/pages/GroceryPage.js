import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from '../components/Page/Page';
import './GroceryPage.css';

export default function GroceryPage({ activeUser }) {
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function load() {
    setLoading(true);

    // grab the raw query param (e.g. ?search=apple)
    const rawSearch = searchParams.get('search') || '';
    const searchTerm = rawSearch.toLowerCase().trim();

    // build the correct endpoint
    const endpoint = searchTerm
      ? `/api/items/search/${encodeURIComponent(searchTerm)}`
      : '/api/items';

    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      let data = await res.json();

      // now apply any client-side category filtering if you want
      const rawCats = searchParams.get('categories') || '';
      const categories = rawCats.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);
      if (categories.length) {
        data = data.filter(item =>
          categories.includes(item.category.toLowerCase())
        );
      }

      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch failed:', err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

        load();
    }, [searchParams]);

    return (
        <Page activeUser={activeUser}>
            <h1 className="gp-title">Groceries</h1>
            {loading && <p>Loading...</p>}
            {!loading && items.length === 0 && <p>No items found.</p>}
            <div className="gp-grid">
                {items.map(item => (
                    <GroceryCard key={item.sku} item={item} />
                ))}
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
            <button className="gp-btn" disabled>Add to Cart</button>
        </div>
    );
}
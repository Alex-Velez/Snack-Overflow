import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Page from '../components/Page/Page';
import './GroceryPage.css';

export default function GroceryPage({ activeUser }) {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search')?.toLowerCase() || '';
  const categories = searchParams.get('categories')?.split(',') || [];

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/item');
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
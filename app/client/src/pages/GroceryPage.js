import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/Page/Page';

export default function GroceryPage({ activeUser }) {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch(`/api/items/category/${categoryName}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    load();
  }, [categoryName]);

  return (
    <Page activeUser={activeUser}>
      <h1 className="gp-title">{categoryName ?? 'Groceries'}</h1>
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
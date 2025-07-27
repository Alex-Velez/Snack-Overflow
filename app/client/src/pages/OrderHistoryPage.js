import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './OrderHistoryPage.css';

export default function OrderHistoryPage({ activeUser }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!activeUser) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res  = await fetch(`/api/transactions/user/${activeUser}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeUser, navigate]);

  return (
    <>
      <Header />
      <div className="order-history-container">
        <h1>Order History</h1>

        {loading && <p>Loading…</p>}
        {error   && <p className="error">{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p>No orders found.</p>
        )}

        {!loading && !error && orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span className="order-id">#{order.id}</span>
            </div>
            <ul className="order-items">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  • {item.name} (x{item.count}) — ${item.itemPrice.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

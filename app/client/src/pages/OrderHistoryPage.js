import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import './OrderHistoryPage.css';

export default function OrderHistoryPage({ activeUser }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      const withRootIds = data.map(order => ({
        ...order,
        id: order.info.id
      }));
      setOrders(withRootIds);
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
      <Header user={activeUser}/>
      <div className="orderHistLayout">
        <div className="orderList">
          <h2>Your Orders</h2>
          {loading && <p>Loading…</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && orders.length === 0 && <p>No orders found.</p>}
          {!loading && !error && orders.map((order) => (
            <div
              key={order.id}
              className={`orderSummary ${selectedOrder?.id === order.id ? 'selected' : ''}`}
              onClick={() => setSelectedOrder(order)}
            >
              <p><strong>Order #{order.id}</strong></p>
              <p>{order.items.length} item(s)</p>
            </div>
          ))}
        </div>

        <div className="orderDetails">
          <h2>Order Details</h2>
          {selectedOrder ? (
            <div className="orderCard">
              <div className="orderHeader">
                <span className="orderId">#{selectedOrder.id}</span>
                <span className="orderStatus"> {selectedOrder.info.status.toLowerCase()}
                </span>
              </div>
              <ul className="orderItems">
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    • {item.name} (x{item.count}) — ${item.itemPrice.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Select an order to view details</p>
          )}
        </div>
      </div>
    </>
  );
}

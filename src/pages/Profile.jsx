import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import './Profile.css';

function Profile() {
  const { savedItems } = useCart();
  const [activeTab, setActiveTab] = useState('orders');

  const defaultMockOrders = [
    {
      id: 'CC-918234',
      date: '14 Nov 2026',
      itemsSummary: '1x Hot Smokey Jollof + Spiced Grilled Chicken',
      total: 1800,
      pickupPoint: 'Cafeteria Annex Garden',
      status: 'Handoff Completed ✓'
    },
    {
      id: 'CC-482019',
      date: '11 Nov 2026',
      itemsSummary: '1x Calculus Early Transcendentals (8th Ed)',
      total: 4500,
      pickupPoint: 'Main Library Bench',
      status: 'Handoff Completed ✓'
    }
  ];

  let storedOrders = [];
  try {
    const raw = localStorage.getItem('campuscart_orders');
    storedOrders = raw ? JSON.parse(raw) : [];
  } catch (err) {
    storedOrders = [];
  }

  const allOrders = [...storedOrders, ...defaultMockOrders];

  return (
    <div className="profile-page-wrapper">
      {/* Profile Header */}
      <div className="profile-identity-card">
        <div className="profile-avatar-circle">
          <span>🎓</span>
        </div>
        <div className="profile-details-text">
          <div className="profile-badge-row">
            <h2>Campus Student Member</h2>
            <span className="verified-student-tag">✓ Verified Student</span>
          </div>
          <p className="profile-sub">
            University Campus ID: <strong>STU-2024-8841</strong> • Faculty of Engineering
          </p>
        </div>
        <div className="profile-quick-stats">
          <div className="quick-stat-box">
            <strong>{allOrders.length}</strong>
            <span>Orders Placed</span>
          </div>
          <div className="quick-stat-box">
            <strong>{savedItems.length}</strong>
            <span>Saved Items</span>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="profile-nav-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Campus Orders & Handoffs ({allOrders.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          ❤️ Saved For Later ({savedItems.length})
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="tab-orders-content">
          <div className="orders-list-stack">
            {allOrders.map((order) => (
              <div key={order.id} className="order-history-card">
                <div className="order-card-top">
                  <div>
                    <span className="order-id-label">Order <strong>#{order.id}</strong></span>
                    <span className="order-date-label">Placed on {order.date}</span>
                  </div>
                  <span className={`order-status-pill ${order.status.includes('Completed') ? 'completed' : 'pending'}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-card-body">
                  <p className="order-items-text">{order.itemsSummary}</p>
                  <p className="order-pickup-text">📍 Handoff point: <strong>{order.pickupPoint}</strong></p>
                </div>

                <div className="order-card-footer">
                  <span className="order-total-price">Total: ₦{order.total.toLocaleString()}</span>
                  <span className="order-protection-note">Zero Delivery Fee • Campus Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Saved Items */}
      {activeTab === 'saved' && (
        <div className="tab-saved-content">
          {savedItems.length > 0 ? (
            <div className="product-grid">
              {savedItems.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="empty-saved-box">
              <span className="empty-heart-icon">🤍</span>
              <h3>No saved items yet</h3>
              <p>Tap the heart icon on any textbook, gadget or snack to save it here for later!</p>
              <Link to="/browse" className="btn btn-primary btn-pill">
                Browse Campus Listings
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;

import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount, savedItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar-top-banner">
        <span>🎓 Student-Verified Campus Network • Zero Delivery Delays • Safe Public Handoffs</span>
      </div>
      <nav className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🛒</span>
          <span className="brand-text">Campus<span className="brand-accent">Cart</span></span>
          <span className="campus-badge">Uni Portal</span>
        </Link>

        <form className="navbar-search-bar" onSubmit={handleSearchSubmit}>
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search textbooks, jollof, chargers, hoodies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button type="button" className="search-clear-btn" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </form>

        <div className="navbar-nav-links">
          <Link
            to="/browse"
            className={`nav-item ${location.pathname === '/browse' ? 'active' : ''}`}
          >
            <span>Browse</span>
          </Link>

          <Link
            to="/profile"
            className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
            title="Saved Items & Orders"
          >
            <span>Saved {savedItems.length > 0 && `(${savedItems.length})`}</span>
          </Link>

          <Link to="/cart" className="nav-cart-btn" aria-label="Shopping Cart">
            <span className="cart-icon">🛍️</span>
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-count-bubble">{cartCount}</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

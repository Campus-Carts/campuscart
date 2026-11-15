import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isSaved } = useCart();
  const [addedNotice, setAddedNotice] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'vendor', text: 'Hey there! I am around campus today. Let me know if you want to meet up to check this out! 😊' }
  ]);

  const product = products.find(p => p.id === parseInt(id, 10));
  const saved = product ? isSaved(product.id) : false;

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Item not found 🔍</h2>
        <p>This campus listing might have been sold or removed by the student vendor.</p>
        <Link to="/browse" className="btn btn-primary">
          Back to Campus Browse
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userText = chatMessage.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');
    
    // Vendor auto-reply simulation
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'vendor',
          text: `Got your note! I can meet you by ${product.pickupSpot} right after lectures. Drop your phone number during checkout!`
        }
      ]);
    }, 1000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Breadcrumb Navigation */}
      <nav className="detail-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/browse">Browse</Link>
        <span>/</span>
        <Link to={`/browse/${product.category}`}>{product.category}</Link>
        <span>/</span>
        <span className="current-crumb">{product.name}</span>
      </nav>

      {/* Main Showcase */}
      <div className="detail-showcase-grid">
        {/* Left: Product Image & Badges */}
        <div className="detail-gallery">
          <div className="main-image-frame">
            <img src={product.image} alt={product.name} className="detail-photo" />
            <span className="detail-condition-tag">{product.condition}</span>
          </div>

          <div className="campus-safety-callout">
            <span className="safety-check-icon">🛡️</span>
            <div>
              <strong>Campus Safe Handoff Guarantee</strong>
              <p>Meet in populated daylight locations (e.g. Faculty, Library, Common Room).</p>
            </div>
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="detail-info-pane">
          <div className="detail-vendor-tag">
            <span>👤 Sold by <strong>{product.vendor}</strong> ({product.vendorRole})</span>
          </div>

          <h1 className="detail-product-name">{product.name}</h1>

          <div className="detail-reviews-row">
            <span className="star-rating">⭐ {product.rating}</span>
            <span className="reviews-count">({product.reviews} campus student reviews)</span>
            <span className="bullet-sep">•</span>
            <span className="stock-status">🟢 Available on Campus</span>
          </div>

          <div className="detail-price-box">
            <span className="detail-currency">₦</span>
            <span className="detail-price-val">{product.price.toLocaleString()}</span>
            <span className="detail-no-shipping">No dispatch fees</span>
          </div>

          <div className="detail-pickup-card">
            <div className="pickup-card-icon">📍</div>
            <div className="pickup-card-text">
              <strong>Designated Pickup Zone:</strong>
              <p>{product.pickupSpot}</p>
            </div>
          </div>

          <div className="detail-description">
            <h3>Item Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-cta-row">
            <button
              type="button"
              className={`btn btn-primary btn-add-large ${addedNotice ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {addedNotice ? '✓ Added to Cart!' : '🛒 Add to Campus Cart'}
            </button>

            <button
              type="button"
              className={`btn btn-secondary btn-wishlist-large ${saved ? 'saved' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              {saved ? '❤️ Saved' : '🤍 Save for Later'}
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-chat-vendor"
              onClick={() => setChatOpen(!chatOpen)}
            >
              💬 Chat Vendor
            </button>
          </div>

          {/* Inline Vendor Chat Box */}
          {chatOpen && (
            <div className="inline-vendor-chat">
              <div className="chat-header">
                <span>💬 Quick Chat with {product.vendor}</span>
                <button type="button" onClick={() => setChatOpen(false)}>✕</button>
              </div>
              <div className="chat-messages-container">
                {messages.map((m, idx) => (
                  <div key={idx} className={`chat-bubble ${m.sender}`}>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
              <form className="chat-input-bar" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Ask a question about this item..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Related Items Section */}
      {relatedProducts.length > 0 && (
        <div className="detail-related-section">
          <h2 className="section-title">Similar Listings Nearby 🎒</h2>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;

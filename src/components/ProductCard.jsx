import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isSaved } = useCart();
  const saved = isSaved(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card-container">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="card-image-box">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="card-product-img"
          />
          <span className="card-condition-tag">{product.condition}</span>
          <button
            type="button"
            className={`card-wishlist-btn ${saved ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label="Save for later"
            title="Save for later"
          >
            {saved ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="card-body">
          <div className="card-vendor-row">
            <span className="card-vendor-name">by {product.vendor}</span>
            <div className="card-rating-badge">
              ⭐ {product.rating}
            </div>
          </div>

          <h3 className="card-title" title={product.name}>
            {product.name}
          </h3>

          <p className="card-pickup-note">
            📍 {product.pickupSpot}
          </p>

          <div className="card-footer">
            <div className="card-price">
              ₦{product.price.toLocaleString()}
            </div>
            <button
              type="button"
              className="card-add-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;

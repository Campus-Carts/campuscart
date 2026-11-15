import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-view">
        <div className="empty-cart-graphic">🛒</div>
        <h2>Your campus cart is looking lonely 🥺</h2>
        <p>No textbooks, jollof or study lamps added yet. Grab some items from course mates!</p>
        <div className="empty-cart-actions">
          <Link to="/browse" className="btn btn-primary btn-pill">
            Explore Campus Browse ✨
          </Link>
          <Link to="/browse/food" className="btn btn-secondary btn-pill">
            Order Campus Snacks 🍔
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-layout">
      <div className="cart-header-title">
        <h1>Your Campus Cart 🛍️</h1>
        <p>Review items before setting up quick campus handoff with the sellers</p>
      </div>

      <div className="cart-content-grid">
        {/* Left: Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-items-header">
            <span>{cartItems.length} unique item{cartItems.length !== 1 ? 's' : ''} in cart</span>
            <button className="btn-clear-cart" onClick={clearCart}>
              Clear All
            </button>
          </div>

          <div className="cart-item-cards-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row-card">
                <img src={item.image} alt={item.name} className="cart-item-thumbnail" />

                <div className="cart-item-details">
                  <div className="cart-item-vendor-tag">by {item.vendor}</div>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-pickup-zone">
                    📍 Handoff point: <strong>{item.pickupSpot}</strong>
                  </div>
                  <div className="cart-item-unit-price">
                    ₦{item.price.toLocaleString()} each
                  </div>
                </div>

                <div className="cart-item-actions-side">
                  <div className="quantity-stepper">
                    <button
                      type="button"
                      className="step-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="step-count">{item.quantity}</span>
                    <button
                      type="button"
                      className="step-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </div>

                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary Box */}
        <div className="cart-summary-column">
          <div className="summary-sticky-card">
            <h3>Cart Summary</h3>

            <div className="summary-line-item">
              <span>Items Total ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
              <span>₦{cartTotal.toLocaleString()}</span>
            </div>

            <div className="summary-line-item">
              <span>Campus Pickup Service</span>
              <span className="free-tag">FREE (₦0)</span>
            </div>

            <div className="summary-line-item">
              <span>Student Protection Guarantee</span>
              <span className="free-tag">INCLUDED 🛡️</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-line-total">
              <span>Estimated Total</span>
              <span className="total-amount">₦{cartTotal.toLocaleString()}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-checkout-action">
              Proceed to Campus Pickup & Handoff →
            </Link>

            <div className="summary-reassurance">
              <p>💡 Pay on handoff or via direct bank transfer after verifying item condition with seller.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

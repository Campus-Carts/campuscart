import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    hallOrFaculty: '',
    selectedSpot: 'Library Main Walkway',
    customNotes: '',
    paymentMethod: 'handoff' // 'handoff' or 'transfer'
  });

  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Please fill out your full name and phone number so the vendor can contact you.');
      return;
    }

    const orderId = `CC-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedOrderId(orderId);

    // Save order to localStorage for profile view
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB'),
      itemsSummary: cartItems.map(i => `${i.quantity}x ${i.name}`).join(', '),
      total: cartTotal,
      pickupPoint: formData.selectedSpot,
      status: 'Awaiting Vendor Confirmation'
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('campuscart_orders') || '[]');
      localStorage.setItem('campuscart_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error(err);
    }

    clearCart();
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="order-success-card">
        <div className="success-badge-icon">🎉</div>
        <h2>Handoff Request Placed!</h2>
        <p className="order-ref-code">Order Reference: <strong>#{createdOrderId}</strong></p>
        <p className="success-explanation">
          The seller(s) have been notified with your pickup request at <strong>{formData.selectedSpot}</strong>.
          They will reach out on WhatsApp/SMS to coordinate the exact time!
        </p>
        <div className="success-action-buttons">
          <Link to="/profile" className="btn btn-primary btn-pill">
            Track in My Orders 📋
          </Link>
          <Link to="/" className="btn btn-secondary btn-pill">
            Return to Campus Home 🛒
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-guard">
        <h2>Your Cart is Empty 🛒</h2>
        <p>You need items in your cart before checking out for campus pickup.</p>
        <Link to="/browse" className="btn btn-primary">
          Browse Student Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page-layout">
      <div className="checkout-page-header">
        <h1>Campus Pickup & Handoff 📍</h1>
        <p>Coordinate a safe, zero-cost meetup with student sellers</p>
      </div>

      <form className="checkout-form-grid" onSubmit={handlePlaceOrder}>
        {/* Left Column: Form Fields */}
        <div className="checkout-form-column">
          {/* Step 1: Student Contact */}
          <div className="checkout-card">
            <div className="card-step-badge">1</div>
            <div className="card-inner-content">
              <h3>Student Contact Information</h3>
              <p className="step-subtitle">How the seller connects with you for the meetup</p>

              <div className="form-group-standard">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="e.g. Tobi Alabi"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-two-cols">
                <div className="form-group-standard">
                  <label htmlFor="phone">Phone Number (Call/SMS)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="08012345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group-standard">
                  <label htmlFor="whatsapp">WhatsApp Number (Optional)</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    placeholder="08012345678"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Handoff Location */}
          <div className="checkout-card">
            <div className="card-step-badge">2</div>
            <div className="card-inner-content">
              <h3>Campus Handoff Location</h3>
              <p className="step-subtitle">Choose a safe, well-lit public campus location</p>

              <div className="form-group-standard">
                <label htmlFor="selectedSpot">Preferred Public Pickup Spot</label>
                <select
                  id="selectedSpot"
                  name="selectedSpot"
                  value={formData.selectedSpot}
                  onChange={handleInputChange}
                >
                  <option value="Library Main Walkway">📚 Library Main Walkway / Entrance</option>
                  <option value="Student Union Building (SUB)">🏛️ Student Union Building (SUB Hub)</option>
                  <option value="Hostel A Porter Desk">🛋️ Hostel A Porter Desk</option>
                  <option value="Hostel B Common Room">🛋️ Hostel B Common Room</option>
                  <option value="Faculty of Science Quad">🔬 Faculty of Science Quad</option>
                  <option value="Faculty of Engineering Block C">⚙️ Faculty of Engineering Block C</option>
                  <option value="Cafeteria Annex Garden">🍔 Cafeteria Annex Garden</option>
                  <option value="Sports Complex Pavillion">⚽ Sports Complex Pavillion</option>
                </select>
              </div>

              <div className="form-group-standard">
                <label htmlFor="customNotes">Meetup Notes for Vendor (Optional)</label>
                <textarea
                  id="customNotes"
                  name="customNotes"
                  rows="3"
                  placeholder="e.g. Free after 2pm lecture, wearing green sweater, please call upon arrival."
                  value={formData.customNotes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Choice */}
          <div className="checkout-card">
            <div className="card-step-badge">3</div>
            <div className="card-inner-content">
              <h3>Payment Preference</h3>
              <p className="step-subtitle">All methods protected by student inspection</p>

              <div className="payment-options-grid">
                <label className={`payment-pill ${formData.paymentMethod === 'handoff' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="handoff"
                    checked={formData.paymentMethod === 'handoff'}
                    onChange={handleInputChange}
                  />
                  <div>
                    <strong>🤝 Inspect & Pay on Meetup</strong>
                    <p>Pay with cash or transfer right after checking the item in person.</p>
                  </div>
                </label>

                <label className={`payment-pill ${formData.paymentMethod === 'transfer' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleInputChange}
                  />
                  <div>
                    <strong>🏦 Direct Student Bank Transfer</strong>
                    <p>Vendor provides student account number during meetup coordination.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Review & Confirmation */}
        <div className="checkout-summary-column">
          <div className="checkout-order-review-card">
            <h3>Order Review</h3>

            <div className="review-items-mini-list">
              {cartItems.map(item => (
                <div key={item.id} className="mini-item-row">
                  <div className="mini-item-info">
                    <span className="mini-qty">{item.quantity}x</span>
                    <span className="mini-name">{item.name}</span>
                  </div>
                  <span className="mini-price">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="review-divider"></div>

            <div className="review-total-row">
              <span>Total Due:</span>
              <span className="total-sum">₦{cartTotal.toLocaleString()}</span>
            </div>

            <button type="submit" className="btn btn-primary btn-submit-order">
              Confirm Campus Handoff Order ✨
            </button>

            <div className="order-safety-pledge">
              <span>🔒 <strong>Student-Protected Trade:</strong> You only complete the transaction after verifying the condition of the goods!</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;

import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products, { categories } from '../data/products';
import './Home.css';

function Home() {
  const trendingFood = products.filter(p => p.category === 'food').slice(0, 3);
  const studentEssentials = products.filter(p => ['textbooks', 'electronics', 'dorm'].includes(p.category)).slice(0, 4);

  return (
    <div className="home-container">
      {/* ── Hero Banner ── */}
      <section className="hero-banner">
        <div className="hero-text-content">
          <div className="hero-pill-tag">
            <span>✨ Live on Your Campus</span>
          </div>
          <h1 className="hero-headline">
            Buy & sell stuff with students <span className="highlight-text">just 2 minutes away</span>.
          </h1>
          <p className="hero-description">
            Skip expensive off-campus delivery and scammy group chats. Get snacks, past questions, dorm lamps, and tech gear delivered right to your hall or faculty.
          </p>
          <div className="hero-cta-group">
            <Link to="/browse" className="btn btn-primary btn-pill">
              Explore Campus Listings 🎒
            </Link>
            <Link to="/browse/food" className="btn btn-secondary btn-pill">
              Order Food & Snacks 🍔
            </Link>
          </div>
          
          <div className="hero-stats-row">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Student Items</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <strong>15 mins</strong>
              <span>Avg. Pickup Time</span>
            </div>
            <div className="stat-divider"></div>
            <div className="hero-stat">
              <strong>₦0</strong>
              <span>Delivery Cost</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-card">
          <div className="hero-spotlight-item">
            <span className="spotlight-badge">🔥 Hottest Dorm Deal</span>
            <img
              src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=600&q=80"
              alt="Campus Jollof Rice"
              className="spotlight-image"
            />
            <div className="spotlight-info">
              <h4>Aunty Grace Dorm Jollof</h4>
              <p>Hot, student-sized portion with peppered chicken</p>
              <div className="spotlight-footer">
                <span className="spotlight-price">₦1,800</span>
                <Link to="/product/2" className="btn btn-primary btn-pill spotlight-btn">
                  Grab It
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Quick Grid ── */}
      <section className="category-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Everything students need from semester start to exam season</p>
          </div>
          <Link to="/browse" className="link-see-all">View All →</Link>
        </div>

        <div className="categories-carousel">
          {categories.filter(c => c.id !== 'all').map(cat => (
            <Link to={`/browse/${cat.id}`} key={cat.id} className="category-bubble-card">
              <span className="bubble-emoji">{cat.emoji}</span>
              <span className="bubble-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Food & Fast Canteen ── */}
      <section className="home-feature-section">
        <div className="section-header-row">
          <div>
            <span className="badge badge-warning">Hungry in Class?</span>
            <h2 className="section-title">Campus Eats & Refreshments 🍕</h2>
            <p className="section-subtitle">Fresh meals prepared by student cooks & campus food stalls</p>
          </div>
          <Link to="/browse/food" className="link-see-all">See Food Menu →</Link>
        </div>

        <div className="product-grid">
          {trendingFood.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* ── Campus Life Value Banner ── */}
      <section className="safety-info-banner">
        <div className="safety-column">
          <span className="safety-icon">📍</span>
          <div>
            <h4>Campus Meetup Points</h4>
            <p>Pick up at the library, student union, hall porter desks, or faculty gates.</p>
          </div>
        </div>
        <div className="safety-column">
          <span className="safety-icon">🤝</span>
          <div>
            <h4>Inspect Before You Pay</h4>
            <p>Check the book condition or test electronics in-person with the seller.</p>
          </div>
        </div>
        <div className="safety-column">
          <span className="safety-icon">💸</span>
          <div>
            <h4>Zero Shipping Fees</h4>
            <p>You’re already in the same campus perimeter. Why pay courier dispatch fees?</p>
          </div>
        </div>
      </section>

      {/* ── Semester Essentials ── */}
      <section className="home-feature-section">
        <div className="section-header-row">
          <div>
            <span className="badge badge-primary">Ace Your Semester</span>
            <h2 className="section-title">Books, Tech & Room Essentials 📚</h2>
            <p className="section-subtitle">Handpicked gear from fellow course mates and seniors</p>
          </div>
          <Link to="/browse" className="link-see-all">Browse Essentials →</Link>
        </div>

        <div className="product-grid">
          {studentEssentials.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

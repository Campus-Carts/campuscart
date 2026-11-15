import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="logo-emoji">🛒</span>
              <span className="logo-title">CampusCart</span>
            </div>
            <p className="footer-tagline">
              Your hyper-local campus marketplace. Connecting student buyers with verified campus vendors and peer sellers. No delivery stress, no shipping fees.
            </p>
            <div className="footer-safety-pill">
              🔒 Safe on-campus meetups & verified student listings
            </div>
          </div>

          <div className="footer-nav-col">
            <h4>Quick Categories</h4>
            <ul>
              <li><Link to="/browse/food">🍔 Food & Daily Canteen</Link></li>
              <li><Link to="/browse/textbooks">📚 Textbooks & Past Exams</Link></li>
              <li><Link to="/browse/electronics">⚡ Chargers & Tech Gear</Link></li>
              <li><Link to="/browse/dorm">🛋️ Dorm Life & Room Setup</Link></li>
              <li><Link to="/browse/fashion">👕 Thrift & Campus Merch</Link></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4>Campus Hub</h4>
            <ul>
              <li><Link to="/browse">All Student Listings</Link></li>
              <li><Link to="/profile">Saved Items & Orders</Link></li>
              <li><a href="#pickup-points">Popular Pickup Spots</a></li>
              <li><a href="#safety">Meetup Safety Guide</a></li>
              <li><a href="#vendor-preview">Become a Student Vendor (Soon)</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} CampusCart. Built for students, by students.</p>
          <div className="footer-bottom-links">
            <span>Terms of Campus Trade</span>
            <span>•</span>
            <span>Student Code of Conduct</span>
            <span>•</span>
            <span>Help Desk</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

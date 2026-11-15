import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './SearchResults.css';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const cleanQuery = query.toLowerCase().trim();

  const matchingItems = products.filter(p => {
    if (!cleanQuery) return true;
    return (
      p.name.toLowerCase().includes(cleanQuery) ||
      p.category.toLowerCase().includes(cleanQuery) ||
      p.vendor.toLowerCase().includes(cleanQuery) ||
      p.description.toLowerCase().includes(cleanQuery) ||
      p.pickupSpot.toLowerCase().includes(cleanQuery)
    );
  });

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <h1>
          {cleanQuery ? (
            <>Search Results for <span className="query-highlight">"{query}"</span></>
          ) : (
            <>All Campus Items</>
          )}
        </h1>
        <p>Found {matchingItems.length} matching campus listing{matchingItems.length !== 1 ? 's' : ''}</p>
      </div>

      {matchingItems.length > 0 ? (
        <div className="product-grid">
          {matchingItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="search-empty-state">
          <div className="search-empty-icon">🔎</div>
          <h3>No students or vendors have listed "{query}" yet</h3>
          <p>Try searching for broader keywords like <em>jollof, calculus, charger, hoodie, lamp</em>, or browse all categories.</p>
          <div className="search-empty-actions">
            <Link to="/browse" className="btn btn-primary btn-pill">
              Browse All Categories
            </Link>
            <Link to="/" className="btn btn-secondary btn-pill">
              Go to Home Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;

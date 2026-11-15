import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products, { categories } from '../data/products';
import './Browse.css';

function Browse() {
  const { category } = useParams();
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [priceFilter, setPriceFilter] = useState('all');

  const currentCategorySlug = category || 'all';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (currentCategorySlug !== 'all') {
      result = result.filter(item => item.category === currentCategorySlug);
    }

    // Price filter
    if (priceFilter === 'under2k') {
      result = result.filter(item => item.price <= 2000);
    } else if (priceFilter === '2k-5k') {
      result = result.filter(item => item.price > 2000 && item.price <= 5000);
    } else if (priceFilter === 'above5k') {
      result = result.filter(item => item.price > 5000);
    }

    // Sorting
    if (selectedSort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [currentCategorySlug, priceFilter, selectedSort]);

  const activeCategoryObj = categories.find(c => c.id === currentCategorySlug) || {
    name: 'All Campus Items',
    emoji: '🛍️'
  };

  return (
    <div className="browse-page-wrapper">
      <div className="browse-header-banner">
        <div className="browse-title-group">
          <h1>
            <span className="browse-emoji">{activeCategoryObj.emoji}</span>
            {activeCategoryObj.name}
          </h1>
          <p>
            Showing {filteredProducts.length} verified item{filteredProducts.length !== 1 ? 's' : ''} available for campus pickup
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="filter-pills-bar">
        {categories.map(cat => {
          const isActive = (cat.id === 'all' && !category) || category === cat.id;
          const targetUrl = cat.id === 'all' ? '/browse' : `/browse/${cat.id}`;
          return (
            <Link
              key={cat.id}
              to={targetUrl}
              className={`filter-pill-btn ${isActive ? 'active' : ''}`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Controls Bar: Price & Sort */}
      <div className="browse-toolbar">
        <div className="toolbar-left">
          <span className="toolbar-label">Price Range:</span>
          <div className="price-buttons">
            <button
              className={`btn-subtle ${priceFilter === 'all' ? 'active' : ''}`}
              onClick={() => setPriceFilter('all')}
            >
              All
            </button>
            <button
              className={`btn-subtle ${priceFilter === 'under2k' ? 'active' : ''}`}
              onClick={() => setPriceFilter('under2k')}
            >
              ≤ ₦2,000
            </button>
            <button
              className={`btn-subtle ${priceFilter === '2k-5k' ? 'active' : ''}`}
              onClick={() => setPriceFilter('2k-5k')}
            >
              ₦2k - ₦5k
            </button>
            <button
              className={`btn-subtle ${priceFilter === 'above5k' ? 'active' : ''}`}
              onClick={() => setPriceFilter('above5k')}
            >
              &gt; ₦5,000
            </button>
          </div>
        </div>

        <div className="toolbar-right">
          <label htmlFor="sort-select" className="toolbar-label">Sort by:</label>
          <select
            id="sort-select"
            className="browse-sort-dropdown"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="recommended">Recommended & Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Student Rated ⭐</option>
          </select>
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="browse-empty-state">
          <div className="empty-icon">📦</div>
          <h3>No matching campus items right now</h3>
          <p>Try resetting the price filter or selecting another category.</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setPriceFilter('all');
              setSelectedSort('recommended');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Browse;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import './SearchPage.css';

const SearchPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      <h2 className="favorites-header">Favorites</h2>
      <ul className="favorites-list">
        {favorites.length > 0 ? (
          products
            .filter(product => favorites.includes(product.id))
            .map(product => (
              <li key={product.id} className="favorite-item">
                <Link to={`/product/${product.id}`} className="favorite-link">
                  {product.title}
                </Link>
              </li>
            ))
        ) : (
          <p className="no-favorites">No favorites yet.</p>
        )}
      </ul>

      <h2 className="search-results-header">Search Results</h2>
      <ul className="search-results-list">
        {filteredProducts.map(product => (
          <li key={product.id} className="search-result-item">
            <Link to={`/product/${product.id}`} className="search-result-link">
              {product.title}
            </Link>
            <button
              onClick={() => toggleFavorite(product)}
              className={`favorite-button ${favorites.includes(product.id) ? 'unmark' : 'mark'}`}
            >
              {favorites.includes(product.id) ? 'Unmark Favorite' : 'Mark Favorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
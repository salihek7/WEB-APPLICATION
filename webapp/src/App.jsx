import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchPage from './components/SearchPage';
import ProductDetailPage from './components/ProductDetailPage';
import FavoritesPage from './components/FavoritesPage';
import './styles.css';

const App = () => {
    return (
        <FavoritesProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SearchPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
            </Router>
        </FavoritesProvider>
    );
};

export default App;

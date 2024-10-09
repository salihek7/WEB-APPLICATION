import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FavoritesPage = () => {
    const { favorites } = useFavorites();
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (favorites.length > 0) {
                const responses = await Promise.all(
                    favorites.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
                );
                setFavoriteProducts(responses.map(res => res.data));
            }
        };

        fetchFavorites();
    }, [favorites]);

    return (
        <div className="favorites-page">
            <h2>Favorites</h2>
            <ul>
                {favoriteProducts.length > 0 ? (
                    favoriteProducts.map(product => (
                        <li key={product.id}>
                            <Link to={`/product/${product.id}`}>{product.title}</Link>
                        </li>
                    ))
                ) : (
                    <p>No favorites yet.</p>
                )}
            </ul>
        </div>
    );
};

export default FavoritesPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(response.data);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => toggleFavorite(product)}>
                {favorites.includes(product.id) ? 'Unmark Favorite' : 'Mark Favorite'}
            </button>
            <Link to="/">Back to Search</Link>
        </div>
    );
};

export default ProductDetailPage;

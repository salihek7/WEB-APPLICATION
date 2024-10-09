import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            if (prev.includes(product.id)) {
                return prev.filter((id) => id !== product.id);
            }
            return [...prev, product.id];
        });
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

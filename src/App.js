import React, { createContext, useState } from 'react';
import Product from './Product';
import Cart from './Cart';
import './App.css'

export const ProductsContext = createContext();

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setCart(updatedCart);
  };

  return (
    <ProductsContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center', flexDirection:'row', flexWrap:'wrap' }}>
        <Product />
        <Cart />
      </div>
    </ProductsContext.Provider>
  );
};

export default App;

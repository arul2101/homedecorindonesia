"use client";

import { useState, useEffect, useCallback } from 'react';

// Global cart state that persists across components
let globalCartState = [];
let cartListeners = new Set();

const notifyListeners = () => {
  cartListeners.forEach(listener => listener([...globalCartState]));
};

const loadCartFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('homedecor_cart');
      if (stored) {
        globalCartState = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
    }
  }
};

const saveCartToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('homedecor_cart', JSON.stringify(globalCartState));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }
};

// Initialize cart on first load (only on client side)
if (typeof window !== 'undefined') {
  loadCartFromStorage();
}

export function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to cart changes
  useEffect(() => {
    const updateCart = (newCart) => {
      console.log('useCart - Updating cart with:', newCart);
      setCartItems(newCart);
      setIsLoading(false);
    };

    cartListeners.add(updateCart);

    // Ensure cart is loaded from storage on component mount
    if (typeof window !== 'undefined') {
      loadCartFromStorage();
    }

    updateCart([...globalCartState]);

    return () => {
      cartListeners.delete(updateCart);
    };
  }, []);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1, attributes = {}) => {
    try {
      if (!product) {
        console.error('addToCart: No product provided');
        return false;
      }

      const existingItemIndex = globalCartState.findIndex(
        item => item.id === product.id && JSON.stringify(item.attributes) === JSON.stringify(attributes)
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        globalCartState[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          sale_price: product.sale_price,
          regular_price: product.regular_price,
          images: product.images,
          sku: product.sku,
          quantity,
          attributes,
          addedAt: new Date().toISOString()
        };
        globalCartState.push(cartItem);
      }

      saveCartToStorage();
      notifyListeners();
      return true;
    } catch (error) {
      console.error('addToCart failed:', error);
      return false;
    }
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((itemId, newQuantity, attributes = {}) => {
    const itemIndex = globalCartState.findIndex(
      item => item.id === itemId && JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );

    if (itemIndex > -1 && newQuantity > 0) {
      globalCartState[itemIndex].quantity = newQuantity;
      saveCartToStorage();
      notifyListeners();
    } else if (itemIndex > -1 && newQuantity === 0) {
      // Remove item if quantity is 0
      globalCartState.splice(itemIndex, 1);
      saveCartToStorage();
      notifyListeners();
    }
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((itemId, attributes = {}) => {
    const itemIndex = globalCartState.findIndex(
      item => item.id === itemId && JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );

    if (itemIndex > -1) {
      globalCartState.splice(itemIndex, 1);
      saveCartToStorage();
      notifyListeners();
    }
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    globalCartState = [];
    saveCartToStorage();
    notifyListeners();
  }, []);

  // Calculate cart totals
  const getCartTotals = useCallback(() => {
    const subtotal = globalCartState.reduce((total, item) => {
      const price = item.sale_price || item.price || 0;
      return total + (price * item.quantity);
    }, 0);

    const totalItems = globalCartState.reduce((total, item) => total + item.quantity, 0);

    return {
      subtotal,
      totalItems,
      itemCount: globalCartState.length
    };
  }, []);

  // Check if product is in cart
  const isInCart = useCallback((productId, attributes = {}) => {
    return globalCartState.some(
      item => item.id === productId && JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );
  }, []);

  // Get item quantity
  const getItemQuantity = useCallback((productId, attributes = {}) => {
    const item = globalCartState.find(
      item => item.id === productId && JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );
    return item ? item.quantity : 0;
  }, []);

  // Move item to wishlist
  const moveToWishlist = useCallback((itemId, attributes = {}) => {
    const itemIndex = globalCartState.findIndex(
      item => item.id === itemId && JSON.stringify(item.attributes) === JSON.stringify(attributes)
    );

    if (itemIndex > -1) {
      const item = globalCartState[itemIndex];
      // Emit event for wishlist functionality
      window.dispatchEvent(new CustomEvent('moveToWishlist', {
        detail: item
      }));
      // Remove from cart after moving to wishlist
      removeFromCart(itemId, attributes);
      return true;
    }
    return false;
  }, [removeFromCart]);

  // Apply promo code
  const applyPromoCode = useCallback((code) => {
    // This would integrate with your backend promo code system
    // For now, return a simple discount calculation
    const promoCodes = {
      'SAVE10': 0.1,
      'SAVE20': 0.2,
      'WELCOME': 0.15
    };

    return promoCodes[code.toUpperCase()] || 0;
  }, []);

  // Get shipping cost
  const getShippingCost = useCallback(() => {
    const totals = getCartTotals();
    return totals.subtotal > 500000 ? 0 : 25000; // Free shipping over 500k
  }, [getCartTotals]);

  // Cart operations for use with quick view
  const quickAddToCart = useCallback((product, quantity = 1, attributes = {}) => {
    addToCart(product, quantity, attributes);

    // Show success feedback
    return true;
  }, [addToCart]);

  return {
    cartItems,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    isInCart,
    getItemQuantity,
    moveToWishlist,
    applyPromoCode,
    getShippingCost,
    quickAddToCart
  };
}

// Export cart utilities for non-react usage
export const cartUtils = {
  getCartItems: () => [...globalCartState],
  getCartTotals: () => {
    const subtotal = globalCartState.reduce((total, item) => {
      const price = item.sale_price || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
    const totalItems = globalCartState.reduce((total, item) => total + item.quantity, 0);
    return { subtotal, totalItems, itemCount: globalCartState.length };
  },
  clearCart: () => {
    globalCartState = [];
    saveCartToStorage();
    notifyListeners();
  }
};
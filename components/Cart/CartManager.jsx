"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import AddToCartNotification from "./AddToCartNotification";
import CartSidebar from "./CartSidebar";
import MiniCart from "./MiniCart";

export default function CartManager() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    moveToWishlist,
    getCartTotals,
    getShippingCost
  } = useCart();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationProduct, setNotificationProduct] = useState(null);
  const [notificationQuantity, setNotificationQuantity] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false);

  // Helper function to remove item with attributes
  const removeItem = (itemId, attributes = {}) => {
    removeFromCart(itemId, attributes);
  };

  // Helper function to update quantity with attributes
  const handleUpdateQuantity = (itemId, quantity, attributes = {}) => {
    updateQuantity(itemId, quantity, attributes);
  };

  // Listen for add to cart events
  useEffect(() => {
    const handleAddToCart = (event) => {
      const { product, quantity = 1 } = event.detail;

      if (!product) {
        console.error('No product in addToCart event');
        return;
      }

      setNotificationProduct(product);
      setNotificationQuantity(quantity);
      setShowNotification(true);

      // Auto-hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    };

    const handleShowCart = () => {
      setShowSidebar(true);
    };

    const handleShowMiniCart = () => {
      setShowMiniCart(true);
    };

    const handleUpdateCartQuantity = (event) => {
      const { itemId, quantity, attributes = {} } = event.detail;
      if (itemId && quantity) {
        handleUpdateQuantity(itemId, quantity, attributes);
      }
    };

    const handleRemoveFromCart = (event) => {
      const { itemId, attributes = {} } = event.detail;
      if (itemId) {
        removeItem(itemId, attributes);
      }
    };

    window.addEventListener('addToCart', handleAddToCart);
    window.addEventListener('showCart', handleShowCart);
    window.addEventListener('showMiniCart', handleShowMiniCart);
    window.addEventListener('updateCartQuantity', handleUpdateCartQuantity);
    window.addEventListener('removeFromCart', handleRemoveFromCart);

    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
      window.removeEventListener('showCart', handleShowCart);
      window.removeEventListener('showMiniCart', handleShowMiniCart);
      window.removeEventListener('updateCartQuantity', handleUpdateCartQuantity);
      window.removeEventListener('removeFromCart', handleRemoveFromCart);
    };
  }, []);

  const handleCheckout = () => {
    // Navigate to checkout page
    const totals = getCartTotals();
    console.log('Proceeding to checkout with:', { items: cartItems, totals });
    window.location.href = '/checkout';
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const goToCart = () => {
    setShowNotification(false);
    setShowSidebar(true);
  };

  const continueShopping = () => {
    setShowNotification(false);
  };

  return (
    <>
      {/* Add to Cart Notification */}
      <AddToCartNotification
        product={notificationProduct}
        quantity={notificationQuantity}
        isVisible={showNotification}
        onClose={closeNotification}
        onGoToCart={goToCart}
        onContinueShopping={continueShopping}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        items={cartItems}
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        onMoveToWishlist={moveToWishlist}
      />

      {/* Mini Cart */}
      <MiniCart
        items={cartItems}
        isOpen={showMiniCart}
        onClose={() => setShowMiniCart(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setShowMiniCart(false);
          setShowSidebar(true);
        }}
      />
    </>
  );
}
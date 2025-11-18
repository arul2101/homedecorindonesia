"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import OrderSummary from "@/components/Checkout/OrderSummary";
import { wooCheckout } from "@/lib/woocommerceCheckout";
import { Shield, Truck, Clock, ArrowRight, ShoppingBag, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotals, getShippingCost, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const cartTotals = getCartTotals();
  const shippingCost = getShippingCost();
  const totalAmount = cartTotals.subtotal + shippingCost;

  // Debug: Log cart data
  console.log('=== CHECKOUT PAGE DEBUG ===');
  console.log('Cart Items:', cartItems);
  console.log('Cart Items Length:', cartItems.length);
  console.log('Cart Totals:', cartTotals);
  console.log('LocalStorage Cart:', localStorage.getItem('homedecor_cart'));
  console.log('=== END CHECKOUT DEBUG ===');

  // Redirect to cart if empty
  useEffect(() => {
    console.log('Checking if cart is empty:', cartItems.length === 0, 'orderPlaced:', orderPlaced);
    if (cartItems.length === 0 && !orderPlaced) {
      console.log('Redirecting to cart because cart is empty');
      // Add a small delay to allow debugging
      setTimeout(() => {
        router.push('/cart');
      }, 1000);
    }
  }, [cartItems.length, orderPlaced, router]);

  const handleOrderSubmit = async (formData) => {
    setIsLoading(true);

    try {
      console.log('=== WOOCOMMERCE ORDER SUBMISSION ===');
      console.log('Form data:', formData);
      console.log('Cart items:', cartItems);
      console.log('Cart totals:', cartTotals);
      console.log('Shipping cost:', shippingCost);
      console.log('Total amount:', totalAmount);
      console.log('=== END WOOCOMMERCE DEBUG ===');

      // Validate order data
      const validation = wooCheckout.validateOrderData({
        ...formData,
        items: cartItems
      });

      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Prepare WooCommerce order data
      const wooOrderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        billingAddress: formData.billingAddress,
        shippingSameAsBilling: formData.shippingSameAsBilling,
        shippingAddress: formData.shippingAddress,
        items: cartItems,
        totals: cartTotals,
        shippingCost: shippingCost,
        total: totalAmount,
        paymentMethod: formData.paymentMethod,
        orderNotes: formData.orderNotes
      };

      // Create order in WooCommerce
      const orderResult = await wooCheckout.createOrder(wooOrderData);

      if (!orderResult.success) {
        throw new Error(orderResult.error || 'Failed to create order in WooCommerce');
      }

      console.log('WooCommerce order created successfully:', orderResult);

      // Process payment if needed
      let paymentResult = null;
      if (formData.paymentMethod !== 'bank_transfer' && formData.paymentMethod !== 'cod') {
        paymentResult = await wooCheckout.processPayment({
          ...orderResult,
          paymentMethod: formData.paymentMethod,
          total: totalAmount
        }, {});
      }

      // Set order data for confirmation page
      setOrderData({
        ...orderResult.order,
        paymentResult,
        customer: formData,
        items: cartItems,
        totals: cartTotals,
        shippingCost,
        totalAmount,
        isMockOrder: orderResult.isMock || false
      });

      setOrderPlaced(true);

      // Clear cart after successful order
      clearCart();

      // Store order in localStorage for order confirmation page
      const orderForStorage = {
        wooOrderId: orderResult.orderId,
        orderNumber: orderResult.orderNumber,
        customer: formData,
        items: cartItems,
        totals: cartTotals,
        shippingCost,
        totalAmount,
        paymentMethod: formData.paymentMethod,
        paymentResult,
        status: orderResult.status,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('lastOrder', JSON.stringify(orderForStorage));

    } catch (error) {
      console.error('WooCommerce order submission error:', error);
      alert(`Order failed: ${error.message}. Please try again or contact customer service.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-light mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart before checkout</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </motion.div>
          </div>

          <h1 className="text-3xl font-light mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-4">Thank you for your purchase</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-1">Order Number</p>
            <p className="font-medium text-lg">{orderData?.id}</p>
            {orderData?.isMockOrder && (
              <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded">
                <p className="text-xs text-yellow-800">
                  🧪 This is a test order (development mode)
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push('/')}
            className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-light">Checkout</h1>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-green-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-blue-600" />
              <span>Free Shipping over 500k</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-600" />
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm
              onSubmit={handleOrderSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <OrderSummary
                items={cartItems}
                totals={cartTotals}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback } from 'react';

// Global compare state that persists across components
let globalCompareState = [];
let compareListeners = new Set();

const notifyListeners = () => {
  compareListeners.forEach(listener => listener([...globalCompareState]));
};

const loadCompareFromStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('homedecor_compare');
      if (stored) {
        globalCompareState = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load compare from storage:', error);
    }
  }
};

const saveCompareToStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('homedecor_compare', JSON.stringify(globalCompareState));
    } catch (error) {
      console.error('Failed to save compare to storage:', error);
    }
  }
};

// Initialize compare on first load
loadCompareFromStorage();

export function useCompare() {
  const [compareItems, setCompareItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const maxItems = 4;

  // Subscribe to compare changes
  useEffect(() => {
    const updateCompare = (newCompare) => {
      setCompareItems(newCompare);
      setIsLoading(false);
    };

    compareListeners.add(updateCompare);
    updateCompare([...globalCompareState]);

    return () => {
      compareListeners.delete(updateCompare);
    };
  }, []);

  // Add item to compare
  const addToCompare = useCallback((product) => {
    const existingItemIndex = globalCompareState.findIndex(
      item => item.id === product.id
    );

    if (existingItemIndex > -1) {
      // Remove if already exists
      globalCompareState.splice(existingItemIndex, 1);
    } else if (globalCompareState.length < maxItems) {
      // Add new item
      const compareItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        sale_price: product.sale_price,
        regular_price: product.regular_price,
        images: product.images,
        sku: product.sku,
        description: product.description,
        average_rating: product.average_rating,
        review_count: product.review_count,
        stock_status: product.stock_status,
        stock_quantity: product.stock_quantity,
        attributes: product.attributes || {},
        addedAt: new Date().toISOString()
      };
      globalCompareState.push(compareItem);
    } else {
      // Maximum reached
      throw new Error(`Maximum ${maxItems} products can be compared`);
    }

    saveCompareToStorage();
    notifyListeners();
  }, [maxItems]);

  // Remove item from compare
  const removeFromCompare = useCallback((productId) => {
    const itemIndex = globalCompareState.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
      globalCompareState.splice(itemIndex, 1);
      saveCompareToStorage();
      notifyListeners();
    }
  }, []);

  // Clear all items from compare
  const clearCompare = useCallback(() => {
    globalCompareState = [];
    saveCompareToStorage();
    notifyListeners();
  }, []);

  // Check if product is in compare
  const isInCompare = useCallback((productId) => {
    return globalCompareState.some(item => item.id === productId);
  }, []);

  // Get compare count
  const getCompareCount = useCallback(() => {
    return globalCompareState.length;
  }, []);

  // Check if compare is full
  const isCompareFull = useCallback(() => {
    return globalCompareState.length >= maxItems;
  }, [maxItems]);

  // Get available slots
  const getAvailableSlots = useCallback(() => {
    return maxItems - globalCompareState.length;
  }, [maxItems]);

  // Toggle item in compare
  const toggleCompare = useCallback((product) => {
    try {
      addToCompare(product);
      return true; // Added successfully
    } catch (error) {
      if (error.message.includes('Maximum')) {
        // Item already exists or compare is full, try to remove
        const existingItemIndex = globalCompareState.findIndex(
          item => item.id === product.id
        );

        if (existingItemIndex > -1) {
          removeFromCompare(product.id);
          return false; // Removed
        } else {
          // Compare is full
          throw error;
        }
      } else {
        throw error;
      }
    }
  }, [addToCompare, removeFromCompare]);

  // Reorder items in compare
  const reorderCompare = useCallback((fromIndex, toIndex) => {
    if (fromIndex >= 0 && fromIndex < globalCompareState.length &&
        toIndex >= 0 && toIndex < globalCompareState.length) {
      const [removed] = globalCompareState.splice(fromIndex, 1);
      globalCompareState.splice(toIndex, 0, removed);
      saveCompareToStorage();
      notifyListeners();
    }
  }, []);

  // Compare items by specific attribute
  const compareByAttribute = useCallback((attribute) => {
    return globalCompareState.map(item => ({
      product: item,
      value: item[attribute] || item.attributes[attribute] || 'N/A'
    }));
  }, []);

  return {
    compareItems,
    isLoading,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    getCompareCount,
    isCompareFull,
    getAvailableSlots,
    toggleCompare,
    reorderCompare,
    compareByAttribute,
    maxItems
  };
}

// Export compare utilities for non-react usage
export const compareUtils = {
  getCompareItems: () => [...globalCompareState],
  getCompareCount: () => globalCompareState.length,
  isCompareFull: () => globalCompareState.length >= 4,
  clearCompare: () => {
    globalCompareState = [];
    saveCompareToStorage();
    notifyListeners();
  },
  isInCompare: (productId) => {
    return globalCompareState.some(item => item.id === productId);
  }
};
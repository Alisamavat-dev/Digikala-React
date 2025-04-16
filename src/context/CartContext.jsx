import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getShoppingCart,
  addToShoppingCart,
  removeFromShoppingCart,
  updateCartItemQuantity,
} from "../services/shoppingService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery({
    queryKey: ["shopping-cart"],
    queryFn: getShoppingCart,
  });

  const addToCartMutation = useMutation({
    mutationFn: addToShoppingCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: removeFromShoppingCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ productId, quantity }) =>
      updateCartItemQuantity(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries(["shopping-cart"]);
    },
  });

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discountedPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };


  const addToCart = (product) => {
    addToCartMutation.mutate(product);
  };

  const removeFromCart = (productId) => {
    removeFromCartMutation.mutate(productId);
  };

  const updateQuantity = (productId, quantity) => {
    updateQuantityMutation.mutate({ productId, quantity });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        calculateTotal,
        isLoading:
          addToCartMutation.isLoading ||
          removeFromCartMutation.isLoading ||
          updateQuantityMutation.isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

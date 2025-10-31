'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem extends Product {
  quantity: number;
}

interface ShopStore {
  wishlist: Product[];
  cart: CartItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartItemsCount: () => number;
}

export const useShop = create<ShopStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      cart: [],

      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.find((item) => item.id === product.id)) {
            return state;
          }
          return { wishlist: [...state.wishlist, product] };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId),
        })),

      isInWishlist: (productId) =>
        get().wishlist.some((item) => item.id === productId),

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.id !== productId),
            };
          }

          return {
            cart: state.cart.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),

      cartTotal: () =>
        get().cart.reduce((total, item) => total + item.price * item.quantity, 0),

      cartItemsCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'b8one-shop-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
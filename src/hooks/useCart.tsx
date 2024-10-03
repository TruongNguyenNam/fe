import { useState, useCallback } from 'react';
import { CartRequest, CartResponse, addToCart, viewCart, updateCartQuantity, removeFromCart } from '../services/cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await viewCart(userId);
      setCartItems(data);
    } catch (error) {
      console.error('Lỗi khi tải giỏ hàng:', error);
      setError('Có lỗi xảy ra khi tải giỏ hàng');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItemToCart = useCallback(async (request: CartRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newItem = await addToCart(request);
      setCartItems(prevItems => [...prevItems, newItem]);
      return newItem;
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
      setError('Có lỗi xảy ra khi thêm vào giỏ hàng');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateItemQuantity = useCallback(async (cartId: number, newQuantity: number) => {
    setLoading(true);
    setError(null);
    try {
      const updatedItem = await updateCartQuantity(cartId, newQuantity);
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === cartId ? updatedItem : item
        )
      );
      return updatedItem;
    } catch (error) {
      console.error('Lỗi khi cập nhật số lượng:', error);
      setError('Có lỗi xảy ra khi cập nhật số lượng');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItemFromCart = useCallback(async (cartId: number) => {
    setLoading(true);
    setError(null);
    try {
      await removeFromCart(cartId);
      setCartItems(prevItems => prevItems.filter(item => item.id !== cartId));
    } catch (error) {
      console.error('Lỗi khi xóa khỏi giỏ hàng:', error);
      setError('Có lỗi xảy ra khi xóa khỏi giỏ hàng');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    cartItems,
    loading,
    error,
    fetchCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart
  };
};

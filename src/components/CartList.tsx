import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { CartResponse } from '../services/cart';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate

const CartList: React.FC = () => {
  const { cartItems, loading, error, fetchCart, updateItemQuantity, removeItemFromCart } = useCart();
  const navigate = useNavigate(); // Sử dụng hook useNavigate

  useEffect(() => {
    fetchCart(1); // Giả sử userId là 1, bạn nên thay thế bằng userId thực tế
  }, [fetchCart]);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  const totalAmount = cartItems.reduce((sum: number, item: CartResponse) => sum + item.productPrice * item.quantity, 0);

  const handleRemoveItem = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      removeItemFromCart(id);
    }
  };

  const handleCheckout = () => {
    navigate('/order-list', { state: { cartItems, totalAmount } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Giỏ hàng của bạn</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link to="/">Tiếp tục mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Giỏ hàng của bạn</h1>
      <p>Bạn đang có {cartItems.length} sản phẩm trong giỏ hàng</p>
      
      {cartItems.map((item: CartResponse) => (
        <div key={item.id} className="cart-item">
          <img src={item.imageUrls?.[0]} alt={item.productName} />
          <div className="item-details">
            <h3>{item.productName}</h3>
            <p>{item.productPrice.toLocaleString()}đ</p>
            <div className="quantity-control">
              <button 
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
          <button onClick={() => handleRemoveItem(item.id)} className="remove-button">
            <img src="/path-to-trash-icon.svg" alt="Xóa" />
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <h2>Thông tin đơn hàng</h2>
        <p>Tổng tiền: <span>{totalAmount.toLocaleString()}đ</span></p>
        <button onClick={handleCheckout} className="checkout-button">THANH TOÁN</button>
      </div>

      <div className="order-note">
        <h3>Ghi chú đơn hàng</h3>
        <textarea placeholder="Nhập ghi chú của bạn ở đây"></textarea>
      </div>
    </div>
  );
};

export default CartList;
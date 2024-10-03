import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderRequest, placeOrder } from '../services/order';

interface CartItem {
  userId: number;
  productId: number;
  quantity: number;
}

const OrderList: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderRequest, setOrderRequest] = useState<OrderRequest>({
        shippingAddress: '',
        paymentMethod: '',
        orderDetails: [],
        promotionCode: ''
    });
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const state = location.state as { cartItems: CartItem[], totalAmount: number } | undefined;
        if (state && state.cartItems && state.cartItems.length > 0) {
            setCartItems(state.cartItems);
            setTotalAmount(state.totalAmount);
            setOrderRequest(prev => ({
                ...prev,
                orderDetails: state.cartItems.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            }));
        } else {
            navigate('/cart');
        }
    }, [location, navigate]);

    const validateForm = (): boolean => {
        const errors: {[key: string]: string} = {};
        if (!orderRequest.shippingAddress.trim()) {
            errors.shippingAddress = 'Địa chỉ giao hàng không được để trống';
        }
        if (!orderRequest.paymentMethod) {
            errors.paymentMethod = 'Vui lòng chọn phương thức thanh toán';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        
        // Kiểm tra dữ liệu trước khi submit
        console.log('Cart Items:', cartItems);
        console.log('Order Details:', orderRequest.orderDetails);
        
        if (validateForm()) {
            if (totalAmount > 0 && cartItems.length > 0) {
                setIsLoading(true);
                try {
                    const orderData: OrderRequest = {
                        shippingAddress: orderRequest.shippingAddress.trim(),
                        paymentMethod: orderRequest.paymentMethod,
                        orderDetails: cartItems.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity
                        })),
                        promotionCode: orderRequest.promotionCode ? orderRequest.promotionCode.trim() : undefined
                    };
                    console.log('Sending order data:', JSON.stringify(orderData, null, 2));
                    
                    // Gọi API để đặt hàng
                    const response = await placeOrder(cartItems[0].userId, orderData);
                    console.log('Order placed successfully:', response);
                    
                    alert('Đặt hàng thành công!');
                    navigate('/order-confirmation', { state: { order: response } });
                } catch (error) {
                    console.error('Order submission error:', error);
                    setErrorMessage(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt hàng');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setErrorMessage('Không thể đặt hàng: Số lượng hoặc tổng tiền không hợp lệ');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setOrderRequest(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="order-container">
            <h2>Thanh toán</h2>
            <div className="order-summary">
                <h3>Tổng quan đơn hàng</h3>
                <p>Số lượng sản phẩm: {totalQuantity}</p>
                <p>Tổng tiền: {totalAmount.toLocaleString()}đ</p>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={handleOrderSubmit}>
                <div className="form-group">
                    <label htmlFor="shippingAddress">Địa chỉ giao hàng</label>
                    <input 
                        type="text" 
                        id="shippingAddress" 
                        name="shippingAddress" 
                        value={orderRequest.shippingAddress}
                        onChange={handleChange} 
                        required 
                    />
                    {formErrors.shippingAddress && <span className="error">{formErrors.shippingAddress}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                    <select 
                        id="paymentMethod" 
                        name="paymentMethod" 
                        value={orderRequest.paymentMethod}
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Chọn phương thức thanh toán</option>
                        <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                        <option value="BankTransfer">Chuyển khoản ngân hàng</option>
                        <option value="CreditCard">Thẻ tín dụng</option>
                    </select>
                    {formErrors.paymentMethod && <span className="error">{formErrors.paymentMethod}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="promotionCode">Mã khuyến mãi</label>
                    <input 
                        type="text" 
                        id="promotionCode" 
                        name="promotionCode" 
                        value={orderRequest.promotionCode}
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="submit-order" disabled={isLoading}>
                    {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
                </button>
            </form>
        </div>
    );
};

export default OrderList;
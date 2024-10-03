import React from 'react';
import useOrderHistory from '../hooks/useOrderHistory'; // Fixed import statement

interface OrderConfirmationProps {
  orderId: number;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => {
  const { orderHistory, loading, error } = useOrderHistory(orderId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Order Confirmation</h2>
      {orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map((order) => ( // Added type annotation for 'order'
            <li key={order.orderId}>
              <p>Order ID: {order.orderId}</p>
              <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <p>Shipping Method: {order.shippingMethod}</p>
              <p>Tracking Number: {order.trackingNumber}</p>
              <p>Shipping Status: {order.shippingStatus}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;

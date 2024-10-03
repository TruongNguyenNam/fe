import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Dashboard from './components/Dashboard'; // Fixed typo in Dashboard import
import Login from './components/Login';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import CustomerProductList from './components/CustomerProductList';
import CartList from './components/CartList';
import OrderList from './components/OrderList'; // Import OrderList component
import OrderConfirmation from './components/OrderConfirmation'; // Import OrderConfirmation component
import Dashboard from './components/Dashbord';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="login" element={<Login />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="customer-products" element={<CustomerProductList />} />
          <Route path="cart" element={<CartList />} />
          <Route path="order-list" element={<OrderList />} /> {/* Added Order List component */}
          <Route path="order-confirmation" element={<OrderConfirmation orderId={1} />} /> {/* Added Order Confirmation route */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
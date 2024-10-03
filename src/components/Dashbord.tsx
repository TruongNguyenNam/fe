import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CustomerProductList from './CustomerProductList';
import CartList from './CartList';
import OrderList from './OrderList'; // Import OrderList component
import OrderConfirmation from './OrderConfirmation'; // Import OrderConfirmation component

const { Header, Content, Sider } = Layout;

const sidebarItems = [
  { key: '/login', label: 'Login' },
  { key: '/categories', label: 'Category List' },
  { key: '/products', label: 'Product List' },
  { key: '/customer-products', label: 'Customer Products' },
  { key: '/cart', label: 'Cart' },
  { key: '/order-list', label: 'Order List' }, // Added Order List item
  { key: '/order-confirmation', label: 'Order Confirmation' }, // Added Order Confirmation item
];

const Dashboard: React.FC = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (location.pathname) {
      case '/customer-products':
        return <CustomerProductList />;
      case '/cart':
        return <CartList />;
      case '/order-list':
        return <OrderList />; // Added Order List component
      case '/order-confirmation':
        return <OrderConfirmation orderId={1} />; // Added Order Confirmation component
      default:
        return <Outlet />;
    }
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={sidebarItems.map(item => ({
              key: item.key,
              label: <Link to={item.key}>{item.label}</Link>,
            }))}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
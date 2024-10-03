import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Input, Typography, Tag, Tooltip, Button, Modal, Badge, message } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useProduct } from '../hooks/useProduct';
import { ProductResponse } from '../services/product';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { Title, Paragraph } = Typography;

const CustomerProductList: React.FC = () => {
  const { products, loading, error, fetchAllProducts, searchProductsByName, searchProductsByColor, searchProductsByBrand, searchProductsByCategory } = useProduct();
  const { cartItems, addItemToCart, fetchCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    fetchCart(1); // Assuming user ID is 1 for now. You should replace this with the actual user ID.
  }, [fetchAllProducts, fetchCart]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value) {
      const results = await searchProductsByName(value);
      setFilteredProducts(results as ProductResponse[]);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSort = (value: string) => {
    const sorted = [...filteredProducts];
    switch (value) {
      case 'priceAsc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleBrandFilter = async (value: string) => {
    setBrandFilter(value);
    if (value) {
      const results = await searchProductsByBrand(value);
      setFilteredProducts(results as ProductResponse[]);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleCategoryFilter = async (value: string) => {
    setCategoryFilter(value);
    if (value) {
      const results = await searchProductsByCategory(value);
      setFilteredProducts(results as ProductResponse[]);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleColorFilter = async (value: string) => {
    setColorFilter(value);
    if (value) {
      const results = await searchProductsByColor(value);
      setFilteredProducts(results as ProductResponse[]);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSizeFilter = (value: string) => {
    setSizeFilter(value);
    if (value) {
      const filtered = products.filter(product => product.size === value);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const showProductDetails = (product: ProductResponse) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = async (product: ProductResponse) => {
    try {
      await addItemToCart({
        quantity: 1,
        productId: product.id,
        userId: 1, // Assuming user ID is 1 for now. You should replace this with the actual user ID.
      });
      message.success('Sản phẩm đã được thêm vào giỏ hàng');
      fetchCart(1); // Refresh cart after adding item
    } catch (error) {
      console.error('Error adding item to cart:', error);
      message.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="customer-product-list">
      <Title level={2}>Danh sách sản phẩm</Title>
      
      {/* Cart icon */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <Link to="/cart">
          <Badge count={cartItems.length} style={{ backgroundColor: '#ff4d4f' }}>
            <Button 
              icon={<ShoppingCartOutlined />} 
              size="large"
              style={{ 
                backgroundColor: 'white', 
                border: '1px solid #d9d9d9',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            >
              Giỏ hàng
            </Button>
          </Badge>
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span>BỘ LỌC</span>
          <Select defaultValue="" style={{ width: 120, marginLeft: 8 }} onChange={handleBrandFilter}>
            <Option value="">Thương hiệu</Option>
            {Array.from(new Set(products.map(p => p.brandName))).map(brand => (
              <Option key={brand} value={brand}>{brand}</Option>
            ))}
          </Select>
          <Select defaultValue="" style={{ width: 120, marginLeft: 8 }} onChange={handleCategoryFilter}>
            <Option value="">Danh mục</Option>
            {Array.from(new Set(products.map(p => p.categoryName))).map(category => (
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
          <Select defaultValue="" style={{ width: 120, marginLeft: 8 }} onChange={handleColorFilter}>
            <Option value="">Màu sắc</Option>
            {Array.from(new Set(products.map(p => p.color))).map(color => (
              <Option key={color} value={color}>{color}</Option>
            ))}
          </Select>
          <Select defaultValue="" style={{ width: 120, marginLeft: 8 }} onChange={handleSizeFilter}>
            <Option value="">Kích thước</Option>
            {Array.from(new Set(products.map(p => p.size))).map(size => (
              <Option key={size} value={size}>{size}</Option>
            ))}
          </Select>
        </div>
        <Select defaultValue="default" style={{ width: 120 }} onChange={handleSort}>
          <Option value="default">Sắp xếp</Option>
          <Option value="priceAsc">Giá tăng dần</Option>
          <Option value="priceDesc">Giá giảm dần</Option>
        </Select>
      </div>
      <Input
        placeholder="Tìm kiếm sản phẩm"
        prefix={<SearchOutlined />}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
        value={searchTerm}
      />
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.imageUrls[0]} style={{ height: 200, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'path/to/fallback/image.jpg'; }} />}
              actions={[
                <Tooltip title="Thêm vào giỏ hàng">
                  <ShoppingCartOutlined key="add_to_cart" onClick={() => handleAddToCart(product)} />
                </Tooltip>,
                <Button key="details" onClick={() => showProductDetails(product)}>Chi tiết</Button>
              ]}
            >
              <Card.Meta
                title={product.name}
                description={
                  <>
                    <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
                    <p style={{ color: 'red', fontWeight: 'bold' }}>{product.price.toLocaleString()} VND</p>
                    <p>Còn lại: {product.stock}</p>
                    <p>Danh mục: {product.categoryName}</p>
                    <p>Thương hiệu: {product.brandName}</p>
                    <p>Kích thước: {product.size}</p>
                    <p>Màu sắc: {product.color}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={selectedProduct?.name}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedProduct && (
          <div>
            <img src={selectedProduct.imageUrls[0]} alt={selectedProduct.name} style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = 'path/to/fallback/image.jpg'; }} />
            <Paragraph>{selectedProduct.description}</Paragraph>
            <p style={{ color: 'red', fontWeight: 'bold' }}>{selectedProduct.price.toLocaleString()} VND</p>
            <p>Còn lại: {selectedProduct.stock}</p>
            <p>Danh mục: {selectedProduct.categoryName}</p>
            <p>Thương hiệu: {selectedProduct.brandName}</p>
            <p>Kích thước: {selectedProduct.size}</p>
            <p>Màu sắc: {selectedProduct.color}</p>
            <div>
              Tags: 
              {selectedProduct.tagNames.map((tag, index) => (
                <Tag key={index} color="blue" style={{ marginRight: 4 }}>{tag}</Tag>
              ))}
            </div>
            <div>
              Chiến dịch: 
              {selectedProduct.campaignNames.map((campaign, index) => (
                <Tag key={index} color="green" style={{ marginRight: 4 }}>{campaign}</Tag>
              ))}
            </div>
            <Tooltip title="Số lượng tồn kho tại các kho hàng">
              <p>Kho hàng: {selectedProduct.inventories.map(inv => inv.stock).reduce((a, b) => a + b, 0)}</p>
            </Tooltip>
            <Tooltip title="Danh sách nhà cung cấp">
              <p>Nhà cung cấp: {selectedProduct.suppliers.map(sup => sup.supplierName).join(', ')}</p>
            </Tooltip>
            <div>
              Hình ảnh khác:
              {selectedProduct.imageUrls.slice(1).map((url, index) => (
                <img key={index} src={url} alt={`${selectedProduct.name} ${index + 2}`} style={{ width: 100, height: 100, objectFit: 'cover', margin: 4 }} onError={(e) => { e.currentTarget.src = 'path/to/fallback/image.jpg'; }} />
              ))}
            </div>
            <Button onClick={() => handleAddToCart(selectedProduct)} style={{ marginTop: 16 }}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomerProductList;
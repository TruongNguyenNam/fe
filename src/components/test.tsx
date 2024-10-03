import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Space, Modal, message, Form, Input, InputNumber, Select, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ProductResponse, ProductRequest } from '../services/product';
import { useProduct } from '../hooks/useProduct';
import { useCategory } from '../hooks/useCategory';
import useBrand from '../hooks/useBrand';
import useColor from '../hooks/useColor';
import useSize from '../hooks/useSize';
import useTag from '../hooks/useTag';
import useInventory from '../hooks/useInventory';
import useSupplier from '../hooks/useSupplier';
import useProductImage from '../hooks/useProductImage';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const ProductList: React.FC = () => {
  const { products, loading, error, fetchAllProducts, createProduct, updateProduct, removeProduct } = useProduct();
  const { categories, fetchCategories } = useCategory();
  const { brands, loading: brandsLoading } = useBrand();
  const { colors, loading: colorsLoading } = useColor();
  const { sizes, loading: sizesLoading } = useSize();
  const { tags, loading: tagsLoading } = useTag();
  const { inventories, loading: inventoriesLoading } = useInventory();
  const { suppliers, loading: suppliersLoading } = useSupplier();
  const { uploadImages } = useProductImage();
  
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedImageIds, setUploadedImageIds] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [stock, setStock] = useState<number>(0);

  const fetchData = useCallback(() => {
    fetchAllProducts();
    fetchCategories();
  }, [fetchAllProducts, fetchCategories]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showModal = (product?: ProductResponse) => {
    setEditingProduct(product || null);
    form.setFieldsValue(product ? {
      ...product,
      categoryId: product.category?.id,
      brandId: product.brand?.id,
      colorId: product.color?.id,
      sizeId: product.size?.id,
      tagIds: product.tags?.map(tag => tag.id),
      inventoryIds: product.inventories?.map(inv => inv.id),
      supplierIds: product.suppliers?.map(sup => sup.id),
    } : {});
    setIsModalVisible(true);
    setFileList([]);
    setUploadedImageIds([]);
    setStock(product?.stock || 0);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
    setUploadedImageIds([]);
    setStock(0);
  };

  const handleUpload = async (file: File) => {
    try {
      const imageIds = await uploadImages([file]);
      setUploadedImageIds(prev => [...prev, ...imageIds]);
      message.success('Tải ảnh lên thành công');
      return false; // Prevent default upload behavior
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Đã xảy ra lỗi khi tải ảnh lên');
      return Upload.LIST_IGNORE;
    }
  };

  const handleSubmit = async (values: ProductRequest) => {
    setSubmitting(true);
    try {
      const productData = {
        ...values,
        imageIds: uploadedImageIds,
        stock: stock,
      };
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        message.success('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(productData);
        message.success('Thêm sản phẩm mới thành công');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
      setUploadedImageIds([]);
      setStock(0);
      fetchAllProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
      if (axios.isAxiosError(error)) {
        message.error(`Lỗi từ server: ${error.response?.data?.message || error.message}`);
      } else if (error instanceof Error) {
        message.error(`Đã xảy ra lỗi khi xử lý sản phẩm: ${error.message}`);
      } else {
        message.error('Đã xảy ra lỗi không xác định khi xử lý sản phẩm');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      onOk: async () => {
        try {
          await removeProduct(productId);
          message.success('Xóa sản phẩm thành công');
          fetchAllProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
          if (axios.isAxiosError(error)) {
            message.error(`Lỗi khi xóa sản phẩm: ${error.response?.data?.message || error.message}`);
          } else {
            message.error('Đã xảy ra lỗi khi xóa sản phẩm');
          }
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: { name: string } | undefined) => category?.name || 'N/A',
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      key: 'brand',
      render: (brand: { name: string } | undefined) => brand?.name || 'N/A',
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
      render: (color: { name: string } | undefined) => color?.name || 'N/A',
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
      render: (size: { name: string } | undefined) => size?.name || 'N/A',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: ProductResponse) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProduct(record.id)} danger>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h1>Quản lý Sản phẩm</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm sản phẩm mới
      </Button>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        loading={loading}
        locale={{ emptyText: 'Không có dữ liệu' }}
      />
      <Modal
        title={editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng trong kho' }]}
          >
            <InputNumber
              min={0}
              value={stock}
              onChange={(value) => setStock(value || 0)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
          >
            <Select loading={loading}>
              {categories.map(category => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="brandId"
            label="Thương hiệu"
            rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
          >
            <Select loading={brandsLoading}>
              {brands.map(brand => (
                <Option key={brand.id} value={brand.id}>{brand.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="colorId"
            label="Màu sắc"
            rules={[{ required: true, message: 'Vui lòng chọn màu sắc' }]}
          >
            <Select loading={colorsLoading}>
              {colors.map(color => (
                <Option key={color.id} value={color.id}>{color.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="sizeId"
            label="Kích thước"
            rules={[{ required: true, message: 'Vui lòng chọn kích thước' }]}
          >
            <Select loading={sizesLoading}>
              {sizes.map(size => (
                <Option key={size.id} value={size.id}>{size.size}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="tagIds"
            label="Tags"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một tag' }]}
          >
            <Select mode="multiple" loading={tagsLoading}>
              {tags.map(tag => (
                <Option key={tag.id} value={tag.id}>{tag.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="inventoryIds"
            label="Kho hàng"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một kho hàng' }]}
          >
            <Select mode="multiple" loading={inventoriesLoading}>
              {inventories.map(inventory => (
                <Option key={inventory.id} value={inventory.id}>{inventory.stock}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="supplierIds"
            label="Nhà cung cấp"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một nhà cung cấp' }]}
          >
            <Select mode="multiple" loading={suppliersLoading}>
              {suppliers.map(supplier => (
                <Option key={supplier.id} value={supplier.id}>{supplier.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={handleUpload}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {editingProduct ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, message, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { CategoryResponse, ProductResponse, CategoryRequest } from '../services/category';
import { useCategory } from '../hooks/useCategory';

const CategoryList: React.FC = () => {
  const { categories, loading, error, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategory();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryResponse | null>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const showModal = (category?: CategoryResponse) => {
    setEditingCategory(category || null);
    form.setFieldsValue(category || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values: CategoryRequest) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        await createCategory(values);
        message.success('Thêm danh mục mới thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      console.error('Error submitting category:', error);
      message.error('Đã xảy ra lỗi khi xử lý danh mục');
    }
  };

  const handleDeleteCategory = (categoryId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa danh mục này?',
      onOk: async () => {
        try {
          await deleteCategory(categoryId);
          message.success('Xóa danh mục thành công');
          fetchCategories();
        } catch (error) {
          console.error('Error deleting category:', error);
          message.error('Đã xảy ra lỗi khi xóa danh mục');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'products',
      key: 'productCount',
      render: (products: ProductResponse[]) => products.length,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'lastModifiedDate',
      key: 'lastModifiedDate',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: CategoryResponse) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteCategory(record.id)}>
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
    <div className="category-list">
      <h1>Quản lý Danh mục</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm danh mục mới
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={loading}
        locale={{ emptyText: 'Không có dữ liệu' }}
      />
      <Modal
        title={editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả danh mục' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
import { useState, useCallback } from 'react';
import { CategoryService, CategoryResponse, CategoryRequest } from '../services/category';

export const useCategory = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách danh mục:', error);
      setError('Có lỗi xảy ra khi tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (categoryRequest: CategoryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await CategoryService.createCategory(categoryRequest);
      setCategories(prevCategories => [...prevCategories, newCategory]);
      return newCategory;
    } catch (error) {
      console.error('Lỗi khi tạo danh mục:', error);
      setError('Có lỗi xảy ra khi tạo danh mục mới');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCategory = useCallback(async (categoryId: number, categoryRequest: CategoryRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await CategoryService.updateCategory(categoryId, categoryRequest);
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.id === categoryId ? updatedCategory : category
        )
      );
      return updatedCategory;
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
      setError('Có lỗi xảy ra khi cập nhật danh mục');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCategory = useCallback(async (categoryId: number) => {
    setLoading(true);
    setError(null);
    try {
      await CategoryService.deleteCategory(categoryId);
      setCategories(prevCategories => 
        prevCategories.filter(category => category.id !== categoryId)
      );
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
      setError('Có lỗi xảy ra khi xóa danh mục');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
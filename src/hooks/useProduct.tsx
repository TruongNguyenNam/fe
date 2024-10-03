import { useState, useCallback } from 'react';
import {
  ProductRequest,
  ProductResponse,
  ProductSearchResponse,
  addProduct,
  updateProduct as updateProductService,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchByName,
  searchByColor,
  searchByBrand,
  searchByCategory,
  searchByPriceRange
} from '../services/product';
import axios from 'axios';

interface UseProductReturn {
  products: ProductResponse[];
  loading: boolean;
  error: string | null;
  createProduct: (product: ProductRequest) => Promise<void>;
  updateProduct: (id: number, product: ProductRequest) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  fetchAllProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<ProductResponse>;
  searchProductsByName: (name: string) => Promise<ProductSearchResponse[]>;
  searchProductsByColor: (color: string) => Promise<ProductSearchResponse[]>;
  searchProductsByBrand: (brand: string) => Promise<ProductSearchResponse[]>;
  searchProductsByCategory: (category: string) => Promise<ProductSearchResponse[]>;
  searchProductsByPriceRange: (minPrice: number, maxPrice: number) => Promise<ProductSearchResponse[]>;
}

export const useProduct = (): UseProductReturn => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setError(error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An unknown error occurred');
    }
    setLoading(false);
  };

  const createProduct = useCallback(async (product: ProductRequest) => {
    setLoading(true);
    try {
      const newProduct = await addProduct(product);
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateProduct = useCallback(async (id: number, product: ProductRequest) => {
    setLoading(true);
    try {
      const updatedProduct = await updateProductService(id, product);
      setProducts(prevProducts => prevProducts.map(p => p.id === id ? updatedProduct : p));
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const removeProduct = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const fetchProductById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const product = await getProductById(id);
      setLoading(false);
      return product;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  const searchProductsByName = useCallback(async (name: string) => {
    setLoading(true);
    try {
      const results = await searchByName(name);
      setLoading(false);
      return results;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  const searchProductsByColor = useCallback(async (color: string) => {
    setLoading(true);
    try {
      const results = await searchByColor(color);
      setLoading(false);
      return results;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  const searchProductsByBrand = useCallback(async (brand: string) => {
    setLoading(true);
    try {
      const results = await searchByBrand(brand);
      setLoading(false);
      return results;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  const searchProductsByCategory = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const results = await searchByCategory(category);
      setLoading(false);
      return results;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  const searchProductsByPriceRange = useCallback(async (minPrice: number, maxPrice: number) => {
    setLoading(true);
    try {
      const results = await searchByPriceRange(minPrice, maxPrice);
      setLoading(false);
      return results;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    removeProduct,
    fetchAllProducts,
    fetchProductById,
    searchProductsByName,
    searchProductsByColor,
    searchProductsByBrand,
    searchProductsByCategory,
    searchProductsByPriceRange,
  };
};
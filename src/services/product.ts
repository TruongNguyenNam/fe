import axios, { AxiosInstance } from 'axios';

// Define the base URL for API requests
const API_URL = "http://localhost:8080/api/v1/admin/product";

// Interfaces
export interface ProductRequest {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    brandId: number;
    sizeId: number;
    colorId: number;
    imageIds: number[];
    tagIds: number[];
    campaignIds: number[];
    inventoryIds: number[];
    supplierIds: number[];
}

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryName: string;
    brandName: string;
    size: string;
    color: string;
    imageUrls: string[];
    tagNames: string[];
    campaignNames: string[];
    inventories: InventoryResponse[];
    suppliers: ProductSupplierResponse[];
}

export interface InventoryResponse {
    id: number;
    productId: number;
    stock: number;
}

export interface ProductSupplierResponse {
    id: number;
    supplierName: string;
}

export interface ProductSearchResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryName: string;
    brandName: string;
    size: string;
    color: string;
    imageUrls: string[];
}

// Create an Axios instance for product management
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get Auth Token from localStorage
const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

// Set up request interceptor for authentication token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// API Functions

// Add a new product
export const addProduct = async (productRequest: ProductRequest): Promise<ProductResponse> => {
    try {
        const response = await axiosInstance.post<ProductResponse>('', productRequest);
        return response.data;
    } catch (error) {
        console.error("Add product error: ", error);
        throw error;
    }
};

// Update an existing product
export const updateProduct = async (productId: number, productRequest: ProductRequest): Promise<ProductResponse> => {
    try {
        const response = await axiosInstance.put<ProductResponse>(`/${productId}`, productRequest);
        return response.data;
    } catch (error) {
        console.error("Update product error: ", error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (productId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/${productId}`);
    } catch (error) {
        console.error("Delete product error: ", error);
        throw error;
    }
};

// Get all products
export const getAllProducts = async (): Promise<ProductResponse[]> => {
    try {
        const response = await axiosInstance.get<ProductResponse[]>('');
        return response.data;
    } catch (error) {
        console.error("Get all products error: ", error);
        throw error;
    }
};

// Get a product by ID
export const getProductById = async (productId: number): Promise<ProductResponse> => {
    try {
        const response = await axiosInstance.get<ProductResponse>(`/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Get product by ID error: ", error);
        throw error;
    }
};

// Search functions

// Search products by name
export const searchByName = async (name: string): Promise<ProductSearchResponse[]> => {
    try {
        const response = await axiosInstance.get<ProductSearchResponse[]>('/search/name', { params: { name } });
        return response.data;
    } catch (error) {
        console.error("Search by name error: ", error);
        throw error;
    }
};

// Search products by color
export const searchByColor = async (color: string): Promise<ProductSearchResponse[]> => {
    try {
        const response = await axiosInstance.get<ProductSearchResponse[]>('/search/color', { params: { color } });
        return response.data;
    } catch (error) {
        console.error("Search by color error: ", error);
        throw error;
    }
};

// Search products by brand
export const searchByBrand = async (brand: string): Promise<ProductSearchResponse[]> => {
    try {
        const response = await axiosInstance.get<ProductSearchResponse[]>('/search/brand', { params: { brand } });
        return response.data;
    } catch (error) {
        console.error("Search by brand error: ", error);
        throw error;
    }
};

// Search products by category
export const searchByCategory = async (category: string): Promise<ProductSearchResponse[]> => {
    try {
        const response = await axiosInstance.get<ProductSearchResponse[]>('/search/category', { params: { category } });
        return response.data;
    } catch (error) {
        console.error("Search by category error: ", error);
        throw error;
    }
};

// Search products by price range
export const searchByPriceRange = async (minPrice: number, maxPrice: number): Promise<ProductSearchResponse[]> => {
    try {
        const response = await axiosInstance.get<ProductSearchResponse[]>('/search/price-range', {
            params: { minPrice, maxPrice }
        });
        return response.data;
    } catch (error) {
        console.error("Search by price range error: ", error);
        throw error;
    }
};
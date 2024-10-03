import axios, { AxiosInstance } from 'axios';
import { refreshToken } from './auth';

export interface ProductResponse {
  id: number;
  name: string;
  imageUrls: string[];
  // Add other necessary fields for ProductResponse
}

export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  products: ProductResponse[];
  createdDate: string;
  lastModifiedDate: string;
}

export interface CategoryRequest {
  name: string;
  description: string;
}

const API_URL = 'http://localhost:8080/api/v1/admin/category';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokenResponse = await refreshToken();
        localStorage.setItem('authToken', tokenResponse.token);
        localStorage.setItem('refreshToken', tokenResponse.refreshToken);
        originalRequest.headers['Authorization'] = `Bearer ${tokenResponse.token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Redirect to login or handle authentication failure
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const CategoryService = {
  createCategory: async (categoryRequest: CategoryRequest): Promise<CategoryResponse> => {
    const response = await axiosInstance.post<CategoryResponse>('', categoryRequest);
    return response.data;
  },

  updateCategory: async (categoryId: number, categoryRequest: CategoryRequest): Promise<CategoryResponse> => {
    const response = await axiosInstance.put<CategoryResponse>(`/${categoryId}`, categoryRequest);
    return response.data;
  },

  deleteCategory: async (categoryId: number): Promise<void> => {
    await axiosInstance.delete(`/${categoryId}`);
  },

  getCategoryById: async (categoryId: number): Promise<CategoryResponse> => {
    const response = await axiosInstance.get<CategoryResponse>(`/${categoryId}`);
    return response.data;
  },

  getAllCategories: async (): Promise<CategoryResponse[]> => {
    const response = await axiosInstance.get<CategoryResponse[]>('');
    return response.data;
  },
};
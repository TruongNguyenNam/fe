import axios, { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/api/v1/auth";

export interface LoginForm {
    username: string;
    password: string;
}

export interface RegisterForm {
    username: string;
    password: string;
    email: string;
}

export interface TokenResponse {
    token: string;
    refreshToken: string;
}

export interface UserResponse {
    id: number;
    username: string;
    email: string;
    message: string;
    role: string;
    deleted: boolean;
}

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

export const login = async (loginForm: LoginForm): Promise<TokenResponse> => {
    try {
        const response = await axiosInstance.post<TokenResponse>('/login', loginForm);
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
    } catch (error) {
        console.error("Login error: ", error);
        throw error;
    }
};

export const register = async (registerForm: RegisterForm): Promise<UserResponse> => {
    try {
        const response = await axiosInstance.post<UserResponse>('/register', registerForm);
        return response.data;
    } catch (error) {
        console.error("Register error: ", error);
        throw error;
    }
};

export const refreshToken = async (): Promise<TokenResponse> => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosInstance.get<TokenResponse>('/refreshToken', {
            headers: {
                'Refresh-Token': refreshToken
            }
        });
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        return response.data;
    } catch (error) {
        console.error("Refresh token error: ", error);
        throw error;
    }
};
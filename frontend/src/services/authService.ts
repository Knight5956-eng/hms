import { apiClient, setAccessToken } from './apiClient';
import { AuthResponse, User } from '../types';

export const authService = {
  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    const token = response.data.tokens?.accessToken || response.data.accessToken;
    if (token) {
      setAccessToken(token);
    }
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    tenantId?: string;
    dateOfBirth?: string;
    sex?: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    const token = response.data.tokens?.accessToken || response.data.accessToken;
    if (token) {
      setAccessToken(token);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  },

  async resetPassword(data: { token: string; newPassword: string }): Promise<void> {
    await apiClient.post('/auth/reset-password', data);
  },

  async acceptInvitation(data: { token: string; password: string; firstName: string; lastName: string }): Promise<void> {
    await apiClient.post('/auth/accept-invitation', data);
  },

  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response.data;
  },
};

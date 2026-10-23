import { apiClient } from './apiClient';
import { User } from '../types';

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  async inviteUser(email: string, role: string): Promise<void> {
    await apiClient.post('/invitations', { email, role });
  },
};

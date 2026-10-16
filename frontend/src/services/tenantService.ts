import { apiClient } from './apiClient';
import { Tenant, User, AuditLog } from '../types';

export const tenantService = {
  async getTenants(): Promise<Tenant[]> {
    const response = await apiClient.get<Tenant[]>('/tenants');
    return response.data;
  },

  async getTenant(id: string): Promise<Tenant> {
    const response = await apiClient.get<Tenant>(`/tenants/${id}`);
    return response.data;
  },

  async createTenant(data: Partial<Tenant>): Promise<Tenant> {
    const response = await apiClient.post<Tenant>('/tenants', data);
    return response.data;
  },

  async updateTenant(id: string, data: Partial<Tenant>): Promise<Tenant> {
    const response = await apiClient.put<Tenant>(`/tenants/${id}`, data);
    return response.data;
  },

  async getPlatformAdmins(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users?role=SUPER_ADMIN');
    return response.data;
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    const response = await apiClient.get<AuditLog[]>('/audit-logs');
    return response.data;
  },
};

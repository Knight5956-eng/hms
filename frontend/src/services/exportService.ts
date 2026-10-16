import { apiClient } from './apiClient';

export const exportService = {
  async triggerCsvExport(): Promise<{ downloadUrl: string }> {
    const response = await apiClient.get<{ downloadUrl: string }>('/exports/csv');
    return response.data;
  },
};

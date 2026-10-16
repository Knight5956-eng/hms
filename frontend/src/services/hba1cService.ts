import { apiClient } from './apiClient';
import { Hba1cResult } from '../types';

export const hba1cService = {
  async getResults(patientId?: string): Promise<Hba1cResult[]> {
    const url = patientId ? `/patients/${patientId}/hba1c-results` : '/hba1c';
    const response = await apiClient.get<Hba1cResult[]>(url);
    return response.data;
  },

  async recordResult(data: { patientId: string; value: number; resultDate: string; notes?: string }): Promise<Hba1cResult> {
    const response = await apiClient.post<Hba1cResult>('/hba1c', data);
    return response.data;
  },
};

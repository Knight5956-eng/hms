import { apiClient } from './apiClient';
import { Medication } from '../types';

export const medicationService = {
  async getMedications(patientId?: string): Promise<Medication[]> {
    const url = patientId ? `/patients/${patientId}/medications` : '/medications';
    const response = await apiClient.get<Medication[]>(url);
    return response.data;
  },

  async addMedication(data: Partial<Medication>): Promise<Medication> {
    const response = await apiClient.post<Medication>('/medications', data);
    return response.data;
  },
};

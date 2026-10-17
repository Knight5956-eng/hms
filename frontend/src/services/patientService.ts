import { apiClient } from './apiClient';
import { PatientProfile } from '../types';

export const patientService = {
  async getPatients(): Promise<PatientProfile[]> {
    const response = await apiClient.get<PatientProfile[]>('/patients');
    return response.data;
  },

  async getPatient(id: string): Promise<PatientProfile> {
    const response = await apiClient.get<PatientProfile>(`/patients/${id}`);
    return response.data;
  },
};

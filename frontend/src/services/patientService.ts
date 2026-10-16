import { apiClient } from './apiClient';
import { PatientProfile, User } from '../types';

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

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  async inviteUser(email: string, role: string): Promise<void> {
    await apiClient.post('/invitations', { email, role });
  },
};

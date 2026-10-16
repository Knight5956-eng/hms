import { apiClient } from './apiClient';
import { Appointment } from '../types';

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    const response = await apiClient.get<Appointment[]>('/appointments');
    return response.data;
  },

  async createAppointment(data: Partial<Appointment>): Promise<Appointment> {
    const response = await apiClient.post<Appointment>('/appointments', data);
    return response.data;
  },
};

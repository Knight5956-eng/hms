import { apiClient } from './apiClient';
import { GlucoseReading, GlucoseContext } from '../types';

export const glucoseService = {
  async getReadings(patientId?: string): Promise<GlucoseReading[]> {
    const url = patientId ? `/patients/${patientId}/glucose-readings` : '/glucose';
    const response = await apiClient.get<GlucoseReading[]>(url);
    return response.data;
  },

  async logReading(data: {
    patientId?: string;
    value: number;
    context: GlucoseContext;
    measuredAt?: string;
    notes?: string;
  }): Promise<GlucoseReading> {
    const response = await apiClient.post<GlucoseReading>('/glucose', data);
    return response.data;
  },
};

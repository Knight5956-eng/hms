import { apiClient } from './apiClient';
import { RiskAssessment } from '../types';

export const triageService = {
  async getTriageCohort(): Promise<RiskAssessment[]> {
    const response = await apiClient.get<RiskAssessment[]>('/triage');
    return response.data;
  },
};

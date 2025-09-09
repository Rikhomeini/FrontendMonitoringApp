import { api } from './api';

const anomalyService = {
  async getAnomalies() {
    try {
      const response = await api.get('/anomalies');
      return response.data;
    } catch (error) {
      console.error('Error fetching anomalies:', error);
      return this.getMockAnomalies();
    }
  },

  async resolveAnomaly(anomalyId) {
    try {
      const response = await api.put(`/anomalies/${anomalyId}/resolve`);
      return response.data;
    } catch (error) {
      console.error('Error resolving anomaly:', error);
      throw error;
    }
  },

  // Mock data untuk development
  getMockAnomalies() {
    return [
      { 
        id: 1, 
        type: 'Temperature Spike', 
        severity: 'High', 
        message: 'Temperature increased by 15°C in 5 minutes', 
        timestamp: new Date().toISOString(),
        resolved: false
      },
      { 
        id: 2, 
        type: 'Vibration Anomaly', 
        severity: 'Medium', 
        message: 'Unusual vibration pattern detected', 
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resolved: true
      },
    ];
  }
};

export default anomalyService;
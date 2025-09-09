import { api } from './api';

const machineService = {
  async getMachines() {
    try {
      const response = await api.get('/machines');
      return response.data;
    } catch (error) {
      console.error('Error fetching machines:', error);
      return this.getMockMachines();
    }
  },

  async getMachineStatus(machineId) {
    try {
      const response = await api.get(`/machines/${machineId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error fetching machine status:', error);
      return this.getMockMachineStatus();
    }
  },

  // Mock data untuk development
  getMockMachines() {
    return [
      { id: 1, name: 'CNC Machine 1', status: 'online' },
      { id: 2, name: 'Injection Molder 2', status: 'offline' },
      { id: 3, name: 'Assembly Line 3', status: 'online' },
    ];
  },

  getMockMachineStatus() {
    return {
      status: 'online',
      efficiency: 85,
      uptime: '98.5%',
      lastMaintenance: '2023-10-15'
    };
  }
};

export default machineService;
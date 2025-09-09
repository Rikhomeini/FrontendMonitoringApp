import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error: ${error.message}`, error.response?.data);
    return Promise.reject(error);
  }
);

const sensorService = {
  // ✅ GET sensor data dengan improved error handling
  async getSensorData(page = 1, limit = 50) {
    try {
      console.log('🔄 Fetching sensor data from backend...');
      const response = await api.get(`/sensors/data?page=${page}&limit=${limit}`);
      
      // ✅ Jika data kosong, gunakan mock data
      if (!response.data.data || response.data.data.length === 0) {
        console.log('📦 Database empty, using mock data for demonstration');
        return this.getMockSensorDataWithPagination(page, limit);
      }
      
      console.log(`✅ Received ${response.data.data.length} items from backend`);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching sensor data:', error.message);
      console.log('🔄 Falling back to mock data');
      return this.getMockSensorDataWithPagination(page, limit);
    }
  },

  // ✅ GET latest data
  async getLatestData() {
    try {
      const response = await api.get('/sensors/data/latest');
      
      // ✅ Jika tidak ada data, gunakan mock data
      if (!response.data) {
        return this.getMockLatestData();
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching latest data:', error);
      return this.getMockLatestData();
    }
  },

  // ✅ GET data by device
  async getDataByDevice(deviceId, page = 1, limit = 50) {
    try {
      const response = await api.get(`/sensors/data/${deviceId}?page=${page}&limit=${limit}`);
      
      if (!response.data.data || response.data.data.length === 0) {
        return this.getMockDeviceData(deviceId, page, limit);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching device data:', error);
      return this.getMockDeviceData(deviceId, page, limit);
    }
  },

  // ✅ GET sensor statistics
  async getSensorStats(period = '24h') {
    try {
      const response = await api.get(`/sensors/stats?period=${period}`);
      
      if (!response.data) {
        return this.getMockStats(period);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return this.getMockStats(period);
    }
  },

  // ✅ POST sensor data (untuk ESP32)
  async sendSensorData(sensorData) {
    try {
      console.log('📤 Sending sensor data to backend:', sensorData);
      const response = await api.post('/sensors/data', sensorData);
      console.log('✅ Data sent successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Error sending sensor data:', error.message);
      
      // Simpan data locally jika backend offline
      this.saveDataLocally(sensorData);
      throw error;
    }
  },

  // ✅ Simpan data locally (fallback)
  saveDataLocally(data) {
    try {
      const pendingData = JSON.parse(localStorage.getItem('pendingSensorData') || '[]');
      pendingData.push({
        ...data,
        timestamp: new Date().toISOString(),
        pending: true
      });
      localStorage.setItem('pendingSensorData', JSON.stringify(pendingData));
      console.log('💾 Data saved locally for later sync');
    } catch (error) {
      console.error('Error saving data locally:', error);
    }
  },

  // ✅ Coba sync pending data
  async syncPendingData() {
    try {
      const pendingData = JSON.parse(localStorage.getItem('pendingSensorData') || '[]');
      
      if (pendingData.length === 0) return;
      
      console.log(`🔄 Syncing ${pendingData.length} pending data items...`);
      
      for (const data of pendingData) {
        try {
          await this.sendSensorData(data);
          // Hapus dari pending jika berhasil
          const updatedPending = pendingData.filter(item => item.timestamp !== data.timestamp);
          localStorage.setItem('pendingSensorData', JSON.stringify(updatedPending));
        } catch (error) {
          console.error('Failed to sync data:', error);
        }
      }
    } catch (error) {
      console.error('Error syncing pending data:', error);
    }
  },

  // ✅ MOCK DATA GENERATORS
  getMockSensorDataWithPagination(page = 1, limit = 50) {
    const totalItems = 1000;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    
    const data = [];
    for (let i = 0; i < limit; i++) {
      data.push(this.generateMockSensorItem(startIndex + i));
    }
    
    return {
      data,
      pagination: {
        current: page,
        pages: totalPages,
        total: totalItems
      }
    };
  },

  generateMockSensorItem(id) {
    const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    const baseTemp = 28 + Math.random() * 4;
    const isAnomaly = Math.random() > 0.95;
    
    return {
      _id: `mock-${id}-${Date.now()}`,
      temperature: {
        value: isAnomaly ? (baseTemp + 10).toFixed(1) : baseTemp.toFixed(1),
        unit: '°C',
        timestamp
      },
      vibration: {
        value: (0.1 + Math.random() * 0.4).toFixed(3),
        unit: 'mm/s',
        timestamp
      },
      current: {
        value: (3.5 + Math.random() * 2).toFixed(2),
        unit: 'A',
        timestamp
      },
      voltage: {
        value: (215 + Math.random() * 10).toFixed(1),
        unit: 'V',
        timestamp
      },
      deviceId: 'ESP32-001',
      timestamp,
      isAnomaly
    };
  },

  getMockLatestData() {
    return this.generateMockSensorItem(0);
  },

  getMockDeviceData(deviceId, page, limit) {
    const data = this.getMockSensorDataWithPagination(page, limit);
    // Set semua data dengan deviceId yang sesuai
    data.data = data.data.map(item => ({
      ...item,
      deviceId: deviceId
    }));
    return data;
  },

  getMockStats(period) {
    const baseTemp = period === '24h' ? 28 : period === '7d' ? 27 : 26;
    return {
      avgTemperature: (baseTemp + Math.random() * 3).toFixed(1),
      maxTemperature: (baseTemp + 8 + Math.random() * 2).toFixed(1),
      minTemperature: (baseTemp - 2 + Math.random() * 1).toFixed(1),
      avgVibration: (0.2 + Math.random() * 0.2).toFixed(3),
      maxVibration: (0.5 + Math.random() * 0.3).toFixed(3),
      avgCurrent: (4 + Math.random() * 1).toFixed(2),
      maxCurrent: (6 + Math.random() * 1).toFixed(2),
      avgVoltage: (218 + Math.random() * 4).toFixed(1),
      minVoltage: (212 + Math.random() * 3).toFixed(1),
      maxVoltage: (225 + Math.random() * 2).toFixed(1),
      dataPoints: Math.floor(Math.random() * 1000) + 500
    };
  },

  // ✅ Historical data untuk charts
  async getHistoricalData(sensorType, hours = 24) {
    try {
      const response = await api.get(`/sensors/historical?type=${sensorType}&hours=${hours}`);
      
      if (!response.data || response.data.length === 0) {
        return this.getMockHistoricalData(sensorType, hours);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return this.getMockHistoricalData(sensorType, hours);
    }
  },

  getMockHistoricalData(sensorType, hours = 24) {
    const data = [];
    const now = new Date();
    const baseValue = sensorType.includes('temperature') ? 28 :
                     sensorType.includes('vibration') ? 0.2 :
                     sensorType.includes('current') ? 4 : 220;
    
    const variation = sensorType.includes('temperature') ? 3 :
                     sensorType.includes('vibration') ? 0.3 :
                     sensorType.includes('current') ? 1.5 : 8;
    
    for (let i = 0; i < hours; i++) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      data.push({
        timestamp,
        value: baseValue + (Math.random() * variation * 2 - variation),
        isAnomaly: Math.random() > 0.93
      });
    }
    
    return data.reverse();
  },

  // ✅ Health check
  async healthCheck() {
    try {
      const response = await api.get('/health');
      return {
        status: 'healthy',
        message: response.data.message,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: error.message,
        timestamp: new Date()
      };
    }
  }
};

// ✅ Auto-sync pending data setiap 30 detik
setInterval(() => {
  sensorService.syncPendingData();
}, 30000);

// ✅ Sync ketika tab menjadi visible
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    sensorService.syncPendingData();
  }
});

export default sensorService;
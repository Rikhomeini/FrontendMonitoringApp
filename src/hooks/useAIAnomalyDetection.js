import { useState, useCallback } from 'react';

const useAIAnomalyDetection = () => {
  const [anomalies, setAnomalies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ PERBAIKAN: Tambahkan null check dan default parameter
  const analyzeData = useCallback(async (sensorData = []) => {
    // ✅ Validasi input: pastikan sensorData adalah array
    if (!sensorData || !Array.isArray(sensorData)) {
      console.warn('analyzeData: sensorData is not an array', sensorData);
      setAnomalies([]);
      return [];
    }

    // ✅ Check jika array kosong
    if (sensorData.length === 0) {
      console.log('analyzeData: No data to analyze');
      setAnomalies([]);
      return [];
    }

    setIsLoading(true);
    try {
      // Simulasi AI analysis dengan error handling
      const detectedAnomalies = sensorData
        .filter(item => {
          // ✅ Null safety check untuk setiap item
          if (!item || typeof item !== 'object') return false;
          
          // ✅ Safe property access dengan optional chaining
          const temp = item.temperature?.value ?? item.temperature;
          const vib = item.vibration?.value ?? item.vibration;
          const current = item.current?.value ?? item.current;
          const voltage = item.voltage?.value ?? item.voltage;
          
          // ✅ Check for anomalies dengan default values
          return (temp > 35 || temp < 20) || 
                 (vib > 0.5) || 
                 (current > 6.0) ||
                 (voltage > 230 || voltage < 210);
        })
        .map(item => ({
          // ✅ Spread operator dengan fallback values
          ...item,
          id: item.id || item._id || Math.random().toString(36).substr(2, 9),
          timestamp: item.timestamp || new Date(),
          severity: (item.temperature?.value > 38 || item.current?.value > 6.5) ? 'high' : 'medium',
          type: item.temperature?.value > 35 ? 'temperature' : 
                item.vibration?.value > 0.5 ? 'vibration' : 
                item.current?.value > 6.0 ? 'current' : 'voltage',
          confidence: Math.random() * 0.5 + 0.5 // 50-100% confidence
        }));

      setAnomalies(detectedAnomalies);
      return detectedAnomalies;
    } catch (error) {
      console.error('Error in AI analysis:', error);
      setAnomalies([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ✅ Function untuk reset anomalies
  const resetAnomalies = useCallback(() => {
    setAnomalies([]);
  }, []);

  return { anomalies, analyzeData, isLoading, resetAnomalies };
};

export default useAIAnomalyDetection;
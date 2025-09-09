import { useState, useEffect } from 'react';
import sensorService from '../services/sensorService';

const useSensorData = (page = 1, limit = 50) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await sensorService.getSensorData(page, limit);
        
        // ✅ Pastikan response.data adalah array
        if (response && response.data && Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
        
      } catch (err) {
        console.error('Error in useSensorData:', err);
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { data, loading, error };
};

export default useSensorData;
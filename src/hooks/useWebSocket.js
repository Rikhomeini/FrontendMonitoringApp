import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url = 'ws://localhost:3002') => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Simulasi WebSocket connection untuk development
    const connectWebSocket = () => {
      console.log('🔌 Simulating WebSocket connection to ESP32...');
      setIsConnected(true);
      
      // Simulasi data incoming dari ESP32 setiap 2 detik
      const interval = setInterval(() => {
        const mockData = {
          type: 'sensor_update',
          timestamp: new Date().toISOString(),
          data: {
            temperature: {
              dht22: (30 + Math.random() * 5).toFixed(1),
              lm35: (29.5 + Math.random() * 4.5).toFixed(1)
            },
            vibration: {
              x: (0.1 + Math.random() * 0.4).toFixed(3),
              y: (0.08 + Math.random() * 0.35).toFixed(3),
              z: (0.12 + Math.random() * 0.38).toFixed(3)
            },
            electrical: {
              current: (3.5 + Math.random() * 2).toFixed(2),
              voltage: (210 + Math.random() * 20).toFixed(1),
              power: ((3.5 + Math.random() * 2) * (210 + Math.random() * 20)).toFixed(1)
            },
            machine_state: {
              rpm: (1200 + Math.random() * 300).toFixed(0),
              efficiency: (85 + Math.random() * 10).toFixed(1)
            }
          }
        };
        
        setData(mockData);
        setMessageHistory(prev => [...prev.slice(-9), mockData]);
      }, 2000);

      return () => clearInterval(interval);
    };

    connectWebSocket();

    return () => {
      setIsConnected(false);
    };
  }, [url]);

  const sendCommand = (command) => {
    console.log('📤 Sending command to ESP32:', command);
    // Simulasi send command ke ESP32
    const response = {
      type: 'command_response',
      command: command,
      status: 'success',
      timestamp: new Date().toISOString()
    };
    setMessageHistory(prev => [...prev, response]);
  };

  return { data, isConnected, messageHistory, sendCommand };
};

export default useWebSocket;
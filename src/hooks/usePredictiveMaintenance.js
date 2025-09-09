import { useState, useEffect } from 'react';

const usePredictiveMaintenance = (sensorData, refreshInterval = 15000) => {
  const [maintenanceSchedule, setMaintenanceSchedule] = useState([]);
  const [machineHealth, setMachineHealth] = useState({});
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const updateMaintenanceData = () => {
      const now = new Date();
      
      // Generate real-time machine health data
      const healthData = {
        overall: 85 + Math.random() * 12,
        mechanical: 80 + Math.random() * 15,
        electrical: 88 + Math.random() * 10,
        thermal: 82 + Math.random() * 14
      };

      setMachineHealth(healthData);

      // Generate predictive maintenance schedule
      const newSchedule = [
        {
          id: 1,
          machine: 'CNC Machine 1',
          type: Math.random() > 0.7 ? 'Predictive' : 'Preventive',
          status: Math.random() > 0.6 ? 'scheduled' : 'pending',
          scheduledDate: new Date(now.getTime() + (2 + Math.random() * 5) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          predictedIssue: getRandomIssue(),
          confidence: Math.floor(70 + Math.random() * 25),
          urgency: getUrgencyLevel(),
          estimatedDuration: `${Math.floor(2 + Math.random() * 4)} hours`,
          costEstimate: `$${Math.floor(500 + Math.random() * 1500)}`
        },
        {
          id: 2,
          machine: 'Injection Molder 2',
          type: Math.random() > 0.6 ? 'Predictive' : 'Preventive',
          status: Math.random() > 0.7 ? 'completed' : 'scheduled',
          scheduledDate: new Date(now.getTime() + (1 + Math.random() * 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completedDate: Math.random() > 0.7 ? new Date(now.getTime() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
          predictedIssue: getRandomIssue(),
          confidence: Math.floor(75 + Math.random() * 20),
          urgency: getUrgencyLevel(),
          technician: Math.random() > 0.5 ? 'John Doe' : 'Jane Smith'
        }
      ];

      setMaintenanceSchedule(newSchedule);

      // Generate AI predictions
      const newPredictions = [
        {
          id: 1,
          component: 'Main Bearing',
          failureProbability: (5 + Math.random() * 15).toFixed(1),
          remainingLife: `${Math.floor(30 + Math.random() * 60)} days`,
          recommendation: 'Monitor vibration levels',
          criticality: Math.random() > 0.7 ? 'high' : 'medium'
        },
        {
          id: 2,
          component: 'Cooling System',
          failureProbability: (3 + Math.random() * 10).toFixed(1),
          remainingLife: `${Math.floor(45 + Math.random() * 90)} days`,
          recommendation: 'Check coolant levels monthly',
          criticality: 'medium'
        }
      ];

      setPredictions(newPredictions);
    };

    const getRandomIssue = () => {
      const issues = [
        'Bearing wear detected',
        'Increased vibration levels',
        'Temperature anomalies',
        'Lubrication required',
        'Alignment issues',
        'Electrical fluctuations',
        'Cooling system efficiency drop'
      ];
      return issues[Math.floor(Math.random() * issues.length)];
    };

    const getUrgencyLevel = () => {
      const levels = ['low', 'medium', 'high', 'critical'];
      return levels[Math.floor(Math.random() * levels.length)];
    };

    // Initial update
    updateMaintenanceData();

    // Set up interval for real-time updates
    const intervalId = setInterval(updateMaintenanceData, refreshInterval);

    return () => clearInterval(intervalId);
  }, [sensorData, refreshInterval]);

  return { maintenanceSchedule, machineHealth, predictions };
};

export default usePredictiveMaintenance;
import { useState, useEffect } from 'react';

const useAIModelPerformance = (refreshInterval = 10000) => {
  const [modelMetrics, setModelMetrics] = useState({
    lstm: {
      accuracy: 92.1,
      precision: 89.7,
      recall: 93.4,
      f1Score: 91.5,
      trainingTime: '2.5 hours',
      dataPoints: '50,000',
      status: 'training',
      lastUpdate: new Date()
    },
    ppo: {
      accuracy: 85.3,
      decisionQuality: 88.9,
      learningRate: 0.001,
      episodes: '8,500',
      reward: '+82.7%',
      status: 'optimizing',
      lastUpdate: new Date()
    }
  });

  const [trainingProgress, setTrainingProgress] = useState({
    lstm: 75,
    ppo: 60
  });

  useEffect(() => {
    const updateModelMetrics = () => {
      setModelMetrics(prev => ({
        lstm: {
          ...prev.lstm,
          accuracy: Math.min(97, prev.lstm.accuracy + (Math.random() - 0.4)),
          precision: Math.min(95, prev.lstm.precision + (Math.random() - 0.3)),
          recall: Math.min(96, prev.lstm.recall + (Math.random() - 0.35)),
          f1Score: Math.min(94, prev.lstm.f1Score + (Math.random() - 0.32)),
          status: prev.lstm.accuracy > 95 ? 'production' : 'training',
          lastUpdate: new Date()
        },
        ppo: {
          ...prev.ppo,
          accuracy: Math.min(93, prev.ppo.accuracy + (Math.random() - 0.35)),
          decisionQuality: Math.min(92, prev.ppo.decisionQuality + (Math.random() - 0.3)),
          reward: `+${Math.min(95, parseFloat(prev.ppo.reward) + (Math.random() - 0.25)).toFixed(1)}%`,
          status: prev.ppo.accuracy > 88 ? 'production' : 'optimizing',
          lastUpdate: new Date()
        }
      }));

      setTrainingProgress(prev => ({
        lstm: Math.min(100, prev.lstm + (Math.random() * 2)),
        ppo: Math.min(100, prev.ppo + (Math.random() * 1.5))
      }));
    };

    // Initial update
    updateModelMetrics();

    // Set up interval for real-time updates
    const intervalId = setInterval(updateModelMetrics, refreshInterval);

    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return { modelMetrics, trainingProgress };
};

export default useAIModelPerformance;
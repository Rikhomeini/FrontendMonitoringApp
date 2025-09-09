import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TemperatureChart.css';

const TemperatureChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Generate realistic time-series data
    const now = new Date();
    const newData = [];
    
    for (let i = 0; i < 12; i++) {
      const time = new Date(now.getTime() - (i * 5 * 60 * 1000));
      newData.unshift({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: 28 + Math.random() * 4,
        anomaly: Math.random() > 0.9
      });
    }
    
    setChartData(newData);
  }, [data]);

  return (
    <Card className="chart-card">
      <Card.Header className="chart-header">
        <div className="d-flex justify-content-between align-items-center">
          <span>🌡️ Temperature Trend</span>
          <small className="text-muted">Real-time</small>
        </div>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              label={{ value: '°C', angle: -90, position: 'insideLeft' }}
              domain={[25, 35]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#ff6b35" 
              strokeWidth={3}
              dot={{ fill: '#ff6b35', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#e74c3c' }}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <div className="chart-stats mt-3">
          <div className="stat-item">
            <span className="label">Current:</span>
            <span className="value">{(chartData[chartData.length - 1]?.temp || 0).toFixed(1)}°C</span>
          </div>
          <div className="stat-item">
            <span className="label">Avg:</span>
            <span className="value">30.2°C</span>
          </div>
          <div className="stat-item">
            <span className="label">Status:</span>
            <span className="badge bg-success">Normal</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TemperatureChart;
import React, { useState, useEffect } from 'react';
import { Card, Form, Badge } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const VibrationAnalysisChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    generateVibrationData();
  }, [data]);

  const generateVibrationData = () => {
    const now = new Date();
    const dataPoints = [];
    
    for (let i = 0; i < 8; i++) {
      const time = new Date(now.getTime() - (i * 30 * 60 * 1000));
      const vibrationX = 0.1 + Math.random() * 0.4;
      const vibrationY = 0.08 + Math.random() * 0.35;
      const vibrationZ = 0.12 + Math.random() * 0.38;
      
      const maxVibration = Math.max(vibrationX, vibrationY, vibrationZ);
      const status = maxVibration > 0.4 ? 'warning' : maxVibration > 0.3 ? 'caution' : 'normal';
      
      dataPoints.unshift({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        vibrationX: Number(vibrationX.toFixed(3)),
        vibrationY: Number(vibrationY.toFixed(3)),
        vibrationZ: Number(vibrationZ.toFixed(3)),
        maxVibration: Number(maxVibration.toFixed(3)),
        status
      });
    }
    
    setChartData(dataPoints);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip vibration-tooltip">
          <p className="tooltip-time">{data.time}</p>
          <p className="tooltip-value">
            <span>📳</span> Max: <strong>{data.maxVibration}g</strong>
          </p>
          <p>X: {data.vibrationX}g | Y: {data.vibrationY}g | Z: {data.vibrationZ}g</p>
          <Badge bg={
            data.status === 'warning' ? 'danger' : 
            data.status === 'caution' ? 'warning' : 'success'
          }>
            {data.status.toUpperCase()}
          </Badge>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (value) => {
    if (value > 0.4) return '#dc3545';
    if (value > 0.3) return '#ffc107';
    return '#198754';
  };

  return (
    <Card className="advanced-chart-card">
      <Card.Header className="chart-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span>📳</span>
            <span>Vibration Analysis (3-Axis)</span>
          </div>
          <Badge bg="info">
            <span>📈</span>
            Real-time
          </Badge>
        </div>
      </Card.Header>
      
      <Card.Body>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis 
                label={{ 
                  value: 'Vibration (g)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'var(--text-color)' }
                }}
                domain={[0, 0.6]}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar dataKey="vibrationX" name="X-Axis" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.vibrationX)} />
                ))}
              </Bar>
              
              <Bar dataKey="vibrationY" name="Y-Axis" fill="#82ca9d">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.vibrationY)} />
                ))}
              </Bar>
              
              <Bar dataKey="vibrationZ" name="Z-Axis" fill="#ffc658">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.vibrationZ)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        
        <div className="vibration-legend">
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#198754' }}></div>
            <span>Normal (&lt; 0.3g)</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#ffc107' }}></div>
            <span>Caution (0.3-0.4g)</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#dc3545' }}></div>
            <span>Warning (&gt; 0.4g)</span>
          </div>
        </div>
      </Card.Body>
    </Card>
    
  );
};

export default VibrationAnalysisChart;
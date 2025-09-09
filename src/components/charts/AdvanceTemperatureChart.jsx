import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Thermometer, Activity, AlertCircle } from 'lucide-react';
import './AdvanceChart.css';

const AdvancedTemperatureChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('1h');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    generateChartData();
  }, [data, timeRange]);

  const generateChartData = () => {
    const now = new Date();
    const dataPoints = timeRange === '1h' ? 12 : timeRange === '6h' ? 24 : 48;
    
    const generatedData = [];
    
    for (let i = 0; i < dataPoints; i++) {
      const time = new Date(now.getTime() - (i * (timeRange === '1h' ? 5 : timeRange === '6h' ? 15 : 30) * 60 * 1000));
      const temp = 28 + Math.random() * 6;
      const isAnomaly = Math.random() > 0.93;
      
      generatedData.unshift({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: Number(temp.toFixed(1)),
        anomaly: isAnomaly,
        threshold: 34.5,
        // ✅ TAMBAHKAN ID UNIK UNTUK SETIAP DATA POINT
        id: `temp-point-${i}-${time.getTime()}`
      });
    }
    
    setChartData(generatedData);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{payload[0].payload.time}</p>
          <p className="tooltip-value">
            <Thermometer size={14} /> Temperature: <strong>{payload[0].value}°C</strong>
          </p>
          {payload[0].payload.anomaly && (
            <p className="tooltip-anomaly">
              <AlertCircle size={14} /> <strong>Anomaly Detected!</strong>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // ✅ CUSTOM DOT COMPONENT DENGAN KEY YANG UNIK
  const CustomDot = (props) => {
    const { cx, cy, payload, index } = props;
    return (
      <circle
        key={`dot-${payload.id}-${index}`} // ✅ KEY UNIK DI SINI
        cx={cx}
        cy={cy}
        r={4}
        fill={payload.anomaly ? "#dc3545" : "var(--primary-color)"}
        stroke={payload.anomaly ? "#fff" : "var(--primary-color)"}
        strokeWidth={2}
      />
    );
  };

  // ✅ CUSTOM ACTIVE DOT COMPONENT DENGAN KEY YANG UNIK
  const CustomActiveDot = (props) => {
    const { cx, cy, payload, index } = props;
    return (
      <circle
        key={`active-dot-${payload.id}-${index}`} // ✅ KEY UNIK DI SINI
        cx={cx}
        cy={cy}
        r={6}
        fill={payload.anomaly ? "#dc3545" : "var(--primary-color)"}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  return (
    <Card className="advanced-chart-card">
      <Card.Header className="chart-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Thermometer className="chart-icon" />
            <span>Temperature Trend Analysis</span>
          </div>
          <Form.Select 
            size="sm" 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-selector"
          >
            <option value="1h">Last 1 Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
          </Form.Select>
        </div>
      </Card.Header>
      
      <Card.Body>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                label={{ 
                  value: '°C', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'var(--text-color)' }
                }}
                domain={[25, 38]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Threshold Area */}
              <Area 
                type="monotone" 
                dataKey="threshold" 
                stroke="#ff6b35"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#thresholdGradient)"
                fillOpacity={0.1}
                // ✅ KEY UNIK UNTUK AREA
                key="threshold-area"
              />
              
              {/* Main Temperature Line */}
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="var(--primary-color)" 
                strokeWidth={3}
                // ✅ GUNAKAN CUSTOM DOT COMPONENT
                dot={<CustomDot />}
                // ✅ GUNAKAN CUSTOM ACTIVE DOT COMPONENT
                activeDot={<CustomActiveDot />}
                // ✅ KEY UNIK UNTUK LINE
                key="temperature-line"
              />
              
              {/* Gradient for threshold area */}
              <defs>
                <linearGradient id="thresholdGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Current</span>
            <span className="stat-value">
              {chartData.length > 0 ? chartData[chartData.length - 1]?.temperature : 0}°C
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average</span>
            <span className="stat-value">
              {chartData.length > 0 
                ? (chartData.reduce((sum, point) => sum + point.temperature, 0) / chartData.length).toFixed(1)
                : '0.0'}°C
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Anomalies</span>
            <span className="stat-value text-danger">
              {chartData.filter(point => point.anomaly).length}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdvancedTemperatureChart;
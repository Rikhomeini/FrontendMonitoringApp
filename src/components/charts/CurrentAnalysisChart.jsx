import React, { useState, useEffect } from 'react';
import { Card, Form, Badge } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { AiOutlineThunderbolt, AiOutlineWarning } from 'react-icons/ai';

const CurrentAnalysisChart = ({ data }) => {
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
      const current = 3.5 + Math.random() * 2.5;
      const isAnomaly = Math.random() > 0.95;
      const loadStatus = current > 5.8 ? 'overload' : current > 5.0 ? 'high' : 'normal';
      
      generatedData.unshift({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        current: Number(current.toFixed(2)),
        anomaly: isAnomaly,
        loadStatus,
        threshold: 5.0,
        criticalThreshold: 5.8
      });
    }
    
    setChartData(generatedData);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{point.time}</p>
          <p className="tooltip-value">
            <AiOutlineThunderbolt size={16} className="me-1" />
            Current: <strong>{point.current}A</strong>
          </p>
          <p className="tooltip-status">
            Load: <Badge bg={
              point.loadStatus === 'overload' ? 'danger' :
              point.loadStatus === 'high' ? 'warning' : 'success'
            }>
              {point.loadStatus.toUpperCase()}
            </Badge>
          </p>
          {point.anomaly && (
            <p className="tooltip-anomaly">
              <AiOutlineWarning size={16} className="me-1" />
              <strong>Current Spike Detected!</strong>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getLineColor = (current) => {
    if (current > 5.8) return '#ff0019ff';
    if (current > 5.0) return '#ffc107';
    return '#00fd87ff';
  };

  return (
    <Card className="advanced-chart-card">
      <Card.Header className="chart-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <AiOutlineThunderbolt size={20} className="chart-icon me-2" />
            <span>Current Trend Analysis</span>
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
                  value: 'Current (A)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'var(--text-color)' }
                }}
                domain={[2, 7]}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Threshold Areas */}
              <Area 
                type="monotone" 
                dataKey="criticalThreshold" 
                stroke="#dc3545"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#criticalGradient)"
                fillOpacity={0.1}
              />
              
              <Area 
                type="monotone" 
                dataKey="threshold" 
                stroke="#ffc107"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#warningGradient)"
                fillOpacity={0.1}
              />
              
              {/* Main Current Line */}
              // GANTI bagian Line component dengan ini:

<Line 
  type="monotone" 
  dataKey="current" 
  stroke="url(#currentGradient)" // ⬅️ Gunakan gradient
  strokeWidth={4}
  dot={({ payload }) => (
    <circle 
      cx={0} 
      cy={0} 
      r={5}
      fill={getLineColor(payload.current)}
      stroke="#fff"
      strokeWidth={2}
    />

  )}
  activeDot={{ 
    r: 8, // ⬅️ Besarkan active dot
    stroke: '#fff', 
    strokeWidth: 3,
    fill: ({ payload }) => getLineColor(payload.current)
  }}
/>
              
              <defs>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%" stopColor="#27ae60" />
  <stop offset="50%" stopColor="#f39c12" />
  <stop offset="100%" stopColor="#e74c3c" />
</linearGradient>
                <linearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffc107" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ffc107" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Current</span>
            <span className="stat-value" style={{ color: getLineColor(chartData[chartData.length - 1]?.current) }}>
              {chartData[chartData.length - 1]?.current || 0}A
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Load</span>
            <span className="stat-value">
              {(chartData.reduce((sum, point) => sum + point.current, 0) / chartData.length || 0).toFixed(2)}A
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Status</span>
            <span className="stat-value">
              <Badge bg={
                chartData[chartData.length - 1]?.loadStatus === 'overload' ? 'danger' :
                chartData[chartData.length - 1]?.loadStatus === 'high' ? 'warning' : 'success'
              }>
                {chartData[chartData.length - 1]?.loadStatus || 'normal'}
              </Badge>
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentAnalysisChart;
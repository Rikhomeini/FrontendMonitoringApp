import React, { useState, useEffect } from 'react';
import { Card, Form, Badge } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ReferenceLine } from 'recharts';
import { RiLightbulbLine, RiErrorWarningLine } from 'react-icons/ri';

const VoltageAnalysisChart = ({ data }) => {
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
      const voltage = 210 + Math.random() * 25;
      const isAnomaly = Math.random() > 0.96;
      const voltageStatus = voltage > 240 ? 'overvoltage' : voltage < 200 ? 'undervoltage' : 'normal';
      
      generatedData.unshift({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        voltage: Number(voltage.toFixed(1)),
        anomaly: isAnomaly,
        voltageStatus,
        upperThreshold: 240,
        lowerThreshold: 200,
        nominal: 220
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
            <RiLightbulbLine size={16} className="me-1" />
            Voltage: <strong>{point.voltage}V</strong>
          </p>
          <p className="tooltip-status">
            Status: <Badge bg={
              point.voltageStatus === 'overvoltage' ? 'danger' :
              point.voltageStatus === 'undervoltage' ? 'warning' : 'success'
            }>
              {point.voltageStatus.toUpperCase()}
            </Badge>
          </p>
          {point.anomaly && (
            <p className="tooltip-anomaly">
              <RiErrorWarningLine size={16} className="me-1" />
              <strong>Voltage Anomaly Detected!</strong>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const getLineColor = (voltage) => {
    if (voltage > 240 || voltage < 200) return '#dc3545';
    if (voltage > 235 || voltage < 205) return '#ffc107';
    return '#198754';
  };

  return (
    <Card className="advanced-chart-card">
      <Card.Header className="chart-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <RiLightbulbLine size={20} className="chart-icon me-2" />
            <span>Voltage Trend Analysis</span>
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
                  value: 'Voltage (V)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'var(--text-color)' }
                }}
                domain={[190, 250]}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference Lines */}
              <ReferenceLine y={220} stroke="#0dcaf0" strokeDasharray="3 3" />
              
              {/* Threshold Areas */}
              <Area 
                type="monotone" 
                dataKey="upperThreshold" 
                stroke="#dc3545"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#overvoltageGradient)"
                fillOpacity={0.1}
              />
              
              <Area 
                type="monotone" 
                dataKey="lowerThreshold" 
                stroke="#dc3545"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#undervoltageGradient)"
                fillOpacity={0.1}
              />
              
              {/* Main Voltage Line */}
              <Line 
  type="monotone" 
  dataKey="voltage" 
  stroke="#9b59b6" // Bright purple - sangat visible
  strokeWidth={5}
  strokeOpacity={0.95}
  dot={({ payload }) => (
    <circle 
      cx={0} 
      cy={0} 
      r={6}
      fill="#9b59b6"
      stroke="#fff"
      strokeWidth={3}
      style={{ filter: 'drop-shadow(0px 0px 2px rgba(155, 89, 182, 0.7))' }}
    />
  )}
  activeDot={{ 
    r: 10,
    stroke: '#fff', 
    strokeWidth: 3,
    fill: "#9b59b6",
    style: { filter: 'drop-shadow(0px 0px 3px rgba(155, 89, 182, 0.9))' }
  }}
  style={{ filter: 'drop-shadow(0px 0px 3px rgba(155, 89, 182, 0.6))' }}
/>

              
              <defs>
                 <linearGradient id="voltageGradient" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stopColor="#8e44ad" />   {/* Purple */}
    <stop offset="50%" stopColor="#3498db" />  {/* Blue */}
    <stop offset="100%" stopColor="#e74c3c" /> {/* Red */}
  </linearGradient>
  
  <linearGradient id="overvoltageGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.4}/>
    <stop offset="95%" stopColor="#e74c3c" stopOpacity={0.1}/>
  </linearGradient>
  
  <linearGradient id="undervoltageGradient" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="#e74c3c" stopOpacity={0.4}/>
    <stop offset="95%" stopColor="#e74c3c" stopOpacity={0.1}/>
  </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Voltage</span>
            <span className="stat-value" style={{ color: getLineColor(chartData[chartData.length - 1]?.voltage) }}>
              {chartData[chartData.length - 1]?.voltage || 0}V
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Stability</span>
            <span className="stat-value">
              {(
                (chartData.filter(p => p.voltage >= 200 && p.voltage <= 240).length / chartData.length) * 100 || 0
              ).toFixed(1)}%
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Quality</span>
            <span className="stat-value">
              <Badge bg={
                chartData[chartData.length - 1]?.voltageStatus === 'overvoltage' ? 'danger' :
                chartData[chartData.length - 1]?.voltageStatus === 'undervoltage' ? 'warning' : 'success'
              }>
                {chartData[chartData.length - 1]?.voltageStatus || 'normal'}
              </Badge>
            </span>
          </div>
        </div>
        
        <div className="voltage-legend mt-3">
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#198754' }}></div>
            <span>Normal (200-240V)</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#ffc107' }}></div>
            <span>Warning (205-235V)</span>
          </div>
          <div className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#dc3545' }}></div>
            <span>Critical (&lt;200V or &gt;240V)</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default VoltageAnalysisChart;
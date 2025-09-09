import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './VoltageChart.css';

const VoltageChart = ({ data }) => {
  const chartData = [
    { time: '10:00', voltage: 220 },
    { time: '10:05', voltage: 219 },
    { time: '10:10', voltage: 221 },
    { time: '10:15', voltage: 218 },
    { time: '10:20', voltage: 220 },
    { time: '10:25', voltage: 222 },
  ];

  return (
    <Card className="voltage-chart">
      <Card.Header>🔌 Voltage Trend</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: 'V', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="voltage" stroke="#ff0000" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default VoltageChart; // PASTIKAN INI ADA
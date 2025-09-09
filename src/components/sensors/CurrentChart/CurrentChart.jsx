import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './CurrentChart.css';

const CurrentChart = ({ data }) => {
  const chartData = [
    { time: '10:00', current: 4.2 },
    { time: '10:05', current: 4.1 },
    { time: '10:10', current: 4.3 },
    { time: '10:15', current: 4.0 },
    { time: '10:20', current: 4.2 },
    { time: '10:25', current: 4.4 },
  ];

  return (
    <Card className="current-chart">
      <Card.Header>⚡ Current Trend</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: 'A', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="current" stroke="#00ff00" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default CurrentChart; // PASTIKAN INI ADA
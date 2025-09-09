import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './VibrationChart.css';

const VibrationChart = ({ data }) => {
  // Data contoh untuk chart
  const chartData = [
    { time: '10:00', vibration: 0.25 },
    { time: '10:05', vibration: 0.28 },
    { time: '10:10', vibration: 0.31 },
    { time: '10:15', vibration: 0.29 },
    { time: '10:20', vibration: 0.32 },
    { time: '10:25', vibration: 0.35 },
  ];

  return (
    <Card className="vibration-chart">
      <Card.Header>📳 Vibration Trend</Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: 'g', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="monotone" dataKey="vibration" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default VibrationChart; // PASTIKAN INI ADA
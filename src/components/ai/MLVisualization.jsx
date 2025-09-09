import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import './MLVisualization.css';

const MLVisualization = ({ anomalies, predictions }) => {
  return (
    <Card className="h-100">
      <Card.Header className="bg-purple text-white">
        <h6 className="mb-0">🧠 AI Model Performance</h6>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span>LSTM Accuracy</span>
            <span className="fw-bold">94.7%</span>
          </div>
          <ProgressBar now={94.7} variant="success" className="mb-2" />
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span>PPO Decision Accuracy</span>
            <span className="fw-bold">89.2%</span>
          </div>
          <ProgressBar now={89.2} variant="info" className="mb-2" />
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <span>Anomaly Detection Rate</span>
            <span className="fw-bold">96.3%</span>
          </div>
          <ProgressBar now={96.3} variant="warning" className="mb-2" />
        </div>

        <div className="mt-4">
          <h6>Model Insights</h6>
          <ul className="list-unstyled small">
            <li>✅ Learning rate: 0.001</li>
            <li>✅ Epochs: 1000</li>
            <li>✅ Training data: 50,000 samples</li>
            <li>✅ Validation accuracy: 92.1%</li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MLVisualization;
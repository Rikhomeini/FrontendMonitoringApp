import React from 'react';
import { Card, ProgressBar, Badge } from 'react-bootstrap';
import { FaBrain, FaChartLine, FaRobot, FaSync } from 'react-icons/fa';
import useAIModelPerformance from '../../hooks/useAIModelPerfomance';

const ModelPerformance = () => {
  const { modelMetrics, trainingProgress } = useAIModelPerformance();

  const getStatusVariant = (status) => {
    switch (status) {
      case 'production': return 'success';
      case 'training': return 'warning';
      case 'optimizing': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="bg-gradient-primary text-white">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaBrain className="me-2" />
            <h6 className="mb-0">AI Model Performance</h6>
          </div>
          <FaSync size={12} className="text-white-50" />
        </div>
      </Card.Header>
      <Card.Body>
        {/* LSTM Model */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              <FaChartLine className="me-2" />
              LSTM Model
            </h6>
            <Badge bg={getStatusVariant(modelMetrics.lstm.status)}>
              {modelMetrics.lstm.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="mb-2">
            <div className="d-flex justify-content-between mb-1">
              <small>Training: {trainingProgress.lstm.toFixed(1)}%</small>
              <small>Accuracy: {modelMetrics.lstm.accuracy.toFixed(1)}%</small>
            </div>
            <ProgressBar now={trainingProgress.lstm} variant="success" className="mb-2" />
          </div>

          <div className="row small text-muted g-2">
            <div className="col-6">Precision: {modelMetrics.lstm.precision.toFixed(1)}%</div>
            <div className="col-6">Recall: {modelMetrics.lstm.recall.toFixed(1)}%</div>
            <div className="col-6">F1 Score: {modelMetrics.lstm.f1Score.toFixed(1)}%</div>
            <div className="col-6">Data: {modelMetrics.lstm.dataPoints}</div>
          </div>
        </div>

        {/* PPO Model */}
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">
              <FaRobot className="me-2" />
              PPO Model
            </h6>
            <Badge bg={getStatusVariant(modelMetrics.ppo.status)}>
              {modelMetrics.ppo.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="mb-2">
            <div className="d-flex justify-content-between mb-1">
              <small>Training: {trainingProgress.ppo.toFixed(1)}%</small>
              <small>Accuracy: {modelMetrics.ppo.accuracy.toFixed(1)}%</small>
            </div>
            <ProgressBar now={trainingProgress.ppo} variant="warning" className="mb-2" />
          </div>

          <div className="row small text-muted g-2">
            <div className="col-6">Decision: {modelMetrics.ppo.decisionQuality.toFixed(1)}%</div>
            <div className="col-6">Reward: {modelMetrics.ppo.reward}</div>
            <div className="col-6">LR: {modelMetrics.ppo.learningRate}</div>
            <div className="col-6">Episodes: {modelMetrics.ppo.episodes}</div>
          </div>
        </div>

        {/* Live Updates Indicator */}
        <div className="mt-3 p-2 bg-dark rounded">
          <small className="text-primary">
            <strong>Live:</strong> Models updating in real-time • 
            Last: {modelMetrics.lstm.lastUpdate.toLocaleTimeString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ModelPerformance;
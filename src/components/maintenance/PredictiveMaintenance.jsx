import React from 'react';
import { Card, ListGroup, Badge, Button, ProgressBar } from 'react-bootstrap';
import { FaTools, FaCalendarAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import usePredictiveMaintenance from '../../hooks/usePredictiveMaintenance';

const PredictiveMaintenance = () => {
  const { maintenanceSchedule, machineHealth, predictions } = usePredictiveMaintenance();

  const getUrgencyVariant = (urgency) => {
    switch (urgency) {
      case 'critical': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'scheduled': return 'primary';
      case 'in-progress': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="bg-gradient-info text-white">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <FaTools className="me-2" />
            <h6 className="mb-0">Predictive Maintenance</h6>
          </div>
          <FaClock size={12} className="text-white-50" />
        </div>
      </Card.Header>
      <Card.Body>
        {/* Machine Health Overview */}
        <div className="mb-3 p-2 bg-dark rounded">
          <h6 className="mb-2">Machine Health Score</h6>
          <ProgressBar now={machineHealth.overall} variant={
            machineHealth.overall > 90 ? 'success' :
            machineHealth.overall > 80 ? 'warning' : 'danger'
          } className="mb-2" />
          <div className="row small text-white g-2">
            <div className="col-6">Mechanical: {machineHealth.mechanical?.toFixed(1)}%</div>
            <div className="col-6">Electrical: {machineHealth.electrical?.toFixed(1)}%</div>
            <div className="col-6">Thermal: {machineHealth.thermal?.toFixed(1)}%</div>
            <div className="col-6">Overall: {machineHealth.overall?.toFixed(1)}%</div>
          </div>
        </div>

        {/* Maintenance Schedule */}
        <h6 className="mb-2">
          <FaCalendarAlt className="me-2" />
          Maintenance Schedule
        </h6>
        
        <ListGroup variant="flush" className="mb-3">
          {maintenanceSchedule.map((item) => (
            <ListGroup.Item key={item.id} className="px-0">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <div>
                  <h6 className="mb-1">{item.machine}</h6>
                  <div className="d-flex align-items-center mb-1">
                    <Badge bg={getStatusVariant(item.status)} className="me-2">
                      {item.status}
                    </Badge>
                    <Badge bg={item.type === 'Predictive' ? 'info' : 'secondary'}>
                      {item.type}
                    </Badge>
                    {item.urgency && (
                      <Badge bg={getUrgencyVariant(item.urgency)} className="ms-2">
                        <FaExclamationTriangle size={8} className="me-1" />
                        {item.urgency}
                      </Badge>
                    )}
                  </div>
                </div>
                <small className="text-muted">
                  {item.scheduledDate}
                </small>
              </div>
              
              {item.predictedIssue && (
                <div className="mb-1">
                  <small>
                    <strong>Issue:</strong> {item.predictedIssue}
                    {item.confidence && (
                      <span className="ms-2">({item.confidence}% confidence)</span>
                    )}
                  </small>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        {/* AI Predictions */}
        <div className="p-2 bg-warning bg-opacity-10 rounded">
          <h6 className="mb-2">AI Predictions</h6>
          {predictions.map(prediction => (
            <div key={prediction.id} className="mb-2">
              <small>
                <strong>{prediction.component}:</strong> {prediction.failureProbability}% failure risk • 
                <span className="text-muted"> {prediction.remainingLife} remaining</span>
              </small>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PredictiveMaintenance;
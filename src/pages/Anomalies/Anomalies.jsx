import { Card, Row, Col, Alert, Badge } from 'react-bootstrap';
import './Anomalies.css';

const Anomalies = () => {
  const anomalies = [
    { 
      id: 1, 
      type: 'Temperature Spike', 
      severity: 'High', 
      message: 'Temperature increased by 15°C in 5 minutes', 
      timestamp: '2023-11-10 10:25:30',
      resolved: false
    },
    { 
      id: 2, 
      type: 'Vibration Anomaly', 
      severity: 'Medium', 
      message: 'Unusual vibration pattern detected', 
      timestamp: '2023-11-10 09:45:22',
      resolved: true
    },
  ];

  const getVariant = (severity) => {
    switch (severity) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <h1 className="my-4">Anomaly Detection</h1>
      <Row>
        <Col md={8}>
          <h4>Recent Anomalies</h4>
          {anomalies.map(anomaly => (
            <Alert 
              key={anomaly.id} 
              variant={getVariant(anomaly.severity)} 
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>
                  {anomaly.type} 
                  <Badge bg={anomaly.resolved ? 'success' : 'secondary'} className="ms-2">
                    {anomaly.resolved ? 'Resolved' : 'Active'}
                  </Badge>
                </h5>
                <p className="mb-1">{anomaly.message}</p>
                <small>{anomaly.timestamp}</small>
              </div>
            </Alert>
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Anomaly Statistics</Card.Header>
            <Card.Body>
              <p>Total Anomalies Detected: <strong>12</strong></p>
              <p>Active Anomalies: <strong>1</strong></p>
              <p>False Positives: <strong>2</strong></p>
              <hr />
              <small className="text-muted">
                Powered by LSTM + PPO AI Models
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Anomalies; // PASTIKAN INI ADA
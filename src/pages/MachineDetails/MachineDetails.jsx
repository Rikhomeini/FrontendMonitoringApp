import { Card, Row, Col, Badge } from 'react-bootstrap';
import './MachineDetails.css';

const MachineDetails = () => {
  return (
    <div>
      <h1 className="my-4">Machine Details</h1>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4 className="mb-0">CNC Machine 1</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <p><strong>Status:</strong> <Badge bg="success">Online</Badge></p>
                  <p><strong>Efficiency:</strong> 85%</p>
                  <p><strong>Uptime:</strong> 98.5%</p>
                </Col>
                <Col md={6}>
                  <p><strong>Last Maintenance:</strong> 2023-10-15</p>
                  <p><strong>Next Maintenance:</strong> 2023-12-15</p>
                  <p><strong>Total Runtime:</strong> 1,245 hours</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Quick Actions</Card.Header>
            <Card.Body>
              <button className="btn btn-primary w-100 mb-2">Run Diagnostic</button>
              <button className="btn btn-warning w-100 mb-2">Schedule Maintenance</button>
              <button className="btn btn-info w-100">View History</button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MachineDetails; // PASTIKAN INI ADA
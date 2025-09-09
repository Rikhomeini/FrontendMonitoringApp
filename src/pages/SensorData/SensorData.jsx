import { useState } from 'react';
import { Card, Row, Col, Table, Button } from 'react-bootstrap';
import './SensorData.css';

const SensorData = () => {
  const [sensorData] = useState([
    { id: 1, sensor: 'DHT22 (Suhu)', value: '32.5°C', timestamp: '2023-11-10 10:30:45' },
    { id: 2, sensor: 'LM35 (Suhu)', value: '31.8°C', timestamp: '2023-11-10 10:30:45' },
    { id: 3, sensor: 'INA219 (Arus)', value: '4.2A', timestamp: '2023-11-10 10:30:45' },
    { id: 4, sensor: 'INA219 (Tegangan)', value: '220V', timestamp: '2023-11-10 10:30:45' },
    { id: 5, sensor: 'MPU6050 (Getaran X)', value: '0.25g', timestamp: '2023-11-10 10:30:45' },
    { id: 6, sensor: 'MPU6050 (Getaran Y)', value: '0.18g', timestamp: '2023-11-10 10:30:45' },
  ]);

  return (
    <div>
      <h1 className="my-4">Sensor Data</h1>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <span>Real-time Sensor Readings</span>
                <Button variant="outline-primary" size="sm">
                  Refresh Data
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sensor</th>
                    <th>Value</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {sensorData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.sensor}</td>
                      <td>{data.value}</td>
                      <td>{data.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SensorData; // PASTIKAN INI ADA
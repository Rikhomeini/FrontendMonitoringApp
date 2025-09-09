import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    dataRefreshInterval: 5000,
    anomalyThreshold: 0.75,
    notificationsEnabled: true,
    theme: 'light'
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan settings (nanti akan diintegrasikan dengan backend)
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <h1 className="my-4">System Settings</h1>
      
      {showAlert && (
        <Alert variant="success" className="mb-3">
          Settings saved successfully!
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Data Collection Settings</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Data Refresh Interval (ms)</Form.Label>
                  <Form.Control
                    type="number"
                    name="dataRefreshInterval"
                    value={settings.dataRefreshInterval}
                    onChange={handleChange}
                    min="1000"
                    step="1000"
                  />
                  <Form.Text className="text-muted">
                    How often to refresh sensor data (in milliseconds)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Anomaly Detection Threshold</Form.Label>
                  <Form.Range
                    name="anomalyThreshold"
                    value={settings.anomalyThreshold}
                    onChange={handleChange}
                    min="0.1"
                    max="1.0"
                    step="0.05"
                  />
                  <Form.Text className="text-muted">
                    Current value: {settings.anomalyThreshold}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="notificationsEnabled"
                    label="Enable Notifications"
                    checked={settings.notificationsEnabled}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>System Information</Card.Header>
            <Card.Body>
              <p><strong>Frontend:</strong> React + Vite</p>
              <p><strong>Backend:</strong> Node.js</p>
              <p><strong>AI Models:</strong> LSTM + PPO</p>
              <p><strong>Sensors:</strong> INA219, DHT22, LM35, MPU6050</p>
              <p><strong>Microcontroller:</strong> ESP32</p>
              <p><strong>Single Board Computer:</strong> Raspberry Pi 4 Model B</p>
              <hr />
              <small className="text-muted">
                Industrial 4.0 Monitoring System
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Settings; // PASTIKAN INI ADA
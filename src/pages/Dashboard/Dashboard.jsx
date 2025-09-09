import { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Alert, Button } from 'react-bootstrap';
import { TemperatureChart, VibrationChart, CurrentChart, VoltageChart } from '../../components/sensors';
import useSensorData from '../../hooks/useSensorData';
import useAIAnomalyDetection from '../../hooks/useAIAnomalyDetection';
import './Dashboard.css';
import AdvancedTemperatureChart from '../../components/charts/AdvanceTemperatureChart';
import VibrationAnalysisChart from '../../components/charts/VibrationAnalysisChart';
import CurrentAnalysisChart from '../../components/charts/CurrentAnalysisChart';
import VoltageAnalysisChart from '../../components/charts/VoltageAnalysisChart';
import ModelPerformance from '../../components/ai/ModelPerfomance';
import PredictiveMaintenance from '../../components/maintenance/PredictiveMaintenance';
import useAIModelPerformance from '../../hooks/useAIModelPerfomance';
import usePredictiveMaintenance from '../../hooks/usePredictiveMaintenance';

const Dashboard = () => {
  const { data: sensorData, loading: sensorLoading, error: sensorError } = useSensorData(1, 50);
  const { anomalies, analyzeData, isLoading: aiLoading } = useAIAnomalyDetection();
  const { modelMetrics, trainingProgress } = useAIModelPerformance();
  const { maintenanceSchedule, machineHealth } = usePredictiveMaintenance();
  
  const [showDetails, setShowDetails] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  // ✅ Analyze data ketika sensorData berubah
  useEffect(() => {
    if (sensorData && sensorData.length > 0) {
      analyzeData(sensorData);
      
      // ✅ Cek jika menggunakan mock data
      const isMockData = sensorData.some(item => 
        item._id && item._id.toString().includes('mock-')
      );
      setUsingMockData(isMockData);
    }
  }, [sensorData, analyzeData]);

  // ✅ Format data untuk charts dan cards
  const formatSensorDataForDisplay = (rawData) => {
    if (!rawData || !Array.isArray(rawData)) return [];
    
    return rawData.map(item => {
      // ✅ Handle both real data and mock data structures
      const isRealData = item.temperature && typeof item.temperature === 'object';
      
      return {
        id: item._id || item.id || Math.random().toString(),
        sensor: isRealData ? 'Temperature Sensor' : item.sensor || 'Unknown Sensor',
        value: isRealData ? item.temperature.value : item.value,
        unit: isRealData ? item.temperature.unit : item.unit,
        timestamp: item.timestamp || new Date(),
        // ✅ Untuk AI detection
        status: 'normal',
        confidence: 0
      };
    });
  };

  const displayData = formatSensorDataForDisplay(sensorData);

  // ✅ Fixed: getSensorWithStatus dengan null safety
  const getSensorWithStatus = (sensorName) => {
    // ✅ Tambahkan null safety checks
    if (!sensorName || typeof sensorName !== 'string') {
      return null;
    }

    // ✅ Pastikan anomalies adalah array sebelum menggunakan find
    const anomaly = anomalies && Array.isArray(anomalies) 
      ? anomalies.find(a => a && a.sensor && a.sensor.includes(sensorName))
      : null;

    // ✅ Pastikan displayData adalah array sebelum menggunakan find
    const sensor = displayData && Array.isArray(displayData) 
      ? displayData.find(s => s && s.sensor && s.sensor.includes(sensorName))
      : null;

    return anomaly || sensor || null;
  };

  // ✅ Fixed: getStatusVariant dengan null safety
  const getStatusVariant = (status) => {
    if (!status) return 'secondary'; // ✅ Default jika status undefined
    
    switch (status.toLowerCase()) {
      case 'danger': return 'danger';
      case 'warning': return 'warning';
      case 'normal': return 'success';
      default: return 'secondary';
    }
  };

  if (sensorLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ 
        minHeight: 'calc(100vh - 70px)',
        backgroundColor: 'var(--bg-color)'
      }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading sensor data...</p>
        </div>
      </div>
    );
  }

  if (sensorError) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ 
        minHeight: 'calc(100vh - 70px)',
        backgroundColor: 'var(--bg-color)'
      }}>
        <Alert variant="danger" className="text-center">
          <h5>❌ Connection Error</h5>
          <p>{sensorError.message}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry Connection
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="dashboard force-bg">
      {/* Header */}
      <div className="dashboard-header force-card-bg">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 fw-bold mb-0">🏭 Industrial AI Monitor</h1>
            <small className="text-muted">LSTM + PPO Powered Monitoring</small>
          </div>
          <div className="text-end">
            <Badge bg={anomalies?.length > 0 ? 'warning' : 'success'} className="mb-1">
              {anomalies?.length > 0 ? '⚠️ ALERTS' : 'SYSTEM ONLINE'}
            </Badge>
            <div className="text-muted small">
              Last update: {new Date().toLocaleTimeString()}
            </div>
            {usingMockData && (
              <Badge bg="info" className="mt-1">
                📦 Using Demo Data
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content force-bg">
        {/* ✅ Alert untuk mock data */}
        {usingMockData && (
          <Alert variant="info" className="mb-3">
            <strong>📦 Demo Mode</strong> - Showing mock data for demonstration purposes. 
            Connect real sensors to see live data.
          </Alert>
        )}

        {/* Sensor Grid */}
        <div className="sensor-grid">
          {displayData.length > 0 ? (
            displayData.map((sensor) => {
              const sensorName = sensor?.sensor?.split('(')[0]?.trim() || 'Sensor';
              const sensorWithStatus = getSensorWithStatus(sensorName);
              
              // ✅ Tambahkan null check untuk sensorWithStatus
              const status = sensorWithStatus?.status || 'normal';
              const confidence = sensorWithStatus?.confidence || 0;
              
              return (
                <Card key={sensor.id} className="sensor-card equal-height-card">
                  <Card.Header className={`d-flex justify-content-between align-items-center ${
                    status !== 'normal' ? 'bg-' + getStatusVariant(status) : ''
                  }`}>
                    <span className="fw-bold">{sensorName}</span>
                    <Badge bg={getStatusVariant(status)}>
                      {status?.toUpperCase() || 'NORMAL'}
                    </Badge>
                  </Card.Header>
                  <Card.Body className="text-center">
                    <div className="sensor-value">
                      {sensor.value || 'N/A'}
                    </div>
                    <div className="sensor-unit">{sensor.unit || ''}</div>
                    {status !== 'normal' && (
                      <div className="mt-2">
                        <small className="text-warning">
                          ⚠️ AI Detection: {confidence * 100}% confidence
                        </small>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              );
            })
          ) : (
            // ✅ Fallback UI
            <div className="col-12 text-center py-5">
              <div className="text-muted">
                <i className="bi bi-inbox display-4"></i>
                <p className="mt-3">No sensor data available</p>
                <small>Check your connection or try refreshing the page</small>
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="chart-row">
          <AdvancedTemperatureChart data={sensorData} />
          <VibrationAnalysisChart data={sensorData} />
          <CurrentAnalysisChart data={sensorData} />
          <VoltageAnalysisChart data={sensorData} />
        </div>

        {/* AI & Maintenance Section */}
        <div className="ai-maintenance-grid">
          <ModelPerformance metrics={modelMetrics} progress={trainingProgress} />
          <PredictiveMaintenance schedule={maintenanceSchedule} health={machineHealth} />
        </div>

        {/* System Status */}
        <Card className="equal-height-card">
          <Card.Header>
            <h6 className="mb-0">📊 System Overview</h6>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3} className="text-center mb-3">
                <div className="stat-value text-success">98.7%</div>
                <div className="stat-label">Uptime</div>
              </Col>
              <Col md={3} className="text-center mb-3">
                <div className="stat-value text-primary">{displayData.length}</div>
                <div className="stat-label">Sensors Active</div>
              </Col>
              <Col md={3} className="text-center mb-3">
                <div className="stat-value text-warning">{anomalies?.length || 0}</div>
                <div className="stat-label">Warnings</div>
              </Col>
              <Col md={3} className="text-center mb-3">
                <div className="stat-value text-success">0</div>
                <div className="stat-label">Critical Issues</div>
              </Col>
            </Row>
            <div className="text-center mt-3">
              <Badge bg="success" className="me-2">AI: Active</Badge>
              <Badge bg="info" className="me-2">ML: Learning</Badge>
              <Badge bg="primary">Data: Streaming</Badge>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
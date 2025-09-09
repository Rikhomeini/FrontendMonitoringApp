import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navigation } from './components/layout';
import Dashboard from './pages/Dashboard';
import SensorData from './pages/SensorData';
import Analytics from './pages/analytics/Analytics';
import Anomalies from './pages/Anomalies';
import Settings from './pages/Settings';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app force-bg">
          <Navigation />
          <Container fluid className="main-content force-bg">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sensor-data" element={<SensorData />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/anomalies" element={<Anomalies />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
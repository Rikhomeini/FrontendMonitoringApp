import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Container fluid>
        <Row className="align-items-center">
          <Col>
            <h1>🏭 Industrial Monitoring System</h1>
            <p className="mb-0">Real-time machine performance monitoring with AI</p>
          </Col>
          <Col xs="auto">
            <div className="status-indicator">
              <span className="status-dot online"></span>
              System Online
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
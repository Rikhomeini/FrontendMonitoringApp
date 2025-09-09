import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import NotificationBell from '../../notifications/NotificationBell/NotificationBell';
import ThemeToggle from '../../layout/ThemeToggle/ThemeToggle';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar 
      bg="primary" 
      variant="dark" 
      expand="lg" 
      className="navigation"
      expanded={expanded}
      onToggle={setExpanded}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold" onClick={() => setExpanded(false)}>
          🏭 Industrial AI Monitor
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              📊 Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/sensor-data" 
              active={location.pathname === '/sensor-data'}
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              📡 Sensor Data
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/anomalies" 
              active={location.pathname === '/anomalies'}
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              ⚠️ Anomalies
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/settings" 
              active={location.pathname === '/settings'}
              className="nav-link-custom"
              onClick={() => setExpanded(false)}
            >
              ⚙️ Settings
            </Nav.Link>
          </Nav>
          <Nav.Link 
  as={Link} 
  to="/analytics" 
  active={location.pathname === '/analytics'}
  className="nav-link-custom"
  onClick={() => setExpanded(false)}
>
  📈 Analytics
</Nav.Link>

          
          <Nav className="align-items-center mobile-nav-items">
            <div className="d-flex align-items-center gap-3 mobile-nav-content">
              <ThemeToggle />
              <NotificationBell />
              <div className="user-profile">
                <div className="user-avatar">
                  <span>👤</span>
                </div>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
import React from 'react';
import { Alert, Button, Card } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="m-3">
          <Card.Header>
            <h5>⚠️ Something went wrong</h5>
          </Card.Header>
          <Card.Body>
            <Alert variant="danger">
              <p>The application encountered an error. Please try refreshing the page.</p>
              <details>
                <summary>Error Details</summary>
                <pre>{this.state.error?.toString()}</pre>
              </details>
            </Alert>
            <Button 
              variant="primary" 
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Card.Body>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
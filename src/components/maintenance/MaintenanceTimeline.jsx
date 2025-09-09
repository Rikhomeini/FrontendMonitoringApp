import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const MaintenanceTimeline = ({ schedule }) => {
  const events = [
    {
      date: '2024-02-01',
      type: 'completed',
      title: 'Routine Maintenance',
      description: 'Completed monthly checkup'
    },
    {
      date: '2024-02-15',
      type: 'scheduled',
      title: 'AI-Predicted Maintenance',
      description: 'Based on vibration analysis'
    },
    {
      date: '2024-03-01',
      type: 'upcoming',
      title: 'Quarterly Overhaul',
      description: 'Full system inspection'
    }
  ];

  return (
    <Card className="h-100">
      <Card.Header>
        <h6 className="mb-0">📅 Maintenance Timeline</h6>
      </Card.Header>
      <Card.Body>
        <div className="timeline">
          {events.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className={`marker ${event.type}`}></div>
              </div>
              <div className="timeline-content">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-1">{event.title}</h6>
                  <Badge bg={
                    event.type === 'completed' ? 'success' :
                    event.type === 'scheduled' ? 'warning' : 'info'
                  }>
                    {event.type}
                  </Badge>
                </div>
                <p className="mb-1 small text-muted">{event.description}</p>
                <small className="text-muted">{event.date}</small>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MaintenanceTimeline;
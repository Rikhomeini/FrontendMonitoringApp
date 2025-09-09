import React, { useState } from 'react';
import { Badge, Dropdown, ListGroup } from 'react-bootstrap';
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Temperature Alert',
      message: 'Machine 1 temperature above threshold',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Maintenance Due',
      message: 'Scheduled maintenance in 3 days',
      time: '1 hour ago',
      read: true
    },
    {
      id: 3,
      type: 'success',
      title: 'System Update',
      message: 'New AI model deployed successfully',
      time: '3 hours ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="outline-light" className="notification-toggle">
        <i className="bi bi-bell-fill"></i>
        {unreadCount > 0 && (
          <Badge bg="danger" className="notification-badge">
            {unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="notification-dropdown">
        <Dropdown.Header className="d-flex justify-content-between align-items-center">
          <span>Notifications</span>
          <Badge bg="primary">{notifications.length}</Badge>
        </Dropdown.Header>
        
        <ListGroup variant="flush">
          {notifications.map(notification => (
            <ListGroup.Item 
              key={notification.id} 
              className={`notification-item ${!notification.read ? 'unread' : ''}`}
            >
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">{notification.title}</h6>
                <small className="text-muted">{notification.time}</small>
              </div>
              <p className="mb-1">{notification.message}</p>
              <Badge bg={
                notification.type === 'warning' ? 'warning' :
                notification.type === 'info' ? 'info' : 'success'
              }>
                {notification.type}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <Dropdown.Divider />
        <Dropdown.Item className="text-center text-primary">
          Mark all as read
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBell;
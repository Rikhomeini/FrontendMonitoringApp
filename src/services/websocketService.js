import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.callbacks = new Map();
  }

  connect() {
    this.socket = io('http://localhost:5000', {
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('sensor-data-update', (data) => {
      this.triggerCallbacks('sensor-update', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  subscribeToDevice(deviceId) {
    if (this.socket) {
      this.socket.emit('subscribe-sensor', deviceId);
    }
  }

  unsubscribeFromDevice(deviceId) {
    if (this.socket) {
      this.socket.emit('unsubscribe-sensor', deviceId);
    }
  }

  on(event, callback) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, new Set());
    }
    this.callbacks.get(event).add(callback);
  }

  off(event, callback) {
    if (this.callbacks.has(event)) {
      this.callbacks.get(event).delete(callback);
    }
  }

  triggerCallbacks(event, data) {
    if (this.callbacks.has(event)) {
      this.callbacks.get(event).forEach(callback => {
        callback(data);
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new WebSocketService();
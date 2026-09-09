import { wsUrl } from './api';

class WebSocketService {
  constructor() {
    this.ws = null;
    this.listeners = new Set();
    this.statusListeners = new Set();
    this.state = 'disconnected';
    this.shouldReconnect = true;
    this.reconnectTimer = null;
  }

  connect() {
    if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
      return;
    }

    this.shouldReconnect = true;
    this._updateState('connecting');

    try {
      this.ws = new WebSocket(wsUrl());

      this.ws.onopen = () => {
        this._updateState('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.listeners.forEach((listener) => listener(data));
        } catch {
          // ignore malformed frame
        }
      };

      this.ws.onerror = () => {
        this._updateState('error');
      };

      this.ws.onclose = () => {
        this._updateState('disconnected');
        if (this.shouldReconnect) {
          this.reconnectTimer = setTimeout(() => this.connect(), 2500);
        }
      };
    } catch (e) {
      this._updateState('error');
      if (this.shouldReconnect) {
        this.reconnectTimer = setTimeout(() => this.connect(), 2500);
      }
    }
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this._updateState('disconnected');
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  onStatusChange(callback) {
    this.statusListeners.add(callback);
    callback(this.state);
    return () => this.statusListeners.delete(callback);
  }

  _updateState(newState) {
    this.state = newState;
    this.statusListeners.forEach((listener) => listener(newState));
  }
}

export const webSocketService = new WebSocketService();

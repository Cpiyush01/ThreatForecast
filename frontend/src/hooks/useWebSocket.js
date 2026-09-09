import { useState, useEffect } from 'react';
import { webSocketService } from '../services/websocket';

export const useWebSocket = () => {
  const [wsState, setWsState] = useState(webSocketService.state);

  useEffect(() => {
    webSocketService.connect();
    const unsubscribeStatus = webSocketService.onStatusChange((state) => {
      setWsState(state);
    });

    return () => {
      unsubscribeStatus();
    };
  }, []);

  return { wsState, webSocketService };
};

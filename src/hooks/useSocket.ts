import { useEffect, useState } from "react";
import io from "socket.io-client";
export function useExternalSocket(url = "http://localhost:3000") {
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socketInstance = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    socketInstance.on("connect", () => {
      console.log("Connected to socket server");
      setIsConnected(true);
    });
    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setIsConnected(false);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.close();
    };
  }, [url]);
  const sendExternalMessage = (message: string) => {
    if (!socket || !socket.connected) {
      console.warn("Cannot send message - socket not connected");
      return;
    }
    const questionData = {
      text: message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    socket.emit("receive_external_question", questionData);
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
      setIsConnected(false);
    }
  };

  return { 
    isConnected, 
    sendExternalMessage
  };
}
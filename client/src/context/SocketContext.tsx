import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://127.0.0.1:3001";

const socketInstance = io(SOCKET_URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(socketInstance.connected);

  useEffect(() => {
    // Listeners are attached inside the effect
    function onConnect() {
      console.log("🟢 Connected to Socket.io server:", socketInstance.id);
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("🔴 Disconnected from server");
      setIsConnected(false);
    }

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    // If it connected before the effect ran, update state
    if (socketInstance.connected) {
      setIsConnected(true);
    }

    // Cleanup listeners on unmount (but DO NOT disconnect the socket itself)
    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

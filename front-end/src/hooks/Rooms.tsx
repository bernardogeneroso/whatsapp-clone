import React, { createContext, useState, useContext } from "react";
import socketIOClient from "socket.io-client";

interface AuthContextData {
  socket: SocketIOClient.Socket;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Rooms: React.FC = ({ children }) => {
  const [socket] = useState(
    socketIOClient(
      process.env.REACT_APP_SERVER_IP_SOCKET || "http://127.0.0.1:3333"
    )
  );

  return (
    <AuthContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useRooms(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an RoomsMessages");
  }

  return context;
}

export { Rooms, useRooms };

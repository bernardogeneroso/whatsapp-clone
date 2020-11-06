import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import socketIOClient from "socket.io-client";

import userDefault from "../assets/userDefault.png";
import api from "../services/api";

interface RoomSelectedProps {
  id: number;
  name: string;
  chat_description: string;
  image: string;
}

interface MessageProps {
  message: String;
  username: String;
  timestamp: Date;
  room_id: Number;
}

interface MessageReceivedProps {
  _id: string;
  message: String;
  username: String;
  timestamp: Date;
  room_id: Number;
}

interface AuthState {
  selectedRoom: RoomSelectedProps;
  messageReceived: MessageReceivedProps;
  messagesRoom: MessageReceivedProps;
}

interface AuthContextData {
  selectedRoom: RoomSelectedProps;
  messageReceived: MessageReceivedProps;
  messagesRoom(): void;
  setSelectedRoom(room: RoomSelectedProps): void;
  newMessage(message: MessageProps): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Rooms: React.FC = ({ children }) => {
  const [socket] = useState(socketIOClient("http://localhost:3334"));
  const [data, setData] = useState<AuthState>(() => {
    return {} as AuthState;
  });

  useEffect(() => {
    socket.on("messageRoom", (message: MessageReceivedProps) => {
      setData({
        ...data,
        messageReceived: message,
      });
    });
  }, [socket, data]);

  const setSelectedRoom = useCallback(
    (room: RoomSelectedProps) => {
      if (room.image === null) {
        room.image = userDefault;
      }

      setData({ ...data, selectedRoom: room });
    },
    [data]
  );

  const newMessage = useCallback(
    (message) => {
      socket.emit("newMessage", message);
    },
    [socket]
  );

  const messagesRoom = useCallback(() => {
    api.post(`/messages/receive/${data.selectedRoom.id}`).then((response) => {
      setData({
        ...data,
        messagesRoom: response.data,
      });
    });
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        selectedRoom: data.selectedRoom,
        messageReceived: data.messageReceived,
        setSelectedRoom,
        newMessage,
        messagesRoom,
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

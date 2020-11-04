import React, { createContext, useCallback, useState, useContext } from "react";

import userDefault from "../assets/userDefault.png";

interface RoomSelectedProps {
  id: number;
  name: string;
  chat_description: string;
  image: string;
}

interface AuthState {
  selectedRoom: RoomSelectedProps;
}

interface AuthContextData {
  selectedRoom: RoomSelectedProps;
  setSelectedRoom(room: RoomSelectedProps): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const Rooms: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    return {} as AuthState;
  });

  const setSelectedRoom = useCallback((room: RoomSelectedProps) => {
    if (room.image === null) {
      room.image = userDefault;
    }

    setData({ selectedRoom: room });
  }, []);

  return (
    <AuthContext.Provider
      value={{ selectedRoom: data.selectedRoom, setSelectedRoom }}
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

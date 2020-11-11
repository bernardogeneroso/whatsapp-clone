import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Chat from "./Chat";
import ChatReplacement from "./ChatReplacement";

import { Container, TopWrapper } from "./styles";

interface RoomProps {
  id: number;
  name: string;
  chat_description: string;
  image: string;
}

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomProps>({} as RoomProps);

  return (
    <Container>
      <TopWrapper />
      <Sidebar
        setSelectedRoom={setSelectedRoom}
        selectedRoomID={selectedRoom.id}
      />
      {selectedRoom.id ? (
        <Chat selectedRoom={selectedRoom} />
      ) : (
        <ChatReplacement />
      )}
    </Container>
  );
};

export default Dashboard;

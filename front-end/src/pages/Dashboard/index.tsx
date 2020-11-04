import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Chat from "./Chat";

import { Container, TopWrapper } from "./styles";

interface RoomSelectedProps {
  id: number;
  name: string;
  chat_description: string;
  image: string;
}

const Dashboard = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  return (
    <Container>
      <TopWrapper />
      <Sidebar handleSelectedRoom={setSelectedRoom} />
      <Chat />
    </Container>
  );
};

export default Dashboard;

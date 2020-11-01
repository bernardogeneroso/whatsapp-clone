import React from "react";

import Sidebar from "../Sidebar";
import Chat from "../Chat";

import { Container, TopWrapper } from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <TopWrapper />
      <Sidebar />
      <Chat />
    </Container>
  );
};

export default Dashboard;

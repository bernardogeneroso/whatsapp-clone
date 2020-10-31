import React from "react";

import Sidebar from "../Sidebar";
import Chat from "../Chat";

import { Container } from "./styles";

const Dashboard = () => {
  return (
    <Container>
      <Sidebar />
      <Chat />
    </Container>
  );
};

export default Dashboard;

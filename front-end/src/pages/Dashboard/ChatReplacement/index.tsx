import React from "react";

import { Container, Content } from "./styles";

import whatshappConnect from "../../../assets/whatshappConnect.png";

const ChatReplacement = () => {
  return (
    <Container>
      <Content>
        <img src={whatshappConnect} alt="Whatshapp connect" />

        <p>Selecione uma sala para poder mandar mensagens</p>
      </Content>
    </Container>
  );
};

export default ChatReplacement;

import React from "react";
import { IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";

import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  ContainerMessages,
  Message,
} from "./styles";

const Chat = () => {
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Dance Room</h3>
            <p>Last message: 04 Nov 2020 18:00</p>
          </div>
        </HeaderLeft>
        <HeaderRight>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderRight>
      </Header>

      <ContainerMessages>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{new Date().toUTCString()}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{new Date().toUTCString()}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{new Date().toUTCString()}</span>
        </Message>
      </ContainerMessages>
    </Container>
  );
};

export default Chat;

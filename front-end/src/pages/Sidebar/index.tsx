import React from "react";

import { IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert } from "@material-ui/icons";

import { Container, Header } from "./styles";

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <div>
          {/* eslint-disable-next-line jsx-a11y/alt-text*/}
          <img src="https://material-ui.com//static/images/avatar/3.jpg" />
        </div>
        <div>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </Header>
    </Container>
  );
};

export default Sidebar;

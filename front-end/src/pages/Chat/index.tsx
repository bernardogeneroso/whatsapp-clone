import React, { useCallback, useMemo, useState } from "react";
import { IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  SentimentVerySatisfied,
  AttachFileOutlined,
  Mic,
  Send,
} from "@material-ui/icons";
import { format } from "date-fns";

import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  ContainerMessages,
  Message,
  FooterWriteMessage,
} from "./styles";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeInputValue = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const formatMessageDate = useMemo((): any => {
    return format(new Date(), "H:m");
  }, []);

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
        <Message receiver>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message receiver>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message receiver>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
        <Message receiver>
          <div>Camelo</div>
          This is a message
          <span>{formatMessageDate}</span>
        </Message>
      </ContainerMessages>

      <FooterWriteMessage>
        <IconButton>
          <SentimentVerySatisfied fontSize="default" />
        </IconButton>

        <IconButton>
          <AttachFileOutlined fontSize="default" />
        </IconButton>

        <input
          type="text"
          placeholder="Messagem"
          onChange={(event) => handleChangeInputValue(event)}
          value={inputValue}
        />

        {inputValue ? (
          <IconButton>
            <Send fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton>
            <Mic fontSize="default" />
          </IconButton>
        )}
      </FooterWriteMessage>
    </Container>
  );
};

export default Chat;

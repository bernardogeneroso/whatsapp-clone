import React, { useCallback, useEffect, useRef, useState } from "react";
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

import api from "../../../services/api";

import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  ContainerMessages,
  Message,
  FooterWriteMessage,
} from "./styles";

interface MessageProps {
  name: string;
  message: string;
  timestamp: string;
}

const Chat = () => {
  const [userName] = useState("");
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputValue, setInputValue] = useState("");

  const containerMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });

    const scrollValue = containerMessageRef.current?.scrollHeight;
    if (scrollValue) {
      containerMessageRef.current?.scrollTo(0, scrollValue);
    }
  }, []);

  const handleChangeInputValue = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  const handleSendMessage = useCallback(async () => {
    await api.post("/messages/new", {
      message: inputValue,
      name: userName,
      timestamp: new Date(),
    });

    setInputValue("");
  }, [userName, inputValue]);

  const handleKeyDown = useCallback(
    async (e) => {
      if (inputValue) {
        if (e.key === "Enter") {
          handleSendMessage();
        }
      }
    },
    [handleSendMessage, inputValue]
  );

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

      <ContainerMessages ref={containerMessageRef}>
        {messages.map((message, i) => (
          <Message receiver={message.name === userName && true} key={i}>
            <h3>{message.name}</h3>
            <p>{message.message}</p>
            <span>{format(new Date(message.timestamp), "H:mm")}</span>
          </Message>
        ))}
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
          onKeyDown={(e) => handleKeyDown(e)}
        />

        {inputValue ? (
          <IconButton onClick={handleSendMessage}>
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

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconButton } from "@material-ui/core";
//import socketIOClient from "socket.io-client";

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

import { useAuth } from "../../../hooks/Auth";
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
  _id: string;
  message: string;
  username: string;
  timestamp: string;
  room_id: number;
}

interface RoomProps {
  id: number;
  name: string;
  chat_description: string;
  image: string;
}

const Chat = ({ selectedRoom }: { selectedRoom: RoomProps }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState<MessageProps[]>(
    [] as MessageProps[]
  );
  const [inputValue, setInputValue] = useState("");

  const containerMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.post(`/messages/receive/${selectedRoom.id}`).then((response) => {
      setMessages(response.data);
    });

    const scrollValue = containerMessageRef.current?.scrollHeight;
    if (scrollValue) {
      containerMessageRef.current?.scrollTo(0, scrollValue);
    }
  }, [selectedRoom.id]);

  const handleChangeInputValue = useCallback(
    (event: { target: HTMLInputElement }) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(() => {}, []);

  const handleKeyDown = useCallback(
    (e) => {
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
          <img src={selectedRoom.image} alt="Avatar" />

          <div>
            <h3>{selectedRoom.name}</h3>

            {selectedRoom.chat_description && (
              <p>Last message: {selectedRoom.chat_description}</p>
            )}
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
        {messages.map((message) => (
          <Message
            receiver={message.username === user.name && true}
            key={message._id}
          >
            <h3>{message.username}</h3>
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

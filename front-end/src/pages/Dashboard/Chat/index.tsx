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

import { useAuth } from "../../../hooks/Auth";
import { useRooms } from "../../../hooks/Rooms";
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
  const { socket } = useRooms();
  const { user } = useAuth();

  const [messages, setMessages] = useState<MessageProps[]>(
    [] as MessageProps[]
  );
  const [messageInputValue, setMessageInputValue] = useState("");

  const containerMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit("newRoom", selectedRoom.id);

    api.post(`/messages/receive/${selectedRoom.id}`).then((response) => {
      setMessages(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom.id]);

  useEffect(() => {
    const scrollValue = containerMessageRef.current?.scrollHeight;
    if (scrollValue) {
      containerMessageRef.current?.scrollTo(0, scrollValue);
    }
  }, [messages]);

  useEffect(() => {
    socket.on("messageRoom", (messageReceived: MessageProps) => {
      console.log(messageReceived);
      setMessages((state) => [...state, messageReceived]);
    });
  }, [socket, selectedRoom.id]);

  const handleChangeMessageInputValue = useCallback(
    (event: { target: HTMLInputElement }) => {
      setMessageInputValue(event.target.value);
    },
    []
  );

  const handleSendMessage = useCallback(() => {
    if (messageInputValue !== "") {
      const newMessage = {
        message: messageInputValue,
        username: user.name,
        timestamp: new Date(),
        room_id: selectedRoom.id,
      };

      socket.emit("newMessage", newMessage);

      setMessageInputValue("");
    }
  }, [socket, messageInputValue, user.name, selectedRoom.id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (messageInputValue) {
        if (e.key === "Enter") {
          handleSendMessage();
        }
      }
    },
    [handleSendMessage, messageInputValue]
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
          onChange={(event) => handleChangeMessageInputValue(event)}
          value={messageInputValue}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        {messageInputValue ? (
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

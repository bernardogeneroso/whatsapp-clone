import React, { useCallback, useState, useRef, useEffect } from "react";
import UseAnimations from "react-useanimations";
import searchToX from "react-useanimations/lib/searchToX";
import useDimensions from "react-use-dimensions";

import { IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert } from "@material-ui/icons";

import { useAuth } from "../../../hooks/Auth";
import { useRooms } from "../../../hooks/Rooms";

import api from "../../../services/api";

import {
  Container,
  Header,
  SearchContainer,
  ListChatContainer,
  GroupChatContainer,
} from "./styles";

import userDefault from "../../../assets/userDefault.png";

interface RoomProps {
  id: number;
  name: string;
  chat_description: string;
  image: string;
}

const Sidebar = ({
  setSelectedRoom,
  selectedRoomID,
}: {
  setSelectedRoom: React.Dispatch<React.SetStateAction<RoomProps>>;
  selectedRoomID: number;
}) => {
  const { user } = useAuth();
  const { socket } = useRooms();

  const [rooms, setRooms] = useState<RoomProps[]>([]);
  const [searchFind, setSearchFind] = useState<boolean>(false);

  const inputSearchRef = useRef<HTMLInputElement>(null);

  const [ref, { width: widthSidebar }] = useDimensions();

  useEffect(() => {
    api.get(`/rooms/${user.id}`).then((response) => {
      const roomsCheckImage = response.data.filter((room: RoomProps) => {
        if (room.image === null) {
          room.image = userDefault;
        }

        return room;
      });

      setRooms(roomsCheckImage);
    });
  }, [user.id]);

  const handleSearchFind = useCallback(() => {
    setSearchFind((state) => !state);
    inputSearchRef.current?.focus();
  }, []);

  const handleChangeRoom = useCallback(
    (room: RoomProps) => {
      if (selectedRoomID) {
        socket.emit("leaveRoom", selectedRoomID);
      }

      setSelectedRoom(room);
    },
    [setSelectedRoom, socket, selectedRoomID]
  );

  return (
    <Container ref={ref}>
      <Header>
        <div>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />
          <span>{user.name}</span>
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

      <SearchContainer searchFind={searchFind} widthSidebar={widthSidebar}>
        <div>
          <label>
            <UseAnimations
              animation={searchToX}
              size={22}
              strokeColor="#919191"
              onClick={handleSearchFind}
              reverse={searchFind}
            />
          </label>
          <input
            type="text"
            placeholder="Search or start new chat"
            onClick={handleSearchFind}
            ref={inputSearchRef}
          />
        </div>
      </SearchContainer>

      <ListChatContainer>
        {rooms.map((room) => (
          <GroupChatContainer
            key={room.id}
            widthSidebar={widthSidebar}
            onClick={() => handleChangeRoom(room)}
          >
            <img src={room.image} alt="IMG" />

            <div>
              <h3>{room.name}</h3>
              <p>{room.chat_description}</p>
            </div>
          </GroupChatContainer>
        ))}
      </ListChatContainer>
    </Container>
  );
};

export default Sidebar;

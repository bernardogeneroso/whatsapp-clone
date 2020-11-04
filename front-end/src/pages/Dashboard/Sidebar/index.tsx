import React, { useCallback, useState, useRef } from "react";
import UseAnimations from "react-useanimations";
import searchToX from "react-useanimations/lib/searchToX";
import useDimensions from "react-use-dimensions";

import { IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert } from "@material-ui/icons";

import {
  Container,
  Header,
  SearchContainer,
  ListChatContainer,
  GroupChatContainer,
} from "./styles";

const Sidebar = () => {
  const [searchFind, setSearchFind] = useState<boolean>(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const [ref, { width: widthSidebar }] = useDimensions();

  const handleSearchFind = useCallback(() => {
    setSearchFind((state) => !state);
    inputSearchRef.current?.focus();
  }, []);

  return (
    <Container ref={ref}>
      <Header>
        <div>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />
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
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
        <GroupChatContainer widthSidebar={widthSidebar}>
          <img
            src="https://material-ui.com//static/images/avatar/3.jpg"
            alt="IMG"
          />

          <div>
            <h3>Pixel Camp</h3>
            <p>Eu podia estar aí, com a minha mota! F900 XR</p>
          </div>
        </GroupChatContainer>
      </ListChatContainer>
    </Container>
  );
};

export default Sidebar;

import styled from 'styled-components'

interface GroupChatContainerProps {
  widthSidebar: number;
}

interface SearchContainerProps {
  searchFind: boolean;
  widthSidebar: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  .MuiIconButton-root, .MuiSvgIcon-root {
    color: #919191;
  }
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 12px 6px 12px;
  border-right: 1px solid lightgray;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 10vw;

    img {
      width: 40px;
      height: 40px;
      border-radius: 40px;

      cursor: pointer;
    }
  }
`

export const SearchContainer = styled.div<SearchContainerProps>`
  background-color: ${props => props.searchFind ? '#fff' : '#F6F6F6'};
  padding: 8px 10px 8px 10px;

  border-top-right-radius: 5px;

  > div {
    display: flex;
    padding: 9px 10px 9px 10px;
    border-radius: 40px;

    background-color: #FFF;

    label {
      display: flex;
      align-items: center;
      margin-left: 8px;

      path {
        stroke: ${props => props.searchFind && 'rgb(91, 197, 248) !important'}
      }
    }

    input {
      flex: 0.9;
      margin-left: 30px;
      width: ${props => props.widthSidebar - 120}px;

      border: 0
    }
  }
`

export const ListChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  background: #fff;
  user-select: none;

  ::-webkit-scrollbar {
    width: 6px!important;
    height: 6px!important;
  }

  ::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,.2);
  }

  ::-webkit-scrollbar-track {
      background: hsla(0,0%,100%,.1);
}
`


export const GroupChatContainer = styled.div<GroupChatContainerProps>`
  display: flex;
  align-items: center;
  padding: 0 15px 0 13px;
  
  background-color: #fafafa;
  border-bottom: 1px solid #EBEBEB;
  cursor: pointer;

  &:hover {
    background: #EBEBEB
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;

    margin: 12px 14px 12px 0;
  }

  div {
    h3 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
      display: inline-block;
      width: ${props => props.widthSidebar - 90}px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`
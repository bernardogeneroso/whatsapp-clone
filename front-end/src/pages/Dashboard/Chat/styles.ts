import styled, { css } from 'styled-components'

interface MessageProps {
  receiver?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;

  z-index: 2;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  white-space: normal;

  background-color: #EDEDED;

  padding: 7px 12px 6px 12px;
  border-bottom: 1px solid lightgray;
`
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;

    margin-right: 12px;
  }

  div {
    h3 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }
  }
`
export const HeaderRight = styled.div``

export const ContainerMessages = styled.div`
  display: flex;
  flex-direction: column;

  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-repeat: repeat;
  background-position: center;

  height: calc(100% - 120px);
  padding: 30px 30px 0px 30px;
  overflow-y: auto;

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

export const Message = styled.p<MessageProps>`
  position: relative;
  font-size: 16px;
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
  background: ${props => props.receiver ? "#DCF8C6" : "#fff"};
  margin-bottom: 30px;

  ${props => props.receiver && css`margin-left: auto;`}

  h3 {
    position: absolute;
    top: -15px;
    font-weight: 800;
    font-size: xx-small;
    color: rgba(0,0,0,0.6);
  }

  span {
    margin-left: auto;
    font-size: xx-small;
    display: table;
  }
`

export const FooterWriteMessage = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0px 8px 0px 8px;
  align-items: center;
  height: 64px;

  input {
    flex: 1;
    margin: 10px;
    font-size: 16px;
    padding: 9px 12px 11px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 21px;

    &::placeholder {
      color: rgba(0,0,0,0.6)
    }
  }
`
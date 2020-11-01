import styled, { css } from 'styled-components'

interface MessageProps {
  receiver?: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  white-space: normal;

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
  flex: 1;
  display: flex;
  flex-direction: column;

  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-repeat: repeat;
  background-position: center;

  padding: 30px;
  overflow-y: auto;
`

export const Message = styled.p<MessageProps>`
  position: relative;
  font-size: 16px;
  padding: 10px;
  width: fit-content;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 30px;

  ${props => props.receiver && css`margin-left: auto;`}

  div {
    position: absolute;
    top: -15px;
    font-weight: 800;
    font-size: xx-small;
  }

  span {
    margin-left: 10px;
    font-size: xx-small;
  }
`

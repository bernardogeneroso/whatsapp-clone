import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;
`



export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:  16px;
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

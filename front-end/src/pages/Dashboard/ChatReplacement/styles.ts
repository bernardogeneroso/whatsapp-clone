import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  place-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;

  background-color: #F8F9FA;

  padding: 7px 12px 6px 12px;

  z-index: 2;

  &:after {
    @media only screen and (max-width: 1440px) {
      position: absolute;
      bottom: 0;
      width: 70%;
      height: 0;
      content: "";
      border-top: 6px solid #4adf83;
    }
  }
`

export const Content = styled.div`
  display: flex;
  place-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 460px;

  img {
    width: 320px;
    height: 300px;
  }

  p {
    margin-top: 20px;
    font-weight: 300;
    font-size: 26px;
    text-align: center;
  }
`
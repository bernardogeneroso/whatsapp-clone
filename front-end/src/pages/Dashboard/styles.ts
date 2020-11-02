import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 20px 40px 20px 40px;

  background-color: #EDEDED;

  @media only screen and (max-width: 1440px) {
    padding: 0px;
  }
`

export const Content = styled.div``

export const TopWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 137px;
  background-color: #009688;
`
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters/extend';
import styled from 'styled-components';


export default function ScreenLayout({ children }) {
  return (
    <Container>
        {children}
    </Container>
  )
}

const Container = styled.View`
    width: 100%;
    height: 100%;
    padding: ${verticalScale(0)}px ${scale(10)}px ${verticalScale(15)}px ${scale(10)}px;
`
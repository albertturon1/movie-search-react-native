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
    padding: 0 ${scale(15)}px;
`
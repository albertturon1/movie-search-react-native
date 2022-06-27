import React, { ReactNode } from 'react'
import { scale } from 'react-native-size-matters/extend';
import styled from 'styled-components';


export default function ScreenLayout({ children }: { children: ReactNode}) {
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
// Layout - Komponent, który odpowiada za stylistykę każdego screenu
import React from 'react'
import { ScrollView } from 'react-native'

import theme from './theme'
import styled, { ThemeProvider } from 'styled-components/native'
import { AppLoading } from 'expo'

import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik'

const Wrapper = styled.View`
  font-family: 'Poppins_400Regular';
  flex: 1;
  background-color: #fff;
  /* TD DOWN */
  min-height: 800px;
  padding: 50px 30px 15px 30px;
  align-items: flex-start;
  justify-content: ${(props) => (props.center ? 'center' : 'flex-start')};
  align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
`

const Layout = (props) => {
  const [isFontLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
  })

  return !isFontLoaded ? (
    <AppLoading />
  ) : (
    <ThemeProvider theme={theme}>
      <>
        <ScrollView showsVerticalScrollIndicator={true}>
          <Wrapper center={props.center} style={props.style}>
            {props.children}
          </Wrapper>
        </ScrollView>
      </>
    </ThemeProvider>
  )
}

export default Layout

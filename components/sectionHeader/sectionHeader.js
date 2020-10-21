// Komponent nazwy sekcji
import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const SectionHeader = styled.Text`
  font-size: ${(props) => (props.small ? '26px' : '40px')};
  font-family: 'Rubik_500Medium';
  margin: 20px 0;
  text-align: left;
  color: ${(props) => props.theme[props.color] || props.theme.colorBlueLight};
`

const Header = (props) => {
  return (
    <>
      <SectionHeader small={props.small} color={props.color || null}>
        <Text>{props.children[0].toUpperCase()}</Text>
        {props.children.slice(1).toLowerCase()}
      </SectionHeader>
    </>
  )
}

export default Header

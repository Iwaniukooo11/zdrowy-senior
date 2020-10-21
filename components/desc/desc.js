// Komponent tekstu
import React from 'react'
import styled from 'styled-components/native'

const Desc = styled.Text`
  color: ${(props) => props.theme[props.color] || props.theme.colorBlack};
  font-size: ${(props) => (props.big ? '32px' : '24px')};
  opacity:${(props) => props.opacity ?? 1}
  font-family: 'Rubik_400Regular';
  text-align: ${(props) => (props.center ? 'center' : 'left')};
  line-height: ${(props) => props.lineHeight * 33 || 33};
  margin-top: ${(props) => props.mTop ?? '5px'};
  margin-bottom: ${(props) => props.mBottom ?? '15px'};
  text-transform: ${(props) => props.textTransform || 'none'};
`
export default Desc

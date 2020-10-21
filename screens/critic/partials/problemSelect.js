// Komponent problemu, który user może zaznaczyć
import React from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../layout/theme'
import Desc from '../../../components/desc/desc'

const Wrap = styled.TouchableOpacity`
  align-self: center;
  margin: 10px 0;
`

const Element = (props) => {
  return (
    <Wrap
      activeOpacity={0.6}
      onPress={() => props.changeSelect(props.obj.id)}
      selected={!!props.obj.selected}
    >
      <LinearGradient
        colors={[theme.colorRedDark, theme.colorRedLight]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        style={{
          width: 250,
          paddingVertical: 15,
          borderRadius: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          alignSelf: 'center',
          opacity: props.obj.selected ? 1 : 0.5,
        }}
      >
        <Desc color="colorWhite" mTop={0} mBottom={0} center maxWidth={200}>
          {props.obj.text}
        </Desc>
      </LinearGradient>
    </Wrap>
  )
}

export default Element

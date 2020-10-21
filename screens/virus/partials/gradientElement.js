// Komponent kafelka ilości zarażeń w danym dniu
import React from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import Desc from '../../../components/desc/desc'

import theme from '../../../layout/theme'

const Wrap = styled.View`
  flex-direction: row;
  width: 100%;
  margin: ${(props) => (props.marginn ? '10px 0' : 0)};
`

const WrapText = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 15px 0;
`

const DescDay = styled(Desc)`
  flex-grow: 1;
  opacity: 0.9;
  text-transform: uppercase;
`
const DescCase = styled(Desc)`
  flex-grow: 1;
  text-transform: uppercase;
`

const GradientElement = (props) => {
  return (
    <Wrap marginn={!!props?.marginn || false}>
      <LinearGradient
        colors={[theme.colorBlueLight, theme.colorBlueDark]}
        style={{ flexGrow: 1, borderRadius: props.border ? 8 : 0 }}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
      >
        <WrapText>
          <DescDay mBottom={0} center big color="colorWhite">
            {props.day}
          </DescDay>
          <DescCase mBottom={0} center big color="colorWhite">
            {props.cases}
          </DescCase>
        </WrapText>
      </LinearGradient>
    </Wrap>
  )
}

export default GradientElement

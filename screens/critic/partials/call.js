// Komponent guziczka umożliwiającego zadzwonienie na 112
import React from 'react'
import Desc from '../../../components/desc/desc'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Linking from 'expo-linking'

import theme from '../../../layout/theme'
import phoneImg from '../../../assets/other-icons/phone-white.png'

const Wrap = styled.TouchableOpacity`
  flex-direction: row;
  align-self: center;
  flex: 1;
`
const TextWrap = styled.View``
const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`

const Call = () => {
  return (
    <Wrap
      activeOpacity={0.8}
      onPress={() => Linking.openURL('tel: +48 123456789')}
    >
      <LinearGradient
        colors={[theme.colorRedDark, theme.colorRedLight]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        style={{
          width: 250,
          paddingVertical: 10,
          borderRadius: 10,
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}
      >
        <StyledImage source={phoneImg} />
        <TextWrap>
          <Desc mTop={0} mBottom={0} center color="colorWhite">
            Zadzwoń na
          </Desc>
          <Desc mTop={10} mBottom={0} center color="colorWhite" big>
            112
          </Desc>
        </TextWrap>
      </LinearGradient>
    </Wrap>
  )
}

export default Call

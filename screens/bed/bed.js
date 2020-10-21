// Screen zawierający instrukcje na temat snu
import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'

import Layout from '../../layout/layout'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import Bold from '../../components/bold/bold'
import Line from '../../components/line/line'
import * as Linking from 'expo-linking'

import phoneImg from '../../assets/other-icons/phone-blue.png'

const TouchableWrap = styled.TouchableOpacity`
  position: relative;
  z-index: 300;
  width: 100%;
  padding: 10px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const PhoneNumber = styled(Bold)`
  font-size: 35px;
  line-height: 40px;
  margin-top: 20px;
  text-align: center;
`

const StyledImage = styled(Image)`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`

const Bed = () => {
  return (
    <Layout>
      <SectionHeader>Sen</SectionHeader>
      <Desc>
        Podstawą zdrowego stylu życia i dobrego samopoczucia jest
        <Bold color="colorBlueLight"> odpowiednia</Bold> ilość snu
      </Desc>
      <Desc>
        Dla osób 65+ wartośc ta powinna wynosić od
        <Bold color="colorBlueLight"> 7-8h</Bold>
      </Desc>
      <Line />
      <Desc center mBottom={20}>
        Jeśli masz problem ze snem lub zdrowiem, proszę kleknąć na numer, aby
        wykonać telefon do fundacji ,,Szlachetna Paczka"
      </Desc>

      <TouchableWrap
        activeOpacity={0.5}
        onPress={() => Linking.openURL('tel: +48 123456789')}
      >
        <StyledImage source={phoneImg} />
        <PhoneNumber color="colorBlueLight">12 333 7088</PhoneNumber>
      </TouchableWrap>

      <Desc center mTop={20}>
        Telefon dla Seniorów działa codziennie w godzinach
        <Bold color="colorBlueLight"> 10-12</Bold> i
        <Bold color="colorBlueLight"> 17-19</Bold>
      </Desc>
    </Layout>
  )
}

export default Bed

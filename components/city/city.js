//Komponent tekstu, który wyświetla miasto, w którym znajduje się użytkownik wraz z ikonką miejsca
import React from 'react'
import styled from 'styled-components/native'
import localizationImg from '../../assets/other-icons/localization.png'
import Desc from '../desc/desc'

const CityWrap = styled.View`
  flex-direction: row;
  margin-top: 20px;
`

const StyledLocalization = styled.Image`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`

const City = (props) => {
  return (
    <CityWrap>
      <StyledLocalization source={localizationImg} />
      <Desc big>{props.children}</Desc>
    </CityWrap>
  )
}

export default City

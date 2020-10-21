// Komponent pojedynczego zapisanego leku
import React from 'react'
import { Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import styled from 'styled-components/native'
import theme from '../../../layout/theme'
import Desc from '../../../components/desc/desc'

import trashImg from '../../../assets/other-icons/trash.png'

const Wrap = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 5px 0;
  flex-grow: 1;
`
const Remover = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colorGrey};
  padding: 0 10px;
  justify-content: center;
  align-content: center;
`
const StyledImage = styled.Image`
  width: 25px;
  height: 25px;
`

const StyledDesc = styled(Desc)`
  max-width: 80%;
`

const ListElement = (props) => {
  return (
    <Wrap>
      <LinearGradient
        colors={[theme.colorBlueLight, theme.colorBlueDark]}
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        style={{
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          paddingHorizontal: 20,
          paddingVertical: 5,
          flexGrow: 1,
        }}
      >
        <StyledDesc
          textTransform="uppercase"
          color="colorWhite"
          mBottom={0}
          mTop={0}
        >
          {props.text}
        </StyledDesc>

        {/* Odpowiednie formatowanie tekstu, ponieważ domyślnie pojawi się np "9" godzin zamiast "09" */}
        <Desc mBottom={0} color="colorWhite">
          {props.time.getHours() >= 10
            ? props.time.getHours()
            : `0${props.time.getHours()}`}
          :
          {props.time.getMinutes() >= 10
            ? props.time.getMinutes()
            : `0${props.time.getMinutes()}`}
        </Desc>
      </LinearGradient>

      <Remover
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert('Usunięcie leku', `Czy chcesz usunąć ${props.text}?`, [
            {
              text: 'TAK',
              onPress: () => {
                props.manageMedicine('remove', props.id)
              },
            },
            { text: 'NIE' },
          ])
        }}
        style={{
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <StyledImage source={trashImg} />
      </Remover>
    </Wrap>
  )
}

export default ListElement

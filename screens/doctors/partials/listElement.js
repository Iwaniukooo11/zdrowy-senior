// Komponent kafelka przychodni lekarskiej
import React from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../layout/theme'
import Desc from '../../../components/desc/desc'

const Wrap = styled.View`
  width: 100%;
  margin: 10px 0;
  padding: 0 10px;
`

const AssetDataWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
`
const AssetDesc = styled(Desc)``

const ListElement = (props) => {
  return (
    <LinearGradient
      colors={[theme.colorBlueLight, theme.colorBlueDark]}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      style={{
        padding: 10,
        flexGrow: 1,
        width: '100%',
        marginVertical: 10,
        borderRadius: 8,
      }}
    >
      <Wrap>
        <Desc big mBottom={0} color="colorWhite">
          {props.obj.name}
        </Desc>
        <Desc mBottom={0} color="colorWhite" opacity={0.8}>
          {props.obj.vicinity}
        </Desc>

        <AssetDataWrap>
          {props.obj.rating && (
            <AssetDesc color="colorWhite" mTop={10}>
              Ocena: {props.obj.rating}/5
            </AssetDesc>
          )}
          {props.obj?.opening_hours?.open_now !== undefined && (
            <AssetDesc color="colorWhite" mTop={10}>
              {props.obj?.opening_hours?.open_now ? 'Otwarte' : 'Zamknięte'}
            </AssetDesc>
          )}
        </AssetDataWrap>
      </Wrap>
    </LinearGradient>
  )
}

export default ListElement

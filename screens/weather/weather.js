// Screen pokazujący pogodę
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import City from '../../components/city/city'
import Layout from '../../layout/layout'
import theme from '../../layout/theme'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import Line from '../../components/line/line'
import Bold from '../../components/bold/bold'
import Loader from '../../components/loader/loader'

import { showMessage } from 'react-native-flash-message'

import temperatureImg from '../../assets/other-icons/temperature.png'
import * as Location from 'expo-location'

import axios from 'axios'
import { weatherKey } from '../../utils/apiKeys'

const TemperatureWrap = styled.View`
  flex-direction: row;
  align-items: center;
  align-content: center;
  margin-top: 30px;
`

const StyledTemperature = styled.Image`
  height: 70px;
  width: 70px;
  margin-right: 10px;
`

const Temperature = styled(Desc)`
  font-size: 60px;
  color: ${({ theme }) => theme.colorBlueLight};
  margin: 0;
  line-height: 60;
`

const Weather = () => {
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState(undefined)

  useEffect(() => {
    ;(async () => {
      try {
        //Prośba o włączenie GPS
        let { status } = await Location.requestPermissionsAsync()
        if (status !== 'granted') {
          showMessage({
            message: 'Problem',
            description: 'Proszę udsotępnić aplikacji lokalizację GPS!',
            type: 'default',
            titleStyle: {
              fontFamily: 'Rubik_400Regular',
            },
            style: { backgroundColor: theme.colorRedLight },
          })
        }

        //Pobranie geolokalizacji i rozszyfrowanie jej
        let location = await Location.getCurrentPositionAsync({})
        const _city = await Location.reverseGeocodeAsync(location.coords)
        setCity(`${_city[0].city}`)

        //Zapytanie o temperature w znalezionym mieście i zapisanie jej do state
        const temperatureResp = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${_city[0].city}&appid=${weatherKey}`
        )
        setTemperature((temperatureResp.data.main.temp - 273).toFixed(1))
      } catch (err) {
        showMessage({
          message: 'Problem',
          description: 'Proszę włączyć WiFi i GPS oraz załadować ponownie!',
          type: 'default',
          titleStyle: {
            fontFamily: 'Rubik_400Regular',
          },
          style: { backgroundColor: theme.colorRedLight },
        })
      }
    })()
  }, [])

  return (
    <Layout>
      <SectionHeader>Pogoda</SectionHeader>
      {!!city && <City>{city}</City>}

      <TemperatureWrap>
        <StyledTemperature source={temperatureImg} />
        {temperature !== undefined ? (
          <Temperature big>{temperature} °C</Temperature>
        ) : (
          <Loader />
        )}
      </TemperatureWrap>

      <Line />

      {temperature < 10 ? (
        <Desc>
          Jest chłodno. Proszę się ciepło ubrać. Jeżeli to możliwe, proszę
          zostać
          <Bold color="colorBlueLight"> w domu</Bold>.
        </Desc>
      ) : temperature < 25 ? (
        <Desc>Jest umiarkowanie. Można wyjść z domu</Desc>
      ) : temperature >= 25 ? (
        <Desc>
          Jest gorąco. Jeśli można, proszę pozostać
          <Bold color="colorBlueLight"> w domu</Bold>.
        </Desc>
      ) : null}

      <Desc mTop={20}>
        W przypadku wyjścia, proszę nie zapomnieć o
        <Bold color="colorBlueLight"> wodzie pitnej</Bold>,
        <Bold color="colorBlueLight"> maseczce</Bold>, oraz
        <Bold color="colorBlueLight"> lekach</Bold>!
      </Desc>
    </Layout>
  )
}

export default Weather

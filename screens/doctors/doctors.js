// Screen przychodnii w pobliżu
import React, { useState, useEffect } from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import Layout from '../../layout/layout'
import theme from '../../layout/theme'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import Loader from '../../components/loader/loader'

import { showMessage } from 'react-native-flash-message'
import RNPickerSelect from 'react-native-picker-select'

import axios from 'axios'
import * as Location from 'expo-location'

import { googleMapKey } from '../../utils/apiKeys'
import ListElement from './partials/listElement'

const SelectKmWrap = styled.View`
  flex-direction: row;
`

const Doctors = () => {
  const [places, setPlaces] = useState([])
  const [selectedKm, setSelectedKm] = useState(1)
  const [coords, setCoords] = useState('')

  const fetchLocations = async (_coords) => {
    //Funkcja, która pobiera dane o przychodniach z GoogleMaps (w zaznaczonym przez użytkownika promieniu) i zapisuje je w state
    const resp = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        _coords || coords
      }&radius=${selectedKm * 1000}&key=${googleMapKey}&type=doctor&language=pl`
    )
    setPlaces(resp.data.results)
  }

  useEffect(() => {
    const fc = async () => {
      await fetchLocations()
    }
    fc()
  }, [selectedKm])

  useEffect(() => {
    const fc = async () => {
      try {
        //Prośba o zezwolenie na używanie GPS
        let { status } = await Location.requestPermissionsAsync()

        if (status !== 'granted') {
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

        //Pobranie lokalizacji (miasta) użytkownika, zapisanie go w state oraz wywołanie funkcji, która pobierze dane z GoogleMaps
        let location = await Location.getCurrentPositionAsync({})
        const _coords = `${location.coords.latitude},${location.coords.longitude}`

        setCoords(_coords)
        await fetchLocations(_coords)
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
    }
    fc()
  }, [])

  return (
    <Layout>
      <SectionHeader>Przychodnie w pobliżu</SectionHeader>

      <SelectKmWrap>
        <Desc mbot={0}>Szukam w promieniu: {selectedKm}km</Desc>

        <View style={{ width: 50 }}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedKm(value * 1)}
            placeholder={{}}
            InputAccessoryView={() => null}
            style={{
              placeholder: {
                fontSize: 30,
                fontFamily: 'Rubik_400Regular',
                value: 3,
              },
            }}
            style={{ width: 30, fontSize: 30 }}
            items={[
              { label: '1km', value: 1 },
              { label: '2km', value: 2 },
              { label: '3km', value: 3 },
            ]}
          />
        </View>
      </SelectKmWrap>

      {places.length > 10 ? (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <FlatList
            data={places}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => <ListElement obj={item} />}
            onEndReachedThreshold={0.01}
            contentContainerStyle={{ flex: 1 }}
          />
        </ScrollView>
      ) : (
        <Loader />
      )}
    </Layout>
  )
}

export default Doctors

// Główny screen zawierający kafelki pozwalające na przełączanie się do danej sekcji
import React from 'react'
import styled from 'styled-components/native'

import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import Layout from '../../layout/layout'

import TabLink from './partials/tabLink'
import weatherImg from '../../assets/home-icons/weather.png'
import handImg from '../../assets/home-icons/hand.png'
import pillsImg from '../../assets/home-icons/pills.png'
import bedImg from '../../assets/home-icons/bed.png'
import virusImg from '../../assets/home-icons/virus.png'
import hospitalImg from '../../assets/home-icons/hospital.png'
import exclamationImg from '../../assets/home-icons/exclamation.png'

const dataMap = [
  { img: weatherImg, text: 'pogoda', link: 'Weather' },
  { img: handImg, text: 'mycie rąk', link: 'Hand' },
  { img: pillsImg, text: 'tabletki', link: 'Pills' },
  { img: bedImg, text: 'sen', link: 'Bed' },
  { img: virusImg, text: 'zakażenia', link: 'Virus' },
  { img: hospitalImg, text: 'lekarze', link: 'Doctors' },
]

const StyledFlatList = styled.FlatList`
  width: 100%;
`

const Home = (props) => {
  return (
    <Layout>
      <SectionHeader>Dzień dobry!</SectionHeader>
      <Desc>Proszę wybrać interesujące zagadnienie</Desc>
      <TabLink
        src={exclamationImg}
        text="potrzebuję pomocy"
        navigation={props.navigation}
        link="Critic"
        extraBig
      />
      {/* Wymapowanie wszystkich kafelków w interfejsie */}
      <StyledFlatList
        data={dataMap}
        keyExtractor={(item) => item.text}
        numColumns={2}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          flex: 1,
        }}
        renderItem={({ item }) => (
          <TabLink
            src={item.img}
            text={item.text}
            link={item.link}
            navigation={props.navigation}
          />
        )}
      />
    </Layout>
  )
}

export default Home

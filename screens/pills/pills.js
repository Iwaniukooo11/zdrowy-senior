// Screen z dodawania leków
import React, { useState, useEffect } from 'react'
import { Modal, Dimensions } from 'react-native'
import styled from 'styled-components/native'

import Layout from '../../layout/layout'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import Bold from '../../components/bold/bold'
import Loader from '../../components/loader/loader'

import ListElement from './partials/listElement'
import addImg from '../../assets/other-icons/add.png'

import FormModal from './partials/formModal'

import AsyncStorage from '@react-native-community/async-storage'

const List = styled.View`
  width: 100%;
`

const AddBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: ${(props) => Dimensions.get('window').width / 2 - 30}px;
  z-index: 2;
`
const StyledImage = styled.Image`
  width: 60px;
  height: 60px;
  padding-right: 30px;
`
const WhiteBG = styled.View`
  background-color: #fff;
  width: 100%;
  height: 80px;
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
`

const Pills = () => {
  const [medicines, setMedicines] = useState({ medicines: [] })

  const manageMedicine = async (type, val) => {
    //Funkcja, która w zależności od podanych parametrów dodaje nowy lek, bądź też go usuwa. Jest podawana w propsach do formularza oraz kafelka leku
    let _medicines = [...medicines.medicines] || []
    switch (type) {
      case 'add':
        _medicines.push(val)

      default:
        _medicines = _medicines.filter((el) => el.id !== val)
    }

    const objToSave = {
      medicines: [..._medicines],
    }

    //Aktualizacja state oraz pamięci urządzenia
    setMedicines(objToSave)
    await AsyncStorage.setItem('@medicines', JSON.stringify(objToSave))
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fc = async () => {
      //Pobranie leków z pamięci urządzenia oraz normalizacja ich - Są obiektami, a aby zostać zapisanymi w urządzeniu, muszą być traktowane jako stringi
      let _medicines = await AsyncStorage.getItem('@medicines')
      _medicines = JSON.parse(_medicines) || { medicines: [] }

      _medicines = _medicines.medicines.map((el) => {
        el.time = new Date(el.time)
        return el
      })

      setMedicines({ medicines: _medicines })
    }
    fc()
  }, [])

  return (
    <>
      <Layout style={{ paddingBottom: 120 }}>
        <SectionHeader>Leki</SectionHeader>
        <Desc mBottom={60}>Proszę dodać używane leki.</Desc>

        <List>
          {medicines.medicines !== null ? (
            medicines.medicines.map((obj, i) => (
              <ListElement
                text={obj.text}
                time={obj.time}
                id={obj.id}
                key={obj.id}
                state={medicines}
                setState={setMedicines}
                index={i % 2}
                manageMedicine={manageMedicine}
              />
            ))
          ) : (
            <Loader />
          )}
          {medicines?.medicines?.length === 0 && (
            <Desc mTop={80} center>
              Proszę dodać jakiś lek!
            </Desc>
          )}
        </List>
      </Layout>

      <AddBtn activeOpacity={0.8} onPress={() => setIsModalOpen(true)}>
        <StyledImage source={addImg} />
      </AddBtn>
      <WhiteBG />

      <Modal
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        animationType="slide"
      >
        <FormModal
          closeModal={() => setIsModalOpen(false)}
          manageMedicine={manageMedicine}
        />
      </Modal>
    </>
  )
}

export default Pills

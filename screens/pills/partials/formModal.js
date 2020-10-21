// Komponent formularza umożliwiającego dodanie leku
import React, { useState } from 'react'
import styled from 'styled-components/native'

import Layout from '../../../layout/layout'
import SectionHeader from '../../../components/sectionHeader/sectionHeader'
import Desc from '../../../components/desc/desc'
import Button from '../../../components/button/button'
import Input from '../../../components/input/input'

import DateTimePicker from '@react-native-community/datetimepicker'

const TimeWrap = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 6px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  border: 2px solid
    ${(props) =>
      props.isActive ? props.theme.colorGrey : props.theme.colorBlueLight};
`

const TimeSpan = styled(Desc)`
  letter-spacing: 2px;
  font-size: 46px;
  line-height: 46px;
  margin: 0;
`

const Modal = (props) => {
  const [date, setDate] = useState(new Date(Date.now()))
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')

  const dateChangeHandler = (event, selectedDate) => {
    // Funkcja zapisująca do state zaznaczoną przez użytkownika datę
    setShow(false)
    const currentDate = selectedDate || date
    setDate(currentDate)
  }

  const showTimepicker = () => {
    setShow(true)
  }

  const changeNameHandler = (text) => setName(text)

  const saveMedicineHandler = () => {
    // Funkcja zapisująca wpisany lek
    props.manageMedicine('add', {
      text: name,
      time: date,
      id: Math.random(),
    })
    setName('')
    props.closeModal()
  }

  return (
    <Layout style={{ alignContent: 'center', alignItems: 'center' }}>
      <SectionHeader>Dodaj lek</SectionHeader>
      <Desc mBottom={0} mTop={50}>
        Nazwa leku:
      </Desc>
      <Input
        isActive={name.length > 0}
        value={name}
        onChangeText={changeNameHandler}
      />

      <Desc mTop={50}>Godzina</Desc>
      <TimeWrap mTop={30} onPress={showTimepicker} activeOpacity={0.8}>
        <TimeSpan>
          {/* Odpowiednie formatowanie tekstu, ponieważ domyślnie pojawi się np "9" godzin zamiast "09" */}
          {date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`}
        </TimeSpan>

        <TimeSpan> : </TimeSpan>

        <TimeSpan>
          {date.getMinutes() >= 10
            ? date.getMinutes()
            : `0${date.getMinutes()}`}
        </TimeSpan>
      </TimeWrap>
      {show && (
        <DateTimePicker
          mode="time"
          value={date}
          onChange={dateChangeHandler}
          display="clock"
        />
      )}

      <Button
        style={{ marginTop: 40 }}
        isActive={!!name}
        onPressHandler={saveMedicineHandler}
      >
        Dodaj!
      </Button>
    </Layout>
  )
}

export default Modal

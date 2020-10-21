// Screen pokazujący dzienne zarażenia oraz predykcje
import React, { useState, useEffect } from 'react'
import Layout from '../../layout/layout'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import City from '../../components/city/city'
import Bold from '../../components/bold/bold'
import Loader from '../../components/loader/loader'

import { showMessage } from 'react-native-flash-message'
import GradientElement from './partials/gradientElement'
import axios from 'axios'

import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-react-native'

const Virus = () => {
  const [casesData, setCasesData] = useState([])
  const [score, setScore] = useState(-1)
  const [casesGrowStatus, setCasesGrowStatus] = useState('')

  const dayDictionary = {
    0: 'ND',
    1: 'PN',
    2: 'WT',
    3: 'ŚR',
    4: 'CZ',
    5: 'PT',
    6: 'SB',
  }

  const predictNewCases = async (cases) => {
    const casesArr = cases.map((el) => el.newCases)

    //Załadowanie tensorflow oraz stworzenie modelu
    await tf.ready()
    const model = await tf.sequential()
    await model.add(
      tf.layers.dense({
        units: 1,
        inputShape: [1],
      })
    )
    await model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })

    //Wytrenowanie go na wartościach przypadków zarażeń i zapisanie
    const y = tf.tensor1d(casesArr)
    const x = tf.tensor1d([0, 1, 2, 3, 4])
    await model.fit(x, y, { epochs: 15 })

    //Określenie predykcji i zapisanie wyniku w state
    const scorePredict = model.predict(tf.tensor1d([5]))
    setScore(scorePredict.arraySync()[0][0].toFixed(0))

    setCasesGrow(scorePredict.arraySync()[0][0].toFixed(0), [...cases])
  }

  const setCasesGrow = (score, cases) => {
    //Funkcja sprawdzająca, czy ilość zachorowań rośnie/maleje/jest różna
    let text = ''
    if (
      score > cases[cases.length - 1].newCases &&
      cases[cases.length - 1].newCases > cases[cases.length - 2].newCases
    )
      text = 'rosnący'
    else if (
      score < cases[cases.length - 1].newCases &&
      cases[cases.length - 1].newCases < cases[cases.length - 2].newCases
    )
      text = 'maleający'
    else text = 'zmienny'

    setCasesGrowStatus(text)
  }

  useEffect(() => {
    const fc = async () => {
      //Sekcja requestów i fetchowania danych
      let respHistory = null
      let respDaily = null

      try {
        respHistory = await axios.get(
          'https://corona.lmao.ninja/v2/historical/Poland?lastdays=5'
        )
        respDaily = await axios.get(
          'https://corona.lmao.ninja/v2/countries/Poland'
        )
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
        return 0
      }

      //Sprawdzenie, czy response z dziennego przyrostu nie jest równy temu wczorajszemu
      //  (może dojśc do takiej sytuacji - W dniu, kiedy jeszcze nie ogłoszono wyników zarażeń, response jest równy temu historycznemu)
      if (
        respDaily.data.todayCases !==
        respHistory.data.timeline.cases[
          Object.keys(respHistory.data.timeline.cases)[3]
        ] -
          respHistory.data.timeline.cases[
            Object.keys(respHistory.data.timeline.cases)[2]
          ]
      ) {
        const dateNow = new Date(Date.now())
        const year = `${dateNow.getFullYear()}`.substring(2)

        const dateString = `${dateNow.getMonth() + 1}/${
          dateNow.getDate() >= 10 ? dateNow.getDate() : '0' + dateNow.getDate()
        }/${year}`

        respHistory.data.timeline.cases[dateString] = respDaily.data.cases
      }

      //Normalizacja danych - Z typu daty otrzymywanego jako string np '4/18/20' zmieniam to na obiekt Date + Obliczem nowee ilości zarażeń (API zwraca tylko całkowitą ilość zachorowań). Potem zapisuję to w [casesData], czyli kolekcji obiektów zawierających pole daty, dnia tygodnia, ilości dziennych caseów

      let cases = Object.entries(respHistory.data.timeline.cases)
      cases = cases.map((arr, index) => {
        if (index === 0) {
          return null
        }

        const date = arr[0].split('/')

        const dateStr = `20${date[2]}-${date[0]}-${
          date[1] >= 10 ? date[1] : '0' + date[1]
        }`
        const dateObj = new Date(dateStr)

        const objectToSave = {
          date: dateObj,
          newCases: arr[1] - cases[index - 1][1],
          dayOfWeek_str: dayDictionary[dateObj.getDay()],
          dayOfWeek_num: dateObj.getDay(),
        }
        return objectToSave
      })
      cases.shift()

      setCasesData(cases)
      predictNewCases([...cases])
    }

    fc()
  }, [])

  return (
    <Layout>
      <SectionHeader>Zakażenia</SectionHeader>
      <City>Polska</City>

      <GradientElement
        day="dzień"
        cases="przypadki"
        marginn={true}
        border={true}
      />

      {casesData.length > 0 ? (
        casesData.map((el) => (
          <GradientElement
            day={el?.dayOfWeek_str}
            cases={el.newCases}
            key={Math.random()}
          />
        ))
      ) : (
        <Loader />
      )}

      <Desc mTop={35} mBottom={25}>
        Sztuczna inteligencja prognozuje:
      </Desc>
      <GradientElement
        day={
          casesData.length > 0
            ? dayDictionary[
                (casesData[casesData.length - 1].dayOfWeek_num + 1) % 7
              ]
            : 2
        }
        cases={score > 0 ? score : 'liczę...'}
        border
      />

      {!!casesGrowStatus && (
        <Desc mTop={35} mBottom={0}>
          Przyrost jest <Bold color="colorBlueLight">{casesGrowStatus}</Bold>
        </Desc>
      )}

      <Desc mTop={30}>
        Bez potrzeby proszę nie wychodzić z domu. Proszę pamiętać o noszeniu
        <Bold color="colorBlueLight"> maseczki</Bold> i utrzymaniu
        <Bold color="colorBlueLight"> dystansu</Bold>
      </Desc>
    </Layout>
  )
}

export default Virus

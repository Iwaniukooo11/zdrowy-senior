// Screen panelu pomocy
import React, { useState } from 'react'
import Layout from '../../layout/layout'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'
import Bold from '../../components/bold/bold'

import ProblemSelect from './partials/problemSelect'
import Call from './partials/call'

const Critic = (props) => {
  const [options, setOptions] = useState([
    { text: 'Źle się czuję', selected: false, id: Math.random() },
    { text: 'Nie mam leków', selected: false, id: Math.random() },
    { text: 'Nie wiem, gdzie jestem', selected: false, id: Math.random() },
  ])

  const changeSelect = (id) => {
    //Funkcja operująca zaznaczonymi przez użytkownika problemami
    const _options = [...options].map((obj) => {
      if (obj.id !== id) return obj

      const _obj = { ...obj }
      _obj.selected = !_obj.selected
      return _obj
    })
    setOptions(_options)
  }

  return (
    <Layout>
      <SectionHeader color="colorRedLight">Panel ratunku</SectionHeader>
      <Desc mTop={20} mBottom={0}>
        Twój bliski już został <Bold color="colorRedLight">poinformowany</Bold>,
        że masz problem!
      </Desc>
      <Desc mTop={30} mBottom={30}>
        Zaznacz dokładnie, co Ci dolega
      </Desc>
      {options.map((obj) => (
        <ProblemSelect obj={obj} changeSelect={changeSelect} />
      ))}
      <Desc mTop={40} mBottom={0} center style={{ width: '100%' }}>
        Zagraża Ci życie?
      </Desc>
      <Call />
    </Layout>
  )
}

export default Critic

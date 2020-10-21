// Screen instrukcji o myciu rąk
import React from 'react'
import styled from 'styled-components/native'
import Layout from '../../layout/layout'
import SectionHeader from '../../components/sectionHeader/sectionHeader'
import Desc from '../../components/desc/desc'

import Line from '../../components/line/line'

import img1 from '../../assets/wash-hands/1b.png'
import img2 from '../../assets/wash-hands/2b.png'
import img3 from '../../assets/wash-hands/3b.png'
import img4 from '../../assets/wash-hands/4b.png'
import img5 from '../../assets/wash-hands/5b.png'
import img6 from '../../assets/wash-hands/6b.png'
import img7 from '../../assets/wash-hands/7b.png'

const dataDesc = ['Powrocie do domu', 'Kontakcie z inną osobą']

const dataInstructions = [
  {
    text: 'Zwilż ręce ciepłą wodą. Nałóż  mydło w płynie  w zagłębienie  dłoni',
    img: img1,
  },
  { text: 'Namydl obydwie wewnętrzne  powierzchnie dłoni', img: img2 },
  { text: 'Spleć palce  i namydl je', img: img3 },
  { text: 'Namydl kciuk  jednej dłoni  drugą ręką  i na przemian', img: img4 },
  {
    text: 'Namydl wierzch  jednej dłoni  wnętrzem drugiej dłoni i na przemian',
    img: img5,
  },
  { text: 'Namydl obydwa nadgarstki', img: img6 },
  {
    text: 'Spłucz starannie dłonie, żeby usunąć mydło. Wysusz je starannie',
    img: img7,
  },
]

const StyledImage = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
`

const Hand = () => {
  return (
    <Layout>
      <SectionHeader>mycie rąk</SectionHeader>
      <Desc>Należy myć lub dezynfekować ręce po każdym: </Desc>
      {dataDesc.map((txt) => (
        <Desc mBottom={0}>
          <Desc color={'colorBlueLight'}>- </Desc>
          {txt}
        </Desc>
      ))}

      <Line />

      <SectionHeader>Jak skutecznie myć ręce?</SectionHeader>
      {dataInstructions.map((el, index) => (
        <>
          <Desc mTop={30} mBottom={0}>
            <Desc mBottom={0} color="colorBlueLight">
              {index + 1}.
            </Desc>
            {el.text}
          </Desc>
          <StyledImage source={el.img} />
        </>
      ))}
    </Layout>
  )
}

export default Hand

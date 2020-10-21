// Komponent linii oddzielającej kontent
import styled from 'styled-components/native'

const Line = styled.View`
  width: 100%;
  height: 3px;
  background-color: ${(props) => props.theme.colorBlueLight};
  margin: 40px 0;
`

export default Line

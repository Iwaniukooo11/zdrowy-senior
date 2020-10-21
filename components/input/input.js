// Komponent inputu
import styled from 'styled-components/native'

const Input = styled.TextInput`
  font-family: 'Rubik_400Regular';
  font-size: 26px;

  border: 2px solid
    ${(props) =>
      props.isActive ? props.theme.colorBlueLight : props.theme.colorGrey};
  border-radius: 6px;
  padding: 8px 20px;
  margin-top: 20px;
  width: 80%;
`

export default Input

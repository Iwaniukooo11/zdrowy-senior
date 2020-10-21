//Komponent przycisku
import React from 'react'
import styled from 'styled-components/native'

const StyledText = styled.Text`
  font-size: 20px;
  font-family: 'Rubik_500Medium';
  text-transform: uppercase;
  letter-spacing: 3px;
  color: ${({ theme }) => theme.colorWhite};
`

const StyledTouchableOpacity = styled.TouchableOpacity.attrs((props) => ({
  style: props.style,
}))`
  justify-content: center;
  align-items: center;
  align-self: center; ;
`

const StyledView = styled.View`
  background-color: ${({ theme }) => theme.colorBlueLight};
  padding: 14px 35px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
`

const greenButton = (props) => {
  return (
    <StyledTouchableOpacity
      onPress={props.isActive ? props.onPressHandler : null}
      style={props.style}
      activeOpacity={0.75}
    >
      <StyledView isActive={props.isActive} style={props.style}>
        <StyledText>{props.children}</StyledText>
      </StyledView>
    </StyledTouchableOpacity>
  )
}

export default greenButton

// Komponent pojedynczego kafelka do sekcji
import React from 'react'
import { Alert, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import theme from '../../../layout/theme'
import Desc from '../../../components/desc/desc'

const Wrap = styled.TouchableOpacity`
  margin: 15px;
  align-self: center;
`

const StyledDesc = styled(Desc)`
  text-transform: uppercase;
  font-family: 'Rubik_500Medium';
  color: ${({ theme }) => theme.colorWhite};
`

const StyledImage = styled.Image`
  max-width: 70px;
  max-height: 70px;
`

const TabLink = (props) => {
  return (
    <Wrap
      activeOpacity={0.5}
      onPress={() => {
        if (props.extraBig)
          Alert.alert(
            'Włączenie panelu pomocy',
            'Czy zagraża Ci niebezpieczństwo i chcesz powiadomić bliskiego?',
            [
              {
                text: 'Tak',
                onPress: () => props.navigation.navigate(props.link),
              },
              {
                text: 'Nie',
              },
            ],
            { cancelable: false }
          )
        else props.navigation.navigate(props.link)
      }}
    >
      <LinearGradient
        colors={
          props.extraBig
            ? [theme.colorRedDark, theme.colorRedLight]
            : [theme.colorBlueLight, theme.colorBlueDark]
        }
        start={[0.0, 0.5]}
        end={[1.0, 0.5]}
        style={{
          width: props.extraBig
            ? 320
            : Dimensions.get('window').width * 1 > 360
            ? 150
            : 135,
          height: 170,
          borderRadius: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <StyledImage source={props.src} />
        <StyledDesc>{props.text}</StyledDesc>
      </LinearGradient>
    </Wrap>
  )
}

export default TabLink

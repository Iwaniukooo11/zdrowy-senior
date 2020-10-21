// Komponent kółeczka ładowania
import React from 'react'
import { ActivityIndicator } from 'react-native'
import theme from '../../layout/theme'

const Loader = () => {
  return (
    <ActivityIndicator
      size="large"
      color={theme.colorBlueLight}
      style={{ marginTop: 25, alignSelf: 'center' }}
    />
  )
}

export default Loader

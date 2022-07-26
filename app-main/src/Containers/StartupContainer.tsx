import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/Store/Auth'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()
  const [fetchOne] = useLazyFetchOneQuery()
  const dispatch = useDispatch()

  const { t } = useTranslation()

  const init = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      const token = (await AsyncStorage.getItem('token')) ?? ''
      if (userId) {
        const { data } = await fetchOne(userId)
        if (data) {
          dispatch(setCredentials({ user: data, token }))
          return navigateAndSimpleReset('Candidate')
        }
      }
    } catch (error) {
      // nothing here
    }
    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Auth')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text style={Fonts.textCenter}>{t('welcome')}</Text>
    </View>
  )
}

export default StartupContainer

import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import {
  StartupContainer,
  LoginContainer,
  RegisterContainer,
  CandidateContainer,
  UserProfileContainer,
  AuthContainer,
} from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigationRef } from './utils'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme

  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen name="Login" component={LoginContainer} />
          <Stack.Screen name="Register" component={RegisterContainer} />
          <Stack.Screen name="Candidate" component={CandidateContainer} />
          <Stack.Screen name="UserProfile" component={UserProfileContainer} />
          <Stack.Screen name="Auth" component={AuthContainer} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator

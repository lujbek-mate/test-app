/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Hooks'
import { useLoginMutation } from '@/Services/modules/auth'
import type { LoginRequest } from '@/Services/modules/auth/login'
import { navigateAndSimpleReset, navigate } from '@/Navigators/utils'
import { setCredentials } from '@/Store/Auth'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { Input, GradientButton } from '@/Components'
import { Colors } from '@/Theme/Variables'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginContainer = () => {
  const { Fonts, Gutters, Layout, Common } = useTheme()
  const dispatch = useDispatch()
  const initialState = {
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState<LoginRequest>(initialState)

  const [login, { isLoading }] = useLoginMutation()

  const handleLogin = async () => {
    try {
      const user = await login(formState).unwrap()
      if (user?.token) {
        await AsyncStorage.setItem('token', user.token)
        await AsyncStorage.setItem('userId', `${user.user.id}`)
      }
      dispatch(setCredentials(user))
      navigateAndSimpleReset('Candidate')
    } catch (error: any) {
      setFormState(initialState)
      Alert.alert('Error', error?.data?.message || error)
    }
  }

  const handleChange = (value: string, name: string) =>
    setFormState((prev: typeof formState) => ({ ...prev, [name]: value }))

  const handleMoveToRegister = () => {
    navigate('Register', {})
  }

  return (
    <View style={[Layout.fill, Common.backgroundWhite]}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Layout.fill, Gutters.largeHPadding]}
      >
        <View style={[Layout.fill, Layout.colCenter]}>
          <View style={[Layout.fullWidth]}>
            <Text style={[Fonts.textLarge, Fonts.textLeft]}>Sign in</Text>
          </View>
          <Input
            onChangeText={value => handleChange(value, 'email')}
            editable={!isLoading}
            keyboardType={'email-address'}
            value={formState.email}
            placeholder="Email"
            label="E-MAIL"
            containerStyle={Gutters.largeTMargin}
          />
          <Input
            onChangeText={value => handleChange(value, 'password')}
            editable={!isLoading}
            secureTextEntry
            placeholder="Password"
            label="PASSWORD"
            value={formState.password}
            containerStyle={Gutters.largeTMargin}
          />
          <GradientButton
            onPress={handleLogin}
            text="SIGN IN"
            linearGradientStyle={[Gutters.regularVPadding]}
            containerStyle={[Gutters.regularTMargin, Gutters.largeBMargin]}
          />

          <View style={[Layout.row]}>
            <View
              style={[Gutters.smallHMargin, Layout.center, Common.socialButton]}
            >
              <Fontisto name="google" size={24} color={Colors.magnesium} />
            </View>
            <View
              style={[Gutters.smallHMargin, Layout.center, Common.socialButton]}
            >
              <Fontisto name="facebook" size={24} color={Colors.magnesium} />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          Layout.center,
          Common.positionAbsolute,
          { bottom: 30, left: 0, right: 0 },
        ]}
      >
        <Text style={Fonts.textSmall}>
          Don't have an account yet?{' '}
          <Text
            style={[Fonts.fontWeight500, Fonts.textDecorationUnderline]}
            onPress={handleMoveToRegister}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default LoginContainer

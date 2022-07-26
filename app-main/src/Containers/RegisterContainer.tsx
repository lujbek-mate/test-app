/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@/Hooks'
import { useRegisterMutation } from '@/Services/modules/auth'
import type { RegisterRequest } from '@/Services/modules/auth/register'
import { navigateAndSimpleReset, navigateGoBack } from '@/Navigators/utils'
import { setCredentials } from '@/Store/Auth'
import { Input, GradientButton } from '@/Components'
import { Colors } from '@/Theme/Variables'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RegisterContainer = () => {
  const { Fonts, Gutters, Layout, Common } = useTheme()
  const dispatch = useDispatch()
  const initialState = {
    email: '',
    password: '',
    username: '',
    age: '',
  }

  const [formState, setFormState] = useState<RegisterRequest>(initialState)

  const [register, { isLoading }] = useRegisterMutation()

  const handleRegister = async () => {
    try {
      const user = await register(formState).unwrap()
      if (user?.token) {
        await AsyncStorage.setItem('token', user.token)
        await AsyncStorage.setItem('userId', `${user.user.id}`)
      }
      dispatch(setCredentials(user))
      navigateAndSimpleReset('Candidate')
    } catch (error: any) {
      Alert.alert('Error', error.data.message)
    }
  }

  const handleChange = (value: string, key: string) =>
    setFormState((prev: typeof formState) => ({ ...prev, [key]: value }))

  return (
    <View style={[Layout.fill, Common.backgroundTungsten]}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[Layout.fill, Gutters.largeHPadding]}
      >
        <View
          style={[
            Layout.fill,
            Gutters.largeBMargin,
            { justifyContent: 'flex-end' },
          ]}
        >
          <View style={[Layout.fullWidth]}>
            <Text
              style={[Fonts.textLarge, Fonts.textLeft, Common.colorlightGray]}
            >
              Sign up
            </Text>
          </View>
          <View style={[Layout.row]}>
            <Input
              onChangeText={value => handleChange(value, 'username')}
              editable={!isLoading}
              value={formState.username}
              placeholder="USERNAME"
              label="USERNAME"
              placeholderTextColor={Colors.gray}
              containerStyle={[
                Gutters.largeTMargin,
                { width: '50%', marginRight: 10 },
              ]}
              labelStyle={Common.colorslateGray}
              inputStyle={[Common.colorgray, Common.backgroundTungsten]}
            />
            <Input
              onChangeText={value => handleChange(value, 'age')}
              editable={!isLoading}
              value={formState.age}
              placeholder="AGE"
              label="AGE"
              placeholderTextColor={Colors.gray}
              containerStyle={[
                Gutters.largeTMargin,
                { width: '50%', marginLeft: 10 },
              ]}
              labelStyle={Common.colorslateGray}
              inputStyle={[Common.colorgray, Common.backgroundTungsten]}
            />
          </View>
          <Input
            onChangeText={value => handleChange(value, 'email')}
            editable={!isLoading}
            keyboardType={'email-address'}
            value={formState.email}
            placeholder="Email"
            label="E-MAIL"
            placeholderTextColor={Colors.gray}
            containerStyle={Gutters.largeTMargin}
            labelStyle={Common.colorslateGray}
            inputStyle={[Common.colorgray, Common.backgroundTungsten]}
          />
          <Input
            onChangeText={value => handleChange(value, 'password')}
            editable={!isLoading}
            secureTextEntry
            placeholder="Password"
            label="PASSWORD"
            placeholderTextColor={Colors.gray}
            value={formState.password}
            containerStyle={Gutters.largeTMargin}
            labelStyle={Common.colorslateGray}
            inputStyle={[Common.colorgray, Common.backgroundTungsten]}
          />
          <GradientButton
            onPress={handleRegister}
            text="SIGN UP"
            linearGradientStyle={[Gutters.regularVPadding]}
            containerStyle={[Gutters.regularTMargin, Gutters.largeBMargin]}
          />
          <View style={[Layout.center, Gutters.largeTMargin]}>
            <Text style={[Fonts.textSmall, Common.colorslateGray]}>
              Already have an account?{' '}
              <Text
                style={[Fonts.fontWeight700, Fonts.textDecorationUnderline]}
                onPress={navigateGoBack}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default RegisterContainer

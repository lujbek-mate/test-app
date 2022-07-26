/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { navigate } from '@/Navigators/utils'

const AuthContainer = () => {
  const { Layout, Common, Fonts, Gutters } = useTheme()

  const handleMove = (key: string) => {
    navigate(key, {})
  }

  return (
    <View style={[Layout.fill]}>
      <ImageBackground
        style={[Layout.fill]}
        source={{
          uri: 'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        }}
        resizeMode="cover"
      >
        <View style={[Layout.row, Layout.center, Layout.fill]}>
          <View
            style={[
              Layout.row,
              {
                borderColor: Colors.white,
                borderWidth: 2,
                borderRadius: 30,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                Gutters.regularVPadding,
                Common.backgroundWhite,
                {
                  borderRadius: 30,
                  paddingHorizontal: 40,
                },
              ]}
              onPress={() => handleMove('Login')}
            >
              <Text style={[Common.coloruglyBlue, Fonts.fontWeight600]}>
                SIGN IN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[Gutters.regularVPadding, { paddingHorizontal: 40 }]}
              onPress={() => handleMove('Register')}
            >
              <Text style={[Common.colorwhite, Fonts.fontWeight600]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default AuthContainer

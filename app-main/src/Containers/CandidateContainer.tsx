/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { TopBar, GradientButton } from '@/Components'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '@/Theme/Variables'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { navigate, navigateAndSimpleReset } from '@/Navigators/utils'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { AuthState } from '@/Store/Auth'
import { User } from '@/Services/modules/users/fetchOne'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface CandidateContainerProps {
  userId: string
}

const CandidateContainer = ({ userId }: CandidateContainerProps) => {
  const [fetchOne, { data, isSuccess, isLoading, isFetching }] =
    useLazyFetchOneQuery()
  const { Layout, Common, Fonts, Gutters } = useTheme()
  const handleMoveToUserProfile = () => {
    navigate('UserProfile', { data })
  }
  const currentUser = useSelector(
    (state: { auth: AuthState }) => state.auth.user,
  ) as unknown as User
  const userIdFromState = currentUser?.id

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear()
      Alert.alert('Logout')
      navigateAndSimpleReset('Auth')
    } catch (error) {
      Alert.alert('Error')
    }
  }

  useEffect(() => {
    fetchOne(userId ?? userIdFromState)
  }, [fetchOne, userId, userIdFromState])

  if (!isSuccess) {
    return null
  }

  return (
    <View style={[Layout.fill]}>
      {(isLoading || isFetching) && <ActivityIndicator />}
      <ImageBackground
        style={[Layout.fill]}
        source={{
          uri: data?.thumbnail,
        }}
        resizeMode="cover"
      >
        <TopBar title="Candidates" onPress={handleLogout} />
        <LinearGradient
          colors={[Colors.transparent, Colors.gray]}
          style={[
            Layout.fullWidth,
            Common.positionAbsolute,
            Gutters.largeHPadding,
            Gutters.largeTPadding,
            { bottom: 0 },
          ]}
        >
          <Text
            style={[Fonts.titleRegular, Common.colorwhite, Fonts.fontWeight500]}
          >
            {data?.name}
          </Text>
          <View
            style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyTMargin]}
          >
            <MaterialIcons name="location-on" size={18} color={Colors.white} />
            <Text
              style={[Fonts.fontWeight600, Fonts.textSmall, Common.colorwhite]}
            >
              {`${data?.address?.street}, ${data?.address?.state}, ${data?.address?.city}`}
            </Text>
          </View>
          <View style={[Gutters.regularTMargin, Layout.row]}>
            <GradientButton
              containerStyle={[Gutters.smallRMargin, { width: 60 }]}
              linearGradientStyle={{ width: 60, height: 60, borderRadius: 60 }}
              icon={
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  size={26}
                  color={Colors.white}
                />
              }
            />
            <GradientButton
              containerStyle={[Gutters.smallRMargin, { width: 60 }]}
              linearGradientStyle={{
                width: 60,
                height: 60,
                borderRadius: 60,
                borderColor: Colors.gray,
                borderWidth: 1,
              }}
              linearGradientColors={[Colors.transparent]}
              icon={
                <MaterialIcons
                  name="mail-outline"
                  size={26}
                  color={Colors.gray}
                />
              }
            />
          </View>
          <View
            style={[
              Layout.alignItemsCenter,
              Gutters.regularTMargin,
              Gutters.regularBPadding,
            ]}
          >
            <TouchableOpacity onPress={handleMoveToUserProfile}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={56}
                color={Colors.gunmetan}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default CandidateContainer

import React from 'react'
import { Text, TouchableOpacity, ViewStyle } from 'react-native'
import { useTheme } from '@/Hooks'
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '@/Theme/Variables'

interface GradientButtonProps {
  onPress?: () => void
  text?: string
  icon?: any
  containerStyle?: ViewStyle | ViewStyle[]
  linearGradientStyle?: ViewStyle | ViewStyle[]
  textStyle?: ViewStyle
  linearGradientColors: (string | number)[]
}

const GradientButton = ({
  onPress,
  text,
  icon,
  containerStyle,
  linearGradientStyle,
  textStyle,
  linearGradientColors,
}: GradientButtonProps) => {
  const { Fonts, Layout, Common } = useTheme()

  return (
    <TouchableOpacity
      style={[Layout.fullWidth, containerStyle]}
      onPress={onPress}
    >
      <LinearGradient
        colors={linearGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          Layout.fullWidth,
          Layout.center,
          Common.button.rounded,
          linearGradientStyle,
        ]}
      >
        {text ? (
          <Text
            style={[
              Fonts.textTiny,
              Fonts.textCenter,
              Fonts.fontWeight700,
              Common.colorwhite,
              textStyle,
            ]}
          >
            {text}
          </Text>
        ) : null}
        {icon ? icon : null}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default GradientButton

GradientButton.defaultProps = {
  containerStyle: {},
  linearGradientStyle: {},
  textStyle: {},
  text: '',
  icon: null,
  // eslint-disable-next-line react/default-props-match-prop-types
  linearGradientColors: [Colors.bluberry, Colors.turquoiseBlue],
  onPress: () => {},
}

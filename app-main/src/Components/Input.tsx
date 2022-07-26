/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'

interface InputProps extends TextInputProps {
  label?: string
  containerStyle?: ViewStyle | ViewStyle[]
  inputStyle?: TextStyle | TextStyle[]
  labelStyle?: TextStyle | TextStyle[]
}

const Input = ({
  label,
  containerStyle,
  inputStyle,
  labelStyle,
  ...props
}: InputProps) => {
  const { Common, Layout, Fonts } = useTheme()
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <View style={[Layout.column, containerStyle]}>
      {label ? (
        <Text style={[Fonts.textTiny, Fonts.fontWeight600, labelStyle]}>
          {label}
        </Text>
      ) : null}
      <View style={[Layout.row, Layout.fullWidth]}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            Common.textInput,
            Layout.fill,
            { borderBottomColor: isFocused ? Colors.bluberry : Colors.divider },
            { borderBottomWidth: isFocused ? 2 : 1 },
            inputStyle,
          ]}
          {...props}
        />
      </View>
    </View>
  )
}

export default Input

Input.defaultProps = {
  label: '',
  containerStyle: {},
  inputStyle: {},
  labelStyle: {},
}

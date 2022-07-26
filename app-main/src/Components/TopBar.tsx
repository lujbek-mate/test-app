import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useTheme } from '@/Hooks'
import { Colors } from '@/Theme/Variables'
import { navigateGoBack } from '@/Navigators/utils'

interface TopBarProps {
  title: string
  onPress?: () => Promise<void>
}

const TopBar = ({ title, onPress }: TopBarProps) => {
  const { Layout, Gutters, Fonts, Common } = useTheme()

  const handleBack = () => {
    if (onPress) {
      onPress()
    } else {
      navigateGoBack()
    }
  }

  return (
    <View
      style={[
        Layout.fullWidth,
        Layout.row,
        Layout.justifyContentBetween,
        Layout.alignItemsCenter,
        Gutters.smallTMargin,
      ]}
    >
      <TouchableOpacity onPress={handleBack}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={36}
          color={Colors.white}
        />
      </TouchableOpacity>
      <Text style={[Fonts.textSmall, Common.colorwhite, Fonts.fontWeight500]}>
        {title}
      </Text>
      <MaterialIcons name="more-vert" size={32} color={Colors.white} />
    </View>
  )
}

export default TopBar

TopBar.defaultProps = {
  onPress: undefined,
}

/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams, ThemeVariables } from './theme'

type ColorKeys = `color${keyof ThemeVariables['Colors']}`

type ColorTypes = {
  [key in ColorKeys]: {
    [k in string]: string
  }
}

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      backgroundTungsten: {
        backgroundColor: Colors.tungsten,
      },
      backgroundWhite: {
        backgroundColor: Colors.white,
      },
      positionAbsolute: {
        position: 'absolute',
      },
      flexWrap: {
        flexWrap: 'wrap',
      },
      textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        marginTop: 10,
        marginBottom: 10,
      },
      socialButton: {
        backgroundColor: Colors.veryLightGray,
        borderRadius: 50,
        width: 50,
        height: 50,
      },
      ...(Object.entries(Colors).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [`color${key}`]: {
            color: value,
          },
        }),
        {},
      ) as ColorTypes),
    }),
  }
}

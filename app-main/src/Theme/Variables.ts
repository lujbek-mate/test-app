/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  divider: '#D2D1D7',
  primary: '#E14032',
  success: '#28a745',
  error: '#dc3545',
  veryLightGray: '#EFF0F5',
  magnesium: '#B3B8BD',
  bluberry: '#3D42A8',
  turquoiseBlue: '#23A6C5',
  tungsten: '#2A2B2D',
  slateGray: '#5F6064',
  lightGray: '#D7D8DC',
  gray: '#8C8D92',
  gunmetan: '#595A5B',
  uglyBlue: '#376380',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  tiny: 12,
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

const Sizes = Array.from(Array(20).keys())

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
  Sizes,
}

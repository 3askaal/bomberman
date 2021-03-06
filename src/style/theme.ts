import { colors } from './colors'
import { fonts } from './fonts'

export const localTheme = {
  rootFontSizes: ['12px', '16px', '20px'],
  colors,
  fonts,
  components: {
    Input: {
      default: {
        padding: 'xs',
      },
      variants: {
        isBlock: {
          width: '100% !important'
        }
      }
    },
    Button: {
      default: {
        paddingX: 's',
        paddingY: 'xs',
        borderWidth: '2px',
      },
      variants: {
        isReady: {
          backgroundColor: 'transparent',
          color: 'positive',
          borderColor: 'positive',

          ':hover': {
            backgroundColor: 'positive',
            color: 'background',
            borderColor: 'positive',
          }
        }
      }
    },
  },
}

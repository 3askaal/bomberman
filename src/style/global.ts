import { createGlobalStyle } from 'styled-components'

export const LocalGlobalStyle: any = createGlobalStyle<any>({
  html: {
    height: '100%',
    fontSize: '16px'
  },

  svg: {
    display: 'block',
    maxWidth: '14px !important',
    maxHeight: '14px !important',
  },
})

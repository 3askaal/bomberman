import styled from 'styled-components'
import { fontSize } from 'styled-system'

export const SApp = styled.div<any>(
  ({ theme }) => ({
    fontFamily: theme.fonts.base,
    color: theme.colors.white,
    background: theme.colors.background,
    width: '100%',
    height: '100%',
    flexGrow: 1,
  }),
  fontSize,
)

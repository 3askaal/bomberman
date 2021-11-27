import { styled } from '3oilerplate'

export const SControls = styled.div(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  justifyContent: 'center',
  // maxWidth: '20rem'
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SControlsMiddle = styled.div(({ theme }: any) => ({
  flexDirection: 'column',
  flexBasis: '100%',
  justifyContent: 'center',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))


export const SControlsButton = styled.button(({ theme, type, color }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height:
    ((type === 'left' || type === 'right') && '2.5rem') ||
    ((type === 'up' || type === 'down') && '2.5rem') ||
    ((type === 'attack') && '2.5rem'),
  backgroundColor: color,
  border: '.125rem solid ' + theme.colors.background,
  borderRadius: '.25rem',
  color: 'white',
  width: '100%',
  minWidth: '5rem',

  'svg': {
    strokeWidth: 3
  }
}))

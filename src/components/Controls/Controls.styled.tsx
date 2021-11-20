import { styled } from '3oilerplate'

export const SControls = styled.div(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  justifyContent: 'center',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SControlsMiddle = styled.div(({ theme }: any) => ({
  flexDirection: 'column',
  flexBasis: '80%',
  justifyContent: 'center',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))


export const SControlsButton = styled.button(({ theme, dir }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: (dir === 'left' || dir === 'right') ? '3rem' : '1.5rem',
  backgroundColor: 'primary',
  border: '.125rem solid black',
  borderRadius: '.25rem',
  color: 'white',
  width: '100%'
}))

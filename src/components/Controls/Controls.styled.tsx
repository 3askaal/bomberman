import { styled } from '3oilerplate'

export const SControls = styled.div(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  width: '100%',
  justifyContent: 'center',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
  '> *': {
    width: '30%',
  }
}))

export const SControlsButton = styled.button(({ theme, dir }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // width: '100%',
  height: (dir === 'left' || dir === 'right') ? '4rem' : '2rem',
  backgroundColor: 'primary',
  border: '0.125rem solid black',
  borderRadius: '.25rem',
  color: 'white',

  ':last-child:first-child': {
    height: '4rem',
  }
}))

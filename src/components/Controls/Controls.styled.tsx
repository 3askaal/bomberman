import { styled } from '3oilerplate'


export const SControls = styled.div(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: ['30rem', '20rem'],
  justifyContent: 'space-between'
  // maxWidth: '20rem'
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SControlsMove = styled.div(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  flexBasis: '60%',

  '> *': {
    flexBasis: '33.33%'
  }
}))

export const SControlsMiddle = styled.div(({ theme }: any) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  // flexGrow: 1,
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))


export const SControlsButton = styled.button(({ theme, type, color }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['3rem', '2rem'],
  backgroundColor: color,
  border: '.125rem solid ' + theme.colors.background,
  borderRadius: '.25rem',
  color: 'white',
  flexBasis: '30%',
  cursor: 'pointer',
  // width: '100%',
  // width: ['7.2rem', '4rem'],

  ...type !== 'attack' && ({
    width: '100%',
  }),

  // ...type === 'attack' && ({
  //   minWidth: '8rem',
  // }),

  'svg': {
    strokeWidth: 3
  }
}))

import { s } from '3oilerplate'


export const SControls = s.div(({ theme, index }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: ['30rem', '20rem'],
  // justifyContent: 'space-between'
  // maxWidth: '20rem'
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SControlsMove = s.div(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  flexBasis: '60%',

  '> *': {
    flexBasis: '35%'
  }
}))

export const SControlsMiddle = s.div(({ theme }: any) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  // flexGrow: 1,
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))


export const SControlsButton = s.button(({ theme, type, color }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: ['2.1rem', '3rem'],
  backgroundColor: color,
  border: '.125rem solid ' + theme.colors.background,
  borderRadius: '.25rem',
  color: 'white',
  flexBasis: '33.33%',
  cursor: 'pointer',
  // width: '100%',
  // width: ['7.2rem', '4rem'],

  ...type !== 'bomb' && ({
    width: '100%',
  }),

  // ...type === 'bomb' && ({
  //   minWidth: '8rem',
  // }),

  'svg': {
    strokeWidth: 5,
    stroke: 'white'
  }
}))

export const SControlsHealth = s.div(({ index, health }: any) => ({
  position: 'relative',
  height: '.4rem',
  width: '100%',
  // backgroundColor: '#B42B51',
  border: '.1rem solid #B42B51',
  [['mb', 'mt'][index]]: 'xs',
}))
export const SControlsHealthProgress = s.div(({ index, health }: any) => ({
  position: 'absolute',
  backgroundColor: '#B42B51',
  width: `${health}%`,
  top: 0,
  bottom: 0,
  left: 0,
}))

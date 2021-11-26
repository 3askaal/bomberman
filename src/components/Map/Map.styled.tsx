import { styled } from '3oilerplate'

export const SMap = styled.div(({ theme, blocks }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `${blocks}rem`,
  width: `${blocks}rem`,
  backgroundColor: '#F0F8FF',
  borderRadius: '0.2rem',
  boxShadow: '0 0 0 2px #F0F8FF',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SMapStone = styled.div(({ theme }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  backgroundColor: '#888888',
  border: '0.15rem solid',
  borderRightColor: '#C0C0C0',
  borderTopColor: '#C0C0C0',
  borderLeftColor: '#444444',
  borderBottomColor: '#444444',
  borderRadius: '0.1rem'
}))

export const SMapCharacter = styled.div(({ theme, color }: any) => ({
  position: 'absolute',
  backgroundColor: color,
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  borderRadius: '100%',
  transition: 'transform .1s ease'
}))

export const SMapBrick = styled.div(() => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  border: '0.15rem solid',
  // light
  borderTopColor: '#E63E6D',
  borderRightColor: '#E63E6D',
  // middle
  backgroundColor: '#B42B51',
  // dark
  borderLeftColor: '#7D1935',
  borderBottomColor: '#7D1935',
}))

export const SMapBomb = styled.div(() => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  backgroundColor: '#666',
  border: '0.15rem solid #A9A9A9',
}))

const c1 = '#FFC300';
const c2 = '#FF5733';
const c3 = '#C70039';
const c4 = '#900C3F';

export const SMapExplosion = styled.div(({ x, y, width, direction }: any) => ({
  position: 'absolute',
  background: `linear-gradient(
    ${direction === 'up' || direction === 'down' ? '90deg,' : ''}
    ${c1},
    ${c1} .2rem,
    ${c2} .2rem,
    ${c2} .3rem,
    ${c3} .3rem,
    ${c3} .4rem,
    ${c4} .4rem,
    ${c4} .5rem,
    ${c4} .6rem,
    ${c3} .6rem,
    ${c3} .7rem,
    ${c2} .7rem,
    ${c2} .8rem,
    ${c1} .8rem,
    ${c1}
  )`,
  ...(direction === 'right' && {
    borderTopRightRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  }),
  ...(direction === 'up' && {
    borderTopLeftRadius: '.5rem',
    borderTopRightRadius: '.5rem',
  }),
  ...(direction === 'down' && {
    borderBottomLeftRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  }),
  ...(direction === 'left' && {
    borderTopLeftRadius: '.5rem',
    borderBottomLeftRadius: '.5rem',
  }),
}))

export const SMapExplosionEdge = styled.div(({ direction }: any) => ({
  position: 'absolute',
  width: '.5rem',
  height: '1rem',
  overflow: 'hidden',

  ...(direction === 'right' && {
    width: '.5rem',
    height: '1rem',
  }),
  ...(direction === 'up' && {
    width: '1rem',
    height: '.5rem',
  }),
  ...(direction === 'down' && {
    width: '1rem',
    height: '.5rem',
  }),
  ...(direction === 'left' && {
    width: '.5rem',
    height: '1rem',
  }),

  '::after': {
    content: "''",
    position: 'absolute',
    ...(direction === 'right' && {
      right: 0,
    }),
    ...(direction === 'up' && {
      top: 0,
    }),
    ...(direction === 'down' && {
      bottom: 0,
    }),
    ...(direction === 'left' && {
      left: 0,
    }),
    width: '1rem',
    height: '1rem',
    borderRadius: '100%',
    background: `radial-gradient(
      ${c4},
      ${c4} .1rem,
      ${c3} .1rem,
      ${c3} .2rem,
      ${c2} .2rem,
      ${c2} .3rem,
      ${c1} .3rem
    )`
  },
}))

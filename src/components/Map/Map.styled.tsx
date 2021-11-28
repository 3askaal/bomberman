import { s, keyframes, css } from '3oilerplate'

export const SMap = s.div(({ theme, blocks }: any) => ({
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

export const SMapStone = s.div(({ theme }: any) => ({
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

export const SMapCharacter = s.div(({ theme, color }: any) => ({
  position: 'absolute',
  backgroundColor: color,
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  borderRadius: '100%',
  transition: 'transform .1s ease'
}))

export const SMapBrick = s.div(() => ({
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

export const SMapBomb = s.div(() => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  backgroundColor: '#666',
  border: '0.15rem solid #A9A9A9',
}))

// const c1 = '#FFC300';
// const c2 = '#FF5733';
// const c3 = '#C70039';
// const c4 = '#900C3F';

const c1 = '#6B0848';
const c2 = '#A40A3C';
const c3 = '#EC610A';
const c4 = '#FFC300';
const c5 = '#F2E8C6';
const colors = [c1, c2, c3, c4, c5]


export const SMapExplosion = s.div(({ key, direction, distance }: any) => ({
  position: 'absolute',
  background: `linear-gradient(
    ${direction === 'up' || direction === 'down' ? '90deg,' : ''}
    ${c1},
    ${c1} .1rem,
    ${c2} .1rem,
    ${c2} .2rem,
    ${c3} .2rem,
    ${c3} .3rem,
    ${c4} .3rem,
    ${c4} .4rem,
    ${c5} .4rem,
    ${c5} .6rem,
    ${c4} .6rem,
    ${c4} .7rem,
    ${c3} .7rem,
    ${c3} .8rem,
    ${c2} .8rem,
    ${c2} .9rem,
    ${c1} .9rem,
    ${c1} 1rem
  )`,

  ...direction === 'left' && distance[direction] && {
    top: 0,
    right: '1rem',
    width: `${distance[direction]}rem`,
    height: '1rem',
    borderTopLeftRadius: '.5rem',
    borderBottomLeftRadius: '.5rem',
  },

  ...direction === 'right' && distance[direction] && {
    top: 0,
    left: `1rem`,
    width: `${distance[direction]}rem`,
    height: '1rem',
    borderTopRightRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  },

  ...direction === 'up' && distance[direction] && {
    left: 0,
    bottom: '1rem',
    width: '1rem',
    height: `${distance[direction]}rem`,
    borderTopLeftRadius: '.5rem',
    borderTopRightRadius: '.5rem',
  },

  ...direction === 'down' && distance[direction] && {
    left: 0,
    top: `1rem`,
    width: '1rem',
    height: `${distance[direction]}rem`,
    borderBottomLeftRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  },

}))

const boom = keyframes`
  0% {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  }
  100% {
    top: '-.5rem',
    left: '-.5rem',
    right: '-.5rem',
    bottom: '-.5rem',
  }
`;


export const SMapCenter = s.div(({ x, y, width, direction }: any) => ({
  position: 'relative',
  left: `${x}rem`,
  top: `${y}rem`,
  width: '1rem',
  height: '1rem',

  '::after': {
    content: "''",
    position: 'absolute',
    width: '100%',
    height: '100%',
    // animation: `${boom.getName()} .5s forwards`,
    backgroundColor: 'grey',
    opacity: .4,
    borderRadius: '100%',
    zIndex: 500
  },
}),
css`
  ::after {
    animation: ${boom} .5s forwards;
  }
`)

export const SMapCenterBar = s.div(({ distance, index }: any) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: (index + 1) * 100,

  ...(distance.up || distance.down) && {
    '::after': {
      content: "''",
      backgroundColor: colors[index],
      position: 'absolute',
      height: distance.up ? '100%' : `.${58 + ((5 - (index + 1)) * 10)}rem`,
      bottom: !distance.up ? 0 : null,
      top: !distance.down ? 0 : null,
      left: `.${index}rem`,
      right: `.${index}rem`,
      // top: `.${index}rem`,
      // bottom: `.${index}rem`,
    },
  },

  ...(distance.left || distance.right) && {
    '::before': {
      content: "''",
      backgroundColor: colors[index],
      position: 'absolute',
      width: distance.left ? '100%' : `.${58 + ((5 - (index + 1)) * 10)}rem`,
      left: !distance.right ? 0 : null,
      right: !distance.left ? 0 : null,
      // left: `.${index}rem`,
      // right: `.${index}rem`,
      top: `.${index}rem`,
      bottom: `.${index}rem`,
    },
  },
}))

export const SMapExplosionEdge = s.div(({ direction }: any) => ({
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
      ${c5},
      ${c5} .1rem,
      ${c4} .1rem,
      ${c4} .2rem,
      ${c3} .2rem,
      ${c3} .3rem,
      ${c2} .3rem,
      ${c2} .4rem,
      ${c1} .4rem
    )`
  },
}))

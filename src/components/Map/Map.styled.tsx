import { s } from '3oilerplate'
import chroma from 'chroma-js'


export const SMap = s.div(({ theme, blocks }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `calc(${blocks}rem + .5rem)`,
  width: `calc(${blocks}rem + .5rem)`,
  border: '.25rem solid',

  borderRightColor: chroma('#fff').darken(0.5).hex(),
  borderTopColor: chroma('#fff').darken(0.5).hex(),

  backgroundColor: chroma('#fff').darken(1).hex(),

  borderLeftColor: chroma('#fff').darken(1.5).hex(),
  borderBottomColor: chroma('#fff').darken(1.5).hex(),
  // borderRadius: '0.2rem',
  // boxShadow: '0 0 0 2px #F0F8FF',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SMapStone = s.div(({ theme }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  border: '0.15rem solid',
  borderRightColor: chroma('#fff').darken(1.5).hex(),
  borderTopColor: chroma('#fff').darken(1.5).hex(),

  backgroundColor: chroma('#fff').darken(2.5).hex(),

  borderLeftColor: chroma('#fff').darken(3.5).hex(),
  borderBottomColor: chroma('#fff').darken(3.5).hex(),
  // borderRadius: '0.1rem'
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
  border: '0.2rem solid',
  // light
  borderTopColor: chroma('#C19191').brighten(.2).hex(),
  borderRightColor: chroma('#C19191').brighten(.2).hex(),
  // middle
  backgroundColor: '#AA7070',
  // dark
  borderLeftColor: chroma('#8B5D5D').darken(.5).hex(),
  borderBottomColor: chroma('#8B5D5D').darken(.5).hex(),
  // borderRadius: '0.1rem'
}))

export const SMapBomb = s.div(() => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  backgroundColor: '#222',
  border: '0.15rem solid #555',
}))

const c1 = '#6B0848';
const c2 = '#A40A3C';
const c3 = '#EC610A';
const c4 = '#FFC300';
const c5 = '#F2E8C6';

const gradient = `
  ${c1},
  ${c1} 10%,
  ${c2} 10%,
  ${c2} 20%,
  ${c3} 20%,
  ${c3} 30%,
  ${c4} 30%,
  ${c4} 40%,
  ${c5} 40%,
  ${c5} 60%,
  ${c4} 60%,
  ${c4} 70%,
  ${c3} 70%,
  ${c3} 80%,
  ${c2} 80%,
  ${c2} 90%,
  ${c1} 90%,
  ${c1} 100%
`

export const SMapExplosionDirection = s.div(({ key, direction, distance }: any) => ({
  position: 'absolute',
  background: `linear-gradient(
    ${direction === 'up' || direction === 'down' ? '90deg,' : ''}
    ${gradient}
  )`,

  ...direction === 'left' && distance[direction] && {
    top: 0,
    right: 'calc(1rem - 1px)',
    width: `${distance[direction]}rem`,
    height: '1rem',
    borderTopLeftRadius: '.5rem',
    borderBottomLeftRadius: '.5rem',
  },

  ...direction === 'right' && distance[direction] && {
    top: 0,
    left: `calc(1rem - 1px)`,
    width: `${distance[direction]}rem`,
    height: '1rem',
    borderTopRightRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  },

  ...direction === 'up' && distance[direction] && {
    left: 0,
    bottom: 'calc(1rem - 1px)',
    width: '1rem',
    height: `${distance[direction]}rem`,
    borderTopLeftRadius: '.5rem',
    borderTopRightRadius: '.5rem',
  },

  ...direction === 'down' && distance[direction] && {
    left: 0,
    top: `calc(1rem - 1px)`,
    width: '1rem',
    height: `${distance[direction]}rem`,
    borderBottomLeftRadius: '.5rem',
    borderBottomRightRadius: '.5rem',
  },

}))

// const boom = keyframes`
//   0% {
//     top: '0',
//     left: '0',
//     right: '0',
//     bottom: '0',
//   }
//   100% {
//     top: '-.5rem',
//     left: '-.5rem',
//     right: '-.5rem',
//     bottom: '-.5rem',
//   }
// `;

export const SMapExplosion = s.div(({ x, y, width, direction }: any) => ({
  position: 'relative',
  left: `${x}rem`,
  top: `${y}rem`,
  width: '1rem',
  height: '1rem',
}))

export const SExplosionCenter = s.div(({ distance, index }: any) => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',

  ...index === 0 && {
    background: `linear-gradient(
      ${distance.left ? '0deg' : '90deg'},
      ${gradient}
    )`,
    clipPath: `polygon(0% 0%, 50% 50%, 0% 100%)`,
  },

  ...index === 1 && {
    background: `linear-gradient(
      ${distance.up ? '90deg' : '0deg'},
      ${gradient}
    )`,
    clipPath: `polygon(50% 50%, 0% 0%, 100% 0%)`,
  },

  ...index === 2 && {
    background: `linear-gradient(
      ${distance.right ? '180deg' : '90deg'},
      ${gradient}
    )`,
    clipPath: `polygon(100% 100%, 50% 50%, 100% 0%)`,
  },

  ...index === 3 && {
    background: `linear-gradient(
      ${distance.down ? '270deg' : '0deg'},
      ${gradient}
    )`,
    clipPath: `polygon(50% 50%, 100% 100%, 0% 100%)`,
  },


  // ...(distance.up || distance.down) && {
  //   '::after': {
  //     content: "''",
  //     backgroundColor: colors[index],
  //     position: 'absolute',
  //     height: '100%',
  //     left: `${(1 - (1 - (index / 10))) * 100}%`,
  //     right: `${(1 - (1 - (index / 10))) * 100}%`,
  //   },
  // },

  // ...(distance.left || distance.right) && {
  //   '::before': {
  //     content: "''",
  //     backgroundColor: colors[index],
  //     position: 'absolute',
  //     width: '100%',
  //     top: `${(1 - (1 - (index / 10))) * 100}%`,
  //     bottom: `${(1 - (1 - (index / 10))) * 100}%`,
  //   },
  // },
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
      ${c5} 14%,
      ${c4} 14%,
      ${c4} 28%,
      ${c3} 28%,
      ${c3} 42%,
      ${c2} 42%,
      ${c2} 56%,
      ${c1} 56%
    )`
  },
}))

import { s } from '3oilerplate'
import styled, { keyframes, css } from 'styled-components'
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

// EXPLOSION

export const SMapExplosion = styled.div<any>(
  ({ x, y, width, direction }: any) => ({
    position: 'relative',
    left: `${x}rem`,
    top: `${y}rem`,
    width: '1rem',
    height: '1rem',
  })
)

// CENTER

export const SExplosionCenter = styled.div<any>(({ distance, index }: any) => ({
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
}))

// BOOM

const boom = (size: number) => keyframes`
  from {
    width: 0;
    height: 0;
    opacity: 0;
  }
  to {
    width: ${size}rem;
    height: ${size}rem;
    opacity: 0.2;
  }
`;

export const SMapExplosionBoom = styled.div<any>(
  ({ direction, size = 2 }: any) => ({
    position: 'absolute',
    width: '1rem',
    height: '1rem',

    ...(direction === 'up' && {
      top: 0,
    }),
    ...(direction === 'down' && {
      bottom: 0,
    }),
    ...(direction === 'left' && {
      left: 0,
    }),
    ...(direction === 'right' && {
      right: 0,
    }),

    '::after': {
      content: "''",
      position: 'absolute',
      display: 'block',
      borderRadius: '100%',
      backgroundColor: 'white',
      top: '50%',
      left: '50%',
      transform: `translateX(-50%) translateY(-50%)`,
      zIndex: '100'
    }
  }),
  ({ size = 1.5, duration = .2, delay = 0 }: any) => {
    return css`
      &:after {
        animation: ${boom(size)} ${duration}s ease-out ${delay}s forwards;
      }
    `
  }
)

// DIRECTION

const slide = (dimension: string, distance: number) => keyframes`
  from {
    ${dimension}: 0rem;
  }
  to {
    ${dimension}: ${distance + .1}rem;
  }
`;

export const SMapExplosionDirection = styled.div<any>(
  ({ key, direction, distance }: any) => ({
    position: 'absolute',
    background: `linear-gradient(
      ${direction === 'up' || direction === 'down' ? '90deg,' : ''}
      ${gradient}
    )`,

    ...direction === 'left' && distance[direction] && {
      top: 0,
      right: '1rem',
      // width: `${distance[direction]}rem`,
      height: '1rem',
      borderTopLeftRadius: '.5rem',
      borderBottomLeftRadius: '.5rem',
    },

    ...direction === 'right' && distance[direction] && {
      top: 0,
      left: `1rem`,
      // width: `${distance[direction]}rem`,
      height: '1rem',
      borderTopRightRadius: '.5rem',
      borderBottomRightRadius: '.5rem',
    },

    ...direction === 'up' && distance[direction] && {
      left: 0,
      bottom: '1rem',
      width: '1rem',
      // height: `${distance[direction]}rem`,
      borderTopLeftRadius: '.5rem',
      borderTopRightRadius: '.5rem',
    },

    ...direction === 'down' && distance[direction] && {
      left: 0,
      top: `1rem`,
      width: '1rem',
      // height: `${distance[direction]}rem`,
      borderBottomLeftRadius: '.5rem',
      borderBottomRightRadius: '.5rem',
    },
  }),
  ({ direction, distance }: any) => {
    const dimension: string = ((direction === 'up' || direction === 'down') && 'height') || 'width'
    const directionDistance: number = distance[direction]

    return css`
      animation: ${slide(dimension, directionDistance)} .1s ease-out forwards;
    `
  }
)

export const SMapExplosionEdge = s.div(
  ({ direction }: any) => ({
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

    '::before': {
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
      )`,
    },
  }),
)

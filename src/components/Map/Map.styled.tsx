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

export const SMapExplosion = styled.div(({ x, y, width, height }: any) => ({
  position: 'absolute',
  // borderRadius: '.25rem',
  backgroundColor: '#900C3F',
  // background: `repeating-radial-gradient(
  //   #FFC300,
  //   #FFC300 0.1rem,
  //   #FF5733 0.1rem,
  //   #FF5733 0.2rem,
  //   #C70039 0.2rem,
  //   #C70039 0.3rem,
  //   #900C3F 0.3rem,
  //   #900C3F 0.4rem,
  //   #C70039 0.4rem,
  //   #C70039 0.6rem
  // )`,

  // ':after': {
  //   content: "''",
  //   position: 'absolute',
  //   display: 'block',
  //   height: `${height}rem`,
  //   width: '.8rem',
  //   left: `${x}rem`,
  //   top: `${startY}rem`,
  //   backgroundColor: '#900C3F',
  //   border: '.15rem solid #C70039',
  //   borderRadius: '.2rem'
  // },

  // ':before': {
  //   content: "''",
  //   position: 'absolute',
  //   display: 'block',
  //   width: `${width}rem`,
  //   height: '.8rem',
  //   top: `${y}rem`,
  //   left: `${startX}rem`,
  //   backgroundColor: '#900C3F',
  //   border: '.15rem solid #C70039',
  //   borderRadius: '.2rem'
  // },
}))

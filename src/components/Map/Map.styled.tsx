import { styled } from '3oilerplate'

export const SMap = styled.div(({ theme, blocks }: any) => ({
  display: 'flex',
  position: 'relative',
  height: `${blocks}rem`,
  width: `${blocks}rem`,
  backgroundColor: 'white',
  // backgroundImage: `url(${griptape})`,
  // border: `solid ${rgba(theme.colors.primary, 0.6)}`,
}))

export const SMapMetal = styled.div(({ theme }: any) => ({
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
  transition: 'all .125s ease'
}))

export const SMapBrick = styled.div(() => ({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  backgroundColor: '#B42B51',
  border: '0.15rem solid',
  borderTopColor: '#E63E6D',
  borderRightColor: '#E63E6D',
  borderLeftColor: '#7D1935',
  borderBottomColor: '#7D1935',
}))

export const SMapBomb = styled.div(() => ({
  position: 'absolute',
  borderRadius: '100%',
  width: '.9rem',
  height: '.9rem',
  margin: '.05rem',
  // background: '#111',
  background: `repeating-radial-gradient(
    #FFC300,
    #FFC300 0.1rem,
    #FF5733 0.1rem,
    #FF5733 0.2rem,
    #C70039 0.2rem,
    #C70039 0.3rem,
    #900C3F 0.3rem,
    #900C3F 0.4rem,
    #C70039 0.4rem,
    #C70039 0.6rem
  )`,
}))

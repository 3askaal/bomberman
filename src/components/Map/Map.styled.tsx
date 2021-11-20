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

export const SMapBlock = styled.div(({ theme }: any) => ({
  position: 'absolute',
  display: 'block',
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

export const SMapCharacter = styled.div(({ theme }: any) => ({
  position: 'absolute',
  display: 'block',
  backgroundColor: 'black',
  width: '.8rem',
  height: '.8rem',
  margin: '.1rem',
  borderRadius: '100%',
  transition: 'all .125s ease'
}))

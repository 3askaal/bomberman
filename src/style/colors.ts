import { brighten, darken } from '3oilerplate'

export const colors: any = {
  primary: '#7459dc',
  primaryDark: darken('#7459dc', 0.25),
  secondary: '#04f2d5',
  secondaryDark: darken('#04f2d5', 0.25),
  background: `linear-gradient(to bottom, ${brighten('black', 0.4)}, ${brighten(
    'black',
    0.2,
  )})`,
  positive: '#52de97',
  negative: '#f73859',
}

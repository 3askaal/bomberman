export const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://arcade-server.herokuapp.com/'
    : 'http://localhost:1337'

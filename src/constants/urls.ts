export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://skatedice-server.herokuapp.com'
    : 'http://localhost:1337'

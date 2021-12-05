const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'react'),
      'react-dom': path.resolve(__dirname, 'react-dom'),
      'styled-components': path.resolve(__dirname, 'styled-components'),
      'styled-system': path.resolve(__dirname, 'styled-system'),
    },
  },
};

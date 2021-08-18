export default {
  gridSize: 1440,
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  screens: {
    _: 0,
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1440,
  },
  colors: {
    primary: '#333333',
    secondary: '#3f51b5',
    light: '#ffffff',
    'dark-500': '#000000',
    'dark-400': '#0a0a0a',
    red: 'red',
    gray: '#cccccc',
    green: 'green',
  },
  shadows: {
    up: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  },
  gridTemplateColumns: {
    2: 'repeat(2, minmax(0, 1fr))',
    3: 'repeat(3, minmax(0, 1fr))',
    4: 'repeat(4, minmax(0, 1fr))',
  },
  gutter: 20,
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    heading: 'system-ui, sans-serif',
    body: 'system-ui, sans-serif',
  },
  radii: {
    default: '0.5rem',
  },
};

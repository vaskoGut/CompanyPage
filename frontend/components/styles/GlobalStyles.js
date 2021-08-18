import { createGlobalStyle } from '@xstyled/styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  body {
    font-family: body;
    color: primary;
  }

  a,
  a:visited {
    color: secondary;
  }
  a:hover {
    color: dark-400;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: secondary;
    color: light;
  }  

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: heading;
  }

  h1{
    font-size: 40px;
    margin-bottom: 20px;
  }

  img {
    max-width: 100%;
  }

  select::-ms-expand {
    display: none;
  }

  .accessibly-hidden {
    position: absolute;
    left: -999em;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background-color: secondary;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 
      0 0 10px secondary, 
      0 0 5px secondary;
    opacity: 1.0;

    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: secondary;
    border-left-color: secondary;
    border-radius: 50%;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .blur {
    -webkit-filter: blur(5px);
    filter: blur(5px);
    transition: filter 500ms ease-in, -webkit-filter 500ms ease-in;
  }
  
  .blur.lazyloaded {
    -webkit-filter: blur(0);
    filter: blur(0);
  }
  
`;

export default GlobalStyle;

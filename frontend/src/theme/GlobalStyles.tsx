import { createGlobalStyle } from 'styled-components'
import { font } from './font'
import { palette } from './palette'
import { size } from './size'

// import Nexusbold from '../assets/fonts/Nexusbold-Rounded.ttf'

// ----------------------------------------------------------------------

export const theme = {
  font,
  palette,
  size,
}

export const GlobalStyles = createGlobalStyle`
 /* @font-face {
        font-family: 'Nexus bold';
        src: local('Nexus bold'), local('Nexusbold'),
        url() format('truetype');
    } */

  *, ::before, ::after {
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: no-preference) {
    :root {
      scroll-behavior: smooth;
    }
  }

  body, html {
    overscroll-behavior-y: none;
  }

  html {
    -webkit-overflow-scrolling: 'touch';
    -webkit-font-smoothing: 'antialiased';
    background: ${theme.palette.background.canvas.default};
  }

  body {
    margin: 0;
    color: ${theme.palette.text.secondary};
    font-family: ${theme.font.sansSerif};
    font-size: ${theme.size.font.default};
    font-optical-sizing: auto;
    font-weight: 400;
    line-height: 1.4;
    text-rendering: optimizeLegibility;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.font.sansSerif};
    font-size: inherit;
    font-weight: inherit;
  }

  ol, ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
    margin: 0;
  }

  code, kbd, pre, samp {
    font-family: ${theme.font.monospace};
    unicode-bidi: bidi-override;
  }

  img, svg, video, canvas, audio, iframe, embed, object {
    vertical-align: middle;
  }

  button, [role='button'] {
    cursor: pointer;
  }

  button, input, textarea {
    appearance: none;
    background-color: transparent;
    background-image: none;
    border: none;
  }
  
  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    outline: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }

  button, select {
    text-transform: none;
  }

  input, textarea, input::placeholder, textarea::placeholder {
    background: transparent;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
      box-shadow: 0 0 0 100px ${theme.palette.background.canvas.default}cc inset !important;
  }

  input:-webkit-autofill {
      -webkit-text-fill-color: ${theme.palette.text.primary} !important;
  }

  ::placeholder {
    color: ${theme.palette.text.secondary};
  }

  /* ::-webkit-scrollbar {
    height: 6px;
    width: 6px; 
  } */

  /* ::-webkit-scrollbar-track {
    background: transparent;
  } */

  ::-webkit-scrollbar-thumb {
    background-color:  ${theme.palette.scrollbar};
    border-radius: 999px;
  }
  
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`

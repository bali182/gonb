import { css } from '@emotion/react'

export const globalStyles = css`
  @font-face {
    font-family: 'Bravura';
    src: url('font/Bravura.eot');
    src: url('font/Bravura.woff') format('woff'),
      url('font/Bravura.otf') format('opentype');
  }

  #root {
    width: 100vw;
    height: 100vh;
  }
  #modal {
    /* No styling for now */
  }
  #tooltip {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  div,
  span {
    font-family: 'Poppins', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background-color: #ebebeb;
    height: 100vh;
    width: 100vw;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  a:-webkit-any-link {
    text-decoration: none;
  }

  a {
    text-decoration: none !important;
  }

  // Custom scrollbar
  * {
    --sb-track-color: #ffffff20;
    --sb-thumb-color: #ffffff60;
    --sb-size: 8px;
  }

  *::-webkit-scrollbar {
    width: var(--sb-size);
    height: var(--sb-size);
  }

  *::-webkit-scrollbar-track {
    background: var(--sb-track-color);
    border-radius: 4px;
    overflow: hidden;
  }

  *::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 4px;
  }

  @supports not selector(::-webkit-scrollbar) {
    * {
      scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
    }
  }

  /** Alphatab stuff */
  .at-cursor-bar {
    /* Defines the color of the bar background when a bar is played */
    background: transparent;
  }
  .at-selection div {
    /* Defines the color of the selection background */
    background: #00000020;
  }
  .at-cursor-beat {
    /* Defines the beat cursor */
    background: #cb1600bb;
    width: 3px;
  }
  .at-highlight * {
    /* Defines the color of the music symbols when played (svg) */
  }
  .at-surface > div:last-child {
    display: none !important;
  }
`

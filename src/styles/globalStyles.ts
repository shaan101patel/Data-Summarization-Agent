import { createGlobalStyle } from "styled-components";

/**
 * Global baseline styles (reset + typography) using styled-components so that
 * downstream components share the same design tokens.
 */
export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.body};
    background: ${({ theme }) => theme.colors.page};
    color: ${({ theme }) => theme.colors.textPrimary};
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }

  a:hover,
  a:focus-visible {
    text-decoration: underline;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accentSoft};
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

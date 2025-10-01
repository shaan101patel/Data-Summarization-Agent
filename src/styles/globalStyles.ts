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
    font-size: 16px;
    line-height: 1.55;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    font-weight: 500;
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.colors.focus};
    text-decoration: none;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accentSoft};
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }

  .skip-link {
    position: absolute;
    top: ${({ theme }) => theme.spacing(4)};
    left: -999px;
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentContrast};
    padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
    border-radius: ${({ theme }) => theme.radius.md};
    z-index: 999;
    transition: left 0.2s ease;
    text-decoration: none;
    font-weight: 600;
  }

  .skip-link:focus,
  .skip-link:focus-visible {
    left: ${({ theme }) => theme.spacing(4)};
  }
`;

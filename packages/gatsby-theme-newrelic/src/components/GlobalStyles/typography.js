import { css } from '@emotion/react';

export default css`
  @font-face {
    font-family: 'Sohne';
    src: url('https://sohne-font.s3.us-east-2.amazonaws.com/Sohne-Buch.otf')
      format('opentype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'Sohne';
    src: url('https://sohne-font.s3.us-east-2.amazonaws.com/Sohne-Kraftig.otf')
      format('opentype');
    font-weight: 500;
  }
  @font-face {
    font-family: 'Sohne';
    src: url('https://sohne-font.s3.us-east-2.amazonaws.com/Sohne-Halbfett.otf')
      format('opentype');
    font-weight: 600;
  }

  --primary-font-family: Sohne;
  --code-font: 'Menlo', 'Consolas', monospace;

  --paragraph-spacing: 1.25rem;
`;

import { css } from '@emotion/react';

export default css`
  .light-mode {
    --primary-background-color: var(--system-background-app-light);
    --primary-contrast-color: var(--system-text-primary-dark);
    --primary-text-color: var(--system-text-primary-light);
    --primary-hover-color: var(--system-background-selected-low-contrast-light);

    --secondary-background-color: var(--system-background-surface-1-light);
    --secondary-text-color: var(--color-neutrals-600);
    --secondary-text-color-inverted: var(
      --system-text-secondary-inverted-light
    );
    --secondary-text-hover-color: var(--color-neutrals-700);

    --tertiary-background-color: var(--color-neutrals-200);

    --button-background-color: var(--primary-text-color);
    --button-outline-color: var(--color-black);
    --button-text-color: var(--color-white);

    --accent-text-color: var(--color-neutrals-500);
    --link-color: var(--primary-text-color);
    --link-hover-color: var(--color-neutrals-100);
    --border-color: var(--system-border-regular-light);
    --border-hover-color: var(--color-neutrals-500);
    --divider-color: var(--system-background-selected-low-contrast-light);
    --heading-text-color: var(--primary-text-color);

    --callout-caution-background-color: #fce9e935;
    --callout-important-background-color: #fff9cc30;
    --callout-tip-background-color: #d1f7d925;
    --callout-course-background-color: #00b3c310;

    input::placeholder {
      color: var(--primary-text-color);
    }

    *:not(pre) > code,
    var {
      background: var(--color-neutrals-100);
    }
  }

  .dark-mode {
    --primary-background-color: var(--system-background-app-dark);
    --primary-contrast-color: var(--system-text-primary-light);
    --primary-text-color: var(--system-text-primary-dark);
    --primary-hover-color: var(--system-background-surface-1-dark);

    --secondary-background-color: var(--system-background-surface-1-dark);
    --secondary-text-color: var(--color-dark-600);
    --secondary-text-color-inverted: var(--system-text-secondary-inverted-dark);
    --secondary-text-hover-color: var(--color-dark-700);

    --tertiary-background-color: var(--color-dark-100);

    --button-background-color: var(--primary-text-color);
    --button-text-color: var(--color-black);
    --button-outline-color: var(--color-white);

    --accent-text-color: var(--color-dark-600);
    --link-color: var(--primary-text-color);
    --link-hover-color: var(--color-neutrals-400);
    --border-color: var(--system-border-regular-dark);
    --border-hover-color: var(--color-dark-500);
    --divider-color: var(--primary-contrast-color);
    --heading-text-color: var(--primary-text-color);

    --callout-caution-background-color: #1b000020;
    --callout-important-background-color: #14110020;
    --callout-tip-background-color: #02120020;

    input::placeholder {
      color: var(--primary-text-color);
    }

    *:not(pre) > code,
    var {
      background: var(--color-neutrals-400);
    }
  }
`;

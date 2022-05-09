import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../Dropdown';
import Icon from '../Icon';
import { css } from '@emotion/react';

const Filters = ({ onClick, filters = [] }) => {
  return (
    <>
      {filters.map((filter) => (
        <Dropdown.MenuItem
          key={filter.name}
          onClick={() => onClick(filter.name)}
          css={css`
            margin-bottom: 0.15rem;
            ${filter.isSelected &&
            `color: var(--text-color);
        cursor: pointer;
        background: var(--color-neutrals-200);
        border-radius: 0.25rem;

        .dark-mode & {
          background: var(--color-dark-200);
        }`}
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: baseline;
              ${filter.isSelected && ``}
            `}
          >
            <div
              css={css`
                text-transform: uppercase;
                font-size: 0.625rem;
                margin-right: 0.5rem;
              `}
            >
              {filter.name.replace('_', ' ')}
            </div>
            <div
              css={css`
                ${filter.isSelected
                  ? `animation-duration: 0.1s;
                                animation-name: fadein;
                                @keyframes fadein {
                                  from {
                                    opacity: 0;
                                  }
                                  to {
                                    opacity: 1;
                                  }
                                }
                              `
                  : `opacity: 0;`}
              `}
            >
              <Icon size="0.625rem" name="fe-check" />
            </div>
          </div>
        </Dropdown.MenuItem>
      ))}
    </>
  );
};

Filters.propTypes = {
  onClick: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Filters;

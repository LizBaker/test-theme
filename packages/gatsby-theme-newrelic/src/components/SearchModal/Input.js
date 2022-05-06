import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Button from '../Button';
import Icon from '../Icon';
import Spinner from '../Spinner';
import Dropdown from '../Dropdown';

const Input = forwardRef(
  (
    {
      onClear,
      onSubmit,
      onFilter,
      filters,
      value,
      width,
      className,
      style,
      loading,
      onCancel,
      ...props
    },
    ref
  ) => {
    return (
      <div
        width={width}
        className={className}
        style={style}
        css={css`
          --icon-size: 1.5rem;

          position: relative;
          width: 100%;
        `}
      >
        <Icon
          css={css`
            position: absolute;
            left: var(--horizontal-spacing);
            top: 50%;
            transform: translateY(-50%);
          `}
          name="fe-search"
          size="1.5rem"
        />
        <input
          ref={ref}
          value={value}
          {...props}
          type="text"
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Enter':
                return onSubmit?.(value);
              case 'ArrowUp':
              case 'ArrowDown':
                e.preventDefault();
                break;
              default:
              // do nothing
            }
          }}
          css={css`
            width: 100%;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--primary-text-color);
            transition: 0.15s ease-out;
            line-height: 1;
            font-size: 1.25rem;
            font-weight: 500;
            padding: 1rem
              calc(var(--horizontal-spacing) + 0.5rem + var(--icon-size));
            padding-right: 7.5rem;

            &:focus {
              outline: none;
            }

            .dark-mode & {
              background: var(--secondary-background-color);
            }
          `}
        />
        {loading && (
          <Spinner
            inline
            size="1.25rem"
            css={css`
              position: absolute;
              top: 50%;
              right: var(--horizontal-spacing);
              transform: translateY(-50%);
            `}
          />
        )}
        {value && onClear && !loading && (
          <div
            css={css`
              display: flex;
              align-items: center;
              position: absolute;
              right: var(--horizontal-spacing);
              top: 50%;
              transform: translateY(-50%);
            `}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                onClear();
              }}
              css={css`
                color: var(--accent-text-color);
                border: none;
                background: transparent;
                margin: 0;
                padding: 0;
                outline: none;
                margin-right: 1rem;

                &:hover {
                  cursor: pointer;
                }
              `}
              type="button"
            >
              <Icon
                name="fe-x"
                css={css`
                  display: block;
                `}
                size="1.25rem"
              />
            </button>
            {filters && (
              <Dropdown align="right" closeOnClick={false}>
                <Dropdown.Toggle
                  css={css`
                    color: var(--accent-text-color);
                    border: green;
                    background: transparent;
                    margin: 0;
                    padding: 0.5rem;
                    outline: none;
                    margin-right: 1rem;
                    ${filters?.find((filter) => filter.isSelected === true) &&
                    `
                    color: var(--brand-button-primary-accent);
                    `}

                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  chevron={false}
                  variant={Button.VARIANT.PLAIN}
                >
                  <Icon
                    name="fe-filter"
                    css={css`
                      display: block;
                    `}
                    size="1rem"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  css={css`
                    .dark-mode & {
                      background: var(
                        --system-background-selected-low-contrast-dark
                      );
                    }
                  `}
                >
                  {filters.map((filter) => {
                    return (
                      <Dropdown.MenuItem
                        key={filter.name}
                        onClick={() => onFilter(filter.name)}
                        css={css`
                          margin-bottom: 0.15rem;
                          ${filter.isSelected &&
                          `color: var(--text-color);
                            cursor: pointer;
                            background: var(--primary-hover-color)
                            border-radius: 0.25rem;
                          `}
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
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Button
              variant={Button.VARIANT.PLAIN}
              size={Button.SIZE.EXTRA_SMALL}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  focusWithHotKey: PropTypes.string,
  onClear: PropTypes.func,
  onCancel: PropTypes.func,
  onFilter: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.string,
  style: PropTypes.object,
  loading: PropTypes.bool,
};

export default Input;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import AnnouncementBanner from './AnnouncementBanner';
import DarkModeToggle from './DarkModeToggle';
import ExternalLink from './ExternalLink';
import Button from './Button';
import Dropdown from './Dropdown';
import NewRelicLogo from './NewRelicLogo';
import Icon from './Icon';
import GlobalNavLink from './GlobalNavLink';
import SearchInput from './SearchInput';
import useMedia from 'use-media';
import { useLocation } from '@reach/router';
import useQueryParams from '../hooks/useQueryParams';
import useThemeTranslation from '../hooks/useThemeTranslation';
import path from 'path';
import { rgba } from 'polished';
import SearchModal from './SearchModal';
import { useDebounce } from 'react-use';
import useHasMounted from '../hooks/useHasMounted';
import useTessen from '../hooks/useTessen';
import SplitTextButton from './SplitTextButton';
import useInstrumentedHandler from '../hooks/useInstrumentedHandler';

export const NR_SITES = {
  DOCS: 'DOCS',
  DEVELOPER: 'DEVELOPER',
  COMMUNITY: 'COMMUNITY',
  LEARN: 'LEARN',
};

const HEADER_LINKS = new Map();

HEADER_LINKS.set(NR_SITES.DOCS, {
  text: 'Docs',
  href: 'https://docs.newrelic.com/',
})
  .set(NR_SITES.DEVELOPER, {
    text: 'Developer',
    href: 'https://developer.newrelic.com/',
  })
  .set(NR_SITES.COMMUNITY, {
    text: 'Community',
    href: 'https://discuss.newrelic.com/',
  })
  .set(NR_SITES.LEARN, {
    text: 'Learn',
    href: 'https://learn.newrelic.com/',
  });

const createNavList = (listType, activeSite = null) => {
  const navList = [];
  HEADER_LINKS.forEach(({ text, href }) => {
    switch (listType) {
      case 'main':
        navList.push(
          <li key={href}>
            <GlobalNavLink
              href={href}
              activeSite={activeSite && HEADER_LINKS.get(activeSite)}
              instrumentation={{
                component: 'globalHeader',
                layoutElement: 'globalHeader',
              }}
            >
              {text}
            </GlobalNavLink>
          </li>
        );
        break;
      case 'dropdown':
        navList.push(
          <Dropdown.MenuItem key={href} href={href}>
            {text}
          </Dropdown.MenuItem>
        );
        break;
    }
  });
  return navList;
};

// hides searchbar
const CONDENSED_BREAKPOINT = '815px';

// swaps out logo into collapsable nav
const NAV_BREAKPOINT = '770px';

const useSearchQuery = () => {
  const { queryParams, setQueryParam } = useQueryParams();
  const searchQueryParam = queryParams.get('q');
  const [searchTerm, setSearchTerm] = useState(searchQueryParam);
  const hasQParam = queryParams.has('q');
  const tessen = useTessen();

  useDebounce(
    () => {
      if (hasQParam) {
        setQueryParam('q', searchTerm);
        if (searchTerm && searchTerm.length > 2) {
          tessen.track({
            eventName: 'swiftypeSearchInput',
            category: 'GlobalSearch',
            name: 'searchInput',
            layoutElement: 'globalHeader',
            searchTerm,
          });
        }
      }
    },
    400,
    [searchTerm, setQueryParam, hasQParam]
  );

  useEffect(() => {
    setSearchTerm(searchQueryParam);
  }, [searchQueryParam]);

  return [searchTerm, setSearchTerm];
};

const GlobalHeader = ({ className, activeSite, hideSearch = false }) => {
  const hasMounted = useHasMounted();
  const location = useLocation();
  const { queryParams, setQueryParam, deleteQueryParam } = useQueryParams();
  const [searchTerm, setSearchTerm] = useSearchQuery();
  const { t } = useThemeTranslation();

  const {
    allLocale: { nodes: locales },
    site: {
      layout: { mobileBreakpoint },
    },
  } = useStaticQuery(graphql`
    query GlobalHeaderQuery {
      allLocale(sort: { fields: [isDefault, locale], order: [DESC, ASC] }) {
        nodes {
          locale
          localName
          isDefault
        }
      }
      site {
        layout {
          mobileBreakpoint
        }
      }
    }
  `);

  const hideLogoText = useMedia({ maxWidth: '350px' });

  const matchLocalePath = new RegExp(
    `^\\/(${locales.map(({ locale }) => locale).join('|')})`
  );

  const handleLocaleClick = useInstrumentedHandler(null, ({ locale }) => ({
    eventName: 'localeDropDownClick',
    category: 'LocaleDropDown',
    origin: 'gatsbyTheme',
    layoutElement: 'globalHeader',
    locale,
  }));

  return (
    <>
      <SearchModal
        value={searchTerm}
        onChange={(searchTerm) => setSearchTerm(searchTerm)}
        onClose={() => {
          deleteQueryParam('q');
        }}
        isOpen={hasMounted && queryParams.has('q')}
      />
      <AnnouncementBanner />
      <div
        data-swiftype-index={false}
        className={className}
        css={css`
          background-color: var(--system-text-primary-light);
          box-shadow: var(--shadow-2);
          position: sticky;
          top: 0;
          z-index: 80;
        `}
      >
        <div
          css={css`
            height: var(--global-header-height);
            display: flex;
            justify-content: space-between;
            max-width: var(--site-max-width);
            margin: 0 auto;
            padding: 0 var(--site-content-padding);
          `}
        >
          <nav
            css={css`
              display: flex;
              align-items: center;
              height: 100%;
              overflow: hidden;
              position: relative;

              @media screen and (max-width: 1235px) {
                &::after {
                  content: '';
                  position: absolute;
                  right: 0;
                  height: 100%;
                  width: 2rem;
                  pointer-events: none;
                  background: linear-gradient(
                    to right,
                    ${rgba('#f4f5f5', 0)},
                    var(--system-text-primary-light)
                  );
                }
              }

              @media screen and (max-width: ${NAV_BREAKPOINT}) {
                overflow: visible;

                &::after {
                  background: none !important;
                  width: 0 !important;
                }
              }
            `}
          >
            <ExternalLink
              href="https://newrelic.com/"
              css={css`
                display: flex;
                align-items: center;
                margin-right: 1rem;

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: none;
                }
              `}
              instrumentation={{
                component: 'globalHeaderLogo',
                layoutElement: 'globalHeader',
              }}
            >
              <NewRelicLogo
                size="104px"
                css={css`
                  .header-logo {
                    fill: var(--system-text-primary-dark);
                  }
                `}
              />
            </ExternalLink>

            <Dropdown
              css={css`
                display: none;

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: block;
                }
              `}
            >
              <Dropdown.Toggle
                size={Button.SIZE.EXTRA_SMALL}
                variant={Button.VARIANT.LINK}
                chevron={false}
                css={css`
                  padding-left: 0;
                  padding-right: 0;
                `}
              >
                <NewRelicLogo
                  size={hideLogoText ? '24px' : '104px'}
                  css={css`
                    .header-logo {
                      fill: var(--system-text-primary-dark);
                    }
                  `}
                  omitText={hideLogoText}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {createNavList('dropdown', activeSite)}
              </Dropdown.Menu>
            </Dropdown>

            <ul
              css={css`
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                list-style-type: none;
                white-space: nowrap;
                overflow-x: auto;
                position: relative;
                -webkit-overflow-scrolling: touch;
                -ms-overflow-style: -ms-autohiding-scrollbar;

                > li {
                  margin: 0;
                  flex: 0 0 auto;
                }

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: none;
                }
              `}
            >
              {createNavList('main', activeSite)}
            </ul>
          </nav>

          <ul
            css={css`
              margin: 0;
              margin-left: 1rem;
              padding: 0;
              display: flex;
              list-style-type: none;
              align-items: center;
              flex: 1;

              > li {
                transition: all 0.2s ease-out;
                color: var(--secondary-text-color);

                &:not(:first-of-type) {
                  margin-left: 0.5rem;
                }
              }

              @media screen and (max-width: ${CONDENSED_BREAKPOINT}) {
                flex: unset;
              }
            `}
          >
            <li
              css={css`
                flex: 1;
                margin: 0rem 1rem;

                @media screen and (max-width: ${CONDENSED_BREAKPOINT}) {
                  flex: unset;
                }
              `}
            >
              {!hideSearch && (
                <>
                  <SearchInput
                    placeholder={t('searchInput.placeholder')}
                    size={SearchInput.SIZE.MEDIUM}
                    focusWithHotKey="/"
                    css={css`
                      --icon-size: 1.5rem;
                      min-width: 150px;
                      max-width: 350px;

                      svg {
                        width: 1.5rem;
                        height: 1.5rem;
                      }

                      input {
                        border: none;
                        height: 40px;
                      }

                      .search-hotkey {
                        border-radius: 0.125rem;
                        font-size: 0.875rem;
                        padding: 0.125rem 0.375rem;
                      }

                      @media screen and (max-width: ${CONDENSED_BREAKPOINT}) {
                        display: none;
                      }
                    `}
                    onFocus={() => {
                      setQueryParam('q', '');
                    }}
                  />
                </>
              )}
            </li>
            <li
              css={css`
                display: flex;
                flex-direction: row;
              `}
            >
              {locales.length > 1 && (
                <Dropdown align="right">
                  <Dropdown.Toggle
                    size={Button.SIZE.EXTRA_SMALL}
                    variant={Button.VARIANT.LINK}
                    chevron={false}
                    css={css`
                      margin: 0;
                      height: 72px;
                      border-radius: 0px;
                      font-size: 0.75rem;
                      color: var(--system-text-primary-dark);
                      background: transparent;
                    `}
                  >
                    <Icon name="nr-i18n" size="20px" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {locales.map(({ isDefault, locale, localName }) => (
                      <Dropdown.MenuItem
                        as={Link}
                        key={locale}
                        href={path.join(
                          isDefault ? '' : `/${locale}`,
                          location.pathname.replace(matchLocalePath, '')
                        )}
                        onClick={() => handleLocaleClick({ locale })}
                      >
                        {localName}
                      </Dropdown.MenuItem>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <DarkModeToggle
                css={[
                  css`
                    font-size: 0.75rem;
                    @media screen and (max-width: 450px) {
                      margin: 0;
                    }
                    color: var(--system-text-primary-dark);
                  `,
                ]}
                size="27px"
              />
            </li>

            <li
              css={css`
                display: flex;
                align-items: right;
                flex-direction: row;
              `}
            >
              <Button
                as={ExternalLink}
                size={Button.SIZE.SMALL}
                variant={Button.VARIANT.LINK}
                href="https://one.newrelic.com"
                css={css`
                  white-space: nowrap;
                  span {
                    color: var(--system-text-primary-dark);
                  }

                  @media screen and (max-width: ${mobileBreakpoint}) {
                    display: none;
                  }
                `}
                instrumentation={{
                  component: 'headerLogInButton',
                  layoutElement: 'globalHeader',
                }}
              >
                <span>{t('button.login')}</span>
              </Button>
              <SplitTextButton
                css={css`
                  span {
                    color: var(--brand-button-primary-accent);
                  }
                `}
              />
            </li>
            <li
              css={css`
                display: flex;
              `}
            />
          </ul>
        </div>
      </div>
    </>
  );
};

GlobalHeader.propTypes = {
  className: PropTypes.string,
  activeSite: PropTypes.oneOf(Object.values(NR_SITES)),
  hideSearch: PropTypes.bool,
};

export default GlobalHeader;

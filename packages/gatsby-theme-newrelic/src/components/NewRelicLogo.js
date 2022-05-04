import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// TODO: doublecheck this color: light - #1D252C && dark - #F9FAFA  -- CM
const Character = styled.path`
  fill: var(--heading-text-color);
`;

const NewRelicLogo = ({ className, size, omitText }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${omitText ? '55' : '179'} 30`}
    className={className}
    css={css`
      fill: none;
      width: ${size || (omitText ? '18px' : '79px')};
    `}
  >
    {!omitText && (
      <g clip-path="url(#clip0_3277_23032)">
        <Character
          className="logo-text"
          d="M40.104 7.57598H43.7406L44.0649 9.14005H44.223C44.223 9.14005 45.642 7.25391 48.6502 7.25391C52.2868 7.25391 54.9747 9.92309 54.9747 14.0074V23.5931H51.0219V14.3335C51.0219 12.2923 49.6029 10.8792 47.5434 10.8792C45.4839 10.8792 44.0649 12.2883 44.0649 14.3335V23.5931H40.1121L40.104 7.57598Z"
        />
        <Character
          className="logo-text"
          d="M73.1498 18.8823C72.8336 20.1384 70.7781 23.9147 65.7185 23.9147C60.9731 23.9147 57.4946 20.4605 57.4946 15.5931C57.4946 10.7258 60.9731 7.26953 65.7185 7.26953C70.1457 7.26953 73.6241 10.7238 73.6241 15.2791C73.6302 15.8067 73.5771 16.3333 73.466 16.8492H61.4474C61.7657 19.0393 63.5049 20.6134 65.7185 20.6134C67.6159 20.6134 68.7226 19.5144 69.0389 18.8863L73.1498 18.8823ZM69.6713 14.172C69.3551 12.1308 67.9321 10.5607 65.7185 10.5607C63.3468 10.5607 61.9238 12.1308 61.4474 14.172H69.6713Z"
        />
        <Character
          className="logo-text"
          d="M74.4243 7.57422H78.5271L81.2231 18.0959H81.4502L84.1381 7.57422H88.1598L90.8478 18.0959H91.0748L93.7627 7.57422H97.8736L93.7627 23.5913H88.9504L86.2625 13.2286H86.0273L83.3475 23.5913H78.5271L74.4243 7.57422Z"
        />
        <Character
          className="logo-text"
          d="M105.776 7.57422H109.098L109.414 8.98329H109.573C109.904 8.54636 110.332 8.19169 110.825 7.94718C111.317 7.70267 111.86 7.575 112.411 7.57422H115.167V11.3525H112.735C110.677 11.3525 109.729 12.2946 109.729 14.3357V23.5954H105.776V7.57422Z"
        />
        <Character
          className="logo-text"
          d="M131.345 18.8823C131.029 20.1384 128.973 23.9147 123.914 23.9147C119.168 23.9147 115.69 20.4604 115.69 15.5931C115.69 10.7258 119.168 7.26953 123.914 7.26953C128.341 7.26953 131.819 10.7238 131.819 15.2791C131.825 15.8067 131.772 16.3333 131.661 16.8492H119.643C119.961 19.0474 121.7 20.6175 123.914 20.6175C125.811 20.6175 126.918 19.5184 127.234 18.8903L131.345 18.8823ZM127.867 14.172C127.55 12.1308 126.127 10.5607 123.914 10.5607C121.542 10.5607 120.119 12.1308 119.643 14.172H127.867Z"
        />
        <Character
          className="logo-text"
          d="M142.256 1.60938H146.209V5.09984H142.256V1.60938ZM142.256 7.57579H146.209V23.5929H142.256V7.57579Z"
        />
        <Character
          className="logo-text"
          d="M164.71 17.6264C164.236 20.1386 162.18 23.9069 157.121 23.9069C152.375 23.9069 148.897 20.4526 148.897 15.5853C148.897 10.718 152.375 7.26172 157.121 7.26172C162.189 7.26172 164.236 11.032 164.71 13.3871H160.757C160.441 12.4431 159.493 10.875 157.121 10.875C154.749 10.875 152.85 12.7591 152.85 15.5853C152.85 18.4115 154.747 20.2956 157.121 20.2956C159.495 20.2956 160.441 18.7255 160.757 17.6264H164.71Z"
        />
        <Character
          className="logo-text"
          d="M132.424 1.61133V5.09978H134.668V23.5928H138.621V1.61133H132.424Z"
        />
        <Character
          className="logo-text"
          d="M165.336 22.1028C165.342 21.7518 165.452 21.4104 165.653 21.1215C165.853 20.8325 166.136 20.6089 166.464 20.4787C166.792 20.3484 167.152 20.3174 167.498 20.3896C167.844 20.4617 168.161 20.6337 168.409 20.884C168.656 21.1343 168.824 21.4517 168.891 21.7964C168.958 22.1412 168.921 22.4978 168.784 22.8216C168.647 23.1453 168.417 23.4218 168.123 23.6162C167.829 23.8107 167.483 23.9145 167.13 23.9145C166.89 23.9193 166.652 23.8755 166.43 23.7858C166.208 23.6961 166.007 23.5623 165.839 23.3927C165.671 23.2231 165.54 23.0212 165.454 22.7994C165.367 22.5776 165.327 22.3406 165.336 22.1028V22.1028ZM168.644 22.1028C168.639 21.806 168.546 21.5173 168.376 21.2728C168.207 21.0283 167.968 20.8391 167.691 20.7289C167.413 20.6187 167.109 20.5924 166.816 20.6534C166.524 20.7144 166.256 20.8598 166.046 21.0715C165.837 21.2832 165.695 21.5517 165.639 21.8433C165.582 22.1348 165.614 22.4363 165.73 22.71C165.846 22.9837 166.04 23.2173 166.289 23.3815C166.538 23.5457 166.831 23.633 167.13 23.6327C167.332 23.6375 167.533 23.6011 167.721 23.5256C167.909 23.4501 168.079 23.3371 168.221 23.1937C168.363 23.0503 168.473 22.8795 168.546 22.6919C168.619 22.5042 168.652 22.3037 168.644 22.1028ZM166.414 21.1487H167.225C167.312 21.1426 167.399 21.1544 167.482 21.1831C167.564 21.2119 167.639 21.2571 167.703 21.3159C167.767 21.3748 167.819 21.446 167.854 21.5253C167.889 21.6045 167.907 21.6901 167.908 21.7767C167.908 21.9369 167.844 22.0905 167.73 22.2037C167.616 22.317 167.461 22.3806 167.3 22.3806L167.957 23.0328H167.602L166.945 22.3806H166.702V23.0308H166.424L166.414 21.1487ZM167.225 22.1028C167.503 22.1028 167.63 21.976 167.63 21.7767C167.63 21.7262 167.619 21.6764 167.597 21.6305C167.576 21.5846 167.545 21.5436 167.507 21.5104C167.469 21.4771 167.424 21.4523 167.375 21.4374C167.327 21.4226 167.275 21.4182 167.225 21.4245H166.702V22.1028H167.225Z"
        />
      </g>
    )}
    <path
      d="M23.2043 11.0778V20.9232L14.6196 25.8469V32.0005L28.5741 24.001V8L23.2043 11.0778Z"
      fill="#00AC69"
    />
    <path
      d="M14.6209 6.15563L23.2056 11.0773L28.5754 7.9995L14.6209 0L0.666504 7.9995L6.03422 11.0773L14.6209 6.15563Z"
      fill="#1CE783"
    />
    <Character
      className="logo-text"
      d="M9.25323 19.0793V28.9247L14.6209 32.0005V16.0015L0.666504 8V14.1556L9.25323 19.0793Z"
    />
  </svg>
);

NewRelicLogo.propTypes = {
  className: PropTypes.string,
  omitText: PropTypes.bool,
  size: PropTypes.string,
};

NewRelicLogo.defaultProps = {
  omitText: false,
};

export default NewRelicLogo;

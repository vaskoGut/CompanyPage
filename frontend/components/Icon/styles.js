import styled, { css } from '@xstyled/styled-components';

const StyledIcon = styled.svgBox`
  flex: none;
  transition: all 0.25s;

  &:hover {
    fill: ${(props) => (props.hover ? props.hover : '')};
    ${({ animation }) => {
      switch (animation) {
        case 'down':
          return `margin-bottom: 10px;`;
          break;
        case 'up':
          return `margin-top: 10px;`;
          break;
        case 'left':
          return `margin-left: 10px;`;
          break;
        case 'right':
          return `marign-right: 10px;`;
          break;
      }
    }}
  }

  ${(props) =>
    props.ml &&
    css`
      margin-left: ${props.ml};
    `}

  ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr};
    `}

  ${(props) =>
    props.rotate
      ? css`
          transform: rotate(${props.rotate}deg);
        `
      : css``}
`;

export default StyledIcon;

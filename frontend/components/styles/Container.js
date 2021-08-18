import styled, { th, css, down } from '@xstyled/styled-components';

const Container = styled.divBox`
  width: 100%;
  margin: 0 auto;
  max-width: ${th('gridSize', 1440)}px;
  ${down(
    'md',
    css`
      ${(props) =>
        !props.noPadding &&
        css`
          padding-left: ${th('gutter', 20)}px;
          padding-right: ${th('gutter', 20)}px;
        `}
    `
  )}
`;

export default Container;

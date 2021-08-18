import styled from '@xstyled/styled-components';

const Button = styled.buttonBox`
  height: 40px;
  padding: 0 15px;
  background-color: secondary;
  color: light;
  font-weight: bold;
  border: 0;
  outline: 0;
  border-radius: default;
  cursor: pointer;
  &:hover {
    background-color: dark-400;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`;

export default Button;

import styled, { css } from '@xstyled/styled-components';
import { px2rem } from '../../utils';

const GFWrapper = styled.divBox`
  overflow: hidden;
  .form-fields {
    display: flex;
    flex-wrap: wrap;
    margin: ${px2rem(0, -10)};

    > .form-field {
      margin-bottom: ${px2rem(18)};
      padding: ${px2rem(0, 10)};
      &:not(.custom-width) {
        width: 100%;
      }
    }
    &.hasPages {
      .page {
        width: 100%;
        padding: ${px2rem(0, 10)};
        &:not(.active) {
          display: none;
        }
      }
    }
  }
  .error-message {
    font-size: ${px2rem(13)};
    color: red;
    display: inline-block;
    margin-top: ${px2rem(7)};
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${px2rem(8)};
  font-weight: bold;
`;

const Input = styled.input`
  padding: ${px2rem(12, 16)};
  width: 100%;
  appearance: none;
  border: 1px solid gray;
  border-radius: 0;
  &::placeholder {
    color: gray;
  }
`;

const Textarea = styled.textarea`
  padding: ${px2rem(12, 16)};
  border-radius: 0;
  border: 1px solid gray;
  width: 100%;
  -webkit-appearance: none;
`;

const checkbox = css`
  input[type='checkbox'] {
    opacity: 0;
    position: absolute;
    top: 0;
    width: 0;
    height: 0;
    + label {
      position: relative;
      display: block;
      margin: ${px2rem(5, 0, 10)};
      padding-left: ${px2rem(20)};
      font-size: ${px2rem(15)};

      &:hover {
        cursor: pointer;
      }

      &:before,
      &:after {
        position: absolute;
        content: '';
        display: inline-block;
        transition: all 0.15s;
      }
      &:after {
        content: none;
        height: 5px;
        width: 9px;
        border-left: 1px solid ${(props) => props.theme.colors.white};
        border-bottom: 1px solid ${(props) => props.theme.colors.white};
        transform: rotate(-45deg);
        left: 3px;
        top: 7px;
      }
      &:before {
        height: ${px2rem(15)};
        width: ${px2rem(15)};
        border: 1px solid gray;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        left: 0px;
        top: 3px;
      }
    }
    &:checked {
      + label {
        &:after {
          content: '';
        }
        &:before {
          background: green;
        }
      }
    }
    &:focus {
      + label {
        &:before {
          outline: rgb(59, 153, 252) auto 5px;
        }
      }
    }
  }
`;

const Checkbox = styled.fieldset`
  border: none;
  padding: 0;

  .checkbox {
    position: relative;
    ${checkbox};
  }
`;

const Radiogroup = styled.divBox`
  border: none;
  padding: 0;
  .radio {
    position: relative;
    input[type='radio'] {
      left: 0;
      opacity: 0;
      position: absolute;
      top: 0;
      height: ${px2rem(12)};
      width: ${px2rem(12)};
      width: 0;
      height: 0;
      opacity: 0;
      + label {
        position: relative;
        display: inline-block;
        margin: ${px2rem(0, 0, 10)};
        padding-left: ${px2rem(20)};
        font-size: ${px2rem(15)};

        &:hover {
          cursor: pointer;
        }

        &:before,
        &:after {
          position: absolute;
          content: '';
          display: inline-block;
          transition: all 0.15s;
        }

        &:before {
          height: ${px2rem(13)};
          width: ${px2rem(13)};
          border: 2px solid gray;
          border-radius: 100%;
          left: 0px;
          top: 50%;
          transform: translateY(-50%);
        }

        &:after {
          content: none;
          height: 5px;
          width: 5px;
          border-radius: 100%;
          background: green;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      &:checked {
        + label {
          &:after {
            content: '';
          }
          &:before {
            border-color: green;
          }
        }
      }
      &:focus {
        + label {
          &:before {
            outline: rgb(59, 153, 252) auto 5px;
          }
        }
      }
    }
  }
`;

const FileWrapper = styled.divBox`
  button {
    margin-right: ${px2rem(10)};
    padding: ${px2rem(10, 12)};
  }
  span {
    font-size: ${px2rem(14)};
  }
`;

const Consent = styled.divBox`
  &.checkboxes {
    position: relative;
    ${checkbox};
  }
  label {
    font-size: ${px2rem(14)};
    line-height: ${px2rem(18)};
    a {
      color: green;
      text-decoration: underline;
    }
  }
`;

export { FormLabel, Input, Textarea, Checkbox, Radiogroup, GFWrapper, FileWrapper, Consent };

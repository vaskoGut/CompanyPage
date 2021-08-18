import PropTypes from 'prop-types';
import GravityForm from 'react-gravity-form';
import config from '@/theme.config';
import {
  FormLabel as Label,
  Input,
  Textarea,
  Checkbox,
  Radiogroup,
  GFWrapper,
  FileWrapper,
  Consent,
  Button,
} from '../styles';

const GravityForms = ({ formID, title, populatedFields, onChange }) => (
  <GravityForm
    backendUrl={`${config.wordpress.backend}/wp-json/glamrock/v1/gf/forms`}
    formID={formID}
    title={title}
    onChange={onChange}
    populatedFields={populatedFields}
    styledComponents={{
      Label,
      Input,
      Textarea,
      Checkbox,
      Radiogroup,
      GFWrapper,
      FileWrapper,
      Consent,
      Button,
    }}
  />
);

GravityForms.propTypes = {
  formID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string,
  populatedFields: PropTypes.object,
  onChange: PropTypes.func,
};

GravityForms.defaultProps = {
  title: null,
  populatedFields: null,
  onChange: null,
};

export default GravityForms;

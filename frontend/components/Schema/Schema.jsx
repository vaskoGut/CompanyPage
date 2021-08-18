import React from 'react';
import PropTypes from 'prop-types';
import { JSONLD, Generic } from 'react-structured-data';

const Schema = ({ jsonLdType, schema }) => {
  const { title, content, featuredImage } = schema || {};

  const type = jsonLdType?.toLowerCase();

  const data = {
    name: title,
    image: featuredImage?.sourceUrl,
    text: content,
  };

  return (
    <JSONLD>
      <Generic type={type} jsonldtype={jsonLdType} schema={data} />
    </JSONLD>
  );
};

Schema.propTypes = {
  jsonLdType: PropTypes.string.isRequired,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default Schema;

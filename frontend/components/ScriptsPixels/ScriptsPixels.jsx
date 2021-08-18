import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const ScriptsPixels = ({ cookies, header, footer, scriptsPixels }) => (
  <>
    {header && (
      <>
        {scriptsPixels?.scriptBodyAnalytical && parse(scriptsPixels.scriptBodyAnalytical)}
        {cookies?.functional &&
          scriptsPixels?.scriptBodyFunctional &&
          parse(scriptsPixels.scriptBodyFunctional)}
        {cookies?.tracking &&
          scriptsPixels?.scriptBodyTracking &&
          parse(scriptsPixels.scriptBodyTracking)}
      </>
    )}
    {footer && (
      <>
        {scriptsPixels?.scriptFooterAnalytical && parse(scriptsPixels.scriptFooterAnalytical)}
        {cookies?.functional &&
          scriptsPixels?.scriptFooterFunctional &&
          parse(scriptsPixels.scriptFooterFunctional)}
        {cookies?.tracking &&
          scriptsPixels?.scriptFooterTracking &&
          parse(scriptsPixels.scriptFooterTracking)}
      </>
    )}
  </>
);

ScriptsPixels.propTypes = {
  cookies: PropTypes.object,
  header: PropTypes.bool,
  footer: PropTypes.bool,
  scriptsPixels: PropTypes.object,
};

ScriptsPixels.defaultProps = {
  cookies: {},
  header: false,
  footer: false,
  scriptsPixels: {},
};

export default ScriptsPixels;

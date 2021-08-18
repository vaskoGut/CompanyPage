import PropTypes from 'prop-types';
import uuid from 'uuid';
import LatestPosts from './FlexibleContent/LatestPosts';
import TestLayout from './FlexibleContent/Testlayout/';
const FlexibleContent = ({ layouts, type }) => (
  <>
    {layouts?.map((layout) => {
      switch (layout.fieldGroupName) {
        case `${type}_Flexcontent_Flexiblecontent_Latestlayout`:
          return <LatestPosts key={uuid()} />;
        case `${type}_Flexcontent_Flexiblecontent_Testlayout`:
          return <TestLayout testtitle={layout.testtitle} />;
        default:
          console.warn('missing layout for', layout.fieldGroupName);
          return null;
      }
    })}
  </>
);

FlexibleContent.propTypes = {
  layouts: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FlexibleContent;

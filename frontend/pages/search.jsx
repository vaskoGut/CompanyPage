import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import config from '@/theme.config';
import { SearchPage } from '@/components/Templates';

const Search = ({ page }) => <SearchPage data={page} />;

export async function getServerSideProps({ query }) {
  // initial page data
  const data = {
    title: {
      rendered: 'Search page',
    },
    seo: {
      title: 'Search page',
    },
    query,
  };
  // get search query
  const { s = '' } = query || {};

  try {
    await fetch(`${config.wordpress.routes.search}?s=${s}`)
      .then((resp) => resp.json())
      .then((response) => (data.items = response || false));
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return { props: { page: data } };
}

Search.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

Search.defaultProps = {
  data: false,
};

export default Search;

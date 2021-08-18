import { object, bool, oneOfType } from 'prop-types';

// graphql
import { initializeGraphQL, getPageData } from '@/lib/graphql-client';
import getPost from '@/lib/api';

// components
import { DefaultPage } from '@/components/Templates';
import Error from './_error';

const Index = ({ page, error }) => {
  if (error || !page) {
    return <Error statusCode={error || 404} />;
  }

  return <DefaultPage data={page} />;
};

export async function getStaticProps({ params, previewData }) {
  const client = initializeGraphQL();

  const { data, loading, error } = await getPost('frontPage', {}, previewData);

  // need to have useQuery data render server side
  await getPageData(client);

  return {
    props: {
      initialGraphQLState: client?.cache?.getInitialState() || null,
      page: data?.page || null,
      error: error ?? false,
      preview: !!previewData,
    },
    revalidate: 1,
  };
}

Index.propTypes = {
  error: bool,
  page: oneOfType([object, bool]).isRequired,
};

Index.defaultProps = {
  error: false,
};

export default Index;

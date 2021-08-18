import { object, bool, oneOfType } from 'prop-types';
import { useRouter } from 'next/router';

// graphql
import { GetPostBySlug, GetPostsPaths } from '@/lib/queries';
import getPost from '@/lib/api';

// components
import { DefaultPost } from '@/components/Templates';
import { initializeGraphQL, graphQLRequest, getPageData } from '@/lib/graphql-client';
import Error from '@/_error';

const Post = ({ error, page, ...props }) => {
  const router = useRouter();
  if (!router.isFallback && !page) {
    return <Error statusCode={error || 404} />;
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <DefaultPost data={page} />;
};

export async function getStaticProps({ params, previewData }) {
  const { slug, id } = params || {};

  const client = initializeGraphQL();

  const { data, loading, error } = await getPost(
    'post',
    {
      slug: `/blog/${slug}`,
    },
    previewData
  );

  // allow the page to return a 404 status and page
  if (!data?.post) {
    return {
      notFound: true,
    };
  }

  // need to have useQuery data render server side
  await getPageData(client);

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
      page: data?.post || false,
      loading: loading ?? false,
      error: error ?? false,
      preview: !!previewData,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const client = initializeGraphQL();
  const { data } = await graphQLRequest(client, GetPostsPaths);

  const paths = data?.posts?.edges?.map((page) => ({
    params: {
      slug: page.node.slug,
    },
  }));

  return {
    paths: paths || [],
    fallback: true,
  };
}

Post.propTypes = {
  error: bool,
  page: oneOfType([object, bool]).isRequired,
};

Post.defaultProps = {
  error: false,
};

export default Post;

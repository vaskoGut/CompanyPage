import { object, bool, oneOfType } from 'prop-types';
import { useRouter } from 'next/router';

// graphql
import { initializeGraphQL, graphQLRequest, getPageData } from '@/lib/graphql-client';
import { GetPageBySlug, GetPagesPaths } from '@/lib/queries';
import getPost from '@/lib/api';

// components
import { DefaultPage, BlogPage } from '@/components/Templates';
import ErrorPage from './_error';

const Page = ({ page, error }) => {
  const router = useRouter();
  if (!router.isFallback && !page) {
    return <ErrorPage statusCode={error || 404} />;
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const getPageBasedOnTemplate = (template) => {
    switch (template) {
      case 'blog':
        return <BlogPage data={page} />;
      default:
        return <DefaultPage data={page} />;
    }
  };

  return <>{getPageBasedOnTemplate(page.pageTemplate)}</>;
};

export async function getStaticProps({ params, previewData }) {
  const { slug: slugs, id } = params || {};
  const slug = slugs?.join('/');
  const client = initializeGraphQL();

  const { data, loading, error } = await getPost(
    'page',
    {
      slug,
    },
    previewData
  );

  // allow the page to return a 404 status and page
  if (!data?.page) {
    return {
      notFound: true,
    };
  }

  // need to have useQuery data render server side
  await getPageData(client, data?.page?.pageTemplate);

  return {
    props: {
      initialGraphQLState: client.cache.getInitialState(),
      page: data?.page ?? false,
      loading: loading ?? false,
      error: error ?? false,
      preview: !!previewData,
    },
    revalidate: 1,
  };
}

/**
 * Create a list of paths that have to be rendered to HTML at build time
 */
export async function getStaticPaths() {
  const client = initializeGraphQL();
  const { data } = await graphQLRequest(client, GetPagesPaths);

  const paths = data?.pages?.edges?.map((page) => {
    // check if nested page
    const parentSlug = page?.node?.parent?.node?.slug;
    const slugs = [page.node.slug];
    if (parentSlug) {
      // add parent slug to the array of slugs to make nested page work properly
      slugs.unshift(parentSlug);
    }

    return {
      params: { slug: slugs },
    };
  });

  return {
    paths: paths || [],
    fallback: true,
  };
}

Page.propTypes = {
  error: bool,
  page: oneOfType([object, bool]),
};

Page.defaultProps = {
  error: false,
  page: false,
};

export default Page;

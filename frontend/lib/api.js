// graphql
import { initializeGraphQL, graphQLRequest } from '@/lib/graphql-client';
import { GetFrontPage, GetPageBySlug, GetPostBySlug } from '@/lib/queries';

const getPost = async (postType, variables, preview = false) => {
  const client = initializeGraphQL();

  /**
   * Get post query
   * @param {string} type
   */
  function getQueryByPostType(type) {
    switch (type) {
      case 'post':
        return GetPostBySlug;
      case 'frontPage':
        return GetFrontPage; // home page query
      default:
        return GetPageBySlug;
    }
  }

  /**
   * Destruction revision post based on post type
   * @param {string} type
   * @param {object} data
   */
  function destructPreviewObject(type, data) {
    if (!!data[type]?.revisions?.nodes?.length > 0) {
      const {
        [type]: { revisions: { nodes: [revision] = [] } = {} },
      } = data || {};
      return revision;
    }
    return false;
  }

  // get post
  const { slug } = variables || {};
  const { data, loading, error } = await graphQLRequest(client, getQueryByPostType(postType), {
    variables: {
      ...variables,
      id: !!preview && slug ? +slug : undefined,
      revisions: !!preview && true, // include revisions if preview mode
    },
    token: preview?.token,
  });

  // if home page query -> return it's first node
  if (postType === 'frontPage' && data) {
    data.page = data?.page?.nodes?.[0];
  }

  // if preview mode
  if (!!preview && data) {
    const type = postType === 'frontPage' ? 'page' : postType;
    const revision = destructPreviewObject(type, data);
    if (revision) data[type] = revision;
  }

  return { data, loading, error };
};

export default getPost;

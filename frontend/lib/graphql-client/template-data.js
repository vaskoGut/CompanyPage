/**
 * Needed to peoper work of useQuery hook
 * We pre-fetch all graphql queries here to render them server side
 *
 */
import { GetMainNav, BlogQuery } from '@/lib/queries';

import { PER_PAGE } from '@/constants';
import graphQLRequest from './request';
/**
 *
 * @param {object} client - graphql client
 * @param {string} pageTamplate - page template name
 */
const getPageData = async (client, pageTamplate) => {
  await graphQLRequest(client, GetMainNav);

  // pre fetch blog query to make useQuery work server side
  if (pageTamplate === 'blog') {
    await graphQLRequest(client, BlogQuery, {
      variables: {
        where: { offsetPagination: { offset: 0, size: PER_PAGE } },
      },
    });
  }
};

export default getPageData;

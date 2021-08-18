import { useQuery } from 'graphql-hooks';
import { BlogQuery } from '@/lib/queries';
import { x } from '@xstyled/styled-components';
import Link from '@/components/Link';

// constants
import { PER_PAGE } from '@/constants';

const Blog = () => {
  const {
    data: {
      posts: { nodes: posts, pageInfo: { offsetPagination: { postsFound } = {} } = {} } = {},
    } = {},
    refetch,
  } = useQuery(BlogQuery, {
    variables: {
      where: { offsetPagination: { offset: 0, size: PER_PAGE } },
    },
  });

  const totalPages = Math.ceil(postsFound / PER_PAGE);

  /**
   * Load/Filter posts
   */
  function loadMore(variables) {
    return refetch({
      variables,
      offset: posts.length,
      // here magic happens
      // it updates previous results with new ones
      // and we don't need to use any state
      // updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, fetchMoreResult);
      },
    });
  }

  /**
   * Filter posts by meta_query field
   */
  function filterPosts(isChecked) {
    loadMore(
      !isChecked
        ? { after: '' }
        : {
            where: {
              metaQuery: { metaArray: [{ key: 'show_in_rest', type: 'BINARY', value: '1' }] },
            },
          }
    );
  }

  /**
   * Navigate through pages
   */
  function goToPage(page) {
    loadMore({
      where: {
        offsetPagination: { offset: (page - 1) * PER_PAGE, size: PER_PAGE },
      },
    });
  }

  // generate navigations
  const pagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(
      <li key={`page-${i}`}>
        <button type="button" onClick={() => goToPage(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <x.div>
      <x.div>
        <x.h2>Filter by meta query field:</x.h2>
        <x.input
          type="checkbox"
          name="load-rest"
          id="load-rest"
          onChange={(e) => filterPosts(e.target.checked)}
        />
        <label htmlFor="load-rest">Load meta query posts</label>
        {posts && !!posts.length > 0 && (
          <x.ul p={0} mx={0} mt={10} mb={0} listStyleType="none">
            {posts.map((item) => (
              <li key={item.id}>
                <Link uri={item.uri} url={item.url}>
                  {item.title}
                </Link>
              </li>
            ))}
          </x.ul>
        )}
        {/* {hasNextPage && <button onClick={() => loadMore({ after: cursor })}>Go to next page</button>} */}
        {totalPages && totalPages > 0 && <x.ul listStyleType="none">{pagesArray}</x.ul>}
      </x.div>
    </x.div>
  );
};

export default Blog;

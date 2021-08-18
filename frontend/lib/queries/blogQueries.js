const BlogQuery = `
  query($where: RootQueryToPostConnectionWhereArgs) {
    posts(where: $where) {
      nodes {
        id
        title
        uri
        __typename
      }
      pageInfo {
        endCursor
        offsetPagination {
          postsFound: total
        }
      }
    }
  }
`;

export default BlogQuery;

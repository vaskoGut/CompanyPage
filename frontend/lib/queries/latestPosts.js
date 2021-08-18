const GetLatestPosts = `
  {
    posts(last: 3) {
      edges {
        node {
          title
        }
      }
    }
  }
`;

export default GetLatestPosts;

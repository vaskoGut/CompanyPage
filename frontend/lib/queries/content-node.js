/**
 * DON"T MODIFY THIS QUERY
 * We use it only to check if post exists in a database and get it's link and id
 * (used for the post preview)
 */
const GetContentNode = `
  query GetPageById($id: ID!) {
    page: contentNode(idType: DATABASE_ID, id: $id) {
      uri
      id: databaseId
    }
  }
`;
export default GetContentNode;

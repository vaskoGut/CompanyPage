const GetMainNav = `
  {
    menuItems(where: { location: HEADER_MENU }) {
      nodes {
        id
        label
        url
        label
        target
        uri
        connectedObject {
          __typename
        }
      }
    }
  }
`;

export default GetMainNav;

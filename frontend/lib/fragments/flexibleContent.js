const flexibleContent = (type) => `
  flexContent {
    flexiblecontent {
      ... on ${type}_Flexcontent_Flexiblecontent_Latestlayout {
        fieldGroupName
        latesttitle
      }
      ...on ${type}_Flexcontent_Flexiblecontent_Testlayout{
        fieldGroupName
        testtitle
      }
    }
  }
`;

export default flexibleContent;

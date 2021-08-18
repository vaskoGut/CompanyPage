import { flexibleContent, seo } from '@/lib/fragments';

const pageData = `
  title
  content
  link
  pageTemplate
  featuredImage {
    node {
      link
      sourceUrl(size: FEATIMGSOCIAL)
      altText
      title
    }
  }
  __typename
  ${flexibleContent('Page')}
  ${seo}
`;

export const GetPageBySlug = `
  query GetPageByUri($slug: String, $id: Int, $revisions: Boolean = false) {
    page: pageBy(uri: $slug, pageId: $id) {
      ${pageData}
      revisions(first: 1) @include(if: $revisions) {
        nodes {
          ${pageData}
        }
      }
    }
  }
`;

export const GetPagesPaths = `
  query GetPagesPaths {
    pages(first: 100) {
      edges {
        node {
          slug
          parent {
            node {
              slug
            }
          }
        }
      }
    }
  }
`;

export const GetFrontPage = `
  query GetFrontPage($revisions: Boolean = false){
    page: pageOnFront {
      nodes {
        ${pageData}
        revisions(first: 1) @include(if: $revisions) {
          nodes {
            ${pageData}
          }
        }
      }
    }
  }
`;

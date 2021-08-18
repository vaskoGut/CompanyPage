import { flexibleContent, seo } from '@/lib/fragments';

const post = `
  id
  title
  content
  link
  featuredImage {
    node {
      link
      sourceUrl(size: FEATIMGSOCIAL)
      altText
      title
    }
  }
  __typename
  ${flexibleContent('Post')}
  ${seo}
`;

export const GetPostBySlug = `
  query GetPostBySlug($slug: String, $id: Int, $revisions: Boolean = false) {
    post: postBy(slug: $slug, postId: $id){
      ${post} 
      revisions(first: 1) @include(if: $revisions) {
        nodes {
          ${post} 
        }
      }
    }
  }
`;

export const GetPostsPaths = `
  query GetPostsPaths {
    posts(first: 300) {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

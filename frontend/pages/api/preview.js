import { GetContentNode } from '@/lib/queries';
import { graphQLRequest, initializeGraphQL } from '../../lib/graphql-client';
import cookie from 'cookie';

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? '');

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (!cookies.wp_jwt_token) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  function getPostLink(postType, page) {
    const { id, uri } = page || {};
    switch (postType) {
      case 'post':
        return `/blog/${id}`;
      default:
        if (uri === '/') return '/'; // if home page
        return `/${id}`;
    }
  }

  const client = initializeGraphQL();

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS
  const { data, loading, error } = await graphQLRequest(client, GetContentNode, {
    variables: {
      id: req?.query?.id,
      revisions: true,
    },
    token: cookies?.wp_jwt_token,
  });

  if (error) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired token. Try to log out/log in again' });
  }

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!data?.page) {
    return res.status(401).json({ message: 'Invalid post' });
  }

  const { page = {} } = data || {};

  // Enable Preview Mode by setting the cookies
  res.setPreviewData(
    { token: cookies?.wp_jwt_token },
    {
      maxAge: 60 * 30, // The preview mode cookies expire in 30 mins
    }
  );

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: getPostLink(req?.query?.type, page) });
  res.end();
};

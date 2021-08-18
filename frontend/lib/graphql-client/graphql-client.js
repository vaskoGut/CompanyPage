import { useMemo } from 'react';
import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import config from '@/theme.config';
import { stripIgnoredCharacters } from 'graphql';

let graphQLClient;

const enchancedFetch = (url, init) => {
  let uri = url;
  if (init.method === 'GET') {
    uri = shrinkGETQuery(uri);
  }
  return fetch(uri, {
    ...init,
    headers: {
      ...init.headers,
    },
  }).then((response) => response);
};

function shrinkGETQuery(fullURL) {
  const url = new URL(fullURL);

  // Read from URL implicitly decodes the querystring
  const query = url.searchParams.get('query');
  if (!query) {
    return fullURL;
  }

  const strippedQuery = stripIgnoredCharacters(query);

  // URLSearchParams.set will use application/x-www-form-urlencoded encoding
  url.searchParams.set('query', strippedQuery);

  return url.toString();
}

function createClient(initialState) {
  return new GraphQLClient({
    ssrMode: typeof window === 'undefined',
    url: `${config.wordpress.backend}/graphql`,
    cache: memCache({ initialState }),
    useGETForQueries: true,
    fetch: enchancedFetch,
  });
}

export function initializeGraphQL(initialState = null) {
  const _graphQLClient = graphQLClient ?? createClient(initialState);

  // console.log('_graphQLClient', _graphQLClient);

  // After navigating to a page with an initial GraphQL state, create a new cache with the
  // current state merged with the incoming state and set it to the GraphQL client.
  // This is necessary because the initial state of `memCache` can only be set once
  if (initialState && graphQLClient) {
    graphQLClient.cache = memCache({
      initialState: Object.assign(graphQLClient.cache.getInitialState(), initialState),
    });
  }
  // For SSG and SSR always create a new GraphQL Client
  if (typeof window === 'undefined') return _graphQLClient;
  // Create the GraphQL Client once in the client
  if (!graphQLClient) graphQLClient = _graphQLClient;

  return _graphQLClient;
}

export function useGraphQLClient(initialState) {
  const store = useMemo(() => initializeGraphQL(initialState), [initialState]);
  return store;
}

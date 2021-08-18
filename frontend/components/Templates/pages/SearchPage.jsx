import { useState } from 'react';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Link from '@/components/Link';
import { Container, Button } from '@/components/styles';
import config from '@/theme.config';
import { x } from '@xstyled/styled-components';

const SearchPage = ({ data }) => {
  const {
    items: { items } = {},
    query: { s },
  } = data || {};

  // State
  const [searchParam, setSearchParam] = useState(s);
  const [posts, setPosts] = useState(items);

  /**
   * Search form handler
   */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${config.wordpress.routes.search}?s=${searchParam}`)
        .then((resp) => resp.json())
        .then((resp) => setPosts(resp?.items || []));
    } catch (error) {
      console.log(error);
    }

    Router.push(`/search?s=${searchParam}`, `/search?s=${searchParam}`, { shallow: true });
  };

  return (
    <Container>
      {data?.title && <h1 dangerouslySetInnerHTML={{ __html: data.title.rendered }} />}

      {/* Search form */}
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <x.input
          borderColor="primary"
          border={2}
          type="text"
          name="s"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          required
          py={8}
        />
        <Button type="submit">Zoeken</Button>
      </form>

      {/* Search results */}
      {posts && !!posts.length > 0 ? (
        <x.ul mt={40} p={0}>
          {posts.map((item) => (
            <x.li key={item.id}>
              <Link uri={item.uri} url={item.link}>
                {item.title.rendered}
              </Link>
            </x.li>
          ))}
        </x.ul>
      ) : (
        <x.p>Geen resultaten gevonden.</x.p>
      )}
    </Container>
  );
};

export default SearchPage;

import { useQuery } from 'graphql-hooks';
import uuid from 'uuid';
import { GetLatestPosts } from '@/lib/queries';

const LatestPosts = () => {
  const { error, data } = useQuery(GetLatestPosts, {});
  const { posts: { edges: posts } = {} } = data || {};

  if (error) return <p>Error loading latest posts</p>;
  return (
    <x.div display="flex">
      {posts?.map((item) => (
        <x.div key={uuid()}>{item.node.title}</x.div>
      ))}
    </x.div>
  );
};

export default LatestPosts;

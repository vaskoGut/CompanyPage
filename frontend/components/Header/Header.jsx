import { useQuery } from 'graphql-hooks';
import Link from '@/components/Link';
import { x } from '@xstyled/styled-components';
import { GetMainNav } from '@/lib/queries';
import SHeader from './styles';

const Header = () => {
  const { loading, error, data } = useQuery(GetMainNav, {});
  const { menuItems: { nodes: menuItems } = {} } = data || {};
  if (error) return null;

  return (
    <SHeader>
      {data?.pageBy?.title}
      {menuItems && !!menuItems.length > 0 && (
        <nav>
          <x.div display="flex" p={0} as="ul" justifyContent="center" mb={20}>
            {menuItems.map((menuItem) => (
              <x.li mx={10} key={menuItem.id}>
                <Link
                  uri={menuItem.uri ? menuItem.uri : undefined}
                  url={menuItem.url}
                  title={menuItem?.title ? menuItem.title : undefined}
                  rel={menuItem?.linkRelationship ? menuItem.linkRelationship : undefined}
                  target={menuItem.target ? menuItem.target : undefined}
                >
                  {menuItem.label}
                </Link>
              </x.li>
            ))}
            <x.li mx={10}>
              <Link uri="/search" url="search">
                Search
              </Link>
            </x.li>
          </x.div>
        </nav>
      )}
    </SHeader>
  );
};

export default Header;

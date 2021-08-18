import { ClientContext } from 'graphql-hooks';
import { useGraphQLClient } from '@/lib/graphql-client';
import Page from '@/components/Page';
import { OptionsProvider } from '../context/OptionsProvider';

const App = ({ Component, pageProps }) => {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <ClientContext.Provider value={graphQLClient}>
      <OptionsProvider>
        <Page data={pageProps.page} preview={pageProps?.preview}>
          <Component {...pageProps} />
        </Page>
      </OptionsProvider>
    </ClientContext.Provider>
  );
};

export default App;

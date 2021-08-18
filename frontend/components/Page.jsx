import { useContext } from 'react';
import theme from '@/theme';
import Head from './head';
import Schema from './Schema';
import Header from './Header';
import Footer from './Footer';
import CookieBar from './CookieBar';
import ScriptsPixels from './ScriptsPixels';
import PreviewMode from './PreviewMode';

//styles
import { ThemeProvider, Preflight } from '@xstyled/styled-components';
import { GlobalStyles } from './styles';

//context
import OptionsContext from '../context/OptionsProvider';

//utils
import { hasConsent } from '@/utils';

const Page = ({ children, data, preview }) => {
  const { scriptsPixels, cookies: { cookieConsent, accepted } = {} } =
    useContext(OptionsContext) || {};

  const functional = hasConsent(cookieConsent, accepted, 'functional');
  const tracking = hasConsent(cookieConsent, accepted, 'tracking');

  const { seo, featuredImage, link, excerpt } = data || {};

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyles />
      <Head
        seo={seo}
        link={link}
        featuredImage={featuredImage}
        excerpt={excerpt}
        colors={theme.colors}
        headScripts={{
          analytical: scriptsPixels?.scriptHeadAnalytical,
          functional: functional && scriptsPixels?.scriptHeadFunctional,
          tracking: tracking && scriptsPixels?.scriptHeadTracking,
        }}
      />
      {data && <Schema jsonLdType="Webpage" schema={data} />}
      {preview && <PreviewMode />}

      <Header />

      <ScriptsPixels header cookies={{ functional, tracking }} scriptsPixels={scriptsPixels} />

      <main>{children}</main>
      <Footer />

      <ScriptsPixels footer cookies={{ functional, tracking }} scriptsPixels={scriptsPixels} />
      <CookieBar />
    </ThemeProvider>
  );
};

export default Page;

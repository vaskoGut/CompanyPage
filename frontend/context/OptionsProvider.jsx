import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'graphql-hooks';
import { GetSiteOptions } from '../lib/queries';
import ReactGA from 'react-ga';
import Router from 'next/router';
import NProgress from 'nprogress';

const OptionsContext = React.createContext({});

export const OptionsProvider = (props) => {
  const [cookies, setCookies] = useState({});

  const { error, data: options } = useQuery(GetSiteOptions, {});
  const {
    googleAnalytics,
    siteOptions: { scriptsPixels },
  } = options || {};

  /**
   * Set cookies in context
   */
  const onCookieAccept = () => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    const cookieAcceptedTypes = localStorage.getItem('cookieAcceptedTypes');
    const accepted = cookieAcceptedTypes?.split(',') || [];

    setCookies({ cookieConsent, accepted });
  };

  useEffect(() => {
    //cookie accept handler
    onCookieAccept();

    // progress bar
    Router.onRouteChangeStart = () => {
      NProgress.start();
    };
    Router.onRouteChangeComplete = () => {
      NProgress.done();
    };
    Router.onRouteChangeError = () => {
      NProgress.done();
    };

    // handle page change
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  if (googleAnalytics?.analyticsId) {
    ReactGA.initialize(googleAnalytics.analyticsId);
  }

  const handleRouteChange = () => {
    if (googleAnalytics?.analyticsId) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
    console.log('App is changing to: ', window.location.pathname);
  };

  return (
    <OptionsContext.Provider
      value={{
        cookies,
        onCookieAccept,
        scriptsPixels,
        ...options,
      }}
    >
      {props.children}
    </OptionsContext.Provider>
  );
};
export const OptionsConsumer = OptionsContext.Consumer;
export default OptionsContext;

OptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const GetSiteOptions = `
  {
    siteOptions {
      googleAnalytics {
        analyticsId
      }
      scriptsPixels {
        scriptBodyAnalytical
        scriptBodyFunctional
        scriptBodyTracking
        scriptFooterAnalytical
        scriptFooterFunctional
        scriptFooterTracking
        scriptHeadAnalytical
        scriptHeadFunctional
        scriptHeadTracking
      }
    }
  }
`;

export default GetSiteOptions;

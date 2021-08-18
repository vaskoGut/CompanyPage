import NextHead from 'next/head';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { AllHtmlEntities } from 'html-entities';
import { useRouter } from 'next/router';

const entities = new AllHtmlEntities();
const stripHtmlRegEx = /(<([^>]+)>)/gi;

const Head = ({ seo, link, featuredImage, excerpt, colors, headScripts }) => {
  const metaRobots = [];
  if (seo?.metaRobotsNofollow) metaRobots.push('nofollow');
  if (seo?.metaRobotsNoindex) metaRobots.push('noindex');

  const router = useRouter();

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      {!router.isFallback && <title>{seo?.title?.trim() || '404'}</title>}
      <meta
        name="description"
        content={
          seo?.metaDesc ||
          seo?.opengraphDescription ||
          entities.decode(excerpt?.replace(stripHtmlRegEx, '')).trim()
        }
      />
      <link rel="canonical" href={seo?.canonical || link} />
      {metaRobots.length > 0 && <meta name="robots" content={metaRobots.join()} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color={colors.secondary} />
      <link rel="icon" href="/static/favicon.ico" />
      <meta property="og:url" content={seo?.canonical || link} />
      <meta property="og:title" content={seo?.opengraphTitle || seo?.title} />
      <meta
        property="og:description"
        content={
          seo?.opengraphDescription ||
          seo?.metaDesc ||
          seo?.twitterDescription ||
          entities.decode(excerpt?.replace(stripHtmlRegEx, '')).trim()
        }
      />
      <meta name="twitter:site" content={seo?.canonical || link} />
      <meta name="twitter:title" content={seo?.twitterTitle || seo?.title} />
      <meta
        name="twitter:description"
        content={
          seo?.twitterDescription ||
          seo?.metaDesc ||
          seo?.opengraphDescription ||
          entities.decode(excerpt?.replace(stripHtmlRegEx, '')).trim()
        }
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={seo?.twitterImage?.sourceUrl || featuredImage?.sourceUrl}
      />
      <meta
        property="og:image"
        content={seo?.opengraphImage?.sourceUrl || featuredImage?.sourceUrl}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {headScripts?.functional && parse(headScripts?.functional)}
      {headScripts?.analytical && parse(headScripts?.analytical)}
      {headScripts?.tracking && parse(headScripts?.tracking)}
    </NextHead>
  );
};

Head.propTypes = {
  seo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  link: PropTypes.string,
  featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  excerpt: PropTypes.string,
  colors: PropTypes.object,
  headScripts: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
};

Head.defaultProps = {
  seo: {},
  link: '',
  featuredImage: false,
  except: '',
  colors: '',
  headScripts: {},
};

export default Head;

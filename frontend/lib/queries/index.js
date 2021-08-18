import { GetPostBySlug, GetPostsPaths } from './postQueries';
import { GetFrontPage, GetPageBySlug, GetPagesPaths } from './pageQueries';
import GetLatestPosts from './latestPosts';
import GetMainNav from './navigation';
import GetSiteOptions from './siteOptions';
import BlogQuery from './blogQueries';
import GetContentNode from './content-node';

export {
  GetContentNode,
  GetPostBySlug,
  GetFrontPage,
  GetPageBySlug,
  GetLatestPosts,
  GetMainNav,
  GetSiteOptions,
  BlogQuery,
  GetPagesPaths,
  GetPostsPaths,
};

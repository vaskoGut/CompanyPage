import { x } from '@xstyled/styled-components';
import Head from 'next/head';

const Error = ({ statusCode }) => (
  <>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <x.div py={{ _: 30, sm: 60 }}>{statusCode || 404}</x.div>
  </>
);

export default Error;

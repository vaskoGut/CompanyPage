import { x } from '@xstyled/styled-components';

// Components
import LazyImage from '@/components/LazyImage';
import WYSIWYG from '@/components/Wysiwyg';
import FlexibleContent from '@/components/FlexibleContent';

const DefaultPage = ({ data }) => (
  <>
    <x.div>
      {data?.title && <h1>{data.title}</h1>}
      {data?.content && <WYSIWYG content={data.content} />}
      {data?.featuredImage?.sourceUrl && (
        <LazyImage
          src={data?.featuredImage?.sourceUrl}
          alt={data?.featuredImage?.altText}
          title={data?.featuredImage?.title}
        />
      )}
      {data?.flexContent && (
        <FlexibleContent
          layouts={data?.flexContent?.flexiblecontent}
          type={data.__typename.toLowerCase()}
        />
      )}
    </x.div>
  </>
);

export default DefaultPage;

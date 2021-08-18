import WYSIWYG from '@/Wysiwyg/Wysiwyg';
import FlexibleContent from '@/FlexibleContent';

const DefaultPost = ({ data }) => (
  <div>
    {data?.title && <h1>{data.title}</h1>}
    {data?.content && <WYSIWYG content={data.content} />}
    {data?.flexContent && (
      <FlexibleContent layouts={data?.flexContent?.flexiblecontent} type={data.__typename} />
    )}
  </div>
);

export default DefaultPost;

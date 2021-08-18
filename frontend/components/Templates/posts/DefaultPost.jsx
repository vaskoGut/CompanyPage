import WYSIWYG from '@/components/Wysiwyg/Wysiwyg';
import FlexibleContent from '@/components/FlexibleContent';
import { x } from '@xstyled/styled-components';

const DefaultPost = ({ data }) => (
  <x.div>
    {data?.title && <h1>{data.title}</h1>}
    {data?.content && <WYSIWYG content={data.content} />}
    {data?.flexContent && (
      <FlexibleContent layouts={data?.flexContent?.flexiblecontent} type={data.__typename} />
    )}
  </x.div>
);

export default DefaultPost;

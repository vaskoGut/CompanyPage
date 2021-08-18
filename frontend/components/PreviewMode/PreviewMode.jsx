import { useEffect } from 'react';
import SPreviewMode from './styles';

const PreviewMode = () => {
  return (
    <SPreviewMode textAlign="center" py={20}>
      This is page is a preview.{' '}
      <a
        href="/api/exit-preview"
        className="underline hover:text-cyan duration-200 transition-colors"
      >
        Click here
      </a>{' '}
      to exit preview mode.
    </SPreviewMode>
  );
};

export default PreviewMode;

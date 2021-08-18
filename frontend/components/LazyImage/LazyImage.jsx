import { useRef } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { ImageWrapper, Placeholder, StyledImage } from './styles';

const LazyImage = ({ src, alt, title }) => {
  const refPlaceholder = useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <ImageWrapper>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad once offset={100}>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt || ''}
          title={title || ''}
        />
      </LazyLoad>
    </ImageWrapper>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LazyImage;

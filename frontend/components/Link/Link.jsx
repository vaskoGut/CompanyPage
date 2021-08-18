import NextLink from 'next/link';
import { Button } from '@/components/styles';

const Link = ({ uri, url, title, rel, target, isButton, children, style, ...props }) => {
  const Element = isButton ? Button : 'a';

  // make anchor functionality works
  const clickHandle = () => {
    window.open(url, target);
  };

  return target ? (
    // external link or btn
    <Element
      href={!isButton ? url : undefined}
      onClick={isButton ? clickHandle : undefined}
      target={!isButton ? target : undefined}
      rel={rel}
      title={title}
      {...props}
    >
      <span>{children}</span>
    </Element>
  ) : (
    // internal link or btn
    <NextLink href={uri || url} as={url} passHref>
      <Element rel={rel} title={title} href={url} {...props}>
        <span>{children}</span>
      </Element>
    </NextLink>
  );
};

export default Link;

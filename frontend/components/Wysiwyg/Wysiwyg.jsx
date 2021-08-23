import { Component } from 'react';
import Router from 'next/router';
import parse from 'html-react-parser';
import uuid from 'uuid';
import GravityForm from '@/components/GravityForm';
import Wysiwyg from './style';
import config from '@/theme.config';

import Link from '@/components/Link';
import LazyImage from '@/components/LazyImage';

class WYSIWYG extends Component {
  renderChildren = (node) => {
    if (node.children && !node.children.length) return false;
    return node.children.map((el) => this.renderChild(el));
  };

  renderChild = (node) => {
    if (node.type === 'tag') {
      const TagName = node.name;
      if (TagName === 'img') {
        return <img {...node.attribs} />;
        // return (
        //   <Image
        //     width={node.attribs.width}
        //     className={node.attribs.class}
        //     height={node.attribs.height}
        //     src={node.attribs.src}
        //   />
        // );
      }
      return <TagName key={uuid()}>{node.data ? node.data : this.renderChildren(node)}</TagName>;
    }
    return node.data;
  };

  render() {
    const { content, color, fontSize, className, ...props } = this.props;
    const parsedContent = parse(content, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'a') {
          if (domNode.attribs && domNode.attribs.style) {
            domNode.attribs.style = domNode.attribs.style.split(';').reduce((obj, str) => {
              const strParts = str.split(':');
              if (strParts[0] && strParts[1]) {
                // <-- Make sure the key & value are not undefined
                obj[strParts[0].replace(/\s+/g, '')] = strParts[1].trim(); // <-- Get rid of extra spaces at beginning of value strings
              }
              return obj;
            }, {});
          }

          // check if link is path to file or link host is different than current one
          if (domNode.attribs?.class) {
            domNode.attribs.className = domNode.attribs.class;
            delete domNode.attribs.class;
          }
          if (
            !domNode.attribs ||
            domNode.attribs?.href
              ?.split('/')
              .pop()
              .indexOf('.') > -1 ||
            domNode.attribs.href.indexOf(config.wordpress.frontend) === -1
          ) {
            return <a {...domNode.attribs}>{this.renderChildren(domNode)}</a>;
          }
          if (domNode.attribs.href) {
            const linkAttrs = { ...domNode?.attribs };
            if (linkAttrs?.['data-type'] && linkAttrs?.['data-uri']) {
              delete linkAttrs['data-type'];
              delete linkAttrs['data-uri'];
            }
            const styles = {};
            if (domNode?.attribs?.style) {
              const attributes = domNode.attribs.style.split(';');
              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i]) {
                  const entry = attributes[i].split(':');
                  styles[entry.splice(0, 1)[0]] = entry.join(':');
                }
              }
              delete domNode.attribs.style;
            }
            return (
              <Link
                uri={domNode.attribs['data-uri'] ? domNode.attribs['data-uri'] : undefined}
                url={domNode.attribs.href}
                style={styles}
              >
                {this.renderChildren(domNode)}
              </Link>
            );
          }
        } else if (domNode.type === 'tag' && domNode.name === 'gravityform') {
          const { query } = Router?.router || {};
          return (
            <GravityForm key={uuid()} formID={domNode.attribs.id} populatedFields={{ ...query }} />
          );
        }
        // else if (domNode.type === 'tag' && domNode.name === 'img') {
        //   return (
        //     <Image
        //       width={domNode.attribs.width}
        //       className={domNode.attribs.class}
        //       height={domNode.attribs.height}
        //       src={domNode.attribs.src}
        //     />
        //   );
        // }
        else if (domNode.type === 'tag' && domNode.name === 'button') {
          const href =
            domNode.attribs.slug && domNode.attribs.type
              ? `/${domNode.attribs.type}?slug=${domNode.attribs.slug}`
              : domNode.attribs.link;

          const isExternal = domNode.attribs.external && domNode.attribs.external === 'true';
          return (
            <Link
              isButton={true}
              uri={isExternal ? true : undefined}
              url={domNode.attribs.href}
              style={styles}
              {...domNode.attribs}
            >
              {this.renderChildren(domNode)}
            </Link>
          );
        }
      },
    });
    return (
      <Wysiwyg className={className} color={color} fontSize={fontSize} {...props}>
        {parsedContent}
      </Wysiwyg>
    );
  }
}

export default WYSIWYG;

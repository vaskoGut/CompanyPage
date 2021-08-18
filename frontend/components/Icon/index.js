import PropTypes from 'prop-types';
import StyledIcon from './styles';
import ICONS from '@/public/static/icons';
import theme from '@/theme';

// usage example: <Icon icon="HELPDESK" opacity={.8} animation='down' viewbox="0 0 30 30" hover='primary' size={30} color="secondary" />

const Icon = ({
  className,
  icon,
  size,
  color,
  hover,
  viewbox,
  rotate,
  opacity,
  mr,
  ml,
  animation,
  align,
}) => (
  <StyledIcon
    width={`${size}px`}
    height={`${size}px`}
    viewBox={`${viewbox}`}
    fill={theme.colors[color] || color}
    hover={theme.colors[hover] || hover}
    rotate={rotate}
    opacity={opacity}
    mr={mr}
    ml={ml}
    className={className || undefined}
    animation={animation}
  >
    <path d={ICONS[icon]} />
  </StyledIcon>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  hover: PropTypes.string,
  viewbox: PropTypes.string,
  className: PropTypes.string,
  animation: PropTypes.bool,
  align: PropTypes.string,
  flipY: PropTypes.bool,
};

Icon.defaultProps = {
  size: 16,
  color: '',
  hover: '',
  viewbox: '0 0 100 100',
  className: '',
  animation: false,
  align: 'right',
};

export default Icon;

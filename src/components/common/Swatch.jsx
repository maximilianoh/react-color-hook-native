import React from 'react';
import PropTypes from 'prop-types';
import handleFocus from '../../helpers/interaction';
import { swatchStyle } from './commonStyles';
import { View } from 'react-native';

const ENTER = 13;

const Swatch = ({
  color, style, onClick, onHover, title,
  children, focus, focusStyle,
}) => {
  const transparent = color === 'transparent';
  const styles = swatchStyle(style, focus, focusStyle, color);
  const handleClick = (e) => onClick(color, e);
  const handleKeyDown = (e) => e.keyCode === ENTER && onClick(color, e);
  const handleHover = (e) => onHover(color, e);

  const optionalEvents = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover;
  }
  const showTitle = title || color;
  return (
    <View
      style={styles.swatch}
      onClick={handleClick}
      title={showTitle}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
    >
      { children }
      { transparent }
    </View>
  );
};

export default handleFocus(Swatch);

Swatch.defaultProps = {
  focusStyle: {},
  children: null,
  focus: false,
  title: '',
  onHover: () => {},
  style: {},
  onClick: () => {},
  color: '',
};

Swatch.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  focusStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  focus: PropTypes.bool,
  children: PropTypes.shape({}),
};

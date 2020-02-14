import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const SliderSwatch = ({
  hsl, offset, onClick, active, first, last,
}) => {
  const styles = reactCSS({
    default: {
      swatch: {
        height: 12,
        backgroundColor: `hsl(${hsl.h}, 50%, ${(offset * 100)}%)`,
        cursor: 'pointer',
      },
    },
    first: {
      swatch: {
        borderTopEndRadius:2,
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        borderBottomEndRadius:2,
        borderBottomLeftRadius:0,
        borderTopLeftRadius:0,
        elevation: 3,
      },
    },
    last: {
      swatch: {
        borderTopEndRadius:0,
        borderTopRightRadius:2,
        borderBottomRightRadius:2,
        borderBottomEndRadius:0,
        borderBottomLeftRadius:2,
        borderTopLeftRadius:2,
        elevation: 3,
      },
    },
    active: {
      swatch: {
        transform: [{ scaleY: 1.8 }],
        borderRadius: 3.6/2,
      },
    },
  }, { active, first, last });

  const handleClick = (e) => onClick({
    h: hsl.h,
    s: 0.5,
    l: offset,
    source: 'hsl',
  }, e);
  return (
    <View style={styles.swatch} onResponderStart={handleClick} onTouchStart={handleClick} role="grid" tabIndex={0} />
  );
};

SliderSwatch.defaultProps = {
  onClick: () => {},
  last: false,
  first: false,
  offset: 0,
  active: false,
};

SliderSwatch.propTypes = {
  onClick: PropTypes.func,
  hsl: PropTypes.shape({
    h: PropTypes.number,
  }).isRequired,
  offset: PropTypes.number,
  active: PropTypes.bool,
  last: PropTypes.bool,
  first: PropTypes.bool,
};

export default SliderSwatch;

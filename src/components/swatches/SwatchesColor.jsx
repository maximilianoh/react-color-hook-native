import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { getContrastingColor } from '../../helpers/color';
import Swatch from '../common/Swatch';
import { View } from 'react-native';

const SwatchesColor = ({
  color, onClick, onSwatchHover, first,
  last, active,
}) => {
  const styles = reactCSS({
    default: {
      color: {
        width: 40,
        height: 24,
        cursor: 'pointer',
        background: color,
        marginBottom: 1,
      },
      check: {
        color: getContrastingColor(color),
        marginLeft: 8,
        display: 'none',
      },
    },
    first: {
      color: {
        overflow: 'hidden',
        borderRadius: '2px 2px 0 0',
      },
    },
    last: {
      color: {
        overflow: 'hidden',
        borderRadius: '0 0 2px 2px',
      },
    },
    active: {
      check: {
        display: 'block',
      },
    },
    'color-#FFFFFF': {
      color: {
        shadowColor: "#ddd",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
      },
      check: {
        color: '#333',
      },
    },
    transparent: {
      check: {
        color: '#333',
      },
    },
  }, {
    first,
    last,
    active,
    'color-#FFFFFF': color === '#FFFFFF',
    transparent: color === 'transparent',
  });

  return (
    <Swatch
      color={color}
      style={styles.color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{ 
        shadowColor: color,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      }}
    >
      <View style={styles.check}>
        X
      </View>
    </Swatch>
  );
};

SwatchesColor.propTypes = {
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
  first: PropTypes.bool,
  last: PropTypes.bool,
  active: PropTypes.bool,
  color: PropTypes.string,
};

SwatchesColor.defaultProps = {
  onClick: () => {},
  onSwatchHover: () => {},
  first: false,
  last: false,
  active: false,
  color: '',
};


export default SwatchesColor;

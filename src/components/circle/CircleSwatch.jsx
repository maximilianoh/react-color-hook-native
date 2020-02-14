import React from 'react';
import reactCSS, { handleHover } from 'reactcss';
import PropTypes from 'prop-types';
import Swatch from '../common/Swatch';
import { View } from 'react-native';

const CircleSwatch = ({
  color, onClick, onSwatchHover, hover, active,
  circleSize, circleSpacing,
}) => {
  const styles = reactCSS({
    default: {
      swatch: {
        width: circleSize,
        height: circleSize,
        marginRight: circleSpacing,
        marginBottom: circleSpacing,
        transform: [{ scale: 1 }],
        transition: '100ms transform ease',
      },
      Swatch: {
        borderRadius: '50%',
        background: 'transparent',
        shadowColor: color,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: circleSize / 2,
        elevation: 3,
        transition: '100ms box-shadow ease',
      },
    },
    hover: {
      swatch: {
        transform: [{ scale: 1.2 }],
      },
    },
    active: {
      Swatch: {
        shadowColor: color,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 3,
        elevation: 3,
      },
    },
  }, { hover, active });

  return (
    <View style={styles.swatch}>
      <Swatch
        style={styles.Swatch}
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={{
          shadowColor: color,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowRadius: 5,
          shadowOpacity: 0,
          elevation: 3,
        }}
      />
    </View>
  );
};

CircleSwatch.defaultProps = {
  circleSize: 28,
  circleSpacing: 14,
  color: '',
  onClick: () => { },
  onSwatchHover: () => { },
  active: false,
};

CircleSwatch.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
  hover: PropTypes.bool.isRequired,
  active: PropTypes.bool,
  circleSize: PropTypes.number,
  circleSpacing: PropTypes.number,
};

export default handleHover(CircleSwatch);

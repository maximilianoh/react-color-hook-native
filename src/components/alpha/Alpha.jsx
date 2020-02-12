import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Alpha from '../common/Alpha';
import ColorWrap from '../common/ColorWrap';
import AlphaPointer from './AlphaPointer';
import { View, Text } from 'react-native';

export const AlphaPicker = ({
  rgb, hsl, width, height, onChange, direction, style, pointer,
}) => {
  const styles = reactCSS({
    default: {
      picker: {
        position: 'relative',
        width: width,
        height: height,
      },
      alpha: {
        radius: 2,
        style,
      },
    },
  });

  return (
    <View style={styles.picker} >
      <Alpha
        {...styles.alpha}
        rgb={rgb}
        hsl={hsl}
        pointer={pointer}
        onChange={onChange}
        direction={direction}
      />
    </View>
  );
};

AlphaPicker.defaultProps = {
  width: 316,
  height: 16,
  direction: 'horizontal',
  pointer: AlphaPointer,
  style: {},
};


AlphaPicker.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
  pointer: PropTypes.func,
  rgb: PropTypes.shape({}).isRequired,
  hsl: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape({}),

};


export default ColorWrap(AlphaPicker);

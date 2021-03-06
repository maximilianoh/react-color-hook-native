import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import Hue from '../common/Hue';
import HuePointer from './HuePointer';
import { View } from 'react-native';

export const HuePicker = ({
  width, height, onChange, hsl, direction, pointer,
  styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      picker: {
        position: 'relative',
        width: width,
        height: height,
      },
      hue: {
        radius: 2,
      },
    },
  }, passedStyles));

  // Overwrite to provide pure hue color
  const handleChange = (data, e) => onChange({
    a: 1,
    h: data.h,
    l: 0.5,
    s: 1,
    source: 'hsl',
  }, e);

  return (
    <View style={styles.picker}>
      <Hue
        {...styles.hue}
        hsl={hsl}
        pointer={pointer}
        onChange={handleChange}
        direction={direction}
      />
    </View>
  );
};

HuePicker.propTypes = {
  styles: PropTypes.shape({}),
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
  pointer: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  hsl: PropTypes.shape({}).isRequired,
};
HuePicker.defaultProps = {
  width: 316,
  height: 16,
  direction: 'horizontal',
  pointer: HuePointer,
  styles: {},
};

export default ColorWrap(HuePicker);

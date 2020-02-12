import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import Hue from '../common/Hue';
import SliderSwatches from './SliderSwatches';
import SliderPointer from './SliderPointer';
import { View } from 'react-native';

const Slider = ({
  hsl, onChange, pointer,
  styles: passedStyles = {}, className,
}) => {
  const styles = reactCSS(merge({
    default: {
      hue: {
        height: 12,
        position: 'relative',
      },
      Hue: {
        radius: 2,
      },
    },
  }, passedStyles));
  return (
    <View style={styles.wrap || {}} className={`slider-picker ${className}`}>
      <View style={styles.hue}>
        <Hue
          style={styles.Hue}
          hsl={hsl}
          pointer={pointer}
          onChange={onChange}
        />
      </View>
      <View style={styles.swatches}>
        <SliderSwatches hsl={hsl} onClick={onChange} />
      </View>
    </View>
  );
};

Slider.propTypes = {
  styles: PropTypes.shape({}),
  pointer: PropTypes.func,
  hsl: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Slider.defaultProps = {
  pointer: SliderPointer,
  styles: {},
  className: '',
};

export default ColorWrap(Slider);

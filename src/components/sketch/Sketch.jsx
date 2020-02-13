import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import Saturation from '../common/Saturation';
import Hue from '../common/Hue';
import Alpha from '../common/Alpha';
import SketchFields from './SketchFields';
import SketchPresetColors from './SketchPresetColors';
import { View } from 'react-native';

const Sketch = ({
  width, rgb, hex, hsv, hsl, onChange, onSwatchHover,
  disableAlpha, presetColors, renderers, styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      picker: {
        width,
        padding: '10px 10px 0',
        boxSizing: 'initial',
        background: '#fff',
        borderRadius: 4,
        shadowColor: "rgba(0,0,0,0.15)",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 16,
        shadowOpacity: 0,
        elevation: 3,
      },
      saturation: {
        width: '100%',
        paddingBottom: '75%',
        position: 'relative',
        overflow: 'hidden',
      },
      Saturation: {
        radius: 3,
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      },
      sliders: {
        padding: '4px 0',
        flex: '1',
      },
      color: {
        width: 24,
        height: 24,
        position: 'relative',
        marginTop: 4,
        marginLeft: 4,
        borderRadius: 3,
      },
      activeColor: {
        absolute: '0px 0px 0px 0px',
        borderRadius: 2,
        background: `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      },
      hue: {
        position: 'relative',
        height: 10,
        overflow: 'hidden',
      },
      Hue: {
        radius: 2,
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      },

      alpha: {
        position: 'relative',
        height: 10,
        marginTop: 4,
        overflow: 'hidden',
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 12,
        shadowOpacity: 0,
        elevation: 3,
      },
      Alpha: {
        radius: 2,
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      },
      ...passedStyles,
    },
    disableAlpha: {
      color: {
        height: 10,
      },
      hue: {
        height: 10,
      },
      alpha: {
        display: 'none',
      },
    },
  }, passedStyles), { disableAlpha });
  return (
    <View style={styles.picker}>
      <View style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
        />
      </View>
      <View style={{display: 'flex', flexWrap: 'wrap'}}>
        <View style={styles.sliders}>
          <View style={styles.hue}>
            <Hue
              style={styles.Hue}
              hsl={hsl}
              onChange={onChange}
            />
          </View>
          <View style={styles.alpha}>
            <Alpha
              style={styles.Alpha}
              rgb={rgb}
              hsl={hsl}
              renderers={renderers}
              onChange={onChange}
            />
          </View>
        </View>
        <View style={styles.color}>
          <View style={styles.activeColor} />
        </View>
      </View>

      <SketchFields
        rgb={rgb}
        hsl={hsl}
        hex={hex}
        onChange={onChange}
        disableAlpha={disableAlpha}
      />
      <SketchPresetColors
        colors={presetColors}
        onClick={onChange}
        onSwatchHover={onSwatchHover}
      />
    </View>
  );
};

Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.shape({}),
  presetColors: PropTypes.arrayOf(PropTypes.string),
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
  hsl: PropTypes.shape({}).isRequired,
  hsv: PropTypes.shape({}).isRequired,
  hex: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSwatchHover: PropTypes.func.isRequired,
  renderers: PropTypes.shape({}).isRequired,
};

Sketch.defaultProps = {
  disableAlpha: false,
  width: 200,
  styles: {},
  presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'],
};

export default ColorWrap(Sketch);

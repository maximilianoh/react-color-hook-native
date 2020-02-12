import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';

import Alpha from '../common/Alpha';
import ColorWrap from '../common/ColorWrap';
import Hue from '../common/Hue';
import Saturation from '../common/Saturation';

import ChromeFields from './ChromeFields';
import ChromePointer from './ChromePointer';
import ChromePointerCircle from './ChromePointerCircle';
import { View } from 'react-native';

const Chrome = ({
  width, onChange, disableAlpha, rgb, hsl, hsv, hex, renderers,
  styles: passedStyles, className, defaultView,
}) => {
  const styles = reactCSS(merge({
    default: {
      picker: {
        width,
        background: '#fff',
        borderRadius: 2,
        boxShadow: '0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)',
        boxSizing: 'initial',
        fontFamily: 'Menlo',
      },
      saturation: {
        width: '100%',
        paddingBottom: '55%',
        position: 'relative',
        borderRadius: '2px 2px 0 0',
        overflow: 'hidden',
      },
      Saturation: {
        radius: '2px 2px 0 0',
      },
      body: {
        padding: '16px 16px 12px',
      },
      controls: {
        display: 'flex',
      },
      color: {
        width: 32,
      },
      swatch: {
        marginTop: 6,
        width: 16,
        height: 16,
        borderRadius: 8,
        position: 'relative',
        overflow: 'hidden',
      },
      active: {
        absolute: '0px 0px 0px 0px',
        borderRadius: 8,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.1)',
        background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
        zIndex: '2',
      },
      toggles: {
        flex: '1',
      },
      hue: {
        height: 10,
        position: 'relative',
        marginBottom: 8,
      },
      Hue: {
        radius: 2,
      },
      alpha: {
        height: 10,
        position: 'relative',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 12px',
      },
      Alpha: {
        radius: 2,
      },
    },
    disableAlpha: {
      color: {
        width: 22,
      },
      alpha: {
        display: 'none',
      },
      hue: {
        marginBottom: 0,
      },
      swatch: {
        width: 10,
        height: 10,
        marginTop: 0,
      },
    },
  }, passedStyles), { disableAlpha });
  return (
    <View style={styles.picker} className={`chrome-picker ${className}`}>
      <View style={styles.saturation}>
        <Saturation
          style={styles.Saturation}
          hsl={hsl}
          hsv={hsv}
          pointer={ChromePointerCircle}
          onChange={onChange}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.controls} className="flexbox-fix">
          <View style={styles.color}>
            <View style={styles.swatch}>
              <View style={styles.active} />
            </View>
          </View>
          <View style={styles.toggles}>
            <View style={styles.hue}>
              <Hue
                style={styles.Hue}
                hsl={hsl}
                pointer={ChromePointer}
                onChange={onChange}
              />
            </View>
            <View style={styles.alpha}>
              <Alpha
                style={styles.Alpha}
                rgb={rgb}
                hsl={hsl}
                pointer={ChromePointer}
                renderers={renderers}
                onChange={onChange}
              />
            </View>
          </View>
        </View>
        <ChromeFields
          rgb={rgb}
          hsl={hsl}
          view={defaultView}
          hex={hex}
          onChange={onChange}
          disableAlpha={disableAlpha}
        />
      </View>
    </View>
  );
};

Chrome.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disableAlpha: PropTypes.bool,
  styles: PropTypes.shape({
    picker: PropTypes.shape({}),
    saturation: PropTypes.shape({}),
    Saturation: PropTypes.shape({}),
    body: PropTypes.shape({}),
    controls: PropTypes.shape({}),
    color: PropTypes.shape({}),
    swatch: PropTypes.shape({}),
    active: PropTypes.shape({}),
    toggles: PropTypes.shape({}),
    hue: PropTypes.shape({}),
    Hue: PropTypes.shape({}),
    alpha: PropTypes.shape({}),
    Alpha: PropTypes.shape({}),
  }),
  rgb: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
  hex: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hsv: PropTypes.shape({}).isRequired,
  hsl: PropTypes.shape({}).isRequired,
  renderers: PropTypes.shape({}),
  className: PropTypes.string,
  defaultView: PropTypes.oneOf([
    'hex',
    'rgb',
    'hsl',
  ]),
};

Chrome.defaultProps = {
  width: 225,
  disableAlpha: false,
  styles: {},
  className: '',
  renderers: {},
  defaultView: 'hex',
};

export default ColorWrap(Chrome);

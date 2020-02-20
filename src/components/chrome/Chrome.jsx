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
  styles: passedStyles, defaultView,
}) => {
  const styles = reactCSS(merge({
    default: {
      picker: {
        width,
        backgroundColor: '#fff',
        shadowColor: "rgba(0,0,0,.3)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 2,
        elevation: 3,
        boxSizing: 'initial',
        fontFamily: 'Menlo',
      },
      saturation: {
        width: '100%',
        paddingBottom: '55%',
        position: 'relative',
        borderTopEndRadius: 2,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        borderBottomEndRadius: 2,
        borderBottomLeftRadius: 2,
        borderTopLeftRadius: 2,
        elevation: 1,
        overflow: 'hidden',
      },
      Saturation: {
        borderTopEndRadius: 2,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        elevation: 1,
      },
      body: {
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 12,
        paddingLeft: 16,
      },
      controls: {
        display: 'flex',
        flexDirection: 'row',
      },
      color: {
        width: "15%",
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
        position:'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        rigth: 0,
        width:"100%",
        height:"100%", 
        borderRadius: 8,
        shadowColor: "rgba(0,0,0,0.1)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1,
        zIndex: 2,
        
        backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
      },
      toggles: {
        flex: 1,
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
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowRadius: 12,
        elevation: 3,
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
    <View style={styles.picker} >      
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
        <View style={styles.controls}>
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
            <View style={styles.hue}>
              <Alpha

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
  renderers: {},
  defaultView: 'hex',
};

export default ColorWrap(Chrome);

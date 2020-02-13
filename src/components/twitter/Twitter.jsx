import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import map from 'lodash/map';
import merge from 'lodash/merge';
import { isValidHex } from '../../helpers/color';

import ColorWrap from '../common/ColorWrap';
import EditableInput from '../common/EditableInput';
import Swatch from '../common/Swatch';
import { View } from 'react-native';


const Twitter = ({
  onChange, onSwatchHover, hex, colors, width, triangle,
  styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      card: {
        width,
        background: '#fff',
        border: '0 solid rgba(0,0,0,0.25)',
        shadowColor: "rgba(0,0,0,0.25)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
        borderRadius: 4,
        position: 'relative',
      },
      body: {
        padding: '15px 9px 9px 15px',
      },
      label: {
        fontSize: 18,
        color: '#fff',
      },
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent #fff transparent',
        position: 'absolute',
      },
      triangleShadow: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 9px 10px 9px',
        borderColor: 'transparent transparent rgba(0,0,0,.1) transparent',
        position: 'absolute',
      },
      hash: {
        background: '#F0F0F0',
        height: 30,
        width: 30,
        borderRadius: '4px 0 0 4px',
        float: 'left',
        color: '#98A1A4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      input: {
        width: 100,
        fontSize: 14,
        color: '#666',
        border: 0,
        outline: 'none',
        height: 28,
        shadowColor: "#F0F0F0",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
        boxSizing: 'content-box',
        borderRadius: '0 4px 4px 0',
        float: 'left',
        paddingLeft: 8,
      },
      swatch: {
        width: 30,
        height: 30,
        float: 'left',
        borderRadius: 4,
        margin: '0 6px 6px 0',
      },
      clear: {
        clear: 'both',
      },
    },
    'hide-triangle': {
      triangle: {
        display: 'none',
      },
      triangleShadow: {
        display: 'none',
      },
    },
    'top-left-triangle': {
      triangle: {
        top: -10,
        left: 12,
      },
      triangleShadow: {
        top: -11,
        left: 12,
      },
    },
    'top-right-triangle': {
      triangle: {
        top: -10,
        right: 12,
      },
      triangleShadow: {
        top: -11,
        right: 12,
      },
    },
  }, passedStyles), {
    'hide-triangle': triangle === 'hide',
    'top-left-triangle': triangle === 'top-left',
    'top-right-triangle': triangle === 'top-right',
  });

  const handleChange = (hexcode, e) => {
    if (isValidHex(hexcode)) {
      onChange({
        hex: hexcode,
        source: 'hex',
      }, e);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.triangleShadow} />
      <View style={styles.triangle} />

      <View style={styles.body}>
        {map(colors, (c, i) => (
          <Swatch
            key={i}
            color={c}
            hex={c}
            style={styles.swatch}
            onClick={handleChange}
            onHover={onSwatchHover}
            focusStyle={{
              shadowColor: c,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowRadius: 4,
              shadowOpacity: 0,
              elevation: 3,
            }}
          />
        ))}
        <View style={styles.hash}>#</View>
        <EditableInput
          label={null}
          style={{ input: styles.input }}
          value={hex.replace('#', '')}
          onChange={handleChange}
        />
        <View style={styles.clear} />
      </View>
    </View>
  );
};

Twitter.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  triangle: PropTypes.oneOf(['hide', 'top-left', 'top-right']),
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onSwatchHover: PropTypes.func.isRequired,
  hex: PropTypes.string.isRequired,
};

Twitter.defaultProps = {
  width: 276,
  colors: ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3',
    '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'],
  triangle: 'top-left',
  styles: {},
};

export default ColorWrap(Twitter);

import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import { isValidHex, getContrastingColor } from '../../helpers/color';
import ColorWrap from '../common/ColorWrap';
import EditableInput from '../common/EditableInput';
import BlockSwatches from './BlockSwatches';
import { View } from 'react-native';

const Block = ({
  onChange, onSwatchHover, hex, colors, width, triangle,
  styles: passedStyles = {},
}) => {
  const transparent = hex === 'transparent';
  const handleChange = (hexCode, e) => {
    if (isValidHex(hexCode)) {
      onChange({
        hex: hexCode,
        source: 'hex',
      }, e);
    }
  };

  const styles = reactCSS(merge({
    default: {
      card: {
        width,
        background: '#fff',
        boxShadow: '0 1px rgba(0,0,0,.1)',
        borderRadius: 6,
        position: 'relative',
      },
      head: {
        height: 110,
        background: hex,
        borderRadius: '6px 6px 0 0',
        position: 'relative',
        display: 'flex',
        alignItems: center,
        justifyContent: center,
      },
      body: {
        padding: 10,
      },
      label: {
        fontSize: 18,
        color: getContrastingColor(hex),
        position: 'relative',
      },
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 10px 10px 10px',
        borderColor: `transparent transparent ${hex} transparent`,
        position: 'absolute',
        top: -10,
        left: '50%',
        marginLeft: -10,
      },
      input: {
        width: '100%',
        fontSize: 12,
        color: '#666',
        border: 0,
        outline: 'none',
        height: 22,
        boxShadow: 'inset 0 0 0 1px #ddd',
        borderRadius: 4,
        padding: '0 7px',
        boxSizing: 'border-box',
      },
    },
    'hide-triangle': {
      triangle: {
        display: 'none',
      },
    },
  }, passedStyles), { 'hide-triangle': triangle === 'hide' });

  const upperHex = hex.toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.triangle} />

      <View style={styles.head}>
        { transparent }
        <View style={styles.label}>
          { upperHex }
        </View>
      </View>

      <View style={styles.body}>
        <BlockSwatches colors={colors} onClick={handleChange} onSwatchHover={onSwatchHover} />
        <EditableInput
          style={{ input: styles.input }}
          value={hex}
          onChange={handleChange}
        />
      </View>
    </View>
  );
};


Block.defaultProps = {
  width: 170,
  colors: ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555',
    '#dce775', '#ff8a65', '#ba68c8'],
  triangle: 'top',
  styles: {},
  hex: '',
};


Block.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(['top', 'hide']),
  styles: PropTypes.shape({}),
  hex: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSwatchHover: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ColorWrap(Block);

import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import map from 'lodash/map';
import merge from 'lodash/merge';
import { isValidHex } from '../../helpers/color';

import ColorWrap from '../common/ColorWrap';
import EditableInput from '../common/EditableInput';
import Swatch from '../common/Swatch';
import { View, Text } from 'react-native';


const Twitter = ({
  onChange, onSwatchHover, hex, colors, width, triangle,
  styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      card: {
        width,
        backgroundColor: '#fff',
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
        paddingTop: 15,
        paddingRight: 9,
        paddingBottom: 9,
        paddingLeft: 15,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
      label: {
        fontSize: 18,
        color: '#fff',
      },
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 9,
        borderBottomWidth: 10,
        borderLeftWidth: 9,
        borderTopColor:'transparent',
        borderRightColor:'transparent',
        borderBottomColor: '#fff',
        borderLeftColor:'transparent',
        position: 'absolute',
      },
      triangleShadow: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: 9,
        borderBottomWidth: 10,
        borderLeftWidth: 9,
        borderTopColor:'transparent',
        borderRightColor:'transparent',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderLeftColor:'transparent',
        position: 'absolute',
      },
      viewHash: {
        backgroundColor: '#F0F0F0',
        height: 30,
        width: 30,
        borderTopEndRadius:4,
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        borderBottomEndRadius:0,
        borderBottomLeftRadius:4,
        borderTopLeftRadius:4,
        elevation: 3,
        display: 'flex',
        alignItems: 'center',
      },
      hash: {
        color: '#98A1A4',
      },
      input: {
        width: 110,
        fontSize: 14,
        color: '#666',
        height: 30,
        elevation: 1,
        paddingLeft: 8,
      },
      swatch: {
        width: 30,
        height: 30,
        borderRadius: 4,
        marginTop:0,
        marginRight:6,
        marginBottom:6,
        marginLeft:0,
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
        <View style={{...styles.viewHash, 
          justifyContent: 'center',
          }}>
            <Text style={styles.hash}>#</Text>
        </View>
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

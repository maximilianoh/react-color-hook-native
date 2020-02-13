import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { isValidHex } from '../../helpers/color';
import EditableInput from '../common/EditableInput';
import { View } from 'react-native';

const PhotoshopPicker = ({
  onChange, rgb, hsv, hex,
}) => {
  const styles = reactCSS({
    default: {
      fields: {
        paddingTop: 5,
        paddingBottom: 9,
        width: 80,
        position: 'relative',
      },
      Viewider: {
        height: 5,
      },
      RGBwrap: {
        position: 'relative',
      },
      RGBinput: {
        marginLeft: '40%',
        width: '40%',
        height: 18,
        border: '1px solid #888888',
        shadowColor: "#ECECEC",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 3,
        marginBottom: 5,
        fontSize: 13,
        paddingLeft: 3,
        marginRight: 10,
      },
      RGBlabel: {
        left: 0,
        width: 34,
        textTransform: 'uppercase',
        fontSize: 13,
        height: 18,
        lineHeight: 22,
        position: 'absolute',
      },
      HEXwrap: {
        position: 'relative',
      },
      HEXinput: {
        marginLeft: '20%',
        width: '80%',
        height: 18,
        border: '1px solid #888888',
        shadowColor: "#ECECEC",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 3,
        marginBottom: 6,
        fontSize: 13,
        paddingLeft: 3,
      },
      HEXlabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 14,
        textTransform: 'uppercase',
        fontSize: 13,
        height: 18,
        lineHeight: 22,
      },
      fieldSymbols: {
        position: 'absolute',
        top: 5,
        right: -7,
        fontSize: 13,
      },
      symbol: {
        height: 20,
        lineHeight: 22,
        paddingBottom: 7,
      },
    },
  });

  const handleChange = (data, e) => {
    if (data['#']) {
      if (isValidHex(data['#'])) {
        onChange({
          hex: data['#'],
          source: 'hex',
        }, e);
      }
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb',
      }, e);
    } else if (data.h || data.s || data.v) {
      onChange({
        h: data.h || hsv.h,
        s: data.s || hsv.s,
        v: data.v || hsv.v,
        source: 'hsv',
      }, e);
    }
  };

  return (
    <View style={styles.fields}>
      <EditableInput
        style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
        label="h"
        value={`${Math.round(hsv.h)}`}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
        label="s"
        value={`${Math.round(hsv.s * 100)}`}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
        label="v"
        value={`${Math.round(hsv.v * 100)}`}
        onChange={handleChange}
      />
      <View style={styles.Viewider} />
      <EditableInput
        style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
        label="r"
        value={`${rgb.r}`}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
        label="g"
        value={`${rgb.g}`}
        onChange={handleChange}
      />
      <EditableInput
        style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
        label="b"
        value={`${rgb.b}`}
        onChange={handleChange}
      />
      <View style={styles.Viewider} />
      <EditableInput
        style={{ wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel }}
        label="#"
        value={`${hex.replace('#', '')}`}
        onChange={handleChange}
      />
      <View style={styles.fieldSymbols}>
        <View style={styles.symbol}>°</View>
        <View style={styles.symbol}>%</View>
        <View style={styles.symbol}>%</View>
      </View>
    </View>
  );
};

PhotoshopPicker.propTypes = {
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }).isRequired,
  hsv: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    v: PropTypes.number,
  }).isRequired,
  hex: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

PhotoshopPicker.defaultProps = {
  onChange: () => {},
};
export default PhotoshopPicker;

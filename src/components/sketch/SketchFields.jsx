
import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { isValidHex } from '../../helpers/color';
import EditableInput from '../common/EditableInput';
import { View } from 'react-native';

const SketchFields = ({
  onChange, rgb, hsl, hex, disableAlpha,
}) => {
  const styles = reactCSS({
    default: {
      fields: {
        display: 'flex',
        paddingTop: 4,
      },
      single: {
        flex: 1,
        paddingLeft: 6,
      },
      alpha: {
        flex: 1,
        paddingLeft: 6,
      },
      double: {
        flex: 2,
      },
      input: {
        width: '80%',
        borderColor: '#dadada',
        borderStyle: 'solid',
        borderWidth: 1,
        textAlign:'center',
        fontSize: 11,
      },
      label: {
        display: 'flex',
        textAlign: 'center',
        fontSize: 11,
        color: '#222',
        paddingTop: 3,
        paddingBottom: 4,
        textTransform: 'capitalize',
      },
    },
    disableAlpha: {
      alpha: {
        display: 'none',
      },
    },
  }, { disableAlpha });

  const handleChange = (dataOriginal, e) => {
    const data = { ...dataOriginal };
    if (data.hex) {
      if (isValidHex(data.hex)) {
        onChange({
          hex: data.hex,
          source: 'hex',
        }, e);
      }
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: 'rgb',
      }, e);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }

      data.a /= 100;
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: 'hsl',
      }, e);
    }
  };

  return (
    <View style={styles.fields}>
      
      
      <View style={styles.double}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="hex"
          value={`${hex.replace('#', '')}`}
          onChange={handleChange}
        />
      </View>
      
      <View style={styles.single}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="r"
          value={`${rgb.r}`}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </View>
      
      <View style={styles.single}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="g"
          value={`${rgb.g}`}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </View>
      <View style={styles.single}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="b"
          value={`${rgb.b}`}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </View>
      <View style={styles.alpha}>
        <EditableInput
          style={{ input: styles.input, label: styles.label }}
          label="a"
          value={`${Math.round(rgb.a * 100)}`}
          onChange={handleChange}
          dragLabel="true"
          dragMax="100"
        />
      </View>
      
    </View>
  );
};

SketchFields.propTypes = {
  onChange: PropTypes.func,
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
    a: PropTypes.number,
  }).isRequired,
  hsl: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
  }).isRequired,
  hex: PropTypes.string.isRequired,
  disableAlpha: PropTypes.bool,
};

SketchFields.defaultProps = {
  onChange: () => {},
  disableAlpha: false,
};

export default SketchFields;

import React from 'react';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import { isValidHex } from '../../helpers/color';
import ColorWrap from '../common/ColorWrap';
import EditableInput from '../common/EditableInput';
import Raised from '../common/Raised';
import { View } from 'react-native';

const Material = ({
  onChange, hex, rgb,
  styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      material: {
        width: 98,
        height: 98,
        padding: 16,
        fontFamily: 'Roboto',
      },
      HEXwrap: {
        position: 'relative',
      },
      HEXinput: {
        width: '100%',
        marginTop: 12,
        fontSize: 15,
        color: '#333',
        padding: 0,
        border: 0,
        borderColor:hex,
        borderStyle:'solid',
        borderBottomWidth:2,
        outline: 'none',
        height: 30,
      },
      HEXlabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 11,
        color: '#999999',
        textTransform: 'capitalize',
      },
      Hex: {
        style: {

        },
      },
      RGBwrap: {
        position: 'relative',
      },
      RGBinput: {
        width: '100%',
        marginTop: 12,
        fontSize: 15,
        color: '#333',
        padding: 0,
        border: 0,
        borderColor:'#eee',
        borderStyle:'solid',
        borderBottomWidth:1,
        outline: 'none',
        height: 30,
      },
      RGBlabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 11,
        color: '#999999',
        textTransform: 'capitalize',
      },
      split: {
        display: 'flex',
        marginRight: -10,
        paddingTop: 11,
      },
      third: {
        flex: '1',
        paddingRight: 10,
      },
    },
  }, passedStyles));

  const handleChange = (data, e) => {
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
        source: 'rgb',
      }, e);
    }
  };

  return (
    <Raised styles={passedStyles}>
      <View style={styles.material}>
        <EditableInput
          style={{ wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel }}
          label="hex"
          value={`${hex}`}
          onChange={handleChange}
        />
        <View style={styles.split}>
          <View style={styles.third}>
            <EditableInput
              style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
              label="r"
              value={`${rgb.r}`}
              onChange={handleChange}
            />
          </View>
          <View style={styles.third}>
            <EditableInput
              style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
              label="g"
              value={`${rgb.g}`}
              onChange={handleChange}
            />
          </View>
          <View style={styles.third}>
            <EditableInput
              style={{ wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel }}
              label="b"
              value={`${rgb.b}`}
              onChange={handleChange}
            />
          </View>
        </View>
      </View>
    </Raised>
  );
};
Material.propTypes = {
  onChange: PropTypes.func.isRequired,
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }).isRequired,
  hex: PropTypes.string.isRequired,
  styles: PropTypes.shape({}),
};

Material.defaultProps = {
  styles: {},
};

export default ColorWrap(Material);

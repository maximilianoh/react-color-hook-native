import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import EditableInput from '../common/EditableInput';
import { View } from 'react-native';

const CompactFields = ({ hex, rgb, onChange }) => {
  const styles = reactCSS({
    default: {
      fields: {
        paddingBottom: 6,
        paddingRight: 5,
        position: 'relative',
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        width:"100%"
      },
      active: {
        position: 'absolute',
        top: 4,
        left: 2,
        height: 9,
        width: 9,
        backgroundColor: hex,
      },
      HEXwrap: {
        flex: 6,
        position: 'relative',
      },
      HEXinput: {
        width: '80%',
        padding: 0,
        paddingLeft: '20%',
        fontSize: 12,
        color: '#333',
        height: 16,
        borderColor:'#cccccc', 
        borderStyle:'solid', 
        borderBottomWidth:1
      },
      HEXlabel: {
        display: 'none',
      },
      RGBwrap: {
        flex: 3,
        position: 'relative',
      },
      RGBinput: {
        width: '80%',
        padding: 0,
        paddingLeft: '30%',
        fontSize: 12,
        color: '#333',
        height: 16,
        borderColor:'#cccccc', 
        borderStyle:'solid', 
        borderBottomWidth:1
      },
      RGBlabel: {
        position: 'absolute',
        left: 1,
        lineHeight: 16,
        textTransform: 'uppercase',
        fontSize: 12,
        color: '#999',
      },
    },
  })

  const handleChange = (data, e) => {
    if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: 'rgb',
      }, e);
    } else {
      onChange({
        hex: data.hex,
        source: 'hex',
      }, e);
    }
  };
  return (
    <View style={styles.fields}>
      <View style={styles.active} />
      <EditableInput
        style={{ wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel }}
        label="hex"
        value={`${hex}`}
        onChange={handleChange}
      />
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
    </View>
  );
};


CompactFields.propTypes = {
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }).isRequired,
  hex: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

CompactFields.defaultProps = {
  onChange: () => {},
};

export default CompactFields;

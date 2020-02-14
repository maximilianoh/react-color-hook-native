import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import map from 'lodash/map';
import merge from 'lodash/merge';
import { isValidHex } from '../../helpers/color';
import ColorWrap from '../common/ColorWrap';
import Raised from '../common/Raised';
import CompactColor from './CompactColor';
import CompactFields from './CompactFields';
import { View } from 'react-native';

const Compact = ({
  onChange, onSwatchHover, colors, hex, rgb,
  styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      Compact: {
        backgroundColor: '#f6f6f6',
        radius: 4,
      },
      compact: {
        paddingTop: 5,
        paddingLeft: 5,
        boxSizing: 'initial',
        width: 250,
        display: 'flex', 
      flexWrap: 'wrap',
      flexDirection: 'row', 
      },
      clear: {
        clear: 'both',
      },
    },
  }, passedStyles));

  const handleChange = (data, e) => {
    const value = data.hex ? data.hex : data;
    if (isValidHex(value)) {
      onChange({
        hex: value,
        source: 'hex',
      }, e);
    } else {
      onChange(data, e);
    }
  };

  return (
    <Raised style={styles.Compact} styles={passedStyles}>
      <View style={styles.compact}>
        { map(colors, (c) => (
          <CompactColor
          key={c}
          color={c}
          active={c.toLowerCase() === hex}
          onClick={handleChange}
          onSwatchHover={onSwatchHover}
          />
          )) }
        <View style={styles.clear} />
          {/*
        <CompactFields hex={hex} rgb={rgb} onChange={handleChange} />
        */}
      </View>
    </Raised>
  );
};

Compact.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onSwatchHover: PropTypes.func.isRequired,
  hex: PropTypes.string.isRequired,
  rgb: PropTypes.shape({}).isRequired,
};

Compact.defaultProps = {
  colors: ['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
    '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
    '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400',
    '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
    '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
    '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
  ],
  styles: {},
};

export default ColorWrap(Compact);

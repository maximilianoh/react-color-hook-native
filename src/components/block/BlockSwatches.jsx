import React from 'react';
import reactCSS from 'reactcss';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import Swatch from '../common/Swatch';
import { View } from 'react-native';

const BlockSwatches = ({ colors, onClick, onSwatchHover }) => {
  const styles = reactCSS({
    default: {
      swatches: {
        marginRight: '-10px',
      },
      swatch: {
        width: '22px',
        height: '22px',
        float: 'left',
        marginRight: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
      },
      clear: {
        clear: 'both',
      },
    },
  });

  return (
    <View style={styles.swatches}>
      { map(colors, (c) => (
        <Swatch
          key={c}
          color={c}
          style={styles.swatch}
          onClick={onClick}
          onHover={onSwatchHover}
          focusStyle={{
            boxShadow: `0 0 4px ${c}`,
          }}
        />
      )) }
      <View style={styles.clear} />
    </View>
  );
};

export default BlockSwatches;


BlockSwatches.defaultProps = {
  onSwatchHover: () => {},
  onClick: () => {},
};

BlockSwatches.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
};

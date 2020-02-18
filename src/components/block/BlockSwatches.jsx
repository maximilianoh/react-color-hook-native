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
        marginRight: -10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
      },
      swatch: {
        width: 22,
        height: 22,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 4,
      },
      clear: {
        clear: 'both',
      },
    },
  });

  return (
    <View style={styles.swatches}>
      {map(colors, (c) => (
        <Swatch
          key={c}
          color={c}
          style={styles.swatch}
          onClick={onClick}
          onHover={onSwatchHover}
          focusStyle={{
            shadowColor: c,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 4,
            elevation: 3,
          }}
        />
      ))}
      <View style={styles.clear} />
    </View>
  );
};

export default BlockSwatches;


BlockSwatches.defaultProps = {
  onSwatchHover: () => { },
  onClick: () => { },
};

BlockSwatches.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
};

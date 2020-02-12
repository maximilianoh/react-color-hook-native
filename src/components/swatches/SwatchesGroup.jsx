import React from 'react';
import reactCSS from 'reactcss';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import SwatchesColor from './SwatchesColor';
import { View } from 'react-native';

const SwatchesGroup = ({
  onClick, onSwatchHover, group, active,
}) => {
  const styles = reactCSS({
    default: {
      group: {
        paddingBottom: 10,
        width: 40,
        float: 'left',
        marginRight: 10,
      },
    },
  });

  return (
    <View style={styles.group}>
      {map(group, (color, i) => (
        <SwatchesColor
          key={color}
          color={color}
          active={color.toLowerCase() === active}
          first={i === 0}
          last={i === group.length - 1}
          onClick={onClick}
          onSwatchHover={onSwatchHover}
        />
      ))}
    </View>
  );
};

SwatchesGroup.propTypes = {
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
  group: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.string.isRequired,
};

SwatchesGroup.defaultProps = {
  onClick: () => {},
  onSwatchHover: () => {},
};

export default SwatchesGroup;

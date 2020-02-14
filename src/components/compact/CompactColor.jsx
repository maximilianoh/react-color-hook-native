import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { getContrastingColor } from '../../helpers/color';
import Swatch from '../common/Swatch';
import { View } from 'react-native';

const CompactColor = ({
  color, onClick = () => { }, onSwatchHover, active,
}) => {
  const styles = reactCSS({
    default: {
      color: {
        backgroundColor: color,
        width: 15,
        height: 15,
        float: 'left',
        marginRight: 5,
        marginBottom: 5,
        position: 'relative',
        cursor: 'pointer',
      },
      dot: {
        top: 5,
        left: 5,
        bottom: 5,
        rigth: 5,
        backgroundColor: getContrastingColor(color),
        borderRadius: 20,
        opacity: 0,
      },
    },
    active: {
      dot: {
        opacity: 1,
      },
    },
    'color-#FFFFFF': {
      color: {
        shadowColor: "#ddd",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
      },
      dot: {
        backgroundColor: '#000',
      },
    },
    transparent: {
      dot: {
        backgroundColor: '#000',
      },
    },
  }, { active, 'color-#FFFFFF': color === '#FFFFFF', transparent: color === 'transparent' });

  return (
    <Swatch
      style={styles.color}
      color={color}
      onClick={onClick}
      onHover={onSwatchHover}
      focusStyle={{
        shadowColor: color,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      }}
    >
      <View style={styles.dot} />
    </Swatch>
  );
};

CompactColor.propTypes = {
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
  color: PropTypes.string,
  active: PropTypes.bool,
};

CompactColor.defaultProps = {
  onClick: () => { },
  onSwatchHover: () => { },
  color: '',
  active: false,
};
export default CompactColor;

import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export const SliderPointer = ({ direction }) => {
  const styles = reactCSS({
    default: {
      picker: {
        width: 18,
        height: 18,
        borderRadius: '50%',
        transform: [{translateX:-9}, {translateY:-1}],
        backgroundColor: 'rgb(248, 248, 248)',
        shadowColor: "rgba(0, 0, 0, 0.37)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 4,
        shadowOpacity: 0,
        elevation: 3,
      },
    },
    vertical: {
      picker: {
        transform: [{translateX:1}, {translateY:-9}],
      },
    },
  }, { vertical: direction === 'vertical' });

  return (
    <View style={styles.picker} />
  );
};

SliderPointer.propTypes = {
  direction: PropTypes.string,
};
SliderPointer.defaultProps = {
  direction: 'horizontal',
};

export default SliderPointer;

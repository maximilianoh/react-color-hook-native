import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const AlphaPointer = ({ direction }) => {
  const styles = reactCSS({
    default: {
      picker: {
        width: 18,
        height: 18,
        borderRadius: 20,
        transform: [{translateX:-9}, {translateY:-1}],
        backgroundColor: 'rgb(248, 248, 248)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        shadowColor:'rgba(0, 0, 0, 0.37)',
      },
    },
    vertical: {
      picker: {
        transform: [{translateX:-2}, {translateY:-9}],
      },
    },
  }, { vertical: direction === 'vertical' });

  return (
    <View style={styles.picker} />
  );
};


AlphaPointer.defaultProps = {
  direction: 'horizontal',
};

AlphaPointer.propTypes = {
  direction: PropTypes.string,
};
export default AlphaPointer;

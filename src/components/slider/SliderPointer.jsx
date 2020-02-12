import React from 'react';
import reactCSS from 'reactcss';
import { View } from 'react-native';

const SliderPointer = () => {
  const styles = reactCSS({
    default: {
      picker: {
        width: 14,
        height: 14,
        borderRadius: 6,
        transform: 'translate(-7px, -1px)',
        backgroundColor: 'rgb(248, 248, 248)',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  });

  return (
    <View style={styles.picker} />
  );
};

export default SliderPointer;

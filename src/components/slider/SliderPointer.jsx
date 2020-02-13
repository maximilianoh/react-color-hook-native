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
  });

  return (
    <View style={styles.picker} />
  );
};

export default SliderPointer;

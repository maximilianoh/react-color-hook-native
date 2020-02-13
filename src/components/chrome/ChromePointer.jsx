import React from 'react';
import reactCSS from 'reactcss';
import { View } from 'react-native';

const ChromePointer = () => {
  const styles = reactCSS({
    default: {
      picker: {
        width: 12,
        height: 12,
        borderRadius: 6,
        transform: [{translateX:-6}, {translateY:-1}],
        backgroundColor: 'rgb(248, 248, 248)',
        shadowColor: "rgba(0, 0, 0, 0.37)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0,
        shadowRadius: 4,
        elevation: 3,
        
      },
    },
  });

  return (
    <View style={styles.picker} />
  );
};

export default ChromePointer;

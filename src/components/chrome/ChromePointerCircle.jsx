import React from 'react';
import reactCSS from 'reactcss';
import { View } from 'react-native';
const ChromePointerCircle = () => {
  const styles = reactCSS({
    default: {
      picker: {
        width: 12,
        height: 12,
        borderRadius: 6,
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
        transform: [{translateX:-6}, {translateY:-6}],
      },
    },
  });

  return (
    <View style={styles.picker} />
  );
};

export default ChromePointerCircle;

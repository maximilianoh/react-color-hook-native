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
        boxShadow: 'inset 0 0 0 1px #fff',
        transform: 'translate(-6px, -6px)',
      },
    },
  });

  return (
    <View style={styles.picker} />
  );
};

export default ChromePointerCircle;

import React from 'react';
import reactCSS from 'reactcss';
import { View } from 'react-native';
const ChromePointerCircle = () => {
  const styles = reactCSS({
    default: {
      picker: {
        width: '12px',
        height: '12px',
        borderRadius: '6px',
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

import React from 'react';
import reactCSS from 'reactcss';
import { View } from 'react-native';

const PhotoshopPointerCircle = () => {
  const styles = reactCSS({
    default: {
      triangle: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '4px 0 4px 6px',
        borderColor: 'transparent transparent transparent #fff',
        position: 'absolute',
        top: 1,
        left: 1,
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '5px 0 5px 8px',
        borderColor: 'transparent transparent transparent #555',
      },

      left: {
        Extend: 'triangleBorder',
        transform: 'translate(-13px, -4px)',
      },
      leftInside: {
        Extend: 'triangle',
        transform: 'translate(-8px, -5px)',
      },

      right: {
        Extend: 'triangleBorder',
        transform: 'translate(20px, -14px) rotate(180deg)',
      },
      rightInside: {
        Extend: 'triangle',
        transform: 'translate(-8px, -5px)',
      },
    },
  });

  return (
    <View style={styles.pointer}>
      <View style={styles.left}>
        <View style={styles.leftInside} />
      </View>

      <View style={styles.right}>
        <View style={styles.rightInside} />
      </View>
    </View>
  );
};

export default PhotoshopPointerCircle;

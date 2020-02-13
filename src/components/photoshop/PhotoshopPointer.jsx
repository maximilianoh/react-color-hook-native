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
        borderTopWidth:4,
        borderRightWidth:0,
        borderBottomWidth:4,
        borderLeftWidth:6,
        borderTopColor:'transparent',
        borderRightColor:'transparent',
        borderBottomColor:'transparent',
        borderLeftColor:'#fff',
        position: 'absolute',
        top: 1,
        left: 1,
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderTopWidth:5,
        borderRightWidth:0,
        borderBottomWidth:5,
        borderLeftWidth:8,
        borderTopColor:'transparent',
        borderRightColor:'transparent',
        borderBottomColor:'transparent',
        borderLeftColor:'#555',
      },

      left: {
        Extend: 'triangleBorder',
        transform: [{translateX:-13}, {translateY:-4}],
      },
      leftInside: {
        Extend: 'triangle',
        transform: [{translateX:-8}, {translateY:-5}],
      },

      right: {
        Extend: 'triangleBorder',
        transform: [{translateX:20}, {translateY:-14}, { rotate: '180deg' }],
      },
      rightInside: {
        Extend: 'triangle',
        transform: [{translateX:-8}, {translateY:-5}],
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

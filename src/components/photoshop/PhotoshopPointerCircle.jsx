import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const PhotoshopPointerCircle = ({ hsl }) => {
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
        transform: 'translate(-6px, -6px)',
      },
    },
    'black-outline': {
      picker: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
      },
    },
  }, { 'black-outline': hsl.l > 0.5 });

  return (
    <View style={styles.picker} />
  );
};

PhotoshopPointerCircle.propTypes = {
  hsl: PropTypes.shape({
    l: PropTypes.number,
  }).isRequired,
};


export default PhotoshopPointerCircle;

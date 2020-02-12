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
        boxShadow: 'inset 0 0 0 1px #fff',
        transform: 'translate(-6px, -6px)',
      },
    },
    'black-outline': {
      picker: {
        boxShadow: 'inset 0 0 0 1px #000',
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

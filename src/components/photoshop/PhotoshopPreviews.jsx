import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const PhotoshopPreviews = ({ rgb, currentColor }) => {
  const styles = reactCSS({
    default: {
      swatches: {
        border: '1px solid #B3B3B3',
        borderBottom: '1px solid #F0F0F0',
        marginBottom: 2,
        marginTop: 1,
      },
      new: {
        height: 34,
        background: `rgb(${rgb.r},${rgb.g}, ${rgb.b})`,
        boxShadow: 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000',
      },
      current: {
        height: 34,
        background: currentColor,
        boxShadow: 'inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 -1px 0 #000',
      },
      label: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
      },
    },
  });

  return (
    <View>
      <View style={styles.label}>new</View>
      <View style={styles.swatches}>
        <View style={styles.new} />
        <View style={styles.current} />
      </View>
      <View style={styles.label}>current</View>
    </View>
  );
};

PhotoshopPreviews.propTypes = {
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }).isRequired,
  currentColor: PropTypes.string,
};

PhotoshopPreviews.defaultProps = {
  currentColor: '',
};
export default PhotoshopPreviews;

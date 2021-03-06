import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const PhotoshopPreviews = ({ rgb, currentColor }) => {
  const styles = reactCSS({
    default: {
      swatches: {
        borderStyle:'solid',
        borderColor:'#B3B3B3',
        borderWidth:1,
        borderBottomColor:"#F0F0F0",
        borderBottomWidth:1,
        marginBottom: 2,
        marginTop: 1,
      },
      new: {
        height: 34,
        backgroundColor: `rgb(${rgb.r},${rgb.g}, ${rgb.b})`,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 3,
      },
      current: {
        height: 34,
        backgroundColor: currentColor,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 3,
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
      <Text style={styles.label}>new</Text>
      <View style={styles.swatches}>
        <View style={styles.new} />
        <View style={styles.current} />
      </View>
      <Text style={styles.label}>current</Text>
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

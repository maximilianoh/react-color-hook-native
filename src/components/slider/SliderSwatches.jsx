import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import SliderSwatch from './SliderSwatch';
import { View } from 'react-native';

const SliderSwatches = ({ onClick, hsl }) => {
  const styles = reactCSS({
    default: {
      swatches: {
        marginTop: 20,
      },
      swatch: {
        boxSizing: 'border-box',
        width: '20%',
        paddingRight: 1,
        float: 'left',
      },
      clear: {
        clear: 'both',
      },
    },
  });

  // Acceptible difference in floating point equality
  const epsilon = 0.1;

  return (
    <View style={styles.swatches}>
      <View style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.80}
          active={Math.abs(hsl.l - 0.80) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
          first
        />
      </View>
      <View style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.65}
          active={Math.abs(hsl.l - 0.65) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
        />
      </View>
      <View style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.50}
          active={Math.abs(hsl.l - 0.50) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
        />
      </View>
      <View style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.35}
          active={Math.abs(hsl.l - 0.35) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
        />
      </View>
      <View style={styles.swatch}>
        <SliderSwatch
          hsl={hsl}
          offset={0.20}
          active={Math.abs(hsl.l - 0.20) < epsilon
            && Math.abs(hsl.s - 0.50) < epsilon}
          onClick={onClick}
          last
        />
      </View>
      <View style={styles.clear} />
    </View>
  );
};

SliderSwatches.propTypes = {
  onClick: PropTypes.func,
  hsl: PropTypes.shape({
    l: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
};

SliderSwatches.defaultProps = {
  onClick: () => {},
};

export default SliderSwatches;

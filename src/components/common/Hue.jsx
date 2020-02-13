import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { hueStyle } from './commonStyles';
import calculateChange from '../../helpers/hue';
import { View, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Hue = (props) => {
  const inputRef = useRef();
  const handleChange = async (e) => {
    const change = await calculateChange(e.nativeEvent, props.direction, props.hsl, inputRef.current);
    if (change && typeof props.onChange === 'function') props.onChange(change, e);
  };

  const handleMouseUp = () => {
    AppState.removeEventListener('change', handleChange);
  };

  const handleMouseDown = (e) => {
    handleChange(e);
    AppState.addEventListener('change', handleChange);
  };

  useEffect(() => () => handleMouseUp(), []);

  const {
    direction, radius, shadow, hsl, pointer,
  } = props;
  const styles = hueStyle(direction, radius, hsl);

  const Pointer = pointer;
  return (
    <View style={styles.hue} ref={inputRef}>
      <View
        role="button"
        tabIndex={1}
        style={styles.container}
        onResponderStart={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <LinearGradient
          colors={['#f00', '#f0f', '#00f', '#0ff', '#0f0', '#ff0', '#f00' ]}
          start={[1, 1]}
          style={{ width: "100%", height: "100%", borderRadius: props.radius }}>

          <View style={styles.pointer}>
            {Pointer ? (
              <Pointer {...props} />
            ) : (
                <View style={styles.slider} />
              )}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

Hue.defaultProps = {
  direction: 'horizontal',
  radius: 0,
  pointer: null,
};

Hue.propTypes = {
  direction: PropTypes.string,
  hsl: PropTypes.shape({
    h: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  radius: PropTypes.number,
  pointer: PropTypes.func,
};

export default Hue;

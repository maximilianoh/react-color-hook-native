import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import calculateChange from '../../helpers/alpha';
import { alphaStyle } from './commonStyles';
import { View, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Alpha = (props) => {
  const inputRef = useRef(null);
  const handleChange = async (e) => {
    const change = await calculateChange(e.nativeEvent, props.hsl, props.direction, props.a, inputRef.current);
    if (change && typeof props.onChange === 'function') props.onChange(change, e);
  };
  const handleMouseUp = () => {
    AppState.removeEventListener('change', handleChange);
  };

  const handleMouseDown = (e) => {
    handleChange(e);
    AppState.addEventListener('change', handleChange);
  };


  useEffect(() => { handleMouseUp(); }, []);

  const { rgb, pointer } = props;
  const styles = alphaStyle(props, rgb);
  return (
    <View style={styles.alpha} ref={inputRef}>
      <View
        style={styles.container}
        role="button"
        tabIndex={1}
        onResponderStart={handleMouseDown}
        onTouchMove={handleChange}
        onTouchStart={handleChange}
      >
        <LinearGradient
          colors={['rgba(25, 77, 51, 1)', 'rgba(25, 77, 51, 0)']}
          start={[1, 1]}
          style={{ width: "100%", height: "100%", borderRadius: props.radius }}>
          <View style={styles.pointer}>
            {pointer ? (
              <props.pointer {...props} />
            ) : (
                <View style={styles.slider} />
              )}
          </View>
        </LinearGradient>
      </View>

    </View>
  );
};

export default Alpha;


Alpha.defaultProps = {
  a: null,
  direction: 'horizontal',
  pointer: null,
};
Alpha.propTypes = {
  hsl: PropTypes.shape({}).isRequired,
  direction: PropTypes.string,
  a: PropTypes.number,
  rgb: PropTypes.shape({}).isRequired,
  pointer: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

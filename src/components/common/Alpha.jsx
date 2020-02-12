import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import calculateChange from '../../helpers/alpha';
import { alphaStyle } from './commonStyles';
import { View, AppState, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Alpha = (props) => {
  const inputRef = useRef(null);
  const handleChange = (e) => {
    const change = calculateChange(e, props.hsl, props.direction, props.a, inputRef.current);
    if (change && typeof props.onChange === 'function') props.onChange(change, e);
  };
  const handleMouseUp = () => {
    console.log("-------");
    AppState.removeEventListener('change', handleChange);
    AppState.removeEventListener('change', handleMouseUp);
  };

  const handleMouseDown = (e) => {
    console.log("////////////");
    handleChange(e);
    AppState.addEventListener('change', handleChange);
    AppState.addEventListener('change', handleMouseUp);
  };


  useEffect(() => { handleMouseUp(); }, []);

  const { rgb, pointer } = props;
  const styles = alphaStyle(props, rgb);
  return (
    <View style={styles.alpha}>
      <View
        style={styles.container}
        ref={inputRef}
        role="button"
        tabIndex={0}
        onResponderStart={handleMouseDown}
        onTouchMove={handleChange}
        onTouchEnd={handleChange}
      >
        <LinearGradient
          colors={['rgba(25, 77, 51, 0)', 'rgba(25, 77, 51, 1)']}
          start={[1,1]}
          style={{ width:"100%", height:"100%", borderRadius: props.radius }}>
            {pointer ? (
            <props.pointer {...props} />
          ) : (
            <View style={styles.slider} />
          )}
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

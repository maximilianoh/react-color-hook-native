import React, { useRef, useEffect } from 'react';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import calculateChange from '../../helpers/saturation';
import { saturationStyle } from './commonStyles';
import { View, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Saturation = (props) => {
  const inputRef = useRef();
  const throttleLocal = throttle((fn, data, e) => {
    fn(data, e);
  }, 50);

  const handleChange = (e) => {
    if (typeof props.onChange === 'function') {
      throttleLocal(
        props.onChange,
        calculateChange(e, props.hsl, inputRef.current),
        e,
      );
    }
  };

  const handleMouseUp = () => {
    AppState.removeEventListener('change', handleChange);
  };

  const handleMouseDown = (e) => {
    handleChange(e);
    AppState.addEventListener('change', handleChange);
  };

  useEffect(() => () => {
    throttleLocal.cancel();
    handleMouseUp();
  }, []);

  const {
    style, hsl, radius, shadow, hsv, pointer,
  } = props;
  const {
    color, white, black, circle,
  } = style || {};
  const point = style && style.pointer ? style.pointer : '';
  const styles = saturationStyle(hsl, radius, shadow, hsv, color,
    white, black, circle, point, style);
  const Pointer = pointer;
  return (
    <View
      role="button"
      tabIndex={0}
      style={styles.color}
      ref={inputRef}
      onMouseDown={handleMouseDown}
      onTouchMove={handleChange}
      onTouchStart={handleChange}
    >
      {/*
      <style>
        {`
        .saturation-white {
          background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));
          background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        }
        .saturation-black {
          background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));
          background: linear-gradient(to top, #000, rgba(0,0,0,0));
        }
      `}
      </style>
    
      */}
      <LinearGradient
        start={[1,1]}
        colors={[ 'rgba(255,255,255,0)','#fff',]}
        style={{ width: "100%", height: "100%", borderRadius: props.radius }}>          
          <LinearGradient
          colors={['rgba(0,0,0,0)', '#000']}
          style={{ width: "100%", height: "100%", borderRadius: props.radius }}
          />          
      </LinearGradient>

      {/*
      <View style={styles.white}>
        <View style={styles.black} />
        <View style={styles.pointer}>
          {Pointer ? (
            <Pointer {...props} />
          ) : (
            <View style={styles.circle} />
          )}
        </View>
      </View>
        */}
    </View>
  );
};


Saturation.defaultProps = {
  radius: 0,
  shadow: '',
  style: {},
  pointer: null,
};

Saturation.propTypes = {
  onChange: PropTypes.func.isRequired,
  hsl: PropTypes.shape({
    h: PropTypes.number,
    v: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
  style: PropTypes.shape({
    pointer: PropTypes.string,
  }),
  hsv: PropTypes.shape({
    v: PropTypes.number,
    s: PropTypes.number,
  }).isRequired,
  pointer: PropTypes.func,
  shadow: PropTypes.string,
  radius: PropTypes.number,
};

export default Saturation;

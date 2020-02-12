import React, { useRef, useEffect } from 'react';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import calculateChange from '../../helpers/saturation';
import { saturationStyle } from './commonStyles';
import { View } from 'react-native';

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
    window.removeEventListener('mousemove', handleChange);
    window.removeEventListener('mouseup', handleMouseUp);
  };


  const handleMouseDown = (e) => {
    handleChange(e);
    window.addEventListener('mousemove', handleChange);
    window.addEventListener('mouseup', handleMouseUp);
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
      <View style={styles.white} className="saturation-white">
        <View style={styles.black} className="saturation-black" />
        <View style={styles.pointer}>
          {Pointer ? (
            <Pointer {...props} />
          ) : (
            <View style={styles.circle} />
          )}
        </View>
      </View>
    </View>
  );
};


Saturation.defaultProps = {
  radius: '',
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
  radius: PropTypes.string,
};

export default Saturation;

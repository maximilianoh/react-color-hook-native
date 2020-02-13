import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import map from 'lodash/map';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import GithubSwatch from './GithubSwatch';
import { View } from 'react-native';

const Github = ({
  width, colors, onChange, onSwatchHover, triangle,
  styles: passedStyles = {},
}) => {
  const styles = reactCSS(merge({
    default: {
      card: {
        width,
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.2)',
        boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
        borderRadius: 4,
        position: 'relative',
        padding: 5,
        msBoxorient: 'horizontal',
        display: 'flex',
        flexWrap: 'wrap',
      },
      triangle: {
        position: 'absolute',
        border: '7px solid transparent',
        borderBottomColor: '#fff',
      },
      triangleShadow: {
        position: 'absolute',
        border: '8px solid transparent',
        borderBottomColor: 'rgba(0,0,0,0.15)',
      },
    },
    'hide-triangle': {
      triangle: {
        display: 'none',
      },
      triangleShadow: {
        display: 'none',
      },
    },
    'top-left-triangle': {
      triangle: {
        top: -14,
        left: 10,
      },
      triangleShadow: {
        top: -16,
        left: 9,
      },
    },
    'top-right-triangle': {
      triangle: {
        top: 14,
        right: 10,
      },
      triangleShadow: {
        top: 16,
        right: 9,
      },
    },
    'bottom-left-triangle': {
      triangle: {
        top: 35,
        left: 10,
        transform: 'rotate(180deg)',
      },
      triangleShadow: {
        top: 37,
        left: 9,
        transform: 'rotate(180deg)',
      },
    },
    'bottom-right-triangle': {
      triangle: {
        top: 35,
        right: 10,
        transform: 'rotate(180deg)',
      },
      triangleShadow: {
        top: 37,
        right: 9,
        transform: 'rotate(180deg)',
      },
    },
  }, passedStyles), {
    'hide-triangle': triangle === 'hide',
    'top-left-triangle': triangle === 'top-left',
    'top-right-triangle': triangle === 'top-right',
    'bottom-left-triangle': triangle === 'bottom-left',
    'bottom-right-triangle': triangle === 'bottom-right',
  });

  const handleChange = (hex, e) => onChange({ hex, source: 'hex' }, e);
  return (
    <View style={styles.card}>
      <View style={styles.triangleShadow} />
      <View style={styles.triangle} />
      {map(colors, (c) => (
        <View key={`ViewSwatch${c}`}>
          <GithubSwatch
            color={c}
            key={c}
            onClick={handleChange}
            onSwatchHover={onSwatchHover}
          />
        </View>
      ))}
    </View>
  );
};

Github.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(['hide', 'top-left', 'top-right', 'bottom-left', 'bottom-right']),
  styles: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onSwatchHover: PropTypes.func.isRequired,
};

Github.defaultProps = {
  width: 200,
  colors: ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
    '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'],
  triangle: 'top-left',
  styles: {},
};

export default ColorWrap(Github);

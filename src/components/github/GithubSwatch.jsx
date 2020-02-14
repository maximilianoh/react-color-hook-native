import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import Swatch from '../common/Swatch';
import { View } from 'react-native';

const GithubSwatch = ({
  color, onClick, onSwatchHover,
}) => {
  const hoverSwatch = {
    position: 'relative',
    zIndex: '2',
    borderColor:"#fff",
    borderStyle:"solid",
    borderWidth:2,
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 2,
    elevation: 3,
  };

  const styles = reactCSS({
    default: {
      swatch: {
        width: 25,
        height: 25,
        fontSize: '0',
      },
    },
    hover: {
      swatch: hoverSwatch,
    },
  });

  return (
    <View style={styles.swatch}>
      <Swatch
        color={color}
        onClick={onClick}
        onHover={onSwatchHover}
        focusStyle={hoverSwatch}
      />
    </View>
  );
};

GithubSwatch.propTypes = {
  onSwatchHover: PropTypes.func,
  onClick: PropTypes.func,
  color: PropTypes.string.isRequired,
};

GithubSwatch.defaultProps = {
  onSwatchHover: () => { },
  onClick: () => { },
};

export default GithubSwatch;

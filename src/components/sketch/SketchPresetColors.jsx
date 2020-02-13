import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import Swatch from '../common/Swatch';
import { View } from 'react-native';

const SketchPresetColors = ({ colors, onClick, onSwatchHover }) => {
  const styles = reactCSS({
    default: {
      colors: {
        marginTop:0,
        marginRight:-10,
        marginBottom:0,
        marginLeft:-10,
        paddingTop: 10,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        borderStyle:'solid',
        borderBottomWidth:1,
        borderBottomColor: "#eee",
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
      },
      swatchWrap: {
        width: 16,
        height: 16,
        marginTop:0,
        marginRight:10,
        marginBottom:10,
        marginLeft:0,
      },
      swatch: {
        borderRadius: 3,
        shadowColor: "rgba(0,0,0,.15)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
      },
    },
    'no-presets': {
      colors: {
        display: 'none',
      },
    },
  }, {
    'no-presets': !colors || !colors.length,
  });

  const handleClick = (hex, e) => {
    onClick({
      hex,
      source: 'hex',
    }, e);
  };

  return (
    <View style={styles.colors}>
      {colors.map((colorObjOrString) => {
        const c = typeof colorObjOrString === 'string'
          ? { color: colorObjOrString }
          : colorObjOrString;
        const key = `${c.color}${c.title || ''}`;
        return (
          <View key={key} style={styles.swatchWrap}>
            <Swatch
              {...c}
              style={styles.swatch}
              onClick={handleClick}
              onHover={onSwatchHover}
              focusStyle={{
                shadowColor: c.color,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 4,
                shadowOpacity: 0,
                elevation: 3,
              }}
            />
          </View>
        );
      })}
    </View>
  );
};

SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
    })])).isRequired,
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func,
};

SketchPresetColors.defaultProps = {
  onClick: () => { },
  onSwatchHover: () => { },
};

export default SketchPresetColors;

import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import Swatch from '../common/Swatch';
import '../common/style.css';

const SketchPresetColors = ({ colors, onClick, onSwatchHover }) => {
  const styles = reactCSS({
    default: {
      colors: {
        margin: '0 -10px',
        padding: '10px 0 0 10px',
        borderTop: '1px solid #eee',
        position: 'relative',
      },
      swatchWrap: {
        width: '16px',
        height: '16px',
        margin: '0 10px 10px 0',
      },
      swatch: {
        borderRadius: '3px',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.15)',
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
    <div style={styles.colors} className="flexContent flexbox-fix">
      {colors.map((colorObjOrString) => {
        const c = typeof colorObjOrString === 'string'
          ? { color: colorObjOrString }
          : colorObjOrString;
        const key = `${c.color}${c.title || ''}`;
        return (
          <div key={key} style={styles.swatchWrap}>
            <Swatch
              {...c}
              style={styles.swatch}
              onClick={handleClick}
              onHover={onSwatchHover}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
              }}
            />
          </div>
        );
      })}
    </div>
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
  onClick: () => {},
  onSwatchHover: () => {},
};

export default SketchPresetColors;

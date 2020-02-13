import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const PhotoshopButton = ({
  onClick, label, children, active,
}) => {
  const styles = reactCSS({
    default: {
      button: {
        backgroundImage: 'linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)',
        border: '1px solid #878787',
        borderRadius: 2,
        height: '20px',
        shadowColor: "#EAEAEA",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 0,
        shadowOpacity: 0,
        elevation: 3,
        fontSize: '14px',
        color: '#000',
        lineHeight: '20px',
        textAlign: 'center',
        marginBottom: '10px',
        cursor: 'pointer',
      },
    },
    active: {
      button: {
        shadowColor: "#878787",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        elevation: 3,
      },
    },
  }, { active });

  return (
    <View style={styles.button} onClick={onClick} onKeyDown={onClick} role="button" tabIndex={0}>
      { label || children }
    </View>
  );
};

PhotoshopButton.defaultProps = {
  active: false,
  children: {},
  onClick: () => {},
};

PhotoshopButton.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  children: PropTypes.shape({}),
  active: PropTypes.bool,
};

export default PhotoshopButton;

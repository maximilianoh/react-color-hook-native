import React from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

const PhotoshopButton = ({
  onClick, label, children, active,
}) => {
  const styles = reactCSS({
    default: {
      button: {
        borderColor:'#878787',
        borderStyle:'solid',
        borderWidth:1,
        height: 20,
        margin: 10,
      },
      title:{
        color:'black'
      }
    },
    active: {
      button: {
      },
    },
  }, { active });

  return (
    <Button buttonStyle={styles.button} titleStyle={styles.title} type="outline" onPress={onClick} title={label || children } >
    </Button>
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

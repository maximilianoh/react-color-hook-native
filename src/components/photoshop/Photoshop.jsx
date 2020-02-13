import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import merge from 'lodash/merge';
import ColorWrap from '../common/ColorWrap';
import Saturation from '../common/Saturation';
import Hue from '../common/Hue';
import PhotoshopFields from './PhotoshopFields';
import PhotoshopPointerCircle from './PhotoshopPointerCircle';
import PhotoshopPointer from './PhotoshopPointer';
import PhotoshopButton from './PhotoshopButton';
import PhotoshopPreviews from './PhotoshopPreviews';
import { View } from 'react-native';

const Photoshop = (props) => {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');

  const { styles: passedStyles = {} } = props;

  const styles = reactCSS(merge({
    default: {
      picker: {
        background: '#DCDCDC',
        borderRadius: 4,
        boxShadow: '0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)',
        boxSizing: 'initial',
        width: 513,
      },
      head: {
        backgroundImage: 'linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)',
        borderBottom: '1px solid #B1B1B1',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)',
        height: 23,
        lineHeight: 24,
        borderRadius: '4px 4px 0 0',
        fontSize: 13,
        color: '#4D4D4D',
        textAlign: 'center',
      },
      body: {
        padding: '15px 15px 0',
        display: 'flex',
      },
      saturation: {
        width: 256,
        height: 256,
        position: 'relative',
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
        overflow: 'hidden',
      },
      hue: {
        position: 'relative',
        height: 256,
        width: 19,
        marginLeft: 10,
        border: '2px solid #B3B3B3',
        borderBottom: '2px solid #F0F0F0',
      },
      controls: {
        width: 180,
        marginLeft: 10,
      },
      top: {
        display: 'flex',
      },
      previews: {
        width: 60,
      },
      actions: {
        flex: '1',
        marginLeft: 20,
      },
    },
  }, passedStyles));

  const {
    header, onChange, hsl, hsv, rgb, onAccept, onCancel, hex,
  } = props;
  useEffect(() => setCurrentColor(hex), []);
  return (
    <View style={styles.picker}>
      <View style={styles.head}>{header}</View>

      <View style={styles.body}>
        <View style={styles.saturation}>
          <Saturation
            hsl={hsl}
            hsv={hsv}
            pointer={PhotoshopPointerCircle}
            onChange={onChange}
          />
        </View>
        <View style={styles.hue}>
          <Hue
            direction="vertical"
            hsl={hsl}
            pointer={PhotoshopPointer}
            onChange={onChange}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.top}>
            <View style={styles.previews}>
              <PhotoshopPreviews
                rgb={rgb}
                currentColor={currentColor}
              />
            </View>
            <View style={styles.actions}>
              <PhotoshopButton label="OK" onClick={onAccept} active />
              <PhotoshopButton label="Cancel" onClick={onCancel} />
              <PhotoshopFields
                onChange={onChange}
                rgb={rgb}
                hsv={hsv}
                hex={hex}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

Photoshop.propTypes = {
  header: PropTypes.string,
  styles: PropTypes.shape({}),
  onChange: PropTypes.func,
  onAccept: PropTypes.func,
  onCancel: PropTypes.func,
  hsl: PropTypes.shape({}).isRequired,
  hsv: PropTypes.shape({}).isRequired,
  rgb: PropTypes.shape({}).isRequired,
  hex: PropTypes.string.isRequired,
};

Photoshop.defaultProps = {
  header: 'Color Picker',
  styles: {},
  onCancel: () => {},
  onAccept: () => {},
  onChange: () => {},
};

export default ColorWrap(Photoshop);

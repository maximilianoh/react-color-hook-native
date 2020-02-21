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
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Photoshop = (props) => {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');

  const { styles: passedStyles = {} } = props;

  const styles = reactCSS(merge({
    default: {
      picker: {
        backgroundColor: '#DCDCDC',
        borderRadius: 4,
        shadowColor: "rgba(0,0,0,0.15)",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 16,
        shadowOpacity: 0,
        elevation: 3,
        boxSizing: 'initial',
        width: 300,
      },
      head: {
        borderColor: '#B1B1B1',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 23,
        lineHeight: 24,
        borderTopEndRadius: 4,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderBottomEndRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        fontSize: 13,
        color: '#4D4D4D',
        textAlign: 'center',
      },
      body: {
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 0,
        paddingLeft: 15,
        display: 'flex',
      },
      pickers: {
        display: 'flex',
        flexDirection: 'row',
      },
      saturation: {
        width: 200,
        height: 200,
        position: 'relative',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#B3B3B3',
        borderBottomWidth: 2,
        borderBottomColor: "#F0F0F0",
        overflow: 'hidden',
      },
      hue: {
        position: 'relative',
        height: 200,
        width: 19,
        marginLeft: 10,
        borderStyle: 'solid',
        borderColor: '#B3B3B3',
        borderWidth: 2,
        borderBottomColor: "#F0F0F0",
        borderBottomWidth: 2,
      },
      top: {
        width: '100%'
      },
      flexControls:{
        display: 'flex',
        flexDirection: 'row',
      },
      controls: {
        width: '100%',
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      previews: {
        width: '25%',
      },
      actionsButton: {
        width: '60%',
        marginLeft: 20,
        marginTop: 20,
      },
      actions: {
        flex: 1,
        marginLeft: 20,
      },
    },
  }, passedStyles));

  const {
    header, onChange, hsl, hsv, rgb, onAccept, onCancel, hex,
  } = props;
  useEffect(() => setCurrentColor(hex), []);
  return (
    <View style={styles.picker} >
      <Text style={styles.head}>{header}</Text>

      <ScrollView style={styles.body}>
        <View style={styles.pickers}>
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
        </View>
        <View style={styles.controls}>
          <View style={styles.top}>
            <View style={styles.flexControls}>
              <View style={styles.previews}>
                <PhotoshopPreviews
                  rgb={rgb}
                  currentColor={currentColor}
                />
              </View>
              <View style={styles.actionsButton}>
                <PhotoshopButton label="OK" onClick={onAccept} active />
                <PhotoshopButton label="Cancel" onClick={onCancel} />
              </View>
            </View>

            <View style={styles.actions}>
              <PhotoshopFields
                onChange={onChange}
                rgb={rgb}
                hsv={hsv}
                hex={hex}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  onCancel: () => { },
  onAccept: () => { },
  onChange: () => { },
};

export default ColorWrap(Photoshop);

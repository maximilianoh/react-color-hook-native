import React, { useEffect, useState, useRef } from 'react';
import reactCSS from 'reactcss';
import PropTypes from 'prop-types';
import { isValidHex } from '../../helpers/color';
import EditableInput from '../common/EditableInput';
import { View, Text } from 'react-native';

const ChromeFields = (props) => {
  const { view } = props;
  const [viewState, setViewState] = useState(view);
  const inputRef = useRef();

  const toggleViews = () => {
    if (viewState === 'hex') {
      setViewState('rgb');
    } else if (viewState === 'rgb') {
      setViewState('hsl');
    } else if (viewState === 'hsl') {
      if (props.hsl.a === 1) {
        setViewState('hex');
      } else {
        setViewState('rgb');
      }
    }
  };


  const handleChange = (originalData, e) => {
    const data = { ...originalData };
    if (data.hex) {
      if (isValidHex(data.hex)) {
        props.onChange({
          hex: data.hex,
          source: 'hex',
        }, e);
      }
    } else if (data.r || data.g || data.b) {
      props.onChange({
        r: data.r || props.rgb.r,
        g: data.g || props.rgb.g,
        b: data.b || props.rgb.b,
        source: 'rgb',
      }, e);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 1) {
        data.a = 1;
      }

      props.onChange({
        h: props.hsl.h,
        s: props.hsl.s,
        l: props.hsl.l,
        a: Math.round(data.a * 100) / 100,
        source: 'hsl',
      }, e);
    } else if (data.h || data.s || data.l) {
      // Remove any occurances of '%'.
      if (typeof (data.s) === 'string' && data.s.includes('%')) { data.s = data.s.replace('%', ''); }
      if (typeof (data.l) === 'string' && data.l.includes('%')) { data.l = data.l.replace('%', ''); }

      props.onChange({
        h: data.h || props.hsl.h,
        s: Number((data.s && data.s) || props.hsl.s),
        l: Number((data.l && data.l) || props.hsl.l),
        source: 'hsl',
      }, e);
    }
    originalData = { ...data }; // eslint-disable-line no-param-reassign
  };

  const showHighlight = (e) => {
    e.currentTarget.style.background = '#eee';
  };

  const hideHighlight = (e) => {
    e.currentTarget.style.background = 'transparent';
  };


  const styles = reactCSS({
    default: {
      wrap: {
        paddingTop: 16,
        display: 'flex',
      },
      fields: {
        flex: 1,
        display: 'flex',
        marginLeft: -6,
      },
      field: {
        paddingLeft: 6,
        width: '100%',
      },
      alpha: {
        paddingLeft: 6,
        width: '100%',
      },
      toggle: {
        width: 32,
        textAlign: 'right',
        position: 'relative',
      },
      icon: {
        marginRight: -4,
        marginTop: 12,
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
      },
      iconHighlight: {
        position: 'absolute',
        width: 24,
        height: 28,
        backgroundColor: '#eee',
        borderRadius: 4,
        top: 10,
        left: 12,
        display: 'none',
      },
      input: {
        fontSize: 11,
        color: '#333',
        width: '100%',
        shadowColor: "#dadada",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 3,
        height: 21,
        textAlign: 'center',
      },
      label: {
        textTransform: 'uppercase',
        fontSize: 11,
        lineHeight: 11,
        color: '#969696',
        textAlign: 'center',
        marginTop: 12,
      },
      svg: {
        fill: '#333',
        width: 24,
        height: 24,
        borderColor:'transparent',
        borderStyle:'solid',
        borderWidth:1,
        borderRadius: 5,
      },
    },
    disableAlpha: {
      alpha: {
        display: 'none',
      },
    },
  }, props, viewState);


  useEffect(() => {
    if (props.hsl.a !== 1 && props.view === 'hex') {
      setViewState('rgb');
    } else {
      setViewState(props.view);
    }
  }, []);

  const { hsl } = props;
  useEffect(() => {
    if (props.hsl.a !== 1 && viewState === 'hex') {
      setViewState('rgb');
    }
  }, [hsl]);


  let fields;
  if (viewState === 'hex') {
    fields = (
      <View style={styles.fields}>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="hex"
            value={`${props.hex}`}
            onChange={handleChange}
          />
        </View>
      </View>
    );
  } else if (viewState === 'rgb') {
    fields = (
      <View style={styles.fields}>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="r"
            value={`${props.rgb.r}`}
            onChange={handleChange}
          />
        </View>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="g"
            value={`${props.rgb.g}`}
            onChange={handleChange}
          />
        </View>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="b"
            value={`${props.rgb.b}`}
            onChange={handleChange}
          />
        </View>
        <View style={styles.alpha}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={`${props.rgb.a}`}
            arrowOffset={0.01}
            onChange={handleChange}
          />
        </View>
      </View>
    );
  } else if (viewState === 'hsl') {
    fields = (
      <View style={styles.fields}>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="h"
            value={`${Math.round(props.hsl.h)}`}
            onChange={handleChange}
          />
        </View>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="s"
            value={`${Math.round(props.hsl.s * 100)}%`}
            onChange={handleChange}
          />
        </View>
        <View style={styles.field}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="l"
            value={`${Math.round(props.hsl.l * 100)}%`}
            onChange={handleChange}
          />
        </View>
        <View style={styles.alpha}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={`${props.hsl.a}`}
            arrowOffset={0.01}
            onChange={handleChange}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      {fields}
      
      <View style={styles.toggle}>
        <View
          style={styles.icon}
          onKeyDown={toggleViews}
          onClick={toggleViews}
          ref={inputRef}
          role="button"
          tabIndex={0}
        >
          <Text>O</Text>
        </View>
      </View>
    </View>
  );
};

ChromeFields.propTypes = {
  hsl: PropTypes.shape({
    h: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
  rgb: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  hex: PropTypes.string.isRequired,
  view: PropTypes.oneOf([
    'hex',
    'rgb',
    'hsl',
  ]),
};

ChromeFields.defaultProps = {
  view: 'hex',
};

export default ChromeFields;

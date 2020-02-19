import reactCSS from 'reactcss';
import merge from 'lodash/merge';

export const alphaStyle = (props, rgb) => reactCSS({
  default: {
    alpha: {
      position: 'absolute',
      borderRadius: props.radius,
      shadowColor: "rgba(0, 0, 0, 0.15)",
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 12,
      shadowOpacity: 0,
      elevation: 3,
      width: "100%",
      height: "100%",
    },
    checkboard: {
      top: 0,
      left: 0,
      bottom: 0,
      rigth: 0,
      overflow: 'hidden',
      borderRadius: props.radius,
    },
    container: {
      position: 'relative',
      width: "100%",
      height: "100%",
      marginRight: 3,
      borderColor: 'none',
    },
    pointer: {
      position: 'absolute',
      left: `${rgb.a * 100}%`,
    },
    slider: {
      width: 4,
      borderRadius: 1,
      height: 8,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 2,
      shadowOpacity: 0,
      elevation: 3,
      backgroundColor: '#fff',
      marginTop: 1,
      transform: [{ translateX: -2 }],
    },
  },
  vertical: {
    gradient: {
      backgroundColor: `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%,
             rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`,
    },
    pointer: {
      left: 0,
      top: `${rgb.a * 100}%`,
    },
  },
  overwrite: {
    ...props.style,
  },
}, {
  vertical: props.direction === 'vertical',
  overwrite: true,
});

export const editableInputStyle = (props, style) => {
  const { wrap, input } = style;
  return reactCSS({
    default: {
      wrap: {
        position: 'relative',
      },
    },
    'user-override': {
      wrap: style && wrap ? wrap : {},
      input: style && input ? input : {},
      label: style && style.label ? style.label : {},
    },
    'dragLabel-true': {
      label: {
        cursor: 'ew-resize',
      },
    },
  }, {
    'user-override': true,
  }, props);
};

export const hueStyle = (direction, radius, hsl) => reactCSS({
  default: {
    hue: {
      position: 'absolute',
      shadowColor: "rgba(0, 0, 0, 0.15)",
      shadowOffset: { width: 0, height: 5 },
      elevation: 3,
      width: "100%",
      height: "100%",
    },
    container: {
      paddingTop: 0,
      paddingRight: 2,
      paddingBottom: 0,
      paddingLeft: 2,
      position: 'relative',
      width: "100%",
      height: "100%",
      borderRadius: radius,
      outline: 'none',
    },
    pointer: {
      position: 'absolute',
      left: `${(hsl.h * 100) / 360}%`,
    },
    slider: {
      marginTop: 1,
      width: 4,
      borderRadius: 1,
      height: 8,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 2,
      shadowOpacity: 0,
      elevation: 3,
      backgroundColor: '#fff',
      transform: [{translateX:-2}],
    },
  },
  vertical: {
    pointer: {
      left: 0,
      top: `${-((hsl.h * 100) / 360) + 100}%`,
    },
  },
}, { vertical: direction === 'vertical' });

export const raisedStyle = (zDepth, radius, backgroundColor, passedStyles) => reactCSS(merge({
  default: {
    wrap: {
      position: 'relative',
    },
    content: {
      position: 'relative',
    },
    bg: {
      top: 0,
      left: 0,
      bottom: 0,
      rigth: 0,
      shadowColor: "rgba(0,0,0,.24)",
      shadowOffset: {
        width: 0,
        height: zDepth,
      },
      shadowRadius: zDepth * 4,
      shadowOpacity: 0,
      elevation: 3,
      borderRadius: radius,
      backgroundColor,
    },
  },
  'zDepth-0': {
    bg: {
      shadowColor: "#FFF",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 0,
      shadowOpacity: 0,
      elevation: 1,
    },
  },

  'zDepth-1': {
    bg: {
      shadowColor: "rgba(0,0,0,0.12)",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 10,
      shadowOpacity: 0,
      elevation: 3,
    },
  },
  'zDepth-2': {
    bg: {
      shadowColor: "rgba(0,0,0,.19)",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowRadius: 20,
      shadowOpacity: 0,
      elevation: 3,
    },
  },
  'zDepth-3': {
    bg: {
      shadowColor: "rgba(0,0,0,0.24)",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowRadius: 15,
      shadowOpacity: 0,
      elevation: 3,
    },
  },
  'zDepth-4': {
    bg: {
      shadowColor: "rgba(0,0,0,0.22)",
      shadowOffset: {
        width: 0,
        height: 16,
      },
      shadowRadius: 28,
      shadowOpacity: 0,
      elevation: 3,
    },
  },
  'zDepth-5': {
    bg: {
      shadowColor: "rgba(0,0,0,0.2)",
      shadowOffset: {
        width: 0,
        height: 27,
      },
      shadowRadius: 24,
      shadowOpacity: 0,
      elevation: 3,
    },
  },
  square: {
    bg: {
      borderRadius: 0,
    },
  },
  circle: {
    bg: {
      borderRadius: 20,
    },
  },
}, passedStyles), { 'zDepth-1': zDepth === 1 });


export const saturationStyle = (hsl, radius, shadow, hsv, color,
  white, black, circle, point, style) => reactCSS({
    default: {
      color: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: `hsl(${hsl.h},100%, 50%)`,
        //borderRadius: radius,
      },
      white: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        //borderRadius: radius,
      },
      black: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // boxShadow: shadow,
        //borderRadius: radius,
      },
      pointer: {
        position: 'absolute',
        top: `${-(hsv.v * 100) + 100}%`,
        left: `${hsv.s * 100}%`,
        cursor: 'default',
      },
      circle: {
        width: 4,
        height: 4,
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 1,
        shadowOpacity: 2,
        elevation: 3,
        borderRadius: 20,
        cursor: 'hand',
        transform: [{translateX:-2}, {translateY:-2}],
      },
    },
    custom: {
      color,
      white,
      black,
      point,
      circle,
    },
  }, { custom: !!style });

export const swatchStyle = (style, focus, focusStyle, color) => reactCSS({
  default: {
    swatch: {
      backgroundColor: color,
      height: '100%',
      width: '100%',
      cursor: 'pointer',
      position: 'relative',
      outline: 'none',
      ...style,
      ...(focus ? focusStyle : {}),
    },
  },
});

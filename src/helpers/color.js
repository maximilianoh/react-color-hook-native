import each from 'lodash/each';
import chroma from 'chroma-js';

const isNumber = (value) => !Number.isNaN(parseFloat(value));

export const simpleCheckForValidColor = (data) => {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
  let checked = 0;
  let passed = 0;
  each(keysToCheck, (letter) => {
    if (data[letter]) {
      checked += 1;
      if (isNumber(data[letter])) {
        passed += 1;
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/;
        if (percentPatt.test(data[letter])) {
          passed += 1;
        }
      }
    }
  });
  return (checked === passed) ? data : false;
};


export const chromaValidation = (data) => {
  let validation = false;
  try {
    if (data.hex) chroma(data.hex);
    else chroma(data);
    validation = true;
  } catch (error) {
    validation = false;
  }
  return validation;
};


export const isValidToChange = (data, colors, key) => {
  if (key === 'hex') {
    const hasHash = data.hex.indexOf('#') === 0 ? '' : '#';
    return hasHash + data.hex.toUpperCase() === colors.toUpperCase();
  }
  if (key === 'rgb') {
    const validation = Number(data.r) === colors.r && Number(data.g) === colors.g
    && Number(data.g) === colors.g;
    return validation;
  }
  if (key === 'hsv') {
    const s = data.s > 1 ? data.s / 100 : data.s;
    const v = data.v > 1 ? data.v / 100 : data.v;
    const validation = Number(data.h) >= 0 && Number(data.h) <= 360
    && Number(s) >= 0 && Number(s) <= 1
    && Number(v) >= 0 && Number(v) <= 1;
    return validation;
  }
  if (key === 'hsl') {
    try {
      chroma(data);
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
};


const valueNaN = (h) => (!isNumber(h) ? 0 : h);
const hslaListToObject = (list) => ({
  h: valueNaN(list[0]), s: valueNaN(list[1]), l: valueNaN(list[2]), a: valueNaN(list[3]),
});
const rgbaListToObject = (list) => ({
  r: list[0], g: list[1], b: list[2], a: list[3],
});
const hsvListToObject = (list) => ({
  h: valueNaN(list[0]),
  s: valueNaN(list[1]),
  v: valueNaN(list[2]),
});

export const hsvParse = (color, data) => {
  const s = data.s > 1 ? data.s / 100 : data.s;
  const v = data.v > 1 ? data.v / 100 : data.v;
  const c = chroma.hsv(Number(data.h), Number(s), Number(v));
  const result = {
    ...color,
    hsv: {
      h: Number(data.h),
      s: Number(s),
      v: Number(v),
    },
    hsl: hslaListToObject(c.hsl()),
    rgb: rgbaListToObject(c.rgba()),
    hex: c.hex(),
  };
  return result;
};


export const toState = (data, oldHue) => {
  const dataValidation = data || '#000000';
  const colorChroma = data.hex ? chroma(data.hex) : chroma(dataValidation);
  const a = data.a ? data.a : 1;
  const hsl = hslaListToObject(colorChroma.alpha(a).hsl());
  const hsv = hsvListToObject(colorChroma.hsv());
  const rgba = colorChroma.alpha(a).rgba();
  const rgb = rgbaListToObject(rgba);
  const hex = colorChroma.alpha(1).hex();

  if (hsl.s === 0) {
    hsl.h = oldHue || 0;
    hsv.h = oldHue || 0;
  }
  const transparent = hex === '000000' && rgb.a === 0;
  return {
    hsl,
    hex: transparent ? 'transparent' : hex,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  };
};

export const isValidHex = (hex) => {
  // disable hex4 and hex8
  // const lh = (String(hex).charAt(0) === '#') ? 1 : 0;
  // const result = hex.length !== (4 + lh) && hex.length < (7 + lh) && chroma.valid(hex);
  // const hasHas = hex.indexOf('#') !== 0 ? '#' : '';
  const validation = chroma.valid(hex) && typeof hex === 'string';
  return validation;
};

export const getContrastingColor = (data) => {
  if (!data) {
    return '#fff';
  }
  const col = toState(data);
  if (col.hex === 'transparent') {
    return 'rgba(0,0,0,0.4)';
  }
  const yiq = ((col.rgb.r * 299) + (col.rgb.g * 587) + (col.rgb.b * 114)) / 1000;
  return (yiq >= 128) ? '#000' : '#fff';
};

export const red = {
  hsl: {
    a: 1, h: 0, l: 0.5, s: 1,
  },
  hex: '#ff0000',
  rgb: {
    r: 255, g: 0, b: 0, a: 1,
  },
  hsv: {
    h: 0, s: 1, v: 1, a: 1,
  },
};

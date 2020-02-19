import measureComponent from "./measureComponent";
const isNumber = (value) => !Number.isNaN(parseFloat(value));

const calculateChange = async (e, hsl, container) => {
  const positionValue = await measureComponent(container);
  const containerWidth = positionValue.width;
  const containerHeight = positionValue.height;
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  const left = x - (positionValue.pageX);
  const top = y - (positionValue.pageY);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  }
  if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  const saturation = left / containerWidth;
  const bright = 1 - (top / containerHeight);
  return {
    h: hsl.h,
    s: isNumber(saturation) ? saturation : 0,
    v: isNumber(bright) ? bright : 0,
    a: hsl.a,
    source: 'hsv',
  };
};

export default calculateChange;

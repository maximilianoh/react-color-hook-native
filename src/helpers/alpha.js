import measureComponent from "./measureComponent";
const calculateChange = async (e, hsl, direction, initialA, container) => {
  const positionValue = await measureComponent(container);
  const containerWidth = positionValue.width;
  const containerHeight = positionValue.height;
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
  const left = x - (positionValue.pageX);
  const top = y - (positionValue.pageY);
  if (direction === 'vertical') {
    let a;
    if (top < 0) {
      a = 0;
    } else if (top > containerHeight) {
      a = 1;
    } else {
      a = Math.round((top * 100) / containerHeight) / 100;
    }

    if (hsl.a !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'hsl',
      };
    }
  } else {
    let a;
    if (left < 0) {
      a = 0;
    } else if (left > containerWidth) {
      a = 1;
    } else {
      a = Math.round((left * 100) / containerWidth) / 100;
    }
    

    if (initialA !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'hsl',
      };
    }
  }
  return null;
};

export default calculateChange;

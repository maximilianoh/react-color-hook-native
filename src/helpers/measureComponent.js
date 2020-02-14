const measureComponent = (component) => {
    return new Promise((resolve, reject) => {
      component.measure((x, y, width, height, pageX, pageY) => {
        if(isNaN(x) || isNaN(y) || isNaN(width)|| isNaN(height)|| isNaN(pageX)|| isNaN(pageY)) {
          reject({})
        }
        resolve({ x, y, width, height, pageX, pageY })
      })
    })
}
export default measureComponent;

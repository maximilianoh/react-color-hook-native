import React, { useState } from 'react';

const handleFocus = (Component) => {
  const Focus = (props) => {
    const [focus, setFocus] = useState(false);

    const handlerFocus = () => setFocus(true);

    const handleBlur = () => setFocus(false);

    return (
      <View onFocus={handlerFocus} onBlur={handleBlur}>
        <Component {...props} {...focus} />
      </View>
    );
  };
  return Focus;
};
export default handleFocus;

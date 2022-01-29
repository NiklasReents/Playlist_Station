import React, { useState } from "react";

export default function ParameterBox(props) {
  const {
    backgroundColor,
    textColor,
    textContent,
    setBackgroundColor,
    setTextColor,
    setTextContent,
  } = props;
  const [bCVal, setBCVal] = useState("#" + backgroundColor);
  const [cVal, setCVal] = useState("#" + textColor);
  const [txtVal, setTxtVal] = useState(textContent);

  function getBackgroundColor(e) {
    setBCVal(e.target.value);
    setBackgroundColor(e.target.value.slice(1));
  }

  function getTextColor(e) {
    setCVal(e.target.value);
    setTextColor(e.target.value.slice(1));
  }

  function getText(e) {
    setTxtVal(e.target.value);
    setTextContent(e.target.value);
  }

  return (
    <div id="parameter-overlay">
      <div>
        <label htmlFor="background">Define background color</label>
        <input
          onChange={getBackgroundColor}
          name="background"
          type="color"
          value={bCVal}
        />
      </div>
      <div>
        <label htmlFor="text-color">Define text color</label>
        <input
          onChange={getTextColor}
          name="text-color"
          type="color"
          value={cVal}
        />
      </div>
      <input
        onChange={getText}
        name="image-text"
        type="text"
        placeholder="Define imagetext"
        value={txtVal}
      />
      <span>Click outside the box to close it</span>
    </div>
  );
}

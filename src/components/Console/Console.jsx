import { useMemo, useRef, useState } from "react";
import { KeyboardIcon } from "../../assets/icons";
import { HSL_REGEX, RGB_REGEX } from "../../constants/constants";
import { getColorDelta, hsl2safari } from "../../utils/utils";

const Console = ({ target }) => {
  const [hslGuess, setHslGuess] = useState();
  const [rgbGuess, setRgbGuess] = useState();

  const isMobile = useMemo(() => navigator.maxTouchPoints > 0, []);

  const hslInputRef = useRef();
  const rgbInputRef = useRef();
  const [autoFocus, setAutoFocus] = useState(!isMobile);
  const [inputmode, setInputmode] = useState(
    localStorage.getItem("keyboard") || "numeric"
  );

  const handleSwitchKeyboard = () => {
    const newValue = inputmode === "numeric" ? "text" : "numeric";
    localStorage.setItem("keyboard", newValue);
    setAutoFocus(true);
    setInputmode(newValue);
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    const hsl = hslInputRef.current.value.trim();
    const rgb = rgbInputRef.current.value.trim();

    if (!hsl.match(HSL_REGEX)) {
      alert("HSL value invalid");
      return;
    } else if (!rgb.match(RGB_REGEX)) {
      alert("RGB value invalid");
      return;
    }

    setHslGuess(hsl.split(" "));
    setRgbGuess(rgb.split(" "));
  };

  return (
    <div className="console | paper column">
      <div className="colors | row">
        <div className="column">
          <h2>Target</h2>
          <div
            className="color-box"
            style={{
              // safari sucks
              // backgroundColor: `hsl(${todayColor})`
              // backgroundColor: hsl2safari(...hslString2Array("120 100 50")),
              backgroundColor: `rgb(${target.join(", ")})`,
            }}
          />
        </div>
      </div>
      <form onSubmit={handleSumbit} className="input-form">
        <input
          autoFocus={autoFocus}
          ref={hslInputRef}
          type="text"
          inputMode={inputmode}
          key={`${inputmode}-1`} // safari sucks if not key need to inputRef.current.focus()
          maxLength={11}
          placeholder="H S L"
          className="color-input"
        />
        <input
          ref={rgbInputRef}
          type="text"
          inputMode={inputmode}
          key={`${inputmode}-2`} // safari sucks if not key need to inputRef.current.focus()
          maxLength={11}
          placeholder="R G B"
          className="color-input"
        />
        {isMobile && (
          <button
            tabIndex={-1} // safari sucks
            type="button"
            id="switch-keyboard-button"
            className="switch-keyboard"
            onClick={handleSwitchKeyboard}
          >
            <KeyboardIcon />
          </button>
        )}
        {/* safari sucks */}
        <input type="submit" />
      </form>
      {hslGuess && rgbGuess && (
        <div className="colors | row | results">
          <div className="column">
            <h2>
              HSL -{" "}
              {getColorDelta(
                `rgb(${target.join(", ")})`,
                `hsl(${hslGuess[0]}, ${hslGuess[1]}%, ${hslGuess[2]}%)`
              )}
              %
            </h2>
            <div
              className="color-box"
              style={{
                // safari sucks
                // backgroundColor: `hsl(${todayColor})`
                backgroundColor: hsl2safari(...hslGuess),
              }}
            />
          </div>
          <div className="column">
            <h2>
              RGB -{" "}
              {getColorDelta(
                `rgb(${target.join(", ")})`,
                `rgb(${rgbGuess.join(", ")})`
              )}
              %
            </h2>
            <div
              className="color-box"
              style={{
                backgroundColor: `rgb(${rgbGuess.join(", ")})`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Console };

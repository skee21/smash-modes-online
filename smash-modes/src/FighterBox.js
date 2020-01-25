import React from "react";

export const FighterBox = ({ available, setUsed, setPick, toFileName }) => {
  var fighters = [];
  for (var x in available) {
    if (available[x]) {
      fighters.push(x);
    }
  }
  const images = require.context("./fighter-images", true);
  return (
    <div className="App">
      <div className="centered-column">
        <p>SmashDown</p>
        <div className="fighter-box" onMouseOut={() => setPick("none")}>
          {fighters.map((val, i) => {
            const name = toFileName(val);
            return (
              <img
                src={images(`./${name}.png`)}
                key={i}
                alt={name}
                height={50}
                onClick={() => setUsed(val)}
                onMouseOver={() => setPick(val)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

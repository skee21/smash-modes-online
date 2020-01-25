import React from "react";

export const FighterBox = ({
  available,
  fighterClick,
  setPick,
  toFileName
}) => {
  var fighters = [];
  for (var x in available) {
    if (available[x]) {
      fighters.push(x);
    }
  }
  const images = require.context("./fighter-images", true);
  return (
    <div className="fighter-box" onMouseOut={() => setPick("none")}>
      {fighters.map((val, i) => {
        const name = toFileName(val);
        return (
          <img
            src={images(`./${name}.png`)}
            key={i}
            alt={name}
            height={50}
            onClick={() => fighterClick(val)}
            onMouseOver={() => setPick(val)}
          />
        );
      })}
    </div>
  );
};

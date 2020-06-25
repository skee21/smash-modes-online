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
  //107x50 original 200x94
  return (
    <div className="fighter-box" onMouseOut={() => setPick("none")}>
      {fighters.map((val, i) => (
        <img
          src={`https://www.smashbros.com/assets_v2/img/fighter/thumb_h/${toFileName(
            val
          )}.png`}
          key={i}
          alt={val}
          height={50}
          style={{
            objectFit: "cover",
            objectPosition: "-90px 0",
            width: 107
          }}
          onClick={() => fighterClick(val)}
          onMouseOver={() => setPick(val)}
        />
      ))}
    </div>
  );
};

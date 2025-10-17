import React from "react";
import ShootingStar from "./ShootingStars";

const StarBanner = ({ numberOfStars }) => {
  const stars = Array.from({ length: numberOfStars }).map((_, index) => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    return (
      <div
        key={index}
        className="absolute w-[1px] h-[1px] rounded-full bg-white opacity-60"
        style={{
          top: `${top}%`,
          left: `${left}%`,
        }}
      />
    );
  });

  return (
    <div className="relative h-full w-full overflow-hidden">
      {stars}
      <ShootingStar />
    </div>
  );
};

export default StarBanner;

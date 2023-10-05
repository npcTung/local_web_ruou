import React, { memo } from "react";

const Button = ({
  name,
  type = "button",
  iconAfter,
  iconBefore,
  styles,
  wf,
  handleOnClick,
}) => {
  return (
    <div className="w-full">
      <button
        type={type}
        className={`uppercase btn ${styles ? styles : "text-white"} ${
          wf ? "w-full" : "w-fit"
        }`}
        onClick={() => handleOnClick && handleOnClick()}
      >
        <span className="flex items-center">
          {iconAfter && <span>{iconAfter}</span>}
          <span>{name}</span>
          {iconBefore && <span>{iconBefore}</span>}
        </span>
      </button>
    </div>
  );
};

export default memo(Button);

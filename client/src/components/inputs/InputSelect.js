import React, { memo } from "react";

const InputSelect = ({ value, changeValue, options, id }) => {
  return (
    <div className="w-full">
      <select
        value={value}
        id={id}
        onChange={(e) => changeValue(e.target.value)}
        className="select select-bordered w-full text-sm"
      >
        {options?.map((el) => (
          <option key={el.id} value={el.value}>
            {el.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(InputSelect);

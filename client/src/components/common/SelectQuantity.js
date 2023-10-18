import React, { memo } from "react";

const SelectQuantity = ({
  quantity,
  handaleQuantity,
  handaleChargeQuantity,
  quantityProduct,
  cart,
  wf,
}) => {
  return (
    <div className={`flex items-center ${wf && "w-full"}`}>
      <span
        className={`border-r ${
          cart
            ? "bg-transparent p-[1px] border text-sm"
            : "bg-gray-100 p-2 border-black"
        }  ${quantityProduct === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => quantityProduct > 0 && handaleChargeQuantity("minus")}
      >
        -
      </span>
      <input
        type="text"
        name="quantity"
        value={quantity}
        onChange={(e) => handaleQuantity(e.target.value)}
        className={`${
          cart ? "bg-transparent p-[1px] border-y text-sm" : "bg-gray-100 p-2"
        } w-[50px] text-center outline-none ${
          quantityProduct === 0 && "cursor-not-allowed"
        }`}
        disabled={quantityProduct === 0 ? true : false}
        autoComplete="off"
      />
      <span
        className={`border-l ${
          cart
            ? "bg-transparent p-[1px] border text-sm"
            : "bg-gray-100 p-2 border-black"
        } ${quantityProduct === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => quantityProduct > 0 && handaleChargeQuantity("plus")}
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuantity);

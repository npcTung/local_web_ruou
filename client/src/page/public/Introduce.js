import { Breadcrumbs } from "components";
import React from "react";

const Introduce = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-[#f6f6f6]">
        <div className="w-main mx-auto py-20 flex justify-between items-center">
          <Breadcrumbs product={"Giới thiệu"} />
          <span className="text-xl uppercase font-semibold">Giới thiệu</span>
        </div>
      </div>
    </div>
  );
};

export default Introduce;

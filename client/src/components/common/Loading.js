import React, { memo } from "react";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div>
      <BarLoader color="#36d7b7" />
    </div>
  );
};

export default memo(Loading);

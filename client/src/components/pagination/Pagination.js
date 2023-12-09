import React, { memo } from "react";
import usePagination from "hooks/usePagination";
import { PagiItem } from "components";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount, limit }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1, limit);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +limit || 12;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} đến ${end}`;
  };

  return (
    <div className="w-full flex justify-between items-center">
      <span className="sm:hidden"></span>
      {!+params.get("page") ? (
        <span className="text-sm italic max-sm:hidden">{`Hiển thị sản phẩm từ 1 đến ${
          Math.round(+limit, totalCount) || 12
        } trên ${totalCount} sản phẩm`}</span>
      ) : null}
      {+params.get("page") ? (
        <span className="text-sm italic max-sm:hidden">{`Hiển thị sản phẩm từ ${range()} trên ${totalCount} sản phẩm`}</span>
      ) : null}
      <div className="flex items-center gap-2">
        {pagination?.map((el, idx) => (
          <PagiItem key={idx} value={el} />
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);

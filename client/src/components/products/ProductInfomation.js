import React, { memo, useCallback } from "react";
import { Button, VoteBar, VoteOption } from "components";
import withBase from "hocs/withBase";
import { useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { renderStarFromNumber } from "ultils/helpers";
import path from "ultils/path";
import * as apis from "apis";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

const ProductInfomation = ({
  data,
  tapList,
  dispatch,
  navigate,
  nameProduct,
  pid,
  rerender,
}) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleSubmitVoteOption = useCallback(async ({ comment, score }) => {
    if (!(pid && score)) toast.error("Hãy đữa ra trước khi nhấn gửi");
    else {
      const ressponse = await apis.apiRatings({
        star: score,
        comment,
        pid,
        updatedAt: Date.now(),
      });
      if (ressponse.success)
        Swal.fire("Successfully", "Vote thành công", "success").then(() => {
          rerender();
          dispatch(showModal({ isShowModal: false, modalChildren: null }));
        });
      else toast.error(ressponse.mes);
    }
  }, []);

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Bạn cần đăng nhập trước khi vote",
        showCancelButton: true,
        cancelButtonColor: "#ee3131",
        cancelButtonText: "Hủy",
        confirmButtonText: "Đăng nhập",
        confirmButtonColor: "#3ABFF8",
        title: "Oops!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
  };
  return (
    <div className="w-full">
      {tapList === 0 && (
        <div className="w-full flex flex-col gap-5 border-b-2 pb-10">
          <h3 className="text-2xl font-semibold">{data?.title}</h3>
          {data?.description.length > 1 && (
            <span className="line-clamp-6">{data?.description}</span>
          )}
          {data?.description.length === 1 && (
            <div
              className="text-sm flex flex-col gap-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data?.description[0]),
              }}
            />
          )}
        </div>
      )}
      {tapList === 1 && (
        <div className="w-full flex flex-col justify-center gap-5 border-b-2 pb-10">
          <h3 className="text-lg font-medium">Chính sách</h3>
          <span>
            Bạn có thể trở lại mới nhất, các mục chưa mở trong vòng 30 ngày kể
            từ ngày giao hàng cho một khoản hoàn lại đầy đủ. Chúng tôi cũng sẽ
            trả chi phí vận chuyển trở lại nếu trở lại là một kết quả của lỗi
            của chúng tôi (bạn đã nhận được một món hàng không chính xác hoặc bị
            lỗi, vv).
          </span>
          <span>
            Bạn sẽ được hoàn trả trong vòng bốn tuần lễ cho gói của bạn cho
            người giao hàng trở lại, tuy nhiên, trong nhiều trường hợp bạn sẽ
            nhận được một khoản hoàn lại nhanh hơn. Khoảng thời gian này bao gồm
            thời gian vận chuyển cho chúng tôi để nhận được sự trở lại của mình
            từ người giao hàng (5-10 ngày làm việc), thời gian cần chúng tôi để
            xử lý lại sau khi chúng tôi nhận được nó (3-5 ngày làm việc), và
            thời gian cần ngân hàng của bạn để xử lý yêu cầu hoàn trả của chúng
            tôi (5-10 ngày làm việc).
          </span>
          <span>
            Nếu bạn cần phải trả lại một mục, chỉ cần đăng nhập vào tài khoản
            của bạn, xem theo thứ tự bằng cách sử dụng liên kết 'Toàn bộ đơn đặt
            hàng' dưới menu Tài khoản của tôi và nhấp vào nút Return Item (s).
            Chúng tôi sẽ thông báo cho bạn qua e-mail bạn được hoàn trả sau khi
            chúng tôi nhận và xử lý các mục trở lại.
          </span>
          <span>
            Xin lưu ý rằng các vận chuyển cho nhiều mặt hàng chúng tôi bán được
            theo cân nặng. Trọng lượng của bất kỳ sản phẩm có thể được tìm thấy
            trên trang chi tiết của nó. Để phản ánh các chính sách của công ty
            vận chuyển chúng tôi sử dụng, tất cả các trọng sẽ được làm tròn đến
            po đầy đủ tiếp theo.
          </span>
        </div>
      )}
      {tapList === 2 && (
        <div className="w-full flex flex-col justify-center border-b-2 pb-10">
          <div className="w-full grid grid-cols-3 border-b pb-10">
            <div className="col-span-1 flex flex-col items-center justify-center gap-1 border-r">
              <span className="text-2xl font-semibold">{`${data?.totalRatings}/5`}</span>
              <span className="flex items-center gap-1 text-yellow-500">
                {renderStarFromNumber(data?.totalRatings)}
              </span>
              <span className="text-lg">{`${data?.ratings.length} đánh giá`}</span>
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el) => (
                  <VoteBar
                    key={el}
                    number={el + 1}
                    ratingTotal={data?.ratings.length}
                    ratingCount={
                      data?.ratings?.filter((i) => i.star === el + 1)?.length
                    }
                  />
                ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center py-10 gap-5 pb-10">
            <span>Bạn đánh giá sao về sản phẩm này ?</span>
            <Button
              name={"đánh giá ngay"}
              styles={"btn-info text-white"}
              handleOnClick={handleVoteNow}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withBase(memo(ProductInfomation));

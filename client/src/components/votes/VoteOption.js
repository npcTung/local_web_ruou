import React, { memo, useEffect, useState } from "react";
import icons from "ultils/icons";
import Vote from "assets/ant.png";
import { ratings } from "ultils/contans";
import Button from "components/buttons/Button";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";

const { MdOutlineClear } = icons;

const Voteoption = ({ nameProduct, handleSubmitVoteOption, dispatch }) => {
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [countComment, setCountComment] = useState(0);

  useEffect(() => {
    if (comment) setCountComment(comment.length);
    else setCountComment(0);
  }, [comment]);
  return (
    <div
      className="bg-white rounded-md flex flex-col animate-slide-top w-2/5"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg p-2 w-full bg-gray-100 rounded-t-md flex justify-between items-center">
        <span className="font-semibold">Đánh giá và nhận xét</span>
        <span
          className="cursor-pointer"
          onClick={() =>
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
          }
        >
          <MdOutlineClear />
        </span>
      </h3>
      <span className="font-medium p-5 text-xl">Sản phẩm "{nameProduct}"</span>
      <div className="w-full flex justify-center p-5">
        <img src={Vote} alt="Vote_image" className="w-28 h-28 object-contain" />
      </div>
      <div className="w-full p-5">
        <div className="w-full flex flex-col gap-5">
          <span>Đánh giá chung</span>
          <div className="flex items-center justify-between px-5">
            {ratings.map((el) => (
              <span key={el.id} className="flex flex-col items-center gap-2">
                <span
                  className="text-yellow-500 cursor-pointer text-lg"
                  onClick={() => setChosenScore(el.id)}
                >
                  {Number(chosenScore) && chosenScore >= el.id
                    ? el.iconClick
                    : el.icon}
                </span>
                <span className="text-gray-500 text-sm">{el.title}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="w-full p-5 flex flex-col justify-center gap-2">
          <textarea
            id="comment"
            className="w-full max-h-[500px] min-h-[150px] textarea textarea-bordered"
            maxLength={2000}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập lời đánh giá của bạn vào đây..."
          />
          <span className="text-xs text-gray-400 whitespace-nowrap text-end">{`${countComment}/2000`}</span>
        </div>
        <Button
          name={"đánh giá"}
          styles={`btn-info text-white`}
          wf
          handleOnClick={() =>
            handleSubmitVoteOption({ comment, score: chosenScore })
          }
        />
      </div>
    </div>
  );
};

export default withBase(memo(Voteoption));

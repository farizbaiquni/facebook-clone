import React, { forwardRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type ConfirmationDeleteCommentModelPropsType = {
  ref: React.RefObject<HTMLDivElement>;
  setIsShowModalConfirmationDeleteComment: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickConfirmDeleteCommentButton: () => void;
};

const ConfirmationDeleteCommentModel = forwardRef<
  HTMLDivElement,
  ConfirmationDeleteCommentModelPropsType
>(({ setIsShowModalConfirmationDeleteComment, handleClickConfirmDeleteCommentButton }, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => setIsShowModalConfirmationDeleteComment(false)}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-45"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex w-[550px] flex-col rounded-md bg-white shadow-md shadow-gray-400"
      >
        <div className="relative flex justify-center py-5">
          <p className="text-[20px] font-bold">Delete Comment?</p>
          <XMarkIcon
            onClick={() => setIsShowModalConfirmationDeleteComment(false)}
            className="absolute right-5 w-8 cursor-pointer rounded-full bg-gray-300 p-1 text-black hover:bg-gray-400"
          />
        </div>
        <hr className="border-b border-gray-400" />
        <p className="mb-10 mt-2 px-5">Are you sure you want to delete this comment?</p>
        <div className="mb-5 flex justify-end px-5">
          <button
            onClick={() => setIsShowModalConfirmationDeleteComment(false)}
            className="cursor-pointer rounded-md px-5 py-2 text-blue-600 hover:bg-[#F2F2F2]"
          >
            No
          </button>
          <button
            onClick={handleClickConfirmDeleteCommentButton}
            className="ml-3 cursor-pointer rounded-md bg-blue-600 px-8 py-2 text-white hover:bg-blue-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

ConfirmationDeleteCommentModel.displayName = "ConfirmationDeleteCommentModel";

export default ConfirmationDeleteCommentModel;

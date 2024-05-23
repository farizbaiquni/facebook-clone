import React, { Fragment, useState } from "react";
import Image from "next/image";
import PostingModal from "./posting_modal/PostingModal";

const Posting = () => {
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);

  const openPostingModal = () => setIsPostingModalOpen(true);
  const closePostingModal = () => setIsPostingModalOpen(false);

  const actions = [
    { src: "/icons_posting/live.png", alt: "live video", label: "Live video" },
    {
      src: "/icons_posting/photo-video.png",
      alt: "photo/video",
      label: "Photo/video",
    },
    {
      src: "/icons_posting/feeling.png",
      alt: "feeling/activity",
      label: "Feeling/activity",
    },
  ];

  return (
    <Fragment>
      <div className="mx-auto h-[122px] w-[500px] rounded-lg bg-white p-3 shadow-md">
        <div className="flex items-center">
          <Image
            src="/profile.jpg"
            width={40}
            height={40}
            alt="Profile picture"
            className="h-10 w-10 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What's on your mind, Fariz?"
            className="ml-2 flex-grow cursor-pointer rounded-full bg-gray-100 p-2 hover:bg-gray-200 focus:outline-none"
            onClick={openPostingModal}
          />
        </div>
        <hr className="my-2" />
        <div className="flex">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-md py-1 hover:bg-gray-200"
            >
              <Image
                src={action.src}
                width={30}
                height={30}
                alt={action.alt}
                className=""
              />
              <p className="ml-2 text-sm font-semibold text-gray-500">
                {action.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <PostingModal
        isPostingModalOpen={isPostingModalOpen}
        closePostingModal={closePostingModal}
      />
    </Fragment>
  );
};

export default Posting;

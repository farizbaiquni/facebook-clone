"use client";

import React, { Fragment, useState } from "react";
import Image from "next/image";
import PostingModal from "./posting_modal/PostingModal";
import { UserType } from "@/types/user";

type PostingProps = {
  user: UserType;
};

const Posting = ({ user }: PostingProps) => {
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("Fariz");

  const openPostingModal = () => setIsPostingModalOpen(true);
  const closePostingModal = () => setIsPostingModalOpen(false);

  const actions = [
    { src: "/icons/postings/live.png", alt: "live video", label: "Live video" },
    {
      src: "/icons/postings/add-photo-video.png",
      alt: "photo/video",
      label: "Photo/video",
    },
    {
      src: "/icons/postings/feeling-activity.png",
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
          <button
            onClick={openPostingModal}
            className="mx-3 flex-1 cursor-pointer rounded-full bg-gray-100 py-1 pl-5 text-left text-gray-600 hover:bg-gray-200"
          >
            What&apos;s on your mind, {firstName}?
          </button>
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
        user={user}
        isPostingModalOpen={isPostingModalOpen}
        closePostingModal={closePostingModal}
        setIsPostingModalOpen={setIsPostingModalOpen}
      />
    </Fragment>
  );
};

export default Posting;

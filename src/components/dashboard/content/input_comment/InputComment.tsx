import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  Fragment,
  useContext,
} from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { createThumbnail } from "@/utils/createThumbnailFromVideo";
import ActionButtonInputComment from "./ActionButtonInputComment";
import GifCommentSelector from "../comments/GifCommentSelector";
import { MediaImageVideoEnum, MediaImageVideoType, MediaTypeEnum } from "@/types/mediaPost";
import { GifType } from "@/types/gifs";
import { UserContext } from "@/hooks/useContext";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  FaceSmileIcon,
  CameraIcon,
  GifIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤔",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "☹️",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "😩",
  "🤯",
  "😬",
  "😰",
  "😱",
  "🥵",
  "🥶",
  "😳",
  "🤪",
  "😵",
  "😡",
  "😠",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😇",
  "🥳",
  "🥺",
];

type InputCommentRef = {
  focus: () => void;
  scrollIntoView: () => void;
};

type InputCommentProps = {
  userId: number;
  postId: number;
  isCommentReply?: boolean;
  firstName?: string;
  lastName?: string;

  handleAddComment: (
    commentText: string,
    imageVideo: MediaImageVideoType | null,
    gif: GifType | null,
    tagNameUserParentComment?: string | null,
  ) => void;
};

const InputComment = forwardRef<InputCommentRef, InputCommentProps>(
  ({ userId, postId, isCommentReply, firstName = "", lastName = "", handleAddComment }, ref) => {
    const user = useContext(UserContext);

    const [tagParentCommentUser, setTagParentCommentUser] = useState<string[]>(
      isCommentReply ? [...firstName.trim().split(" "), ...lastName.trim().split(" ")] : [],
    );
    const [commentText, setCommentText] = useState<string>("");
    const [gif, setGif] = useState<GifType | null>(null);
    const [imageVideo, setImageVideo] = useState<MediaImageVideoType | null>(null);

    const [isTextareaEverFocus, setIsTextareaFocus] = useState(isCommentReply || false);
    const [isShowEmojiSelector, setIsShowEmojiSelector] = useState(false);
    const [isShowGifSelector, setIsShowGifSelector] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiSelectorRef = useRef<HTMLDivElement>(null);
    const emojiOptionRef = useRef<HTMLDivElement>(null);

    const fileInputOptionRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const gifSelectorRef = useRef<HTMLDivElement>(null);
    const gifOptionRef = useRef<HTMLDivElement>(null);

    const handleRemoveMedia = () => {
      setImageVideo(null);
      setGif(null);
    };

    const onClickOutsideEmoji = (event: MouseEvent) => {
      if (emojiOptionRef.current?.contains(event.target as Node)) {
        setIsShowEmojiSelector((prevState) => !prevState);
        return;
      }
      if (!emojiSelectorRef.current?.contains(event.target as Node)) {
        setIsShowEmojiSelector(false);
      }
    };

    const onClickOutsideGif = (event: MouseEvent) => {
      if (gifOptionRef.current?.contains(event.target as Node)) {
        setIsShowGifSelector((prevState) => !prevState);
        return;
      }
      if (!gifSelectorRef.current?.contains(event.target as Node)) {
        setIsShowGifSelector(false);
      }
    };

    const onClickUploadImageVideo = (event: MouseEvent) => {
      if (fileInputOptionRef.current?.contains(event.target as Node)) {
        fileInputRef.current?.click();
      }
    };

    const handleClickEmoji = (emoji: string) => {
      setCommentText((prevState) => prevState + emoji);
    };

    const handleAddFileFromInput = async (files: FileList) => {
      const isVideoFile = (file: File) => {
        return file.type.startsWith("video/");
      };
      const file = files[0];
      const id = uuidv4();
      const newImageVideo: MediaImageVideoType = {
        id: id,
        file: file,
        downloadUrl: null,
        type: isVideoFile(file) ? MediaImageVideoEnum.VIDEO : MediaImageVideoEnum.IMAGE,
        url: URL.createObjectURL(file),
        urlObject: URL.createObjectURL(file),
      };

      if (newImageVideo.type === MediaImageVideoEnum.VIDEO) {
        const thumbnailVideo = await createThumbnail(newImageVideo.url);
        newImageVideo.downloadUrl = thumbnailVideo;
      }
      setImageVideo(newImageVideo);
    };

    const clearAllInput = () => {
      setCommentText("");
      setImageVideo(null);
      setGif(null);
    };

    const onClickSubmitComment = async () => {
      if (commentText.trim().length <= 0 && imageVideo === null && gif === null) {
        return;
      }
      const isSuccess = await handleAddComment(
        commentText,
        imageVideo,
        gif,
        tagParentCommentUser.length > 0 ? tagParentCommentUser.join(" ").trim() : null,
      );
      clearAllInput();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentText(event.target.value.slice(tagParentCommentUser.join(" ").length + 1));
      autoResizeTextarea();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (commentText === "" && event.key === "Backspace" && tagParentCommentUser.length > 0) {
        event.preventDefault();

        const updatedTags = [...tagParentCommentUser];
        updatedTags.pop();
        setTagParentCommentUser(updatedTags);
      }
    };

    const autoResizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
      }
    };

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      scrollIntoView: () =>
        textareaRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    }));

    useEffect(() => {
      document.addEventListener("mousedown", onClickOutsideEmoji);
      document.addEventListener("mousedown", onClickOutsideGif);
      document.addEventListener("mousedown", onClickUploadImageVideo);
      return () => {
        document.removeEventListener("mousedown", onClickOutsideEmoji);
        document.removeEventListener("mousedown", onClickOutsideGif);
        document.removeEventListener("mousedown", onClickUploadImageVideo);
      };
    }, []);

    useEffect(() => {
      if (isCommentReply) {
        textareaRef.current?.focus();
      }
    }, [isCommentReply]);

    useEffect(() => {
      if (textareaRef.current) {
        const length = (tagParentCommentUser.join(" ") + " " + commentText).length;
        textareaRef.current.selectionStart = length;
        textareaRef.current.selectionEnd = length;
      }
      autoResizeTextarea();
    }, [tagParentCommentUser, commentText]);

    return (
      <div className={`mt-1 flex pb-4`}>
        {/* Photo profile */}
        <div className="mr-2 min-w-max">
          <Image
            src={user?.profilePicture ? user.profilePicture : "/icons/user.png"}
            width={30}
            height={30}
            alt="profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-y-2">
          {/* Input comment */}
          <div
            className={`flex flex-1 rounded-md bg-[#F0F2F5] ${isTextareaEverFocus ? "flex-col py-2" : "items-center"}`}
          >
            {/* Upper - Input comment text */}
            <div
              className={`relative mx-2 flex ${!isTextareaEverFocus && "h-full w-full items-center"}`}
            >
              <div className="absolute z-10 flex flex-wrap bg-blue-200">
                {tagParentCommentUser.map((item, index) => (
                  <span key={index} className={`${index !== 0 && "ml-1"}`}>
                    {item}
                  </span>
                ))}
              </div>
              <textarea
                className={`w-full resize-none overflow-hidden bg-[#F0F2F5] outline-none ${!isTextareaEverFocus && "flex-1"}`}
                ref={textareaRef}
                value={tagParentCommentUser.join(" ") + " " + commentText}
                onChange={handleInputChange}
                onFocus={() => setIsTextareaFocus(true)}
                placeholder="Write an answer..."
                rows={1}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Footer - Action button */}
            <div
              className={`mx-1 flex select-none items-center justify-between ${isTextareaEverFocus && "py-1"}`}
            >
              {/* Action Button Attachment */}
              <div className="flex">
                {/*  Action Button - Comment With An Avatar Sticker */}
                {imageVideo === null && gif === null && (
                  <ActionButtonInputComment
                    icon={
                      <ChatBubbleOvalLeftIconOutline className="mr-1 h-7  w-7 scale-x-[-1] transform cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
                    }
                    tooltip="Comment with an avatar sticker"
                  />
                )}

                {/*  Action Button - Insert Emoji */}
                <div className="relative">
                  <div ref={emojiOptionRef}>
                    <ActionButtonInputComment
                      icon={
                        <FaceSmileIcon className="mr-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
                      }
                      tooltip="Insert an emoji"
                    />
                  </div>
                  {isShowEmojiSelector && (
                    <div
                      ref={emojiSelectorRef}
                      className="custom-scrollbar absolute -left-72 bottom-8 z-20 h-[300px] w-[330px] select-none overflow-x-hidden overflow-y-scroll rounded-lg bg-white pr-2 shadow-lg"
                    >
                      <div className="grid w-fit grid-cols-8 gap-2 p-1">
                        {emojis.map((emoji, index) => (
                          <div
                            key={index}
                            className="cursor-pointer text-3xl"
                            onClick={() => handleClickEmoji(emoji)}
                          >
                            {emoji}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {imageVideo === null && gif === null && (
                  <Fragment>
                    {/*  Action Button - Insert Image or Video */}
                    <div ref={fileInputOptionRef}>
                      <ActionButtonInputComment
                        icon={
                          <CameraIcon className="mr-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
                        }
                        tooltip="Attach a photo or video"
                      />
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept="image/*, video/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => handleAddFileFromInput(e.target.files!)}
                      />
                    </div>

                    {/*  Action Button - Comment With A GIF */}
                    <div className="relative">
                      <div ref={gifOptionRef}>
                        <ActionButtonInputComment
                          icon={
                            <GifIcon className="mr-1 h-7 w-7 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
                          }
                          tooltip="Comment with a GIF"
                        />
                      </div>
                      {isShowGifSelector && (
                        <div ref={gifSelectorRef}>
                          <GifCommentSelector
                            setGif={setGif}
                            setIsShowGifSelector={setIsShowGifSelector}
                          />
                        </div>
                      )}
                    </div>
                    <ActionButtonInputComment
                      icon={
                        <StopIcon className="mr-1 h-7 w-7 -rotate-45 cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
                      }
                      tooltip="Comment with a sticker"
                    />
                  </Fragment>
                )}
              </div>

              {/* Submit button */}
              <div className="group/tooltip relative cursor-pointer">
                <PaperAirplaneIcon
                  onClick={onClickSubmitComment}
                  className={`ml-1 h-7 w-7 cursor-pointer rounded-full p-1 ${commentText.trim().length > 0 ? "text-[#005DC6]" : "text-gray-500"} hover:bg-gray-200 ${isTextareaEverFocus || commentText.length > 0 ? "" : "hidden"}`}
                />
                <p
                  className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap 
                rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover/tooltip:block"
                >
                  Comment
                </p>
              </div>
            </div>
          </div>

          {/* Display selected image or video */}
          {imageVideo !== null && (
            <div className="flex">
              <div className="relative h-[80px] w-[80px]">
                <Image
                  src={imageVideo.url}
                  width={100}
                  height={100}
                  alt="upload image or video"
                  className="h-full w-full object-cover"
                />
                <div
                  className={`absolute top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-25 ${imageVideo.type === MediaImageVideoEnum.VIDEO ? "block" : "hidden"}`}
                >
                  <Image
                    alt="play-video"
                    width={35}
                    height={35}
                    src="/icons/postings/play-video.png"
                  />
                </div>
              </div>
              <XMarkIcon
                onClick={() => handleRemoveMedia()}
                className="ml-3 h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1 text-gray-800"
              />
            </div>
          )}

          {/* Display selected GIF */}
          {gif !== null && (
            <div className="flex">
              <div className="relative h-[80px] w-[80px]">
                <Image
                  width={70}
                  height={70}
                  src={gif.media_formats.gif.url}
                  alt={gif.content_description}
                  className="h-full w-full object-cover"
                />
              </div>
              <XMarkIcon
                onClick={() => handleRemoveMedia()}
                className="ml-3 h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1 text-gray-800"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);

InputComment.displayName = "InputComment";

export default InputComment;

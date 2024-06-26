import React, {
  useState,
  ChangeEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  Fragment,
  useContext,
} from "react";
import {
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconOutline,
  FaceSmileIcon,
  CameraIcon,
  GifIcon,
  StopIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import ActionButtonInputComment from "./ActionButtonInputComment";
import GifCommentSelector from "../comments/GifCommentSelector";
import {
  MediaImageVideoEnum,
  MediaImageVideoType,
  MediaPostEnum,
} from "@/types/mediaPost";
import { createThumbnail } from "@/utils/createThumbnailFromVideo";
import { GifType } from "@/types/gifs";
import { uploadFileImagesVideos } from "@/utils/uploadStorageFirebase";
import axios from "axios";
import { AddCommentType, GetCommentType } from "@/types/comments";
import { UserContext } from "@/hooks/useContext";

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
  addNewComment: (comment: GetCommentType) => void;
};

const InputComment = forwardRef<InputCommentRef, InputCommentProps>(
  ({ userId, postId, addNewComment }, ref) => {
    const [commentText, setCommentText] = useState<string>("");
    const [gif, setGif] = useState<GifType | null>(null);
    const [imageVideo, setImageVideo] = useState<MediaImageVideoType | null>(
      null,
    );

    const user = useContext(UserContext);

    const [isTextareaEverFocus, setIsTextareaFocus] = useState(false);
    const [isShowEmojiSelector, setIsShowEmojiSelector] = useState(false);
    const [isShowGifSelector, setIsShowGifSelector] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const emojiSelectorRef = useRef<HTMLDivElement>(null);
    const emojiOptionRef = useRef<HTMLDivElement>(null);

    const fileInputOptionRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const gifSelectorRef = useRef<HTMLDivElement>(null);
    const gifOptionRef = useRef<HTMLDivElement>(null);

    const removeMedia = () => {
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

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      scrollIntoView: () =>
        textareaRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
    }));

    const handleClickEmoji = (emoji: string) =>
      setCommentText((prevState) => prevState + emoji);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setCommentText(textarea.value);
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
        type: isVideoFile(file)
          ? MediaImageVideoEnum.VIDEO
          : MediaImageVideoEnum.IMAGE,
        url: URL.createObjectURL(file),
        urlObject: URL.createObjectURL(file),
      };

      if (newImageVideo.type === MediaImageVideoEnum.VIDEO) {
        const thumbnailVideo = await createThumbnail(newImageVideo.url);
        newImageVideo.downloadUrl = thumbnailVideo;
      }
      setImageVideo(newImageVideo);
    };

    const addCommentInDatabase = async (
      mediaTypeId: number | null,
      mediaUrl: string | null,
    ) => {
      try {
        const commentObject: AddCommentType = {
          user_id: userId,
          post_id: postId,
          parent_comment_id: null,
          content: commentText,
          media_type_id: mediaTypeId,
          media_url: mediaUrl,
        };
        const response = await axios.post("/api/comments", commentObject);
        addNewComment(response.data.data);
        console.log("Add Comment: ", response.data);
      } catch (error) {
      } finally {
        removeMedia();
        setCommentText("");
      }
    };

    const onClickSubmitComment = async () => {
      if (
        commentText.trim().length <= 0 &&
        imageVideo === null &&
        gif === null
      ) {
        return;
      }

      let mediaTypeId: number | null = null;
      let mediaUrl: string | null = null;

      // handle upload image / video
      if (imageVideo !== null) {
        const url = await uploadFileImagesVideos([imageVideo]);
        mediaTypeId =
          imageVideo.type === MediaImageVideoEnum.VIDEO
            ? MediaPostEnum.VIDEO
            : MediaPostEnum.IMAGE;
        mediaUrl = url[0].url;
      } else if (gif !== null) {
        mediaTypeId = MediaPostEnum.GIF;
        mediaUrl = gif.media_formats.gif.url;
      }

      addCommentInDatabase(mediaTypeId, mediaUrl);
    };

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

    return (
      <div className={`flex px-4 pb-5 pt-3`}>
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
          <div
            className={`flex flex-1 rounded-md bg-[#F0F2F5] ${isTextareaEverFocus ? "flex-col py-2" : "items-center"}`}
          >
            <textarea
              ref={textareaRef}
              value={commentText}
              onChange={handleChange}
              style={{ height: `${!isTextareaEverFocus ? "28px" : ""}` }}
              placeholder="Write an answer..."
              className={`mx-2 resize-none overflow-hidden bg-[#F0F2F5] outline-none ${!isTextareaEverFocus && "h-7 flex-1"}`}
              onFocus={() => setIsTextareaFocus(true)}
            />
            <div
              className={`mx-1 flex select-none items-center justify-between ${isTextareaEverFocus && "py-2"}`}
            >
              <div className="flex">
                {imageVideo === null && gif === null && (
                  <ActionButtonInputComment
                    icon={
                      <ChatBubbleOvalLeftIconOutline className="mr-1 h-7  w-7 scale-x-[-1] transform cursor-pointer rounded-full p-1 text-gray-500 hover:bg-gray-200" />
                    }
                    tooltip="Comment with an avatar sticker"
                  />
                )}
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
                      className="custom-scrollbar absolute -left-72 bottom-8 h-[300px] w-[330px] select-none overflow-x-hidden overflow-y-scroll rounded-lg bg-white pr-2 shadow-lg"
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
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) =>
                          handleAddFileFromInput(e.target.files!)
                        }
                      />
                    </div>
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
              <div className="group relative cursor-pointer">
                <PaperAirplaneIcon
                  onClick={onClickSubmitComment}
                  className={`ml-1 h-7 w-7 cursor-pointer rounded-full p-1 ${commentText.trim().length > 0 ? "text-[#005DC6]" : "text-gray-500"} hover:bg-gray-200 ${isTextareaEverFocus || commentText.length > 0 ? "" : "hidden"}`}
                />
                <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform whitespace-nowrap rounded-md bg-gray-800 p-2 text-xs text-gray-200 opacity-90 group-hover:block">
                  Comment
                </p>
              </div>
            </div>
          </div>
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
                onClick={() => removeMedia()}
                className="ml-3 h-6 w-6 cursor-pointer rounded-full bg-gray-200 p-1 text-gray-800"
              />
            </div>
          )}
          {gif !== null && (
            <div className="flex">
              <div className="relative h-[80px] w-[80px]">
                <Image
                  width={100}
                  height={100}
                  src={gif.media_formats.gif.url}
                  alt={gif.content_description}
                  className="h-full w-full object-cover"
                />
              </div>
              <XMarkIcon
                onClick={() => removeMedia()}
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

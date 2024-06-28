import useDebounce from "@/hooks/useDebounceRef";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { GifType, GifsAPIType } from "@/types/gifs";
import axios, { AxiosError } from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type GifCommentSelectorProps = {
  setGif: (param: GifType) => void;
  setIsShowGifSelector: (param: boolean) => void;
};

const GifCommentSelector = ({
  setGif,
  setIsShowGifSelector,
}: GifCommentSelectorProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [gifs, setGifs] = useState<GifsAPIType>({
    results: [],
    next: 0,
  });
  const [filteredGifs, setFilteredGifs] = useState<GifsAPIType>({
    results: [],
    next: 0,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleClickGif = (gif: GifType) => {
    setGif(gif);
    setIsShowGifSelector(false);
  };

  const loadGifsCallApi = async (gifs: GifsAPIType) => {
    if (gifs.next === null) return;
    try {
      const response = await axios.get("/api/gifs", {
        params: { next: gifs.next },
      });
      const data: GifsAPIType = response.data;
      setGifs((prevGifs) => ({
        results: [...prevGifs.results, ...data.results],
        next: data.next,
      }));
    } catch (error: AxiosError | any) {
      console.error("Failed to load GIFs", error);
    }
  };

  const loadGifsByKeyword = async (
    filteredGifs: GifsAPIType,
    keyword: string,
  ) => {
    try {
      const response = await axios.get("/api/gifs", {
        params: { q: keyword, next: filteredGifs.next },
      });
      const data: GifsAPIType = response.data;
      console.log("data : ", data);
      setFilteredGifs((prevGifs) => ({
        results: [...prevGifs.results, ...data.results],
        next: data.next,
      }));
    } catch (error) {
      console.error("Failed to load GIFs", error);
    }
  };

  const debouncedSearch = useDebounce(async (keyword: string) => {
    if (keyword.trim()) {
      setFilteredGifs({ results: [], next: null });
      setGifs({ results: [], next: null });
      const filtered: GifsAPIType = { results: [], next: null };
      loadGifsByKeyword(filtered, keyword);
    } else {
      setFilteredGifs({
        results: [],
        next: null,
      });
    }
  }, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setSearchKeyword(newKeyword);
    debouncedSearch(newKeyword);
  };

  useEffect(() => {
    loadGifsCallApi(gifs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInfiniteScroll(
    () => {
      if (searchKeyword.trim().length > 0) {
        loadGifsByKeyword(filteredGifs, searchKeyword);
      } else {
        loadGifsCallApi(gifs);
      }
    },
    scrollRef,
    300,
  );

  return (
    <div className="absolute -left-56 bottom-8 flex w-[280px] flex-col overflow-hidden rounded-lg bg-white">
      <div className="flex items-center justify-center gap-x-2 py-3">
        <div className="">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search"
          className="w-[190px] outline-none"
        />
        <div className={`h-5 w-5`}>
          <XMarkIcon
            className={`${searchKeyword.length <= 0 ? "hidden" : "block"} text-gray-500`}
          />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="custom-scrollbar h-[300px] overflow-y-scroll"
      >
        {searchKeyword.trim().length > 0 &&
          filteredGifs.results.length <= 0 && (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <Image
                alt="no-gift"
                width={110}
                height={110}
                src={"/icons/postings/null_states_media_gray_wash.svg"}
              />
              <p className="text-gray-600">No GIFs to show</p>
            </div>
          )}
        {searchKeyword.trim().length > 0
          ? filteredGifs.results.map((gif) => (
              <div key={gif.id} className="bg-white">
                <Image
                  width={40}
                  height={40}
                  src={gif.media_formats.gif.url}
                  alt={gif.content_description}
                  onClick={() => handleClickGif(gif)}
                  className="h-auto w-full cursor-pointer"
                />
              </div>
            ))
          : gifs.results.map((gif) => (
              <div key={gif.id} className="bg-white">
                <Image
                  width={40}
                  height={40}
                  src={gif.media_formats.gif.url}
                  alt={gif.content_description}
                  onClick={() => handleClickGif(gif)}
                  className="h-auto w-full cursor-pointer"
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default GifCommentSelector;

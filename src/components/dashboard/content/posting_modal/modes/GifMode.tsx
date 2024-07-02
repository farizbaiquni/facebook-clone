import { useEffect, useState, useRef, useCallback } from "react";
import { GifType, GifsAPIType } from "@/types/gifs";
import { ModeTypes } from "@/types/modes";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import GifItem from "../components/GifItem";
import useDebounce from "@/hooks/useDebounceRef";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import axios from "axios";

type GifModeProps = {
  handleModeType: (param: ModeTypes) => void;
  setSelectedGif: (param: GifType | null) => void;
};

const GifMode = ({ handleModeType, setSelectedGif }: GifModeProps) => {
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

  const handleClickGif = (gif: GifType | null) => {
    handleModeType(ModeTypes.PostingMode);
    setSelectedGif(gif);
  };

  const loadGifsCallApi = useCallback(async (gifs: GifsAPIType) => {
    if (gifs.next === null) return;
    try {
      const response = await axios.get("/api/gifs", {
        params: { next: gifs.next },
      });
      const data: GifsAPIType = response.data;
      console.log("data", data);
      setGifs((prevGifs) => ({
        results: [...prevGifs.results, ...data.results],
        next: data.next,
      }));
    } catch (error) {
      console.error("Failed to load GIFs", error);
    }
  }, []);

  const loadGifsByKeywordCallApi = useCallback(
    async (filteredGifs: GifsAPIType, keyword: string) => {
      try {
        const response = await axios.get("/api/gifs", {
          params: { q: keyword, next: filteredGifs.next },
        });
        const data: GifsAPIType = response.data;
        setFilteredGifs((prevGifs) => ({
          results: [...prevGifs.results, ...data.results],
          next: data.next,
        }));
      } catch (error) {
        console.error("Failed to load GIFs", error);
      }
    },
    [],
  );

  const debouncedSearch = useDebounce(async (keyword: string) => {
    if (keyword.trim()) {
      setFilteredGifs({ results: [], next: null });
      setGifs({ results: [], next: null });
      const filtered: GifsAPIType = { results: [], next: null };
      loadGifsByKeywordCallApi(filtered, keyword);
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
        loadGifsByKeywordCallApi(filteredGifs, searchKeyword);
      } else {
        loadGifsCallApi(gifs);
      }
    },
    scrollRef,
    300,
  );

  return (
    <div className="flex h-auto w-[500px] flex-col rounded-lg bg-white">
      <div className="flex flex-col">
        {/* Header */}
        <div className="mx-4">
          <div className="relative mb-5 flex h-[60px] items-center justify-center border-b border-b-gray-300">
            <p className="flex flex-1 items-center justify-center text-lg font-extrabold">
              Choose a GIF
            </p>
            <ArrowLeftIcon
              onClick={() => handleModeType(ModeTypes.PostingMode)}
              className="absolute left-0 h-10 w-10 cursor-pointer rounded-full bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
            />
          </div>
          <div className="mb-4 w-full rounded-full bg-[#E4E6EB] px-8 py-2">
            <div className="relative w-full">
              <input
                type="text"
                className="ml-2 w-full bg-[#E4E6EB] placeholder-gray-700 outline-none"
                placeholder="Search for GIFs"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="absolute left-[-15px] top-1/2 h-4 w-4 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div
          ref={scrollRef}
          className="custom-scrollbar mt-2 h-[500px] overflow-y-scroll"
        >
          {searchKeyword.trim().length > 0
            ? filteredGifs.results.map((gif) => (
                <GifItem
                  key={gif.id}
                  gif={gif}
                  handleClickGif={handleClickGif}
                />
              ))
            : gifs.results.map((gif) => (
                <GifItem
                  key={gif.id}
                  gif={gif}
                  handleClickGif={handleClickGif}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default GifMode;

import { useEffect, useCallback } from "react";
import useDebounce from "./useDebounceRef";

const useInfiniteScroll = (
  callback: Function,
  ref: React.RefObject<HTMLDivElement>,
  delay: number,
) => {
  const debouncedCallback = useDebounce(callback, delay);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (Math.abs(scrollHeight - (scrollTop + clientHeight)) <= 1) {
          debouncedCallback();
        }
      }
    };

    const divElement = ref.current;
    if (divElement) {
      divElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [debouncedCallback, ref]);
};

export default useInfiniteScroll;

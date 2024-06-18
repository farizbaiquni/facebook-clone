// Code from : https://github.com/vimtor/use-line-clamp

import { useEffect, useRef, useState } from "react";

export default function useLineClamp<T extends HTMLElement>(
  ref: React.RefObject<T>,
  { lines }: { lines: number },
) {
  const [clamps, setClamps] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const checkClamps = () => {
      if (!ref.current) return;

      const initialValues = {
        webkitLineClamp: ref.current.style.webkitLineClamp,
        display: ref.current.style.display,
        webkitBoxOrient: ref.current.style.webkitBoxOrient,
        overflow: ref.current.style.overflow,
      };

      ref.current.style.webkitLineClamp = lines.toString();
      ref.current.style.display = "-webkit-box";
      ref.current.style.webkitBoxOrient = "vertical";
      ref.current.style.overflow = "hidden";

      const isClamped = ref.current.clientHeight !== ref.current.scrollHeight;
      setClamps(isClamped);

      ref.current.style.webkitLineClamp = initialValues.webkitLineClamp;
      ref.current.style.display = initialValues.display;
      ref.current.style.webkitBoxOrient = initialValues.webkitBoxOrient;
      ref.current.style.overflow = initialValues.overflow;
    };

    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        checkClamps();
      }, 50);
    };

    checkClamps();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [ref, lines]);

  return clamps;
}

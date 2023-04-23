import { useEffect, useRef, useState } from "react";

export const useScrollEnd = () => {
  const [scrollEnded, setScrollEnded] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    setScrollEnded(container.scrollHeight - container.clientHeight === 0);

    container.addEventListener("scroll", (e) => {
      const target = e.target as HTMLDivElement;

      const scrolledToBottom =
        target.scrollHeight - target.scrollTop === target.clientHeight;

      setScrollEnded(scrolledToBottom);
    });
  }, [ref.current]);

  return {
    ref,
    scrollEnded,
  };
};

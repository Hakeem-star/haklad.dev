import React, { MutableRefObject } from "react";

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

/**
 *
 * @param ref When the ref is present, we return the relative position of the mouse to the provided item,
 *  otherwise the position is relative to the window
 * @param options
 *  @param options.centerOrigin The mouse positions are relative to the center of the item
 *  @param options.normalise Tranforms the range from 0 - 1
 *
 * @returns X & Y Mouse position
 */

const useMousePosition = ({
  ref,
  options = {},
}: {
  ref?: MutableRefObject<HTMLElement | null>;
  options?: { centerOrigin?: boolean; normalise?: boolean };
}) => {
  const { centerOrigin = false, normalise = false } = options;
  const [mousePosition, setMousePosition] = React.useState<
    Record<"x" | "y", null | number>
  >({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const minVal = centerOrigin ? -1 : 0;

      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();

        const centerOffsetY = centerOrigin ? rect.height / 2 : 0;
        const centerOffsetX = centerOrigin ? rect.width / 2 : 0;

        const normaliseOffsetY = normalise ? rect.height / 2 : 1;
        const normaliseOffsetX = normalise ? rect.width / 2 : 1;

        const x = (ev.clientX - rect.left - centerOffsetX) / normaliseOffsetX; // x position within the element.
        const y = (ev.clientY - rect.top - centerOffsetY) / normaliseOffsetY; // y position within the element.

        setMousePosition({
          x: normalise ? clamp(x, minVal, 1) : x,
          y: normalise ? clamp(y, minVal, 1) : y,
        });
        return;
      }

      const centerOffsetX = centerOrigin ? window.innerWidth / 2 : 0;
      const centerOffsetY = centerOrigin ? window.innerHeight / 2 : 0;

      const normaliseOffsetX = normalise ? window.innerWidth / 2 : 1;
      const normaliseOffsetY = normalise ? window.innerHeight / 2 : 1;
      const x = (ev.clientX - centerOffsetX) / normaliseOffsetX;
      const y = (ev.clientY - centerOffsetY) / normaliseOffsetY;

      setMousePosition({
        x: normalise ? clamp(x, minVal, 1) : x,
        y: normalise ? clamp(y, minVal, 1) : y,
      });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [ref, centerOrigin, normalise]);

  return mousePosition;
};
export default useMousePosition;

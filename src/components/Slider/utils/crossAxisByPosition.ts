import { ElementRects } from "@floating-ui/react";
import { Position } from "../types/position";

export const crossAxisByPosition = (
  position: Position,
  rects: ElementRects
) => {
  if (position === "left") {
    return (rects.floating.width - rects.reference.width) / 2;
  }

  if (position === "right") {
    return ((rects.floating.width - rects.reference.width) / 2) * -1;
  }

  return 0;
};

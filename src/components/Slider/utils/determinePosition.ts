import { Position } from "../types/position";

type Props = {
  index: number;
  length: number;
};

export const determinePosition = ({ index, length }: Props): Position => {
  if (index === 1) {
    return "left";
  }

  if (index === length - 2) {
    return "right";
  }

  return "center";
};

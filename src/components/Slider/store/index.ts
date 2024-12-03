import { create } from "zustand";

interface SliderStore {
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
}

export const useSliderStore = create<SliderStore>((set) => ({
  isHovered: false,
  setIsHovered: (value) => set({ isHovered: value }),
}));

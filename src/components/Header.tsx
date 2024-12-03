"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 120], [0, 1]);
  const backgroundColor = useMotionTemplate`rgba(20, 20, 20, ${opacity}`;

  return (
    <motion.header
      style={{
        backgroundColor,
      }}
      className="fixed top-0 w-full z-50 flex items-center justify-between px-page-padding py-4 transition-all"
    >
      <div className="flex items-center space-x-2 md:space-x-8">
        <Image
          src="/netflix.svg"
          alt="Netflix"
          width={92}
          height={24}
          className="object-contain"
        />
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-white">
          <Search className="w-6 h-6" />
        </button>
        <div className="relative h-8 w-8 rounded-md overflow-clip">
          <Image
            src="/images/avatar.png"
            fill
            className="w-full h-full object-cover"
            alt="avatar"
          />
        </div>
      </div>
    </motion.header>
  );
}

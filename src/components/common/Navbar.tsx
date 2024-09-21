"use client";

import classNames from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import ChevronIcon from "../icons/ChevronIcon";
import LaptopIcon from "../icons/LaptopIcon";
import MobileIcon from "../icons/MobileIcon";

type Props = {
  selectedDevice: DeviceType;
  setSelectedDevice: React.Dispatch<React.SetStateAction<DeviceType>>;
};

export type DeviceType = "desktop" | "mobile";

export const Navbar = ({ selectedDevice, setSelectedDevice }: Props) => {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 hidden h-16 min-h-16 grid-cols-3 items-center justify-center gap-0 gap-x-0 gap-y-0 border-b-[1px] border-b-[#16161626] bg-white px-10 lg:grid">
      <div className="justify-self flex items-center gap-x-4">
        <Link
          href="#"
          className="flex h-16 items-center gap-2 rounded-lg px-1 py-3 text-sm font-semibold"
        >
          <div className="h-4 w-4">
            <ChevronIcon />
          </div>
          <div>Back</div>
        </Link>
        <div className="h-[1.75rem] w-px bg-gray-200"></div>
        <div className="text-md font-semibold">Header 109</div>
      </div>
      <div className="flex h-full justify-center">
        <div
          className={classNames(
            "relative flex h-16 w-16 cursor-pointer items-center justify-center px-2",
            {
              "opacity-100": selectedDevice === "desktop",
              "opacity-50": selectedDevice === "mobile",
            },
          )}
          onClick={() => setSelectedDevice("desktop")}
        >
          <div className="h-7 w-7">
            <LaptopIcon />
          </div>

          <motion.div
            animate={{
              x: selectedDevice === "desktop" ? 0 : "100%",
            }}
            transition={{ duration: 0.1 }}
            className={classNames(
              "absolute inset-auto inset-x-0 bottom-0 h-[2px] w-full transform bg-black",
            )}
          />
        </div>
        <div
          className={classNames(
            "relative flex h-16 w-16 cursor-pointer items-center justify-center px-2",
            {
              "opacity-100": selectedDevice === "mobile",
              "opacity-50": selectedDevice === "desktop",
            },
          )}
          onClick={() => setSelectedDevice("mobile")}
        >
          <div className="h-7 w-7">
            <MobileIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

"use client";

import type { ButtonProps } from "@relume_io/relume-ui";
import { Button, useMediaQuery } from "@relume_io/relume-ui";
import classNames from "classnames";
import { motion } from "framer-motion";
import { DeviceType } from "./common/Navbar";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonProps[];
  images: ImageProps[];
  selectedDevice: DeviceType;
};

export type Header111Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header111 = (props: Header111Props) => {
  const { heading, description, buttons, selectedDevice } = {
    ...Header83Defaults,
    ...props,
  } as Props;

  const isTabMobile = useMediaQuery("(max-width: 768px)");

  const renderMobile = isTabMobile || selectedDevice === "mobile";

  return (
    <section
      id="relume"
      className={classNames("relative w-full transition-all duration-500 ease-in-out", {
        "max-w-sm": selectedDevice === "mobile",
        "w-full": selectedDevice === "desktop",
      })}
    >
      <div className="relative">
        <div className="sticky top-0 h-screen">
          <motion.div
            className="h-full px-[5%]"
            style={{
              opacity: 1,
            }}
          >
            <div className="h-full py-16 md:py-24">
              <div
                className={classNames("grid h-full gap-x-12 md:gap-x-20", {
                  "grid-cols-1": renderMobile,
                  "grid-cols-2": !renderMobile,
                })}
              >
                <div className="w-full">
                  <h1 className="mb-5 text-left text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
                    {heading}
                  </h1>
                </div>
                <div className="flex flex-col justify-end">
                  <p className="text-text-alternative md:text-md">{description}</p>
                  <div className="mt-6 flex gap-x-4 md:mt-8">
                    {buttons.map((button, index) => (
                      <Button key={index} {...button}>
                        {button.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 -z-10">
            <motion.div className="absolute inset-0 z-10 bg-black/50" style={{ opacity: 100 }} />
            <motion.div>
              <img
                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                alt=""
                className="absolute  size-full object-cover"
              />
            </motion.div>

            {/* </div> */}
          </div>
        </div>
      </div>
      <div className="h-screen bg-white"></div>
    </section>
  );
};

export const Header83Defaults: Header111Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary-alt" }],
};

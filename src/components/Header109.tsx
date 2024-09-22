"use client";

import type { ButtonProps } from "@relume_io/relume-ui";
import { Button, Heading, Text, useMediaQuery } from "@relume_io/relume-ui";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@relume_io/relume-ui";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import PlayIcon from "./icons/PlayIcon";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  video: string;
  buttons: ButtonProps[];
  images: ImageProps[];
  selectedDevice: "mobile" | "desktop";
};

export type Header109Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header109 = (props: Header109Props) => {
  const { heading, description, buttons, images, selectedDevice, video } = {
    ...Header109Defaults,
    ...props,
  } as Props;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: scrollContainerRef,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");
  const renderMobile = isMobile || selectedDevice === "mobile";

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setContainerHeight(
        scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight,
      );
    }
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setContainerHeight(
          scrollContainerRef.current.scrollHeight - scrollContainerRef.current.clientHeight,
        );
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const width = useTransform(
    scrollY,
    [containerHeight * 0.1, containerHeight * 0.5],
    ["100%", renderMobile ? "50%" : "10%"],
  );

  const height = useTransform(
    scrollY,
    [containerHeight * 0.1, containerHeight * 0.5],
    ["100%", renderMobile ? "25%" : "20%"],
  );

  const translateY = useTransform(
    scrollY,
    [containerHeight * 0.2, containerHeight * 0.5],
    ["0vh", "40vh"],
  );

  return (
    <section
      id="relume"
      className={clsx("relative flex overflow-hidden bg-white transition-all", {
        "max-w-sm": selectedDevice === "mobile",
        "w-full": selectedDevice === "desktop",
      })}
    >
      <div
        ref={scrollContainerRef}
        className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 h-screen w-full overflow-y-scroll"
      >
        <div className="h-[300vh]">
          <div className="sticky top-0 flex w-full flex-col items-center justify-center">
            <div className="z-1 relative flex h-screen w-full items-center justify-center ">
              <VideoModal
                width={width}
                height={height}
                translateY={translateY}
                images={images}
                video={video}
              />
            </div>
            <div className="relative items-center justify-center pb-28 pt-6">
              <div className="max-w-lg px-[5%]">
                <div className="mx-auto w-full text-center">
                  <Heading headingSize="h1">{heading}</Heading>
                  <Text className="text-base">{description}</Text>
                  <div className="flex flex-wrap items-center justify-center gap-x-4">
                    {buttons.map((button, index) => (
                      <Button key={index} variant={button.variant}>
                        {button.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-screen"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

type VideoModalProps = {
  width: MotionValue<string>;
  height: MotionValue<string>;
  translateY: MotionValue<string>;
  images: ImageProps[];
  video: string;
};

const VideoModal = ({ width, height, translateY, images, video }: VideoModalProps) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.a
          href="#"
          className="absolute flex h-full w-full items-center justify-center"
          style={{
            width,
            height,
            translateY,
          }}
        >
          <img
            className="h-full w-full bg-opacity-50 object-cover"
            alt={images[0].alt}
            loading="lazy"
            src={images[0].src}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/50"></div>
          <div className="absolute z-20 flex h-20 w-20 items-center justify-center text-white opacity-100">
            <PlayIcon />
          </div>
        </motion.a>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-black/90" />
        <DialogContent>
          {!isIframeLoaded && <Loading className="mx-auto size-16 text-white" />}
          <iframe
            className={clsx("z-0 mx-auto aspect-video h-full w-full md:w-[738px] lg:w-[940px]", {
              visible: isIframeLoaded,
              hidden: !isIframeLoaded,
            })}
            src={video}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsIframeLoaded(true)}
          ></iframe>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export const Header109Defaults: Props = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button" }, { title: "Button", variant: "secondary" }],
  images: [
    {
      src: "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316216244aee67_Placeholder%20Video%20-%20Landscape.svg",
      alt: "Video placeholder",
    },
  ],
  selectedDevice: "desktop",
  video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
};

const Loading = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <path
          strokeDasharray={60}
          strokeDashoffset={60}
          strokeOpacity={0.3}
          d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0" />
        </path>
        <path strokeDasharray={15} strokeDashoffset={15} d="M12 3a9 9 0 0 1 9 9">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0" />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </g>
    </svg>
  );
};

export default VideoModal;

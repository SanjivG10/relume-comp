import { Button, Heading, Text } from "@relume_io/relume-ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DeviceType } from "./common/Navbar";
import classNames from "classnames";

type Props = {
  selectedDevice: DeviceType;
};

export const Header109 = ({ selectedDevice }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: scrollContainerRef,
  });
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
    ["100%", selectedDevice === "desktop" ? "10%" : "50%"],
  );

  const height = useTransform(
    scrollY,
    [containerHeight * 0.1, containerHeight * 0.5],
    ["100%", selectedDevice === "desktop" ? "20%" : "25%"],
  );

  const translateY = useTransform(
    scrollY,
    [containerHeight * 0.2, containerHeight * 0.5],
    ["0vh", "40vh"],
  );

  return (
    <section
      id="relume"
      className={classNames("relative flex  overflow-hidden bg-white transition-all", {
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
            <div className="z-1 relative flex h-screen w-full items-center justify-center">
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
                  className="h-full w-full object-cover"
                  alt=""
                  loading="lazy"
                  src="https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316216244aee67_Placeholder%20Video%20-%20Landscape.svg"
                />
              </motion.a>
            </div>
            <div className="relative items-center justify-center pb-28 pt-6">
              <div className="max-w-lg px-[5%]">
                <div className="mx-auto w-full text-center">
                  <Heading headingSize="h1">Medium length hero heading goes here</Heading>
                  <Text className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
                    in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor
                    interdum nulla, ut commodo diam libero vitae erat.
                  </Text>
                  <div className="flex flex-wrap items-center justify-center gap-x-4">
                    <Button>Button</Button>
                    <Button variant="secondary">Button</Button>
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

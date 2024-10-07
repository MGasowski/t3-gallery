"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import Link from "next/link";

export function HorizontalInfiniteSlider({
  images,
}: {
  images: {
    url: string;
    id: number;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderControl = useAnimation();
  const x = useMotionValue(0);

  const sliderWidth = images.length * 300; // Assuming each image is 300px wide

  useEffect(() => {
    const slider = containerRef.current;
    if (!slider) return;

    const moveSlider = () => {
      void sliderControl.start({
        x: [-sliderWidth, 0],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      });
    };

    moveSlider();

    return () => {
      sliderControl.stop();
    };
  }, [sliderControl, sliderWidth]);

  return (
    <div className="w-full overflow-hidden bg-gray-100 p-4">
      <div ref={containerRef} className="relative h-[200px] w-full">
        <motion.div
          className="absolute flex"
          style={{ x }}
          animate={sliderControl}
        >
          {[...images, ...images].map((image, index) => (
            <div
              key={image.id}
              className="h-[200px] w-[300px] flex-shrink-0 px-2"
            >
              <Link href={`/img/${image.id}`}>
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-full w-full rounded-lg object-cover"
                />
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

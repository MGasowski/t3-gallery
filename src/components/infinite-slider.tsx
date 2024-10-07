"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

export function InfiniteSlider({
  images = [],
}: {
  images?: {
    url: string;
    id: number;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden">
      <div className="relative h-48">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]?.url}
            alt={`Slide ${currentIndex + 1}`}
            className="absolute h-full w-full object-cover"
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-r-none bg-background/50 hover:bg-background/80"
          onClick={handlePrevious}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="rounded-l-none bg-background/50 hover:bg-background/80"
          onClick={handleNext}
        >
          <ChevronRightIcon className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

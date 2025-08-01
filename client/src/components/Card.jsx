import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@heroui/react";
import cn from "@/util/cn";

// https://www.telerik.com/blogs/card-flip-tailwind

export const DecksCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      // onMouseEnter={() => setIsFlipped(true)}
      // onMouseLeave={() => setIsFlipped(false)}
      className="h-90 w-90 cursor-pointer rounded-[35px] perspective-midrange"
    >
      <div
        className={cn(
          "relative size-full transition duration-1000 transform-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        <div className="absolute inset-0 size-full backface-hidden">
          <div className="bg-default-200 flex h-full w-full flex-col items-center justify-between rounded-[35px] p-4 text-black">
            <div className="flex h-full items-center justify-center text-lg font-bold">
              {front}
            </div>
            <Button
              aria-label="Flip card"
              className="w-full py-6"
              radius="full"
              onPress={() => setIsFlipped(!isFlipped)}
            >
              Reveal Answer
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 size-full rotate-y-180 backface-hidden">
          <div className="bg-default-200 flex h-full w-full flex-col items-center justify-between rounded-[35px] p-4 text-black">
            <div className="flex h-full items-center justify-center text-lg font-bold">
              {back}
            </div>
            <Button
              aria-label="Flip card"
              className="w-full py-6"
              radius="full"
              onPress={() => setIsFlipped(!isFlipped)}
            >
              Show Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

DecksCard.propTypes = {
  front: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  back: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

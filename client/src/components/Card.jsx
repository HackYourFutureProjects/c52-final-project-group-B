import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@heroui/react";
import cn from "@/util/cn";

// https://www.telerik.com/blogs/card-flip-tailwind

export const DecksCard = ({
  front,
  back,
  enableHover,
  flipDirection = "horizontal",
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => enableHover && setIsFlipped(true)}
      onMouseLeave={() => enableHover && setIsFlipped(false)}
      className="h-90 min-h-90 min-w-90 flex-1 cursor-pointer rounded-[35px] perspective-distant"
    >
      <div
        className={cn(
          "relative size-full transition duration-700 transform-3d",
          isFlipped && flipDirection === "horizontal" && "rotate-y-180",
          isFlipped && flipDirection === "vertical" && "rotate-x-180"
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
        <div
          className={cn(
            "absolute inset-0 size-full backface-hidden",
            flipDirection === "horizontal" && "rotate-y-180",
            flipDirection === "vertical" && "rotate-x-180"
          )}
        >
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
  enableHover: PropTypes.bool,
  flipDirection: PropTypes.oneOf(["horizontal", "vertical"]),
};

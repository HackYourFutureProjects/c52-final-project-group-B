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
      className="group h-70 min-h-50 min-w-50 flex-1 cursor-pointer rounded-[20px] text-center perspective-distant md:rounded-[35px]"
    >
      <div
        className={cn(
          "relative size-full transition duration-700 transform-3d",
          isFlipped && flipDirection === "horizontal" && "rotate-y-180",
          isFlipped && flipDirection === "vertical" && "rotate-x-180"
        )}
      >
        <div className="absolute inset-0 size-full [transform:rotateY(0deg)] [backface-visibility:hidden]">
          <div className="ring-secondary/10 hover:ring-secondary bg-secondary/5 text-secondary flex h-full w-full flex-col items-center justify-between rounded-[20px] p-4 ring-2 transition duration-250 md:rounded-[35px]">
            <div className="flex h-full items-center justify-center text-lg font-bold">
              {front}
            </div>
            <Button
              aria-label="Flip card"
              radius="full"
              variant="flat"
              color="secondary"
              onPress={() => setIsFlipped(!isFlipped)}
              className="group-hover:border-secondary data-[hover=true]:!bg-secondary data-[hover=true]:text-background w-full py-4"
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
          <div className="ring-primary/20 hover:ring-primary bg-primary/5 text-primary flex h-full w-full flex-col items-center justify-between rounded-[20px] p-4 ring-2 transition duration-250 md:rounded-[35px]">
            <div className="flex h-full items-center justify-center text-lg font-bold">
              {back}
            </div>
            <Button
              aria-label="Flip card"
              radius="full"
              variant="flat"
              color="primary"
              onPress={() => setIsFlipped(!isFlipped)}
              className="group-hover:border-primary data-[hover=true]:!bg-primary data-[hover=true]:text-background w-full py-4"
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

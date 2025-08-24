import PropTypes from "prop-types";
import cn from "@/util/cn";

const StylishDiv = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-default-100 from-secondary/15 to-default-100 ring-default gap-4 rounded-[20px] bg-radial-[at_50%_0%] to-100% p-4 ring-1 md:rounded-[35px] md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};

StylishDiv.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default StylishDiv;

import { Avatar } from "@heroui/react";
import PropTypes from "prop-types";

const AVATAR_FALLBACK =
  "https://meyersroman.com/wp-content/uploads/2024/08/Blank-Avatar-Placeholder.png";

const UserAvatar = ({ src, alt, size = 32, className = "", ...props }) => (
  <Avatar
    src={src || AVATAR_FALLBACK}
    alt={alt}
    size="sm"
    radius="full"
    className={className}
    style={{
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      objectFit: "cover",
    }}
    {...props}
  />
);

UserAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default UserAvatar;

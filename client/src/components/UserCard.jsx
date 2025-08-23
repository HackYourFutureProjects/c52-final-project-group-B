import PropTypes from "prop-types";
import { Avatar } from "@heroui/react";
import StylishDiv from "@/components/StylishDiv";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <StylishDiv className="flex flex-col items-center justify-between gap-2 text-center">
      <Avatar
        showFallback
        color="primary"
        src={user?.profilePictureUrl}
        size="sm"
        className="h-24 w-24 text-2xl"
      />
      <h2 className="text-secondary text-2xl font-black">{user.username}</h2>
      <p className="text-sm">{user.email}</p>
      <p className="text-sm">
        Registered: {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </StylishDiv>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    profilePictureUrl: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

export default UserCard;

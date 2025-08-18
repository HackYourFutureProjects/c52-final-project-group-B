import PropTypes from "prop-types";
import { Card, Avatar } from "@heroui/react";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <Card className="bg-default-100 flex flex-col items-center justify-between rounded-[35px] p-8 text-center shadow-md">
      <Avatar
        showFallback
        color="primary"
        src={user?.profilePictureUrl}
        size="sm"
        className="mb-5 h-24 w-24 text-2xl"
      />
      <h2 className="text-2xl font-black">{user.username}</h2>
      <p className="mt-2 text-sm">{user.email}</p>
      {user.createdAt && (
        <p className="mt-2 text-sm">
          Registered: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      )}
    </Card>
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

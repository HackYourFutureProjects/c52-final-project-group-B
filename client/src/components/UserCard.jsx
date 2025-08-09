import PropTypes from "prop-types";
import { Card } from "@heroui/react";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <Card className="bg-default-100 rounded-[35px] p-8 text-center shadow-md">
      <img
        src={
          user.profilePictureUrl ||
          "https://meyersroman.com/wp-content/uploads/2024/08/Blank-Avatar-Placeholder.png"
        }
        alt="avatar"
        className="mx-auto mb-5 h-24 w-24 rounded-full object-cover"
      />
      <h2 className="text-2xl font-black">{user.username}</h2>
      <p className="mt-2 text-sm text-black">{user.email}</p>
      {user.createdAt && (
        <p className="mt-2 text-sm text-black">
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

import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button, Input } from "@heroui/react";
import Title from "@/components/Title";
import UserCard from "@/components/UserCard";
import { getUserById, updateCurrentUser } from "@/api/userAPI";

const UserProfile = () => {
  const { user, isUserLoaded, setIsLoginOpen, forceLogin } =
    useContext(UserContext);

  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    profilePictureUrl: "",
  });

  useEffect(() => {
    if (!user && isUserLoaded === true) {
      forceLogin();
    }
    const load = async () => {
      try {
        const data = await getUserById();
        setUserInfo(data);
        setForm({
          username: data?.username || "",
          email: data?.email || "",
          profilePictureUrl: data?.profilePictureUrl || "",
        });
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, [user, isUserLoaded]);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSave = async () => {
    try {
      const updated = await updateCurrentUser(form);
      setUserInfo(updated);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (!userInfo) {
    return (
      <div className="text-center">
        <p className="text-xl font-bold">
          You need to be logged in to access your profile.
        </p>
        <Button
          color="primary"
          onPress={() => setIsLoginOpen(true)}
          className="mt-4"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Profile", path: `/users/${userInfo.id}` },
          ]}
        >
          Profile
        </Title>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <UserCard user={userInfo} />

        <div className="mt-8">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                name="username"
                label="Displayed name"
                variant="flat"
                radius="full"
                value={form.username}
                onChange={onChange}
              />
              <Input
                name="email"
                label="Email"
                variant="flat"
                radius="full"
                value={form.email}
                onChange={onChange}
              />
              <Input
                name="profilePictureUrl"
                label="Profile Picture URL"
                variant="flat"
                radius="full"
                value={form.profilePictureUrl}
                onChange={onChange}
              />
              <div className="mt-4 flex justify-end gap-3">
                <Button
                  className="font-semibold"
                  color="primary"
                  radius="full"
                  onPress={onSave}
                >
                  Save
                </Button>
                <Button
                  className="font-semibold"
                  color="secondary"
                  variant="flat"
                  radius="full"
                  onPress={() => {
                    setIsEditing(false);
                    setForm({
                      username: userInfo.username || "",
                      email: userInfo.email || "",
                      profilePictureUrl: userInfo.profilePictureUrl || "",
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 text-center">
              <Button
                className="px-6 font-semibold"
                radius="full"
                color="primary"
                onPress={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;

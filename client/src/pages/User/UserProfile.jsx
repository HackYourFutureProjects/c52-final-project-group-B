import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Button, Input, addToast } from "@heroui/react";
import Title from "@/components/Title";
import UserCard from "@/components/UserCard";
import { getUserById, updateCurrentUser } from "@/api/userAPI";
import apiRequest from "@/api/index";

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
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
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

  const onPasswordChange = async () => {
    try {
      if (
        !passwordForm.currentPassword ||
        passwordForm.newPassword.length < 8
      ) {
        addToast({
          title: "Error",
          description:
            "Please enter your current password and a new password (min 8 characters).",
          color: "danger",
          radius: "full",
        });
        return;
      }
      await apiRequest(
        `/users/${userInfo._id || userInfo.id}/password`,
        "PUT",
        passwordForm,
        true
      );
      addToast({
        title: "Success",
        description: "Password updated successfully",
        color: "success",
        radius: "full",
      });
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (e) {
      addToast({
        title: "Error",
        description: e?.message || "Failed to update password",
        color: "danger",
        radius: "full",
      });
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
                label="Username"
                variant="flat"
                value={form.username}
                onChange={onChange}
                className="rounded-[20px]"
              />
              <Input
                name="email"
                label="Email"
                variant="flat"
                value={form.email}
                onChange={onChange}
                className="rounded-[20px]"
              />
              <Input
                name="profilePictureUrl"
                label="Profile Picture URL"
                variant="flat"
                value={form.profilePictureUrl}
                onChange={onChange}
                className="rounded-[20px]"
              />
              <div className="mt-4 flex justify-end gap-3">
                <Button
                  className="rounded-[20px] font-semibold text-white"
                  style={{ backgroundColor: "#a8ca0b" }}
                  onPress={onSave}
                >
                  Save
                </Button>
                <Button
                  className="rounded-[20px] font-semibold text-white"
                  style={{ backgroundColor: "#a8ca0b" }}
                  variant="flat"
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
                className="rounded-[20px] px-6 font-semibold text-white"
                style={{ backgroundColor: "#a8ca0b" }}
                onPress={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-lg font-bold">Change Password</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Current Password"
              type="password"
              variant="flat"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((p) => ({
                  ...p,
                  currentPassword: e.target.value,
                }))
              }
              className="rounded-[20px]"
            />
            <Input
              label="New Password"
              type="password"
              variant="flat"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
              }
              className="rounded-[20px]"
            />
          </div>
          <div className="mt-4 text-right">
            <Button
              className="rounded-[20px] font-semibold text-white"
              style={{ backgroundColor: "#a8ca0b" }}
              onPress={onPasswordChange}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

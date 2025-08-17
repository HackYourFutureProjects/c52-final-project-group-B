import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import {
  Button,
  Input,
  addToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import Title from "@/components/Title";
import UserCard from "@/components/UserCard";
import {
  getUserById,
  updateCurrentUser,
  deactivateUser,
  activateUser,
} from "@/api/userAPI";
import apiRequest from "@/api/index";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";

const UserProfile = () => {
  const {
    user,
    isUserLoaded,
    setIsLoginOpen,
    forceLogin,
    setLocalStorageUser,
  } = useContext(UserContext);

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
  const [isConfirmDeactivateOpen, setIsConfirmDeactivateOpen] = useState(false);

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
      setLocalStorageUser({
        ...user,
        username: updated.username,
        profilePictureUrl: updated.profilePictureUrl,
        email: updated.email,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onPasswordChange = async () => {
    try {
      if (
        !passwordForm.currentPassword ||
        passwordForm.newPassword.length < PASSWORD_MIN_LENGTH
      ) {
        addToast({
          title: "Error",
          description: `Please enter your current password and a new password (min ${PASSWORD_MIN_LENGTH} characters).`,
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
            <>
              {userInfo.isDeleted && (
                <div className="text-danger text-center">
                  Your account is currently deactivated. To reactivate it,
                  please click the button below.
                </div>
              )}

              <div className="mt-4 flex items-center justify-center gap-4">
                <Button
                  className="px-6 font-semibold"
                  radius="full"
                  color="primary"
                  onPress={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
                {userInfo.isDeleted ? (
                  <Button
                    className="px-6 font-semibold"
                    radius="full"
                    color="success"
                    onPress={async () => {
                      try {
                        const updatedUser = await activateUser(
                          userInfo._id || userInfo.id
                        );
                        setUserInfo(updatedUser);
                        addToast({
                          title: "Success",
                          description: "User activated successfully",
                          color: "success",
                          radius: "full",
                        });
                      } catch (error) {
                        addToast({
                          title: "Error",
                          description:
                            error.message || "Failed to activate user",
                          color: "danger",
                          radius: "full",
                        });
                      }
                    }}
                  >
                    Activate Account
                  </Button>
                ) : (
                  <Popover
                    showArrow
                    backdrop="blur"
                    placement="top"
                    isOpen={isConfirmDeactivateOpen}
                    onOpenChange={(open) => setIsConfirmDeactivateOpen(open)}
                  >
                    <PopoverTrigger>
                      <Button
                        className="px-6 font-semibold"
                        radius="full"
                        color="danger"
                      >
                        Deactivate Account
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-[240px] p-6 text-center">
                      <p className="text-danger font-bold">
                        Are you sure you want to deactivate your account?
                      </p>
                      <div className="mt-4 flex gap-4">
                        <Button
                          className="font-semibold"
                          color="danger"
                          radius="full"
                          onPress={async () => {
                            try {
                              const updatedUser = await deactivateUser(
                                userInfo._id || userInfo.id
                              );
                              setUserInfo(updatedUser);
                              setIsConfirmDeactivateOpen(false);
                              addToast({
                                title: "Success",
                                description: "User deactivated successfully",
                                color: "success",
                                radius: "full",
                              });
                            } catch (error) {
                              setIsConfirmDeactivateOpen(false);
                              addToast({
                                title: "Error",
                                description:
                                  error.message || "Failed to deactivate user",
                                color: "danger",
                                radius: "full",
                              });
                            }
                          }}
                        >
                          Confirm
                        </Button>
                        <Button
                          className="font-semibold"
                          radius="full"
                          onPress={() => setIsConfirmDeactivateOpen(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </>
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

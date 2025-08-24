import { useEffect, useState, useContext, useMemo, useRef } from "react";
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
import { getUserById, updateCurrentUser, deactivateUser } from "@/api/userAPI";
import apiRequest from "@/api/index";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";
import { FiUpload } from "react-icons/fi";

const UserProfile = () => {
  const {
    user,
    isUserLoaded,
    updateUser,
    setIsLoginOpen,
    forceLogin,
    logoutUser,
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

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const cloudinaryUploadEndpoint = useMemo(() => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    return `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  }, []);

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
      if (isUploading) {
        addToast({
          title: "Please wait",
          description: "Avatar is still uploading to Cloudinary.",
          color: "warning",
          radius: "full",
        });
        return;
      }
      const updated = await updateCurrentUser(form);
      updateUser(updated);
      setUserInfo(updated);
      setIsEditing(false);
      addToast({
        title: "Success",
        description: "Profile updated",
        color: "success",
        radius: "full",
      });
    } catch (e) {
      console.error(e);
      addToast({
        title: "Error",
        description: e?.message || "Failed to update profile",
        color: "danger",
        radius: "full",
      });
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

  const triggerFileDialog = () => fileInputRef.current?.click();

  const onFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER);

      const res = await fetch(cloudinaryUploadEndpoint, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || "Cloudinary upload failed");
      }
      const data = await res.json();
      if (!data?.secure_url) {
        throw new Error("Cloudinary response missing secure_url");
      }
      setForm((prev) => ({ ...prev, profilePictureUrl: data.secure_url }));
      addToast({
        title: "Uploaded",
        description: "Avatar uploaded to Cloudinary.",
        color: "success",
        radius: "full",
      });
    } catch (err) {
      addToast({
        title: "Upload failed",
        description: err?.message || "Could not upload avatar",
        color: "danger",
        radius: "full",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Profile", path: `/users/me` },
          ]}
        >
          Profile
        </Title>
      </div>

      <div className="mx-auto mt-20 max-w-3xl px-0 md:px-4">
        {!isEditing && <UserCard user={userInfo} />}

        {isEditing ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={triggerFileDialog}
                className="group border-default-200 relative h-28 w-28 overflow-hidden rounded-full border md:h-32 md:w-32"
                aria-label="Change avatar"
                disabled={isUploading}
              >
                <img
                  src={
                    form.profilePictureUrl ||
                    "https://placehold.co/128x128?text=Avatar"
                  }
                  alt="Avatar"
                  className={`h-full w-full object-cover transition-opacity ${
                    isUploading ? "opacity-60" : "opacity-100"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/50 group-hover:flex">
                  <FiUpload className="h-8 w-8 text-white" />
                </div>
                {isUploading && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                    Uploading…
                  </div>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileSelect}
              />
              <p className="text-foreground text-xs">
                JPG, PNG, WebP up to 5MB per file
              </p>
            </div>
            <Input
              name="username"
              label="Displayed name"
              variant="faded"
              color="secondary"
              radius="full"
              value={form.username}
              onChange={onChange}
              classNames={{
                inputWrapper: "px-5 items-center md:items-start",
                input: "text-center md:text-left",
              }}
            />
            <Input
              name="email"
              label="Email"
              variant="faded"
              color="secondary"
              radius="full"
              value={form.email}
              onChange={onChange}
              classNames={{
                inputWrapper: "px-5 items-center md:items-start",
                input: "text-center md:text-left",
              }}
            />

            <div className="mt-2 flex flex-col justify-center gap-4 md:flex-row md:justify-end">
              <Button
                className="font-semibold"
                color="primary"
                radius="full"
                onPress={onSave}
                isDisabled={isUploading}
              >
                Save
              </Button>
              <Button
                className="font-semibold"
                color="secondary"
                variant="faded"
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
          <div className="mt-5 flex flex-col justify-center gap-4 md:flex-row md:items-center">
            <Button
              className="px-6 font-semibold"
              radius="full"
              color="primary"
              variant="faded"
              onPress={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
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
                  variant="faded"
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
                        logoutUser();
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
          </div>
        )}

        <div className="mt-20">
          <h3 className="text-secondary mb-4 text-center text-lg font-bold md:text-left">
            Change Password
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Enter your current password"
              type="password"
              radius="full"
              variant="faded"
              color="secondary"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((p) => ({
                  ...p,
                  currentPassword: e.target.value,
                }))
              }
              classNames={{
                inputWrapper: "px-5 items-center md:items-start",
                input: "text-center md:text-left",
              }}
            />
            <Input
              label="Enter your new password"
              type="password"
              radius="full"
              variant="faded"
              color="secondary"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))
              }
              classNames={{
                inputWrapper: "px-5 items-center md:items-start",
                input: "text-center md:text-left",
              }}
            />
          </div>
          <div className="mt-5 text-center md:text-right">
            <Button
              color="primary"
              radius="full"
              className="w-full font-semibold md:w-auto"
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

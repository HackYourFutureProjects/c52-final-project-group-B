import { useEffect, useState } from "react";
import { Button, Input } from "@heroui/react";
import Title from "@/components/Title";
import UserCard from "@/components/UserCard";
import { getUserById, updateCurrentUser } from "@/api/userAPI";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    profilePictureUrl: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserById();
        setUser(data);
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
  }, []);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSave = async () => {
    try {
      const updated = await updateCurrentUser(form);
      setUser(updated);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return <p className="mt-10 text-center">Loading...</p>;
  }

  return (
    <>
      <div className="mb-6 flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Profile", path: `/users/${user.id}` },
          ]}
        >
          Profile
        </Title>
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <UserCard user={user} />

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
                      username: user.username || "",
                      email: user.email || "",
                      profilePictureUrl: user.profilePictureUrl || "",
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
      </div>
    </>
  );
};

export default UserProfile;

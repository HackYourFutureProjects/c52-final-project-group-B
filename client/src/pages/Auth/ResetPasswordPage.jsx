import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { addToast, Button, Input, Spinner, Form } from "@heroui/react";
import Title from "@/components/Title";
import { resetPassword, verifyResetToken } from "@/api/userAPI";
import { PASSWORD_MIN_LENGTH } from "@/constants/validation";
import { ROUTES } from "@/routes/paths";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(null); // null=loading, true/false
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = searchParams.get("token") || "";

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }
      try {
        await verifyResetToken(token);
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      }
    };
    run();
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < PASSWORD_MIN_LENGTH) {
      addToast({
        title: "Error",
        description: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
        color: "danger",
        radius: "full",
      });
      return;
    }
    if (password !== confirmPassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        color: "danger",
        radius: "full",
      });
      return;
    }
    try {
      await resetPassword({ token, newPassword: password });
      addToast({
        title: "Success",
        description: "Your password has been reset. Please log in.",
        color: "success",
        radius: "full",
      });
      navigate(ROUTES.HOME);
    } catch (e) {
      addToast({
        title: "Error",
        description: e?.message || "Failed to reset password",
        color: "danger",
        radius: "full",
      });
    }
  };

  if (tokenValid === null) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner label="Validating token..." />
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="mx-auto max-w-md p-4 text-center">
        <Title>Reset Password</Title>
        <p className="mt-4">This reset link is invalid or has expired.</p>
        <Button
          className="mt-6"
          color="primary"
          onPress={() => navigate(ROUTES.HOME)}
        >
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <Title>Set a new password</Title>
      <Form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <Input
          isRequired
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          radius="full"
          variant="bordered"
        />
        <Input
          isRequired
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          radius="full"
          variant="bordered"
        />
        <Button color="primary" radius="full" type="submit" className="w-full">
          Update Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;

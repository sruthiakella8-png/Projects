import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../common/InputField";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;


function ResetPassword({ onResetPassword }) {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8-16 characters and include uppercase, lowercase, number, and special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setApiError("");
    setSuccess("");

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await onResetPassword(uid, token, formData.password);

      setSuccess("Password reset successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          err?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Reset Password
        </h2>

        {apiError && <ErrorMessage message={apiError} />}

        {success && (
          <p className="text-green-600 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            error={errors.confirmPassword}
          />

          <Button
            text={loading ? "Resetting..." : "Reset Password"}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
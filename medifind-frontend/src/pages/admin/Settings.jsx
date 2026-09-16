import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Lock,
  Globe,
  Mail,
  Smartphone,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Settings = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [activeTab, setActiveTab] = useState("profile");

  const [showPassword, setShowPassword] = useState(false);

  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "MEDIFIND Admin",
    email: "admin@medifind.com",
    phone: "+91 9876543210",
    role: "Administrator",
  });

  const [notifications, setNotifications] = useState({
    newUser: true,
    newDoctor: true,
    newAppointment: true,
    emergency: true,
    email: true,
    sms: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [system, setSystem] = useState({
    language: "English",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
  });

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // =====================================================
  // TABS
  // =====================================================

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
    },
    {
      id: "system",
      label: "System",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center gap-3 mb-8">

        <div className="p-3 bg-blue-100 rounded-xl">
          <SettingsIcon
            size={28}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Settings
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your MEDIFIND admin settings
          </p>
        </div>

      </div>

      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {saved && (
        <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">

          <CheckCircle size={20} />

          <span className="font-medium">
            Settings saved successfully.
          </span>

        </div>
      )}

      {/* =====================================================
          MAIN SETTINGS
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 h-fit">

          <div className="mb-4 px-3">

            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Account Settings
            </p>

          </div>

          <div className="space-y-1">

            {tabs.map((tab) => {

              const Icon = tab.icon;

              const active =
                activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >

                  <Icon size={19} />

                  <span className="font-medium">
                    {tab.label}
                  </span>

                </button>
              );
            })}

          </div>

        </div>

        {/* ===================================================
            CONTENT
        =================================================== */}

        <div className="lg:col-span-3">

          {/* =================================================
              PROFILE
          ================================================= */}

          {activeTab === "profile" && (

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

              <SettingsHeader
                icon={User}
                title="Admin Profile"
                description="Manage administrator account information"
              />

              <div className="p-6">

                {/* Profile Avatar */}

                <div className="flex flex-col sm:flex-row items-center gap-5 mb-8">

                  <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
                    A
                  </div>

                  <div className="text-center sm:text-left">

                    <h3 className="text-xl font-bold text-slate-800">
                      {profile.name}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      {profile.role}
                    </p>

                    <button className="mt-3 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">
                      Change Profile Picture
                    </button>

                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    label="Admin Name"
                    value={profile.name}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        name: value,
                      })
                    }
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        email: value,
                      })
                    }
                  />

                  <InputField
                    label="Phone Number"
                    value={profile.phone}
                    onChange={(value) =>
                      setProfile({
                        ...profile,
                        phone: value,
                      })
                    }
                  />

                  <InputField
                    label="Role"
                    value={profile.role}
                    disabled
                  />

                </div>

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </div>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeTab === "notifications" && (

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

              <SettingsHeader
                icon={Bell}
                title="Notifications"
                description="Control how you receive admin notifications"
              />

              <div className="p-6">

                <NotificationRow
                  title="New User Registration"
                  description="Notify me when a new user registers"
                  checked={notifications.newUser}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      newUser:
                        !notifications.newUser,
                    })
                  }
                />

                <NotificationRow
                  title="New Doctor Registration"
                  description="Notify me when a doctor registers"
                  checked={notifications.newDoctor}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      newDoctor:
                        !notifications.newDoctor,
                    })
                  }
                />

                <NotificationRow
                  title="New Appointment"
                  description="Notify me when a new appointment is created"
                  checked={notifications.newAppointment}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      newAppointment:
                        !notifications.newAppointment,
                    })
                  }
                />

                <NotificationRow
                  title="Emergency Request"
                  description="Receive alerts for emergency requests"
                  checked={notifications.emergency}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      emergency:
                        !notifications.emergency,
                    })
                  }
                />

                <div className="border-t border-slate-100 my-6" />

                <h3 className="font-semibold text-slate-800 mb-4">
                  Notification Channels
                </h3>

                <NotificationRow
                  title="Email Notifications"
                  description="Receive important notifications through email"
                  icon={Mail}
                  checked={notifications.email}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      email:
                        !notifications.email,
                    })
                  }
                />

                <NotificationRow
                  title="SMS Notifications"
                  description="Receive important alerts through SMS"
                  icon={Smartphone}
                  checked={notifications.sms}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      sms:
                        !notifications.sms,
                    })
                  }
                />

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </div>
          )}

          {/* =================================================
              SECURITY
          ================================================= */}

          {activeTab === "security" && (

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

              <SettingsHeader
                icon={Shield}
                title="Security"
                description="Manage your password and account security"
              />

              <div className="p-6">

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex gap-3">

                  <Shield
                    size={21}
                    className="text-blue-600 flex-shrink-0"
                  />

                  <div>

                    <p className="font-semibold text-blue-800">
                      Keep your account secure
                    </p>

                    <p className="text-sm text-blue-600 mt-1">
                      Use a strong password and never share your
                      admin credentials with others.
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  <PasswordField
                    label="Current Password"
                    value={security.currentPassword}
                    showPassword={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    onChange={(value) =>
                      setSecurity({
                        ...security,
                        currentPassword: value,
                      })
                    }
                  />

                  <PasswordField
                    label="New Password"
                    value={security.newPassword}
                    showPassword={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    onChange={(value) =>
                      setSecurity({
                        ...security,
                        newPassword: value,
                      })
                    }
                  />

                  <PasswordField
                    label="Confirm New Password"
                    value={security.confirmPassword}
                    showPassword={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    onChange={(value) =>
                      setSecurity({
                        ...security,
                        confirmPassword: value,
                      })
                    }
                  />

                </div>

                <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3">

                  <AlertCircle
                    size={20}
                    className="text-orange-600 flex-shrink-0"
                  />

                  <p className="text-sm text-orange-700">
                    Password changes will require you to log in
                    again.
                  </p>

                </div>

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </div>
          )}

          {/* =================================================
              SYSTEM
          ================================================= */}

          {activeTab === "system" && (

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

              <SettingsHeader
                icon={Globe}
                title="System Settings"
                description="Manage language, timezone and display preferences"
              />

              <div className="p-6">

                <div className="space-y-6">

                  <SelectField
                    label="Language"
                    value={system.language}
                    onChange={(value) =>
                      setSystem({
                        ...system,
                        language: value,
                      })
                    }
                    options={[
                      "English",
                      "Telugu",
                      "Hindi",
                    ]}
                  />

                  <SelectField
                    label="Timezone"
                    value={system.timezone}
                    onChange={(value) =>
                      setSystem({
                        ...system,
                        timezone: value,
                      })
                    }
                    options={[
                      "Asia/Kolkata",
                      "UTC",
                      "Asia/Dubai",
                      "Asia/Singapore",
                    ]}
                  />

                  <SelectField
                    label="Date Format"
                    value={system.dateFormat}
                    onChange={(value) =>
                      setSystem({
                        ...system,
                        dateFormat: value,
                      })
                    }
                    options={[
                      "DD/MM/YYYY",
                      "MM/DD/YYYY",
                      "YYYY-MM-DD",
                    ]}
                  />

                </div>

                <SaveButton
                  onClick={handleSave}
                />

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

// =========================================================
// SETTINGS HEADER
// =========================================================

const SettingsHeader = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 border-b border-slate-100 flex items-center gap-4">

      <div className="p-3 bg-blue-100 rounded-xl">
        <Icon
          size={22}
          className="text-blue-600"
        />
      </div>

      <div>

        <h2 className="text-lg font-bold text-slate-800">
          {title}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
};

// =========================================================
// INPUT FIELD
// =========================================================

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => {
  return (
    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        className={`w-full px-4 py-3 border border-slate-200 rounded-xl outline-none transition ${
          disabled
            ? "bg-slate-100 text-slate-500 cursor-not-allowed"
            : "bg-white focus:ring-2 focus:ring-blue-500"
        }`}
      />

    </div>
  );
};

// =========================================================
// PASSWORD FIELD
// =========================================================

const PasswordField = ({
  label,
  value,
  onChange,
  showPassword,
  onToggle,
}) => {
  return (
    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <div className="relative">

        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>

      </div>

    </div>
  );
};

// =========================================================
// NOTIFICATION ROW
// =========================================================

const NotificationRow = ({
  title,
  description,
  checked,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="flex items-center justify-between gap-5 py-5 border-b border-slate-100">

      <div className="flex items-start gap-3">

        {Icon && (
          <div className="p-2 bg-slate-100 rounded-lg">
            <Icon
              size={18}
              className="text-slate-600"
            />
          </div>
        )}

        <div>

          <p className="font-medium text-slate-700">
            {title}
          </p>

          <p className="text-sm text-slate-400 mt-1">
            {description}
          </p>

        </div>

      </div>

      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition flex-shrink-0 ${
          checked
            ? "bg-blue-600"
            : "bg-slate-300"
        }`}
      >

        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${
            checked
              ? "left-7"
              : "left-1"
          }`}
        />

      </button>

    </div>
  );
};

// =========================================================
// SELECT FIELD
// =========================================================

const SelectField = ({
  label,
  value,
  onChange,
  options,
}) => {
  return (
    <div>

      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500"
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
};

// =========================================================
// SAVE BUTTON
// =========================================================

const SaveButton = ({ onClick }) => {
  return (
    <div className="flex justify-end mt-8">

      <button
        onClick={onClick}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition shadow-sm"
      >
        <Save size={18} />
        Save Changes
      </button>

    </div>
  );
};

export default Settings;
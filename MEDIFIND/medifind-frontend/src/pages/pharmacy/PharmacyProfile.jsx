import { useState, useEffect } from "react";
import { getPharmacyProfile, updatePharmacyProfile } from "../../services/pharmacyService";

export default function PharmacyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPharmacyProfile()
      .then((res) => setProfile(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    await updatePharmacyProfile(profile);
    alert("Profile updated.");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!profile) return <p className="p-6">No profile found.</p>;

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Pharmacy Profile</h1>
      <p className="mb-4 text-sm">
        Status:{" "}
        <span
          className={
            profile.verification_status === "APPROVED"
              ? "text-green-600"
              : profile.verification_status === "REJECTED"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {profile.verification_status}
        </span>
      </p>

      <div className="space-y-3">
        <input
          name="pharmacy_name"
          value={profile.pharmacy_name || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Pharmacy name"
        />
        <input
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Phone"
        />
        <input
          name="email"
          value={profile.email || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Email"
        />
        <textarea
          name="address"
          value={profile.address || ""}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Address"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
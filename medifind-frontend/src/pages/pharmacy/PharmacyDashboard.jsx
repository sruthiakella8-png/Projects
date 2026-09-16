import { useState } from "react";
import PharmacyProfile from "./PharmacyProfile";
import PharmacyMedicines from "./PharmacyMedicines";
import PharmacyDocuments from "./PharmacyDocuments";
import PharmacyInbox from "./PharmacyInbox";

const TABS = [
  { key: "medicines", label: "Medicines" },
  { key: "profile", label: "Profile" },
  { key: "documents", label: "Documents" },
  { key: "inbox", label: "Inbox" },
];

export default function PharmacyDashboard() {
  const [tab, setTab] = useState("medicines");

  const renderTab = () => {
    switch (tab) {
      case "medicines":
        return <PharmacyMedicines />;
      case "profile":
        return <PharmacyProfile />;
      case "documents":
        return <PharmacyDocuments />;
      case "inbox":
        return <PharmacyInbox />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4 space-y-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`block w-full text-left p-2 rounded ${
              tab === t.key ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {t.label}
          </button>
        ))}
      </aside>

      <main className="flex-1">{renderTab()}</main>
    </div>
  );
}
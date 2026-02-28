import { motion } from "framer-motion";
import { User, Bell, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://fruit-bounty-dmzs.onrender.com/api";

const cn = (...c) => c.filter(Boolean).join(" ");

const Card = ({ className, children }) => (
  <div className={cn("bg-white rounded-xl border border-slate-200/60 shadow-sm", className)}>
    {children}
  </div>
);

const Button = ({ className, variant, children, ...props }) => (
  <button
    {...props}
    className={cn(
      "px-4 py-2 rounded-lg font-medium transition",
      variant === "outline"
        ? "border border-slate-300 hover:bg-slate-100"
        : "bg-green-500 hover:bg-green-600 text-white",
      className
    )}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    {...props}
    className={cn(
      "w-full px-3 sm:px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none text-sm sm:text-base",
      className
    )}
  />
);

const Label = ({ children }) => (
  <label className="text-sm font-medium text-slate-700">{children}</label>
);

const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={cn(
      "relative w-12 h-6 rounded-full transition-all duration-300",
      checked ? "bg-green-500" : "bg-slate-300"
    )}
  >
    <span
      className={cn(
        "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300",
        checked ? "translate-x-6" : "translate-x-0"
      )}
    />
  </button>
);

const Separator = () => <div className="h-px bg-slate-200" />;

function Tabs({ children }) {
  return <div>{children}</div>;
}

function TabsList({ children }) {
  return (
    <div className="flex gap-1 sm:gap-2 bg-slate-100 p-1 rounded-lg overflow-x-auto">
      {children}
    </div>
  );
}

function TabsTrigger({ value, active, onClick, children }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition whitespace-nowrap",
        active
          ? "bg-white shadow text-green-600"
          : "text-slate-600 hover:bg-white/70"
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, active, children }) {
  if (!active) return null;
  return <div>{children}</div>;
}

export default function Settings() {
  const [tab, setTab] = useState("profile");

  const [notify, setNotify] = useState({
    order: true,
    stock: true,
    payment: true,
    subscription: true,
    email: false,
    whatsapp: true,
    sms: false,
  });

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // ✅ FETCH PROFILE
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Map API response to expected format
        const { name, email, phone } = res.data;
        const nameParts = name ? name.split(" ") : [];
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";
        
        setProfile({
          firstName,
          lastName,
          email: email || "",
          phone: phone || ""
        });
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }, []);

  // ✅ UPDATE PROFILE
  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios
      .put(
        `/api/settings/profile`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("Profile Updated Successfully ✅");
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="hidden md:block text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          Settings
        </h1>
        <p className="hidden md:block text-slate-500 text-sm">
          Manage your account and application preferences
        </p>
      </motion.div>

      <Tabs>
        <TabsList>
          <TabsTrigger value="profile" active={tab === "profile"} onClick={setTab}>
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>

          <TabsTrigger value="notifications" active={tab === "notifications"} onClick={setTab}>
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>

          <TabsTrigger value="security" active={tab === "security"} onClick={setTab}>
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" active={tab === "profile"}>
          <Card className="p-4 sm:p-6 mt-4 sm:mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 sm:mb-6">
              Profile Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label>First Name</Label>
                <Input
                  value={profile.firstName}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  value={profile.lastName}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
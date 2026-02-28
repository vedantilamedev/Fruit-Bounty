import { motion } from "framer-motion";
import { User, Bell, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://fruit-bounty-dmzs.onrender.com/api";

const cn = (...c) => c.filter(Boolean).join(" ");

const Card = ({ className, children }) => (
  <div
    className={cn(
      "bg-white rounded-xl border border-slate-200/60 shadow-sm",
      className
    )}
  >
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
      "w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none",
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
      "relative w-12 h-6 rounded-full transition-all",
      checked ? "bg-green-500" : "bg-slate-300"
    )}
  >
    <span
      className={cn(
        "absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-all",
        checked ? "translate-x-6" : "translate-x-0"
      )}
    />
  </button>
);

function Tabs({ children }) {
  return <div>{children}</div>;
}

function TabsList({ children }) {
  return (
    <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
      {children}
    </div>
  );
}

function TabsTrigger({ value, active, onClick, children }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition",
        active
          ? "bg-white shadow text-green-600"
          : "text-slate-600 hover:bg-white/70"
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ active, children }) {
  if (!active) return null;
  return <div>{children}</div>;
}

const notifyCard = (title, desc, value, onChange) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border hover:shadow transition">
    <div>
      <p className="font-medium text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
    <Switch checked={value} onChange={onChange} />
  </div>
);

export default function Settings() {
  const [tab, setTab] = useState("profile");

  const [notify, setNotify] = useState({
    order: true,
    stock: true,
    payment: true,
    subscription: true,
    email: true,
    whatsapp: true,
    sms: false,
  });

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data?.user || res.data;

        setProfile({
          firstName: data?.name?.split(" ")[0] || "",
          lastName:
            data?.name?.split(" ").slice(1).join(" ") || "",
          email: data?.email || "",
          phone: data?.phone || "",
        });
      })
      .catch((err) =>
        console.log("Profile API Error:", err)
      );
  }, []);

  // ================= UPDATE PROFILE =================
  const handleSave = () => {
    const token = localStorage.getItem("token");

    axios
      .put(`${BASE_URL}/settings/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => alert("Profile Updated Successfully ✅"))
      .catch((err) =>
        console.log("Update Error:", err)
      );
  };

  // ================= UPDATE PASSWORD =================
  const handlePassword = () => {
    if (password.new !== password.confirm) {
      alert("Passwords do not match ❌");
      return;
    }

    alert("Password Updated Successfully 🔐");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-1">
          Settings
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your account preferences
        </p>
      </motion.div>

      <Tabs>
        <TabsList>
          <TabsTrigger value="profile" active={tab === "profile"} onClick={setTab}>
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>

          <TabsTrigger value="notifications" active={tab === "notifications"} onClick={setTab}>
            <Bell className="w-4 h-4" /> Notifications
          </TabsTrigger>

          <TabsTrigger value="security" active={tab === "security"} onClick={setTab}>
            <Lock className="w-4 h-4" /> Security
          </TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent active={tab === "profile"}>
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label>First Name</Label>
                <Input
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent active={tab === "notifications"}>
          <Card className="p-6 mt-6">
            <h3 className="text-xl font-semibold mb-6">
              Notification Preferences
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl space-y-4">
                <h4 className="font-semibold text-slate-700">
                  Business Alerts
                </h4>

                {notifyCard("Order Updates", "New order notifications", notify.order, v => setNotify({ ...notify, order: v }))}
                {notifyCard("Stock Alerts", "Low stock warnings", notify.stock, v => setNotify({ ...notify, stock: v }))}
                {notifyCard("Payment Alerts", "Payment status alerts", notify.payment, v => setNotify({ ...notify, payment: v }))}
                {notifyCard("Subscription Alerts", "Subscription reminders", notify.subscription, v => setNotify({ ...notify, subscription: v }))}
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-4">
                <h4 className="font-semibold text-slate-700">
                  Communication Channels
                </h4>

                {notifyCard("Email Alerts", "Notifications via email", notify.email, v => setNotify({ ...notify, email: v }))}
                {notifyCard("WhatsApp Alerts", "Instant WhatsApp alerts", notify.whatsapp, v => setNotify({ ...notify, whatsapp: v }))}
                {notifyCard("SMS Alerts", "Receive SMS alerts", notify.sms, v => setNotify({ ...notify, sms: v }))}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button className="px-6 py-2">
                Save Preferences
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent active={tab === "security"}>
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Security Settings
            </h3>

            <div className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input type="password" className="mt-2" />
              </div>

              <div>
                <Label>New Password</Label>
                <Input type="password" className="mt-2" />
              </div>

              <div>
                <Label>Confirm Password</Label>
                <Input type="password" className="mt-2" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button>Update Password</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
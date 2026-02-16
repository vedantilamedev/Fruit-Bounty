import { motion } from "framer-motion";
import { User, Bell, Lock, Store } from "lucide-react";
import { useState } from "react";

/* ---------------- UI COMPONENTS ---------------- */

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
      "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none",
      className
    )}
  />
);

const Label = ({ children }) => (
  <label className="text-sm font-medium text-slate-700">{children}</label>
);

const Switch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={cn(
      "w-12 h-6 rounded-full relative transition",
      checked ? "bg-green-500" : "bg-slate-300"
    )}
  >
    <span
      className={cn(
        "absolute top-1 w-4 h-4 bg-white rounded-full transition",
        checked ? "translate-x-7" : "translate-x-1"
      )}
    />
  </button>
);

const Separator = () => <div className="h-px bg-slate-200" />;

/* ---------------- TABS ---------------- */

function Tabs({ children }) {
  return <div>{children}</div>;
}

function TabsList({ children }) {
  return <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">{children}</div>;
}

function TabsTrigger({ value, active, onClick, children }) {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition",
        active ? "bg-white shadow text-green-600" : "text-slate-600 hover:bg-white/70"
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

/* ---------------- MAIN ---------------- */

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

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-500">Manage your account and application preferences</p>
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
        <TabsContent value="profile" active={tab === "profile"}>
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Profile Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>First Name</Label>
                <Input defaultValue="Admin" className="mt-2" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input defaultValue="User" className="mt-2" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="admin@fruitsbounty.com" className="mt-2" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+91 9876543210" className="mt-2" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* NOTIFICATIONS */}
        <TabsContent value="notifications" active={tab === "notifications"}>
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Notification Preferences
            </h3>

            <div className="space-y-6">
              {[
                ["order", "New Order Notifications", "Get notified when new orders arrive"],
                ["stock", "Low Stock Alerts", "Receive alerts when stock is low"],
                ["payment", "Payment Notifications", "Payment status updates"],
                ["subscription", "Subscription Updates", "Subscription renewals & cancellations"],
                ["email", "Email Notifications", "Daily summary emails"],
                ["whatsapp", "WhatsApp Notifications", "Important alerts on WhatsApp"],
                ["sms", "SMS Notifications", "Critical alerts via SMS"],
              ].map(([key, title, desc]) => (
                <div key={key}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-700">{title}</p>
                      <p className="text-sm text-slate-500">{desc}</p>
                    </div>
                    <Switch
                      checked={notify[key]}
                      onChange={(v) => setNotify({ ...notify, [key]: v })}
                    />
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* SECURITY */}
        <TabsContent value="security" active={tab === "security"}>
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">
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

              <Button>Update Password</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

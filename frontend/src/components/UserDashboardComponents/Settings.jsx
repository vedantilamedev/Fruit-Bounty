import { motion } from "framer-motion";
import { User, Bell, Lock } from "lucide-react";
import { useState } from "react";

/* ---------- UI Helpers ---------- */

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
                : "bg-green-700 hover:bg-green-900 text-white",
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
            "w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-700 outline-none",
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
            "relative w-12 h-6 rounded-full transition-all duration-300",
            checked ? "bg-green-700" : "bg-slate-300"
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

/* ---------- Settings Component ---------- */

export default function Settings({ userData }) {
    const [tab, setTab] = useState("profile");

    // 🔥 ORIGINAL NOTIFICATION STRUCTURE (unchanged)
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        whatsapp: true,
        marketing: false,
    });

    return (
        <div className="p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Settings</h1>
                <p className="text-slate-500 text-sm">
                    Manage your account and application preferences
                </p>
            </motion.div>

            {/* ---------- Tabs ---------- */}

            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg mb-6 w-fit">
                {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Lock },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition",
                            tab === item.id
                                ? "bg-white shadow text-green-700"
                                : "text-slate-600 hover:bg-white/70"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* ---------- PROFILE ---------- */}

            {tab === "profile" && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">
                        Profile Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label>Full Name</Label>
                            <Input defaultValue={userData?.name} className="mt-2" />
                        </div>

                        <div>
                            <Label>Email Address</Label>
                            <Input
                                defaultValue={userData?.email}
                                readOnly
                                className="mt-2 bg-slate-100"
                            />
                        </div>

                        <div>
                            <Label>Mobile Number</Label>
                            <Input
                                defaultValue={userData?.phone}
                                readOnly
                                className="mt-2 bg-slate-100"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input defaultValue="Bengaluru, India" className="mt-2" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </Card>
            )}

            {/* ---------- NOTIFICATIONS ---------- */}

            {tab === "notifications" && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">
                        Notification Preferences
                    </h3>

                    <div className="space-y-5">
                        {[
                            ["email", "Email Updates", "Receive order updates and summaries"],
                            ["whatsapp", "WhatsApp Alerts", "Instant WhatsApp updates"],
                            ["sms", "SMS Notifications", "Important alerts via SMS"],
                            ["marketing", "Special Offers", "Promotions & seasonal deals"],
                        ].map(([key, title, desc]) => (
                            <div key={key} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-700">{title}</p>
                                    <p className="text-sm text-slate-500">{desc}</p>
                                </div>

                                <Switch
                                    checked={notifications[key]}
                                    onChange={(value) =>
                                        setNotifications({
                                            ...notifications,
                                            [key]: value,
                                        })
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* ---------- SECURITY ---------- */}

            {tab === "security" && (
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-6">
                        Security Settings
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <Label>Current Password</Label>
                            <Input type="currentpassword" className="mt-2" />
                        </div>

                        <div>
                            <Label>New Password</Label>
                            <Input type="newpassword" className="mt-2" />
                        </div>
                        <div>
                            <Label>confirm password</Label>
                            <Input type="confirmpassword" className="mt-2" />
                        </div>

                        <Button>Update Password</Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
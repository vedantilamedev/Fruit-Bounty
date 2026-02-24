import { motion } from "framer-motion";
import { User, Bell, Lock } from "lucide-react";
import { useState } from "react";

/* ---------- UI Helpers ---------- */

const cn = (...c) => c.filter(Boolean).join(" ");

const Card = ({ className, children }) => (
    <div
        className={cn(
            "bg-[#1f5a32]/60 backdrop-blur-xl rounded-2xl border border-[#d5b975]/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
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
            "px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300",
            variant === "outline"
                ? "border border-[#d5b975]/40 text-[#d5b975] hover:bg-[#d5b975]/10"
                : "bg-[#2c6e3f] hover:bg-[#2f7c47] text-white border border-[#d5b975]/30",
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
            "w-full px-4 py-2.5 rounded-xl bg-[#163d24] border border-[#d5b975]/30 text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#d5b975] outline-none transition",
            className
        )}
    />
);

const Label = ({ children }) => (
    <label className="text-xs font-bold uppercase tracking-widest text-[#d5b975]">
        {children}
    </label>
);

const Switch = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={cn(
            "relative w-12 h-6 rounded-full transition-all duration-300 border",
            checked
                ? "bg-[#2c6e3f] border-[#d5b975]/40"
                : "bg-[#163d24] border-[#d5b975]/20"
        )}
    >
        <span
            className={cn(
                "absolute top-1 left-1 w-4 h-4 rounded-full bg-[#d5b975] transition-all duration-300",
                checked ? "translate-x-6" : "translate-x-0"
            )}
        />
    </button>
);

/* ---------- Settings Component ---------- */

export default function Settings({ userData }) {
    const [tab, setTab] = useState("profile");

    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        whatsapp: true,
        marketing: false,
    });

    return (
        <div className="min-h-screen  p-6 lg:p-10 text-white">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10"
            >
                <h1 className="text-4xl font-black tracking-tight mb-2">
                    Settings
                </h1>
                <p className="text-white/60 text-sm uppercase tracking-widest">
                    Manage your account and application preferences
                </p>
            </motion.div>

            {/* ---------- Tabs ---------- */}

            <div className="flex gap-2 bg-[#163d24] p-1 rounded-xl mb-8 w-fit border border-[#d5b975]/30">
                {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Lock },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300",
                            tab === item.id
                                ? "bg-[#1f5a32] text-[#d5b975] border border-[#d5b975]/40 shadow"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* ---------- PROFILE ---------- */}

            {tab === "profile" && (
                <Card className="p-8">
                    <h3 className="text-xl font-black text-[#d5b975] mb-8 tracking-wide">
                        Profile Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <Label>Full Name</Label>
                            <Input defaultValue={userData?.name} className="mt-3" />
                        </div>

                        <div>
                            <Label>Email Address</Label>
                            <Input
                                defaultValue={userData?.email}
                                readOnly
                                className="mt-3 opacity-70"
                            />
                        </div>

                        <div>
                            <Label>Mobile Number</Label>
                            <Input
                                defaultValue={userData?.phone}
                                readOnly
                                className="mt-3 opacity-70"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input defaultValue="Bengaluru, India" className="mt-3" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-10">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </Card>
            )}

            {/* ---------- NOTIFICATIONS ---------- */}

            {tab === "notifications" && (
                <Card className="p-8">
                    <h3 className="text-xl font-black text-[#d5b975] mb-8 tracking-wide">
                        Notification Preferences
                    </h3>

                    <div className="space-y-6">
                        {[
                            ["email", "Email Updates", "Receive order updates and summaries"],
                            ["whatsapp", "WhatsApp Alerts", "Instant WhatsApp updates"],
                            ["sms", "SMS Notifications", "Important alerts via SMS"],
                            ["marketing", "Special Offers", "Promotions & seasonal deals"],
                        ].map(([key, title, desc]) => (
                            <div
                                key={key}
                                className="flex items-center justify-between border-b border-[#d5b975]/10 pb-5"
                            >
                                <div>
                                    <p className="font-semibold text-white">{title}</p>
                                    <p className="text-sm text-white/50">{desc}</p>
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
                <Card className="p-8">
                    <h3 className="text-xl font-black text-[#d5b975] mb-8 tracking-wide">
                        Security Settings
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <Label>Current Password</Label>
                            <Input type="password" className="mt-3" />
                        </div>

                        <div>
                            <Label>New Password</Label>
                            <Input type="password" className="mt-3" />
                        </div>

                        <div>
                            <Label>Confirm Password</Label>
                            <Input type="password" className="mt-3" />
                        </div>
                        <p className="text-blue-500 hover:[text-shadow:2px_2px_5px_rgba(0,0,0,0.9)] cursor-pointer">Forget Password?</p>

                        <Button className="mt-4">Update Password</Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
import { motion } from "framer-motion";
import { User, Bell, Lock } from "lucide-react";
import { useState } from "react";

/* ---------- UI Helpers ---------- */

const cn = (...c) => c.filter(Boolean).join(" ");
const Card = ({ className, children }) => (
    <div
        className={cn(
            "bg-gradient-to-br from-[#3a7a41] to-[#25512b]",
            "rounded-2xl",
            "border border-[#d5b975]/30",
            "shadow-[0_25px_70px_rgba(0,0,0,0.45)]",
            "transition-all duration-300",
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
            "w-full sm:w-auto",
            "px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-300",
            variant === "outline"
                ? "border border-[#d5b975]/40 text-white hover:bg-[#d5b975]/10"
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
    <label className="text-xs font-bold uppercase tracking-widest text-white">
        {children}
    </label>
);

const Switch = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={cn(
            "relative w-12 h-6 rounded-full transition-all duration-300 border flex-shrink-0",
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
        <div className="min-h-screen bg-gradient-to-br p-4 sm:p-6 lg:p-10 overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 sm:mb-10"
            >
            </motion.div>

            {/* ---------- Tabs ---------- */}

            <div className="flex flex-wrap gap-2 bg-gradient-to-tl from-[#3a7a41] to-[#25512b] p-1.5 rounded-xl mb-6 sm:mb-8 w-full sm:w-fit border border-[#d5b975]/20 shadow-md">
                {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "notifications", label: "Notifications", icon: Bell },
                    { id: "security", label: "Security", icon: Lock },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        className={cn(
                            "flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 flex-1 sm:flex-none",
                            tab === item.id
                                ? "bg-gradient-to-br from-[#1f5a32] to-[#17462a] text-white border border-[#d5b975]/30"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* ---------- PROFILE ---------- */}

            {tab === "profile" && (
                <Card className="p-5 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-6 sm:mb-8 tracking-wide">
                        Profile Settings
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 sm:mt-10">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </Card>
            )}

            {/* ---------- NOTIFICATIONS ---------- */}

            {tab === "notifications" && (
                <Card className="p-5 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-6 sm:mb-8 tracking-wide">
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
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#d5b975]/10 pb-5"
                            >
                                <div>
                                    <p className="font-medium text-white">{title}</p>
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
                <Card className="p-5 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-medium text-white mb-6 sm:mb-8 tracking-wide">
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

                        <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            <a href="/forgot-password" className="w-full sm:w-auto">
                                <Button className="mt-2 sm:mt-4 w-full sm:w-auto">
                                    Forget Password ?
                                </Button>
                            </a>
                            <Button className="mt-2 sm:mt-4 w-full sm:w-auto">
                                Update Password
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
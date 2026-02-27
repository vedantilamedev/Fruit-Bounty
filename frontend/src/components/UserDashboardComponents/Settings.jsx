import { motion } from "framer-motion";
import { User, Bell, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export default function Settings({ userData, onUpdateUser }) {
    const [tab, setTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [localUserData, setLocalUserData] = useState(null);

    // Fetch user profile directly if not provided via props
    useEffect(() => {
        const fetchProfile = async () => {
            // If userData is already provided and has values, use it
            if (userData?.name && userData?.email) {
                console.log('[Settings] Using userData from props:', userData);
                setLocalUserData(userData);
                return;
            }
            
            // Otherwise fetch directly
            try {
                console.log('[Settings] Fetching profile from API...');
                const token = localStorage.getItem("token");
                const res = await axios.get("/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log('[Settings] API response:', res.data);
                setLocalUserData(res.data);
            } catch (error) {
                console.error('[Settings] Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [userData]);

    // Form state for profile - use localUserData if available, otherwise fall back to userData
    const currentUserData = localUserData || userData;
    console.log('[Settings] currentUserData:', currentUserData);
    
    const [formData, setFormData] = useState({
        name: currentUserData?.name || "",
        email: currentUserData?.email || "",
        phone: currentUserData?.phone || "",
        address: currentUserData?.address || ""
    });

    // Update form when userData changes
    useEffect(() => {
        const dataToUse = localUserData || userData;
        console.log('[Settings] Updating form with:', dataToUse);
        setFormData({
            name: dataToUse?.name || "",
            email: dataToUse?.email || "",
            phone: dataToUse?.phone || "",
            address: dataToUse?.address || ""
        });
    }, [userData, localUserData]);

    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        whatsapp: true,
        marketing: false,
    });

    // Password change state
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Handle profile form change
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Save profile handler
    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put("/api/users/profile", {
                name: formData.name,
                address: formData.address
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update parent state
            if (onUpdateUser) {
                onUpdateUser({
                    ...userData,
                    name: formData.name,
                    address: formData.address
                });
            }

            toast.success("Profile updated successfully!", {
                position: "top-right",
                autoClose: 3000
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile", {
                position: "top-right",
                autoClose: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords don't match!", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put("/api/users/profile", {
                password: passwordData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            toast.success("Password updated successfully!", {
                position: "top-right",
                autoClose: 3000
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password", {
                position: "top-right",
                autoClose: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br p-4 sm:p-6 lg:p-10 overflow-x-hidden">
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
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
                            <Input 
                                name="name"
                                value={formData.name} 
                                onChange={handleFormChange}
                                className="mt-3" 
                            />
                        </div>

                        <div>
                            <Label>Email Address</Label>
                            <Input
                                value={formData.email}
                                readOnly
                                className="mt-3 opacity-70"
                            />
                        </div>

                        <div>
                            <Label>Mobile Number</Label>
                            <Input
                                value={formData.phone}
                                readOnly
                                className="mt-3 opacity-70"
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input 
                                name="address"
                                value={formData.address} 
                                onChange={handleFormChange}
                                placeholder="Enter your location"
                                className="mt-3" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 sm:mt-10">
                        <Button variant="outline" onClick={() => {
                            setFormData({
                                name: userData?.name || "",
                                email: userData?.email || "",
                                phone: userData?.phone || "",
                                address: userData?.address || ""
                            });
                        }}>Cancel</Button>
                        <Button onClick={handleSaveProfile} disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
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
                            <Input 
                                type="password" 
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                className="mt-3" 
                            />
                        </div>

                        <div>
                            <Label>New Password</Label>
                            <Input 
                                type="password" 
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                className="mt-3" 
                            />
                        </div>

                        <div>
                            <Label>Confirm Password</Label>
                            <Input 
                                type="password" 
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                className="mt-3" 
                            />
                        </div>

                        <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                            <a href="/forgot-password" className="w-full sm:w-auto">
                                <Button className="mt-2 sm:mt-4 w-full sm:w-auto">
                                    Forget Password ?
                                </Button>
                            </a>
                            <Button 
                                onClick={handlePasswordChange} 
                                disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                                className="mt-2 sm:mt-4 w-full sm:w-auto"
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
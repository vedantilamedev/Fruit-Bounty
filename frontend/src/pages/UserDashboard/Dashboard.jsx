import axios from "axios";
import { useEffect } from "react";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, ShoppingCart, CreditCard, Menu, X, Settings as SettingsIcon } from 'lucide-react';
import Overview from '../../components/UserDashboardComponents/Overview';
import Orders from '../../components/UserDashboardComponents/Orders';
import Packages from '../../components/UserDashboardComponents/Packages';
import Payments from '../../components/UserDashboardComponents/Payments';
import Settings from '../../components/UserDashboardComponents/Settings';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        activePackage: null
    });

    const [orders, setOrders] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        // Don't show loading if no token
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setUserData(prev => ({
                    ...prev,
                    name: res.data.name || "",
                    email: res.data.email || "",
                    phone: res.data.phone || "",
                    address: res.data.address || ""
                }));
            } catch (error) {
                console.error("Error fetching user profile:", error.response?.data || error.message);
            }
        };

        const fetchOrders = async () => {
            try {
                const res = await axios.get("/api/users/my-orders", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const rawOrders = res.data.data || [];

                setOrders(
                    rawOrders.map(order => ({
                        id: order._id,
                        status: order.order_status,
                        amount: order.total_amount,
                        date: order.createdAt,
                        items: order.items
                    }))
                );

                setPayments(
                    rawOrders
                        .filter(order => order.payment_status === "Paid")
                        .map(order => ({
                            id: order._id,
                            name: order.items?.[0]?.name || 'Fruit Order',
                            amount: order.total_amount,
                            method: "Razorpay",
                            status: order.payment_status === "Paid" ? "Success" : "Pending",
                            date: new Date(order.createdAt).toLocaleDateString("en-IN")
                        }))
                );

            } catch (error) {
                console.error("Error fetching orders:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchSubscriptions = async () => {
            try {
                const res = await axios.get("/api/orders/mysubscriptions", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const rawSubscriptions = res.data.data || [];
                console.log("Fetched subscriptions:", rawSubscriptions);

                // Transform subscription data for Packages component
                // First try to find active/Confirmed subscriptions, then pick the most recent
                const activeSubscriptions = rawSubscriptions.filter(sub => 
                    sub.isRecurring && (
                        sub.order_status === "active" || 
                        sub.order_status === "Confirmed" || 
                        sub.order_status === "Pending" ||
                        sub.order_status === "Processing"
                    )
                );
                
                // Sort by creation date (newest first) to get the most recent active subscription
                activeSubscriptions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                const activeSub = activeSubscriptions[0] || null;

                if (activeSub) {
                    // Extract plan type from the order items (check if it contains "personal" or "corporate")
                    const firstItemName = activeSub.items?.[0]?.name || "";
                    const isPersonal = firstItemName.toLowerCase().includes("personal") || 
                                       firstItemName.toLowerCase().includes("individual");
                    
                    // Check subscription_type field (monthly = individual, weekly = corporate)
                    const isMonthly = activeSub.subscription_type === "monthly";
                    
                    // Determine plan type: personal/individual if monthly OR if name contains personal/individual
                    const planType = isPersonal || isMonthly ? "individual" : "corporate";
                    const planName = isPersonal || isMonthly 
                        ? "Individual Wellness Plan" 
                        : "Corporate Group Plan";

                    // Extract fruits from the subscription
                    const fruits = activeSub.items?.flatMap(item => 
                        item.meals ? Object.values(item.meals).map(m => m.fruits || []).flat() : []
                    ) || [];

                    // Calculate end date
                    const endDate = activeSub.end_date 
                        ? new Date(activeSub.end_date).toLocaleDateString("en-IN")
                        : "N/A";

                    // Calculate renewal date (30 days from start)
                    const startDate = activeSub.start_date 
                        ? new Date(activeSub.start_date) 
                        : new Date();
                    const renewalDate = new Date(startDate);
                    renewalDate.setDate(renewalDate.getDate() + 30);

                    setSubscriptions(rawSubscriptions);
                    setUserData(prev => ({
                        ...prev,
                        activePackage: {
                            name: planName,
                            type: planType,
                            peopleCount: planType === "corporate" ? 3 : 1,
                            duration: isMonthly ? "Monthly" : "Weekly",
                            frequency: activeSub.delivery_schedule || "Daily",
                            endDate: endDate,
                            renewalDate: renewalDate.toLocaleDateString("en-IN"),
                            fruits: [...new Set(fruits.length > 0 ? fruits : ["Watermelon", "Mango", "Orange", "Berries"])]
                        }
                    }));
                }
            } catch (error) {
                console.error("Error fetching subscriptions:", error.response?.data || error.message);
            }
        };

        fetchUserProfile();
        fetchOrders();
        fetchSubscriptions();

        // Refresh orders when window gains focus (e.g., when navigating back from order success)
        const handleFocus = () => {
            setLoading(true);
            fetchOrders();
            fetchUserProfile();
            fetchSubscriptions();
        };
        
        // Also refresh when tab becomes visible again
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                setLoading(true);
                fetchOrders();
                fetchUserProfile();
                fetchSubscriptions();
            }
        };
        
        window.addEventListener('focus', handleFocus);
        window.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handleCancelOrder = (orderId) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: 'Canceled' } : order
        ));
    };

    const handleCancelSubscription = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Please log in to cancel your subscription");
        }
        if (!userData.activePackage) {
            throw new Error("You don't have an active subscription to cancel");
        }

        console.log("Subscriptions in state:", subscriptions);
        console.log("Active package:", userData.activePackage);

        // Find the active subscription order - check for multiple possible statuses
        const activeSub = subscriptions.find(sub => 
            sub.isRecurring === true && 
            (sub.order_status === "active" || 
             sub.order_status === "Confirmed" || 
             sub.order_status === "confirmed")
        );

        console.log("Active sub found:", activeSub);

        if (!activeSub) {
            // Try to find any recurring order
            console.log("Looking for any subscription order...");
            if (subscriptions.length === 0) {
                throw new Error("No subscription orders found. Please contact support.");
            }
            // Use the first subscription order
            const subToCancel = subscriptions[0];
            console.log("Using first subscription:", subToCancel);
            
            const response = await axios.patch(
                `/api/orders/${subToCancel._id}/subscription-status`,
                { order_status: "cancelled" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Cancel response:", response.data);
            setUserData(prev => ({ ...prev, activePackage: null }));
            toast.success("Subscription cancelled successfully");
            return;
        }

        // Call the API to cancel the subscription
        const response = await axios.patch(
            `/api/orders/${activeSub._id}/subscription-status`,
            { order_status: "cancelled" },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Cancel response:", response.data);

        // Update local state
        setUserData(prev => ({ ...prev, activePackage: null }));
        setSubscriptions(prev => prev.map(sub => 
            sub._id === activeSub._id ? { ...sub, order_status: "cancelled" } : sub
        ));
        
        toast.success("Subscription cancelled successfully");
    };

    // Update user data from Settings
    const handleUpdateUser = (updatedData) => {
        setUserData(prev => ({
            ...prev,
            ...updatedData
        }));
    };

    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'My Orders', icon: ShoppingCart },
        { id: 'packages', label: 'My Subscription', icon: Package },
        { id: 'payments', label: 'Payments', icon: CreditCard },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview userData={userData} orders={orders} payments={payments} onTabChange={handleTabChange} />;
            case 'orders':
                return <Orders orders={orders} onCancelOrder={handleCancelOrder} />;
            case 'packages':
                return <Packages activePackage={userData.activePackage} onCancelSubscription={handleCancelSubscription} onTabChange={handleTabChange} />;
            case 'payments':
                return <Payments payments={payments} />;
            case 'settings':
                return <Settings userData={userData} onUpdateUser={handleUpdateUser} />;
            default:
                return <Overview userData={userData} orders={orders} payments={payments} />;
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        // Remove token
        localStorage.removeItem("token");

        // Optional: clear everything
        // localStorage.clear();

        toast.success("You have been logged out!", {
            position: "top-right",
            autoClose: 2000,
        });

        // Redirect after small delay
        setTimeout(() => {
            navigate("/login"); // or "/" if you want home
        }, 1500);
    };

    return (
        <div className="h-screen bg-[#f5f1e6] flex flex-col lg:flex-row overflow-hidden font-sans">

            <ToastContainer position="top-right" autoClose={3000} theme="light" />

            {/* Mobile Header */}
            <div className="lg:hidden bg-[#e0dfda] shadow-sm flex justify-between items-center px-4 py-3">
                <img
                    src="/images/footerlogo.webp"
                    alt="Logo"
                    className="w-10 h-auto object-contain"
                />
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#2f5e2f]">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72
                bg-[#dddbd8]
                border-r border-[#e4dcc7]
                shadow-2xl shadow-black
                transform transition-transform duration-300
                lg:static lg:translate-x-0
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="h-full flex flex-col">

                    {/* Logo */}
                    <div className="py-6 flex items-center justify-center border-b border-[#e4dcc7]">
                        <img
                            src="/images/footerlogo.webp"
                            alt="Logo"
                            className="w-24 object-contain"
                        />
                    </div>

                    {/* Menu */}
                    <nav className="flex-1 px-6 py-8 space-y-3">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300 text-sm font-medium
                ${activeTab === item.id
                                        ? "bg-[#2f5e2f] text-white "
                                        : "text-[#3a3a3a] bg-transparent hover:bg-white hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
                                    }
            `}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom Section */}
                    <div className="px-6 py-6 border-t border-[#e4dcc7] space-y-3">

                        <Link to="/">
                            <button className="w-full py-2.5 rounded-lg border border-[#2f5e2f] text-[#2f5e2f] hover:bg-[#2f5e2f] hover:text-white transition font-medium">
                                Go to Home
                            </button>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition font-medium"
                        >
                            Logout
                        </button>

                        <p className="mt-6 text-xs text-gray-500 text-center">
                            © Fruit's Bounty
                            <br />
                            All rights reserved
                        </p>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-[#f5f1e6]">
                <div className="p-6 lg:p-12">
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Dashboard;
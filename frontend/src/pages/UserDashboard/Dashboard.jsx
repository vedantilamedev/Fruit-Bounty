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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [payments, setPayments] = useState([]);

    const [userData, setUserData] = useState({
        name: "Aditya Kumar",
        email: "aditya@fruitbounty.com",
        phone: "+91 98765 43210",
        activePackage: {
            name: "1 Month Individual Plan",
            type: "Individual",
            peopleCount: 1,
            duration: "Monthly",
            frequency: "Daily",
            startDate: "2026-02-01",
            endDate: "2026-02-28",
            renewalDate: "2026-03-01",
            status: "Active",
            fruits: ["Apple", "Banana", "Pomegranate", "Kiwi", "Orange", "Mango", "Papaya"]
        }
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
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
                            amount: order.total_amount,
                            method: "Razorpay",
                            status: order.payment_status === "Paid" ? "Success" : "Pending",
                            date: new Date(order.createdAt).toLocaleDateString("en-IN")
                        }))
                );

            } catch (error) {
                console.error("Error fetching orders:", error.response?.data || error.message);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = (orderId) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: 'Canceled' } : order
        ));
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
                return <Overview userData={userData} orders={orders} onTabChange={handleTabChange} />;
            case 'orders':
                return <Orders orders={orders} onCancelOrder={handleCancelOrder} />;
            case 'packages':
                return <Packages activePackage={userData.activePackage} />;
            case 'payments':
                return <Payments payments={payments} />;
            case 'settings':
                return <Settings userData={userData} />;
            default:
                return <Overview userData={userData} orders={orders} />;
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
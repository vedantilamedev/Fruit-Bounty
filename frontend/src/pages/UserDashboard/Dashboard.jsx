import axios from "axios";
import { useEffect } from "react";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Package, ShoppingCart, CreditCard, LogOut, Menu, X, Calendar as CalendarIcon, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';
import Overview from '../../components/UserDashboardComponents/Overview';
import Orders from '../../components/UserDashboardComponents/Orders';
import Packages from '../../components/UserDashboardComponents/Packages';
import Payments from '../../components/UserDashboardComponents/Payments';
import Settings from '../../components/UserDashboardComponents/Settings';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);


    // Dummy Data for Development
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
        },
        payments: [

        ]
    });

   const [orders, setOrders] = useState([]);

   useEffect(() => {
     const savedOrders = JSON.parse(localStorage.getItem("userOrders")) || [];
     setOrders(savedOrders);
   }, []);

    const handleCancelOrder = (orderId) => {
        setOrders(prev => prev.map(order =>
            order.id === orderId ? { ...order, status: 'Canceled' } : order
        ));
    };

    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: Home, subtitle: "Managing your organic freshness" },
        { id: 'orders', label: 'My Orders', icon: ShoppingCart, subtitle: "Tracing your fresh harvest journey" },
        { id: 'packages', label: 'My Subscription', icon: Package, subtitle: "Your premium wellness plan" },
        { id: 'payments', label: 'Payments', icon: CreditCard, subtitle: "Safe & Secure Transactions" },
        { id: 'settings', label: 'Settings', icon: SettingsIcon, subtitle: "Manage your account preferences" },
    ];

    const activeMenu = menuItems.find(item => item.id === activeTab) || menuItems[0];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview userData={userData} orders={orders} onTabChange={handleTabChange} />;
            case 'orders':
                return <Orders orders={orders} onCancelOrder={handleCancelOrder} />;
            case 'packages':
                return <Packages activePackage={userData.activePackage} />;
            case 'payments':
                return <Payments payments={userData.payments} />;
            case 'settings':
                return <Settings userData={userData} />;
            default:
                return <Overview userData={userData} orders={orders} />;
        }
    };

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false); // Close mobile menu on selection
    };

    const handleLogout = () => {
        // Clear token logic here

        toast.error("You have been logged out!", {
            position: "top-right",
            autoClose: 3000,
        });

        // navigate("/") if needed
    };

    return (
        
        <div className="h-screen bg-[url('/images/main-background.webp')] flex flex-col lg:flex-row overflow-hidden relative">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="light"
            />
            
            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm flex justify-between items-center shrink-0 z-30">
                
                
                <div className=" p-4 flex items-center justify-center bg-transparent">
                    <img
                        src="/images/footerlogo.webp"
                        alt="Fruit Bounty Logo"
                        className="w-10 h-auto object-contain  transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            

            {/* Sidebar Navigation */}
            {/* Sidebar Navigation */}
            <aside
                className={`
    fixed inset-y-0 left-0 z-50 w-72
    bg-gradient-to-b from-[#2f5e2f] to-[#1f3d1f]
    shadow-[8px_0_30px_rgba(0,0,0,0.6)] transform transition-transform duration-300 ease-in-out
    lg:static lg:translate-x-0 
    shrink-0
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
    lg:h-full lg:overflow-y-auto
  `}
            >
                <div className="h-full flex flex-col">

                    {/* Logo Section */}
                    <div className="py-5 flex items-center justify-center border-b border-[#c6a84b]/40">
                        <img
                            src="/images/footerlogo.webp"
                            alt="Fruit Bounty Logo"
                            className="w-24 h-auto object-contain"
                        />
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 px-6 py-8 space-y-4 overflow-y-auto">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`
            w-full flex items-center gap-4 px-5 py-3
            rounded-xl transition-all duration-300
            text-[15px] font-medium
            ${activeTab === item.id
                                    ? "bg-[#3f7c3f] text-white shadow-[0_9px_14px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.15)] border border-[#c6a84b]"
                                        : "text-[#f5e6b3] hover:bg-[#346639]/60 hover:text-white"
                                    }
          `}
                            >
                                <item.icon size={20} strokeWidth={2} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom Section */}
                    <div className="px-6 py-6 border-t border-[#c6a84b]/30 space-y-3">

                        <Link to="/">
                            <button className="w-full py-3 rounded-lg border border-[#c6a84b] hover:shadow-[0_9px_14px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.15)] text-[#f5e6b3] hover:bg-[#c6a84b] hover:text-[#1f3d1f] transition font-semibold">
                                Go to Home
                            </button>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full py-3 rounded-lg bg-red-600 text-white hover:bg-red-800 font-semibold hover:shadow-[0_9px_14px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.15)]"
                        >
                            Logout
                        </button>

                        <p className="mt-6 text-xs text-[#d6c27a]/70 text-center">
                            © Graphura India Pvt. Ltd.
                            <br />
                            All rights reserved
                        </p>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[#2c442c] scroll-smooth-container h-full">
                <div className="p-4 lg:p-12 min-h-full flex flex-col">
                    <div className="max-w-7xl mx-auto w-full flex-1">


                        {renderContent()}
                    </div>

                </div>
            </main>


        </div>
    );

};

export default Dashboard;

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
            { id: "TXN789456", date: "2026-02-15", amount: 2499, status: "Success", method: "UPI" },
            { id: "TXN789123", date: "2026-01-15", amount: 2499, status: "Success", method: "Card" },
            { id: "TXN788901", date: "2025-12-15", amount: 2499, status: "Success", method: "UPI" },
            { id: "TXN788888", date: "2026-02-19", amount: 499, status: "Pending", method: "UPI" },
            { id: "TXN788777", date: "2026-02-18", amount: 1299, status: "Failed", method: "Card" },
        ]
    });

    const [orders, setOrders] = useState([
        {
            id: "ORD-2026-105",
            date: "2026-02-16",
            amount: 399,
            status: "Pending",
            paymentStatus: "Paid",
            deliveryDate: "2026-02-17", // Order Date + 1
            items: [{ name: "Premium Mixed Fruit Bowl", qty: 1 }]
        },
        {
            id: "ORD-2026-104",
            date: "2026-02-14",
            amount: 599,
            status: "Delivered",
            paymentStatus: "Paid",
            deliveryDate: "2026-02-15",
            items: [{ name: "Exotic Tropical Salad", qty: 2 }]
        },
        {
            id: "ORD-2026-103",
            date: "2026-02-12",
            amount: 299,
            status: "Delivered",
            paymentStatus: "Paid",
            deliveryDate: "2026-02-13",
            items: [{ name: "Fresh Citrus Bowl", qty: 1 }]
        },
        {
            id: "ORD-2026-102",
            date: "2026-02-10",
            amount: 250,
            status: "Canceled",
            paymentStatus: "Failed",
            deliveryDate: "2026-02-11",
            items: [{ name: "Daily Citrus Pack", qty: 1 }]
        },
        {
            id: "ORD-2026-101",
            date: "2026-02-18",
            amount: 450,
            status: "Confirmed",
            paymentStatus: "Paid",
            deliveryDate: "2026-02-19",
            items: [{ name: "Royal Mango Platter", qty: 1 }]
        },
        {
            id: "ORD-2026-100",
            date: "2026-02-17",
            amount: 320,
            status: "Confirmed",
            paymentStatus: "Paid",
            deliveryDate: "2026-02-18",
            items: [{ name: "Berry Blast Box", qty: 1 }]
        }
    ]);

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
        
        <div className="h-screen bg-[#FBF8F2] flex flex-col lg:flex-row overflow-hidden relative">
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
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out 
                lg:static lg:translate-x-0 lg:shadow-none border-r border-[#E8E4D9] shrink-0
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:h-full lg:overflow-y-auto
            `}>
                <div className="h-full flex flex-col bg-[#F7F5EF]/50">

                    {/* Logo Section */}
                    <div className="py-3 border-b border-[#aa8d3c] flex items-center justify-center bg-[#c8c178]">
                        <img
                            src="/images/footerlogo.webp"
                            alt="Fruit Bounty Logo"
                            className="w-24 h-auto object-contain transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                 

                    {/* Menu Links */}
                    <nav className="flex-1 bg-[#c8c178]  px-4 py-8 space-y-3 overflow-y-auto">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1rem] transition-all duration-300 font-medium tracking-tight text-[15px] ${activeTab === item.id
                                    ? 'bg-[#9f8846] text-white shadow-xl shadow-gray-900 translate-x-1 font-normal'
                                    : 'text-black  hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="px-6 py-4 border-t bg-[#c8c178] border-[#afa63f] flex flex-col gap-2">
                        <Link to="/">
                            <button className="w-full px-3 py-2 rounded-lg bg-[#9f8846]  shadow-xl hover:shadow-gray-900 translate-x-1  text-white font-semibold hover:bg-[#67572b] transition">
                                Go to Home
                            </button>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="w-full px-3 py-2 rounded-lg bg-red-700  text-white font-semibold shadow-xl hover:shadow-gray-900 translate-x-1 hover:bg-red-700 hover:text-white transition"
                        >
                            Logout
                        </button>

                        <p className="mt-4 text-xs text-gray-600 text-center">
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
            <main className="flex-1 overflow-y-auto bg-[#FBF8F2] scroll-smooth-container h-full">
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

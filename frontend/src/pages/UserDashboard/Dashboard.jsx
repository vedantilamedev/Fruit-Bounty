import React, { useState } from 'react';
import { Home, Package, ShoppingCart, CreditCard, LogOut, Menu, X, Calendar as CalendarIcon, Settings as SettingsIcon } from 'lucide-react';
import Overview from '../../components/UserDashboardComponents/Overview';
import Orders from '../../components/UserDashboardComponents/Orders';
import Packages from '../../components/UserDashboardComponents/Packages';
import Payments from '../../components/UserDashboardComponents/Payments';
import HarvestCalendar from '../../components/UserDashboardComponents/HarvestCalendar';
import Settings from '../../components/UserDashboardComponents/Settings';


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);



    // Dummy Data for Development
    const [userData, setUserData] = useState({
        name: "Aditya Kumar",
        email: "aditya@fruitbounty.com",
        phone: "+91 98765 43210",
        activePackage: {
            name: "Premium Wellness Plan",
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



    const orders = [
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
    ];

    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: Home, subtitle: "Managing your organic freshness" },
        { id: 'calendar', label: 'Harvest Calendar', icon: CalendarIcon, subtitle: "Tracking nature's schedule" },
        { id: 'orders', label: 'My Orders', icon: ShoppingCart, subtitle: "Tracing your fresh harvest journey" },
        { id: 'packages', label: 'My Subscription', icon: Package, subtitle: "Your premium wellness plan" },
        { id: 'payments', label: 'Payments', icon: CreditCard, subtitle: "Safe & Secure Transactions" },
        { id: 'settings', label: 'Settings', icon: SettingsIcon, subtitle: "Manage your account preferences" },
    ];

    const activeMenu = menuItems.find(item => item.id === activeTab) || menuItems[0];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview userData={userData} orders={orders} />;
            case 'calendar':
                return <HarvestCalendar />;
            case 'orders':
                return <Orders orders={orders} />;
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
        // Add logout logic here (clear tokens, redirect)
        alert("Logging out...");
    };

    return (
        <div className="h-screen bg-[#FBF8F2] flex flex-col lg:flex-row overflow-hidden relative">

            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center shrink-0 z-30">
                <div className="flex items-center gap-2">
                    {/* Title Removed */}
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





                    {/* Menu Links */}
                    <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
                        <p className="px-4 text-[10px] font-normal text-[#B7A261] uppercase tracking-[0.2em] mb-4">MAIN MENU</p>
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-medium tracking-tight text-[15px] ${activeTab === item.id
                                    ? 'bg-[#3C7E44] text-white shadow-xl shadow-green-900/20 translate-x-1 font-normal'
                                    : 'text-black hover:bg-white hover:text-[#3C7E44] hover:translate-x-1'
                                    }`}
                            >
                                <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-6 border-t border-[#E8E4D9]">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 px-6 py-4 text-[#A44A3F] hover:bg-[#FDF2F0] rounded-[1.5rem] transition-all duration-300 font-normal tracking-tight"
                        >
                            <LogOut size={22} />
                            Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-md transition-opacity duration-300"
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

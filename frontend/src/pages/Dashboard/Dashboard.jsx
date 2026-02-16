import React, { useState } from 'react';
import { Home, Package, ShoppingCart, CreditCard, LogOut, Menu, X, User, Calendar as CalendarIcon } from 'lucide-react';
import Overview from './components/Overview';
import Orders from './components/Orders';
import Packages from './components/Packages';
import Payments from './components/Payments';
import HarvestCalendar from './components/HarvestCalendar';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Dummy Data for Development
    const userData = {
        name: "Aditya Kumar",
        email: "aditya@example.com",
        activePackage: {
            name: "Standard Wellness Plan",
            type: "Individual",
            peopleCount: 1,
            duration: "Monthly",
            frequency: "Daily",
            startDate: "2024-01-01",
            endDate: "2024-01-31",
            renewalDate: "2024-02-01",
            status: "Active",
            fruits: ["Apple", "Banana", "Pomegranate", "Kiwi", "Orange"]
        },
        payments: [
            { id: "TXN123456", date: "2024-01-15", amount: 1500, status: "Success", method: "UPI" },
            { id: "TXN123455", date: "2023-12-15", amount: 1500, status: "Success", method: "Card" },
            { id: "TXN123454", date: "2023-11-15", amount: 1500, status: "Failed", method: "NetBanking" },
        ]
    };

    const orders = [
        {
            id: "ORD-001",
            date: "2024-01-20",
            amount: 250,
            status: "Pending",
            paymentStatus: "Paid",
            deliveryDate: "2024-01-21", // Order Date + 1
            items: [{ name: "Mixed Fruit Bowl", qty: 1 }]
        },
        {
            id: "ORD-002",
            date: "2024-01-18",
            amount: 450,
            status: "Delivered",
            paymentStatus: "Paid",
            deliveryDate: "2024-01-19",
            items: [{ name: "Exotic Fruit Salad", qty: 2 }]
        },
        {
            id: "ORD-003",
            date: "2024-01-15",
            amount: 150,
            status: "Confirmed",
            paymentStatus: "Pending",
            deliveryDate: "2024-01-16",
            items: [{ name: "Citrus Blast", qty: 1 }]
        },
    ];

    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: Home, subtitle: "Managing your organic freshness" },
        { id: 'calendar', label: 'Harvest Calendar', icon: CalendarIcon, subtitle: "Tracking nature's schedule" },
        { id: 'orders', label: 'My Orders', icon: ShoppingCart, subtitle: "Tracing your fresh harvest journey" },
        { id: 'packages', label: 'My Subscription', icon: Package, subtitle: "Your premium wellness plan" },
        { id: 'payments', label: 'Payments', icon: CreditCard, subtitle: "Safe & Secure Transactions" },
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
        <div className="min-h-screen bg-[#FBF8F2] flex flex-col lg:flex-row">

            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    {/* Title Removed */}
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`
                fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none border-r border-[#E8E4D9]
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col bg-[#F7F5EF]/50">
                    {/* Logo Area */}
                    {/* Logo Area REMOVED */}


                    {/* User Profile Mini Card */}
                    <div className="p-6 mx-4 mt-6 rounded-[2rem] bg-gradient-to-br from-[#3e7b3f] to-[#2f6131] shadow-xl shadow-green-900/10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#FBF8F2] flex items-center justify-center text-[#3e7b3f] font-black text-xl border-2 border-white/20 shadow-inner">
                                {userData.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-[#FBF8F2] truncate tracking-wide">{userData.name}</p>
                                <p className="text-xs text-[#FBF8F2]/70 truncate font-normal uppercase tracking-widest mt-0.5">{userData.email.split('@')[0]}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
                        <p className="px-4 text-[10px] font-bold text-[#B7A261] uppercase tracking-[0.2em] mb-4">MAIN MENU</p>
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-medium tracking-tight text-[15px] ${activeTab === item.id
                                    ? 'bg-[#3e7b3f] text-white shadow-xl shadow-green-900/20 translate-x-1 font-bold'
                                    : 'text-[#6B705C] hover:bg-white hover:text-[#3e7b3f] hover:translate-x-1'
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
                            className="w-full flex items-center gap-4 px-6 py-4 text-[#A44A3F] hover:bg-[#FDF2F0] rounded-[1.5rem] transition-all duration-300 font-bold tracking-tight"
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
                    className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-md transition-opacity duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto h-[calc(100vh-64px)] lg:h-screen bg-[#FBF8F2] scroll-smooth-container">
                <div className="max-w-7xl mx-auto">
                    {/* Unified Page Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fadeIn px-2">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#2f6131] tracking-tight uppercase italic">
                                {activeMenu.label}
                            </h2>
                            <p className="text-[#B7A261] font-medium mt-2 uppercase tracking-widest text-[10px] lg:text-xs italic">
                                {activeMenu.subtitle}
                            </p>
                        </div>
                        {/* Dynamic Slot for Header Extras (like Calendar Nav) */}
                        <div id="dashboard-header-extra"></div>
                    </div>
                    {renderContent()}
                </div>
            </main>
        </div>
    );

};

export default Dashboard;

import React, { useState } from 'react';
import { Home, Package, ShoppingCart, CreditCard, LogOut, Menu, X, User, Calendar as CalendarIcon, Edit2, Save } from 'lucide-react';
import Overview from '../../components/UserDashboardComponents/Overview';
import Orders from '../../components/UserDashboardComponents/Orders';
import Packages from '../../components/UserDashboardComponents/Packages';
import Payments from '../../components/UserDashboardComponents/Payments';
import HarvestCalendar from '../../components/UserDashboardComponents/HarvestCalendar';
import Footer from '../../components/Footer';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });

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
        ]
    });

    const handleEditProfile = () => {
        setEditForm({
            name: userData.name,
            email: userData.email,
            phone: userData.phone
        });
        setIsEditProfileOpen(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setUserData(prev => ({
            ...prev,
            name: editForm.name,
            email: editForm.email,
            phone: editForm.phone
        }));
        setIsEditProfileOpen(false);
    };

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
        <div className="h-[calc(100vh-120px)] lg:h-[calc(100vh-110px)] bg-[#FBF8F2] flex flex-col lg:flex-row overflow-hidden relative">

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



                    {/* User Profile Mini Card */}
                    <div className="p-6 mx-4 mt-6 rounded-[2rem] bg-gradient-to-br from-[#3C7E44] to-[#3C7E44] shadow-xl shadow-green-900/10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#FBF8F2] flex items-center justify-center text-[#3C7E44] font-normal text-xl border-2 border-white/20 shadow-inner">
                                {userData.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-normal text-[#FBF8F2] truncate tracking-wide">{userData.name}</p>
                                <p className="text-xs text-[#FBF8F2]/70 truncate font-normal uppercase tracking-widest mt-0.5">{userData.email.split('@')[0]}</p>
                            </div>
                        </div>
                    </div>

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
                        {/* Top Main Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-[#3C7E44] tracking-tight">
                                    Hello, {userData.name.split(' ')[0]}! 👋
                                </h1>
                                <p className="text-[#B7A261] font-medium mt-1">Ready for your fresh harvest?</p>
                            </div>
                            <button
                                onClick={handleEditProfile}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E8E4D9] rounded-xl hover:shadow-md hover:border-[#3C7E44] transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-[#3C7E44]/10 flex items-center justify-center group-hover:bg-[#3C7E44] transition-colors">
                                    <Edit2 size={16} className="text-[#3C7E44] group-hover:text-white transition-colors" />
                                </div>
                                <span className="text-sm font-semibold text-[#3C7E44]">Edit Profile</span>
                            </button>
                        </div>

                        {renderContent()}
                    </div>

                    {/* Footer inside Main Content */}
                    <div className="mt-12 pt-8 border-t border-[#E8E4D9]">
                        <Footer />
                    </div>
                </div>
            </main>

            {/* Edit Profile Modal */}
            {isEditProfileOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setIsEditProfileOpen(false)}
                >
                    <div
                        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-[#E8E4D9]"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="bg-[#3C7E44] px-8 py-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white tracking-tight">Edit Profile</h3>
                                <p className="text-green-100/90 text-sm mt-1">Update your personal details</p>
                            </div>
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

                            <button
                                onClick={() => setIsEditProfileOpen(false)}
                                className="absolute top-6 right-6 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors z-50 cursor-pointer"
                                type="button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveProfile} className="p-8 space-y-5">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#B7A261] uppercase tracking-wider mb-2 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            className="w-full pl-12 pr-4 py-3 bg-[#FBF8F2] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#3C7E44] focus:ring-1 focus:ring-[#3C7E44] text-gray-800 font-medium transition-all"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#B7A261] uppercase tracking-wider mb-2 ml-1">Email Address</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">@</span>
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-3 bg-[#FBF8F2] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#3C7E44] focus:ring-1 focus:ring-[#3C7E44] text-gray-800 font-medium transition-all"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#B7A261] uppercase tracking-wider mb-2 ml-1">Phone Number</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">#</span>
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full pl-12 pr-4 py-3 bg-[#FBF8F2] border border-[#E8E4D9] rounded-xl focus:outline-none focus:border-[#3C7E44] focus:ring-1 focus:ring-[#3C7E44] text-gray-800 font-medium transition-all"
                                            placeholder="Enter your phone"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-[#3C7E44] text-white rounded-xl font-bold tracking-wide shadow-lg shadow-green-900/20 hover:shadow-xl hover:bg-[#2f6131] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Dashboard;

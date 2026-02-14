import React, { useState } from 'react';
import { Home, Package, ShoppingCart, CreditCard, LogOut, Menu, X, User } from 'lucide-react';
import Overview from './components/Overview';
import Orders from './components/Orders';
import Packages from './components/Packages';
import Payments from './components/Payments';

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
        { id: 'overview', label: 'Dashboard', icon: Home },
        { id: 'orders', label: 'My Orders', icon: ShoppingCart },
        { id: 'packages', label: 'My Subscription', icon: Package },
        { id: 'payments', label: 'Payments', icon: CreditCard },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview userData={userData} orders={orders} />;
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
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">

            {/* Mobile Header */}
            <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
                <h1 className="text-xl font-bold text-green-700">FruitsBounty</h1>
                <button icon={isMobileMenuOpen ? X : Menu} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none border-r border-gray-100
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="p-6 border-b border-gray-100 hidden lg:block">
                        <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                            <span className="bg-green-100 p-1.5 rounded-lg"><User size={20} className="text-green-600" /></span>
                            Customer Panel
                        </h1>
                    </div>

                    {/* User Profile Mini Card */}
                    <div className="p-6 bg-gradient-to-b from-green-50 to-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-lg border-2 border-white shadow-sm">
                                {userData.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-bold text-gray-800 truncate">{userData.name}</p>
                                <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${activeTab === item.id
                                        ? 'bg-green-600 text-white shadow-md shadow-green-200'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto h-[calc(100vh-64px)] lg:h-screen">
                <div className="max-w-6xl mx-auto animate-fadeIn">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;

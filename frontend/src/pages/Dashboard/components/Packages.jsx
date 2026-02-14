import React from 'react';
import { Package, Users, Calendar, Check, XCircle } from 'lucide-react';

const Packages = ({ activePackage }) => {
    if (!activePackage) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                <Package size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium text-lg">No Active Subscription</p>
                <p className="text-gray-400 text-sm mt-1">Subscribe to a plan to enjoy regular fruit deliveries.</p>
                <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    View Plans
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">My Subscription</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${activePackage.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                    {activePackage.status}
                </span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Package className="opacity-80" />
                        <h3 className="text-xl font-bold">{activePackage.name}</h3>
                    </div>
                    <p className="opacity-90 text-sm">Valid until {activePackage.endDate}</p>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <Users className="text-blue-500" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Plan Type</p>
                                <p className="text-gray-800 font-medium">{activePackage.type} ({activePackage.peopleCount} People)</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="bg-white p-2 rounded-full shadow-sm">
                                <Calendar className="text-purple-500" size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Duration</p>
                                <p className="text-gray-800 font-medium">{activePackage.duration} ({activePackage.frequency})</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
                            Included Fruits
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-normal">
                                {activePackage.fruits.length} Items
                            </span>
                        </h4>
                        <ul className="space-y-3">
                            {activePackage.fruits.map((fruit, idx) => (
                                <li key={idx} className="flex items-center text-gray-600 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center mr-3 text-xs">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    {fruit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm">
                    <span className="text-gray-500">Next Renewal: <span className="font-medium text-gray-800">{activePackage.renewalDate}</span></span>
                    <button className="text-red-500 hover:text-red-600 font-medium text-xs uppercase tracking-wide">Cancel Plan</button>
                </div>
            </div>
        </div>
    );
};

export default Packages;

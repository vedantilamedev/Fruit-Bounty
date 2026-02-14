import React from 'react';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

const Payments = ({ payments }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Success': return <CheckCircle size={16} className="text-green-500" />;
            case 'Pending': return <Clock size={16} className="text-yellow-500" />;
            case 'Failed': return <XCircle size={16} className="text-red-500" />;
            default: return <Clock size={16} className="text-gray-400" />;
        }
    };

    const statusStyles = {
        Success: 'bg-green-50 text-green-700 border-green-100',
        Pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
        Failed: 'bg-red-50 text-red-700 border-red-100',
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>

            {payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                    <CreditCard size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium text-lg">No payments yet</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase font-semibold tracking-wide">
                                    <th className="p-4">Transaction ID</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Method</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition">
                                        <td className="p-4 font-mono text-gray-600 font-medium">#{payment.id}</td>
                                        <td className="p-4 text-gray-600">{payment.date}</td>
                                        <td className="p-4 font-bold text-gray-900">₹{payment.amount}</td>
                                        <td className="p-4 text-gray-600 capitalize">{payment.method}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[payment.status] || 'bg-gray-50 text-gray-600'}`}>
                                                {getStatusIcon(payment.status)}
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payments;

import React from 'react';
import { CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react';

const Payments = ({ payments }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Success': return <CheckCircle size={14} strokeWidth={3} />;
            case 'Pending': return <Clock size={14} strokeWidth={3} />;
            case 'Failed': return <XCircle size={14} strokeWidth={3} />;
            default: return <Clock size={14} strokeWidth={3} />;
        }
    };

    const statusStyles = {
        Success: 'bg-[#3e7b3f]/10 text-[#3e7b3f] border-[#3e7b3f]/20',
        Pending: 'bg-[#B7A261]/10 text-[#B7A261] border-[#B7A261]/20',
        Failed: 'bg-[#A44A3F]/10 text-[#A44A3F] border-[#A44A3F]/20',
    };

    return (
        <div className="space-y-8 animate-fadeIn mt-4">

            {payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border-2 border-dashed border-[#E8E4D9] shadow-inner text-center">
                    <div className="bg-[#F7F5EF] p-8 rounded-[2rem] mb-6 shadow-sm">
                        <CreditCard size={64} className="text-[#B7A261] opacity-40" strokeWidth={1} />
                    </div>
                    <p className="text-[#2f6131] font-black text-xl italic mb-2 tracking-tight">Financial Records Clear!</p>
                    <p className="text-[#6B705C] font-medium text-sm max-w-xs">You haven't made any fruit investments yet. Your vault is ready when you are.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] shadow-sm border border-[#E8E4D9] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#F7F5EF] text-[10px] text-[#B7A261] uppercase font-black tracking-[0.15em] border-b border-[#E8E4D9]">
                                    <th className="p-6">Treasury Link</th>
                                    <th className="p-6">Transaction Date</th>
                                    <th className="p-6">Amount Invested</th>
                                    <th className="p-6">Channel</th>
                                    <th className="p-6">Verification</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E4D9]/30 text-sm">
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-[#FBF8F2] transition duration-300 group">
                                        <td className="p-6 font-black text-[#6B705C] text-xs">#{payment.id}</td>
                                        <td className="p-6 text-[#6B705C] font-bold italic opacity-80">{payment.date}</td>
                                        <td className="p-6 font-black text-[#2f6131] text-lg">₹{payment.amount}</td>
                                        <td className="p-6 font-black text-[#B7A261] uppercase text-[10px] tracking-widest">{payment.method}</td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[payment.status] || 'bg-gray-50 text-gray-600'}`}>
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

    import React, { useEffect } from 'react';
    // eslint-disable-next-line no-unused-vars
    import { motion } from 'framer-motion';
    import {
    ShieldCheck,
    FileText,
    Scale,
    CalendarDays,
    Info,
    ChevronRight,
    } from 'lucide-react';

    const termsSections = [
    {
        title: 'Acceptance of Terms',
        icon: <Scale size={16} />,
        content:
        'By accessing or using Fruit Bounty services, you agree to be bound by these Terms & Conditions and all applicable laws. If you do not agree, please discontinue use of our platform.',
    },
    {
        title: 'Orders, Pricing & Availability',
        icon: <FileText size={16} />,
        content:
        'All orders are subject to product availability, quality checks, and service-area coverage. Prices may change without prior notice, but confirmed orders will be billed at the price shown at checkout.',
    },
    {
        title: 'Delivery & Fulfillment',
        icon: <CalendarDays size={16} />,
        content:
        'Delivery windows are estimates and may vary due to weather, traffic, or operational constraints. We strive to deliver fresh produce on time while maintaining strict quality and hygiene standards.',
    },
    {
        title: 'User Responsibilities',
        icon: <Info size={16} />,
        content:
        'You are responsible for providing accurate contact and delivery details. Misuse of the service, fraudulent activity, or violation of laws may result in suspension or termination of your account.',
    },
    {
        title: 'Cancellations & Refunds',
        icon: <ShieldCheck size={16} />,
        content:
        'Cancellation and refund eligibility depends on order status, product type, and service policy. Approved refunds are processed to the original payment method within standard banking timelines.',
    },
    ];

    const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FBF8F2] via-white to-[#f6f5ef] px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto rounded-[2.5rem] border border-[#E8E4D9] bg-white/90 backdrop-blur-sm shadow-[0_20px_50px_-24px_rgba(0,0,0,0.20)] overflow-hidden">
            <div className="relative px-6 sm:px-10 lg:px-14 py-12 lg:py-14 bg-gradient-to-r from-[#1f4b31] via-[#2b6840] to-[#3C7E44] text-white">
            <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-14 -left-10 w-40 h-40 rounded-full bg-[#B7A261]/30 blur-2xl" />

            <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em]">
                <ShieldCheck size={14} /> Legal Policy
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Terms & Conditions
                </h1>
                <p className="text-sm sm:text-base text-white/85 max-w-2xl font-medium">
                The rules and obligations that govern use of Fruit Bounty products and services.
                </p>
            </div>
            </div>

            <div className="px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
            <div className="space-y-4">
                {termsSections.map((section, index) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="rounded-2xl border border-[#E8E4D9] bg-[#FCFBF7] p-5 sm:p-6"
                >
                    <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-[#E8E4D9] text-[#3C7E44] flex items-center justify-center">
                        {section.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">{section.title}</h3>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{section.content}</p>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
            </div>

            <div className="px-6 sm:px-10 lg:px-14 pb-10 lg:pb-12">
            <div className="rounded-2xl border border-[#E8E4D9] bg-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Review these terms before placing an order or using our platform. Continued use of Fruit Bounty indicates acceptance of these conditions.
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-extrabold text-[#3C7E44]">
                Effective Version
                <ChevronRight size={14} />
                Feb 2026
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default TermsAndConditions;

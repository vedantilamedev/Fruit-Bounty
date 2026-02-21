    import React, { useEffect } from 'react';
    // eslint-disable-next-line no-unused-vars
    import { motion } from 'framer-motion';
    import {
    Lock,
    Eye,
    FileText,
    ShieldCheck,
    Mail,
    ChevronRight,
    } from 'lucide-react';

    const privacySections = [
    {
        title: 'Information We Collect',
        icon: <Eye size={16} />,
        content:
        'We may collect personal details such as name, phone number, email, address, and order preferences to fulfill purchases, provide support, and improve your experience.',
    },
    {
        title: 'How We Use Information',
        icon: <FileText size={16} />,
        content:
        'Your data is used for order processing, communication, service optimization, fraud prevention, and legal compliance. We process data only for legitimate business purposes.',
    },
    {
        title: 'Data Security',
        icon: <Lock size={16} />,
        content:
        'We implement appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, alteration, or destruction.',
    },
    {
        title: 'Data Sharing & Third Parties',
        icon: <ShieldCheck size={16} />,
        content:
        'We may share necessary data with trusted logistics, payment, and support partners to deliver services. We do not sell your personal data to third parties.',
    },
    {
        title: 'Your Rights & Contact',
        icon: <Mail size={16} />,
        content:
        'You may request access, correction, or deletion of your personal information, subject to legal obligations. For privacy requests, contact our support team through official channels.',
    },
    ];

    const PrivacyPolicy = () => {
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
                <Lock size={14} /> Privacy Policy
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Privacy Policy
                </h1>
                <p className="text-sm sm:text-base text-white/85 max-w-2xl font-medium">
                How Fruit Bounty collects, uses, secures, and protects your personal information.
                </p>
            </div>
            </div>

            <div className="px-6 sm:px-10 lg:px-14 py-10 lg:py-12">
            <div className="space-y-4">
                {privacySections.map((section, index) => (
                <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="rounded-2xl border border-[#E8E4D9] bg-[#FCFBF7] p-5 sm:p-6"
                >
                    <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-[#E8E4D9] text-[#B7A261] flex items-center justify-center">
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
                Your data privacy matters to us. We keep our data practices transparent and aligned with lawful processing requirements.
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

    export default PrivacyPolicy;

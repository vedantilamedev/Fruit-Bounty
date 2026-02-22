import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  ShoppingCart,
  Truck,
  UserCheck,
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const termsSections = [
  {
    number: "1",
    title: "Acceptance of Terms",
    icon: <FileCheck size={20} />,
    content:
      "By accessing or using Fruit Bounty services, you agree to be bound by these Terms & Conditions and all applicable laws. If you do not agree, please discontinue use of our platform.",
  },
  {
    number: "2",
    title: "Orders, Pricing & Availability",
    icon: <ShoppingCart size={20} />,
    content:
      "All orders are subject to product availability, quality checks, and service-area coverage. Prices may change without prior notice, but confirmed orders will be billed at the price shown at checkout.",
  },
  {
    number: "3",
    title: "Delivery & Fulfillment",
    icon: <Truck size={20} />,
    content:
      "Delivery windows are estimates and may vary due to weather, traffic, or operational constraints. We strive to deliver fresh produce on time while maintaining strict quality and hygiene standards.",
  },
  {
    number: "4",
    title: "User Responsibilities",
    icon: <UserCheck size={20} />,
    content:
      "You are responsible for providing accurate contact and delivery details. Misuse of the service, fraudulent activity, or violation of laws may result in suspension or termination of your account.",
  },
  {
    number: "5",
    title: "Cancellations & Refunds",
    icon: <RefreshCcw size={20} />,
    content:
      "Cancellation and refund eligibility depends on order status, product type, and service policy. Approved refunds are processed to the original payment method within standard banking timelines.",
  },
];

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
      style={{
        backgroundImage: "url('/images/main-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-8 border-b-2 border-[#3C7E44]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#3C7E44] flex items-center justify-center">
              <FileCheck size={24} className="text-white" />
            </div>
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#3C7E44]">
              Legal Document
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            Terms & Conditions
          </h1>

          <p className="text-base text-gray-600 leading-relaxed">
            Please read these terms carefully before using Fruit Bounty
            services.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#FBF8F2] rounded-lg border border-[#E8E4D9]">
            <CheckCircle2 size={16} className="text-[#3C7E44]" />
            <span className="text-xs font-bold text-gray-700">
              Effective Date: February 2026
            </span>
          </div>
        </div>

        {/* Sections - Numbered Document Style */}
        <div className="space-y-8">
          {termsSections.map((section, index) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-[#3C7E44] text-white flex items-center justify-center font-bold">
                  {section.number}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-[#3C7E44]">{section.icon}</div>
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed pl-9">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t">
          <div className="bg-[#FBF8F2] rounded-xl p-6 border">
            <div className="flex gap-4">
              <AlertCircle className="text-[#3C7E44]" />
              <p className="text-sm text-gray-600">
                By continuing to use Fruit Bounty, you agree to these Terms &
                Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

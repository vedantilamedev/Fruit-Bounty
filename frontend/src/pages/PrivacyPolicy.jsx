import React, { useEffect } from "react";

const privacySections = [
  {
    title: "Introduction",
    content: [
      "Welcome to Fruit Bounty. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our service.",
      "Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.",
    ],
  },
  {
    title: "Information We Collect",
    subsections: [
      {
        subtitle: "Personal Information",
        text: "We collect information that you provide directly to us, including your name, email address, phone number, delivery address, and payment information when you create an account or place an order.",
      },
      {
        subtitle: "Order and Transaction Data",
        text: "We collect details about your purchases, order history, preferences, and payment transactions to process and fulfill your orders.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "We may automatically collect certain information about your device, including IP address, browser type, operating system, and usage patterns when you access our services.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: ["We use the information we collect to:"],
    list: [
      "Process and deliver your orders",
      "Communicate with you about your orders, account, and promotional offers",
      "Improve our services and develop new features",
      "Provide customer support and respond to your inquiries",
      "Detect, prevent, and address fraud and security issues",
      "Comply with legal obligations and enforce our terms",
    ],
  },
  {
    title: "Sharing Your Information",
    subsections: [
      {
        subtitle: "Service Providers",
        text: "We may share your information with third-party service providers who perform services on our behalf, including payment processing, delivery services, marketing, and analytics.",
      },
      {
        subtitle: "Business Transfers",
        text: "If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law or in response to valid requests by public authorities.",
      },
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure.",
    ],
  },
  {
    title: "Your Rights and Choices",
    list: [
      "Access and update your personal information through your account settings",
      "Request deletion of your personal data, subject to certain legal obligations",
      "Opt-out of marketing communications at any time",
      "Disable cookies through your browser settings",
      "Request a copy of the personal information we hold about you",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.",
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      "Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    content: [
      "We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the 'Last Updated' date. You are advised to review this privacy policy periodically for any changes.",
    ],
  },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentDate = new Date();
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
      style={{
        backgroundImage: "url('/public/images/main-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#E8E4D9] p-8 sm:p-12">
        {/* Header */}
        <div className="mb-12 pb-8 border-b-2 border-[#E8E4D9]">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Last Updated: {monthYear}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            At Fruit Bounty, we are committed to protecting your privacy and
            ensuring the security of your personal information.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {privacySections.map((section, index) => (
            <div key={section.title} className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-start gap-3">
                <span className="text-[#B7A261]">{index + 1}.</span>
                <span>{section.title}</span>
              </h2>

              {/* Regular content paragraphs */}
              {section.content &&
                section.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-base text-gray-700 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}

              {/* Subsections */}
              {section.subsections && (
                <div className="space-y-6 ml-6">
                  {section.subsections.map((subsection, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {subsection.subtitle}
                      </h3>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {subsection.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Lists */}
              {section.list && (
                <ul className="space-y-3 ml-6">
                  {section.list.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-base text-gray-700 leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-[#3C7E44] mt-1.5 flex-shrink-0">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer Contact Section */}
        <div className="mt-16 pt-8 border-t-2 border-[#E8E4D9]">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <div className="space-y-2">
            <p className="text-base text-gray-700">
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:privacy@fruitbounty.com"
                className="text-[#B7A261] hover:text-[#9d8a51] transition-colors"
              >
                privacy@fruitbounty.com
              </a>
            </p>
            <p className="text-base text-gray-700">
              <span className="font-semibold">Support:</span>{" "}
              <a
                href="mailto:support@fruitbounty.com"
                className="text-[#B7A261] hover:text-[#9d8a51] transition-colors"
              >
                support@fruitbounty.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

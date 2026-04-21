import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

const ServiceCard = ({ icon, title, description, features }) => (
    <div className="group relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-accent-gold/40 transition-all duration-700 hover:-translate-y-2 overflow-hidden">
        {/* تأثير الإضاءة الخلفية */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-accent-gold/5 blur-[100px] group-hover:bg-accent-gold/10 transition-all duration-700" />

        <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-accent-gold/10 flex items-center justify-center mb-8 border border-accent-gold/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <span className="material-symbols-outlined text-accent-gold text-3xl">
                    {icon}
                </span>
            </div>

            <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-accent-gold transition-colors">
                {title}
            </h3>

            <p className="text-white/50 text-sm leading-relaxed mb-8 font-medium">
                {description}
            </p>

            <ul className="space-y-4">
                {features.map((feature, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 text-[11px] text-white/70 uppercase tracking-widest font-bold"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/40" />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default function ServicesPage() {
    const services = [
        {
            icon: "account_balance",
            title: "إدارة الأصول العقارية",
            description:
                "نقدم حلولاً متكاملة لإدارة المحافظ العقارية الكبرى، مع التركيز على تعظيم العوائد وتقليل المخاطر عبر استراتيجيات سيادية.",
            features: [
                "تحليل السوق اللحظي",
                "إدارة التدفقات النقدية",
                "التقييم الدوري للمحافظ",
            ],
        },
        {
            icon: "insights",
            title: "الاستشارات الاستثمارية",
            description:
                "توجيه رؤوس الأموال نحو الفرص العقارية الأكثر نمواً في الأسواق الناشئة والمستقرة، بناءً على بيانات دقيقة.",
            features: [
                "دراسات جدوى معمقة",
                "هيكلة الصفقات الكبرى",
                "إدارة المخاطر الاستثمارية",
            ],
        },
        {
            icon: "handshake",
            title: "الوساطة الاستراتيجية",
            description:
                "ربط كبار المستثمرين بأصحاب المشاريع والفرص الحصرية التي لا تتوفر في الأسواق العامة (Off-market).",
            features: [
                "شبكة علاقات دولية",
                "سرية تامة في التعامل",
                "تفاوض احترافي",
            ],
        },
    ];

    return (
        <MainLayout>
            <Head title="خدماتنا السيادية" />

            <div className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* رأس الصفحة */}
                    <div className="text-center mb-24 space-y-4">
                        <span className="text-accent-gold text-[10px] font-black uppercase tracking-[0.5em] block animate-pulse">
                            نطاق التميز
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                            خدماتنا{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-white">
                                السيادية
                            </span>
                        </h1>
                        <div className="w-24 h-1 bg-accent-gold/30 mx-auto rounded-full" />
                    </div>

                    {/* شبكة الخدمات */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>

                    {/* تذييل محفز */}
                    <div className="mt-32 p-12 rounded-[3rem] bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            هل أنت جاهز لبدء رحلتك الاستثمارية؟
                        </h2>
                        <Link
                            href="/investor-page"
                            className="flex items-center justify-center bg-accent-gold text-[#0b1c2d] font-black px-6 py-4 rounded-2xl rounded-xl text-lg shadow-2xl hover:scale-110 transition-all duration-300 min-w-[50px] text-center bg-accent text-[#0b1c2d] font-black rounded-xl text-sm
                                                "
                        >
                            تقديم طلب الاستثمار
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

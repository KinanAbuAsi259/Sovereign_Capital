import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function Workflow() {
    const steps = [
        {
            id: "01",
            title: "تقديم الأصول",
            desc: "يبدأ المستثمر برفع بيانات العقار أو المحفظة المالية عبر نظام التشفير الخاص بنا.",
            icon: "upload_file",
        },
        {
            id: "02",
            title: "التحليل والتقييم",
            desc: "يقوم خبراؤنا وبمساعدة الذكاء الاصطناعي بتقييم العروض وضمان مطابقتها للمعايير.",
            icon: "analytics",
        },
        {
            id: "03",
            title: "التنفيذ السيادي",
            desc: "يتم إتمام الصفقة وضمان انتقال الحقوق والأرباح في بيئة قانونية وتقنية مؤمنة.",
            icon: "verified_user",
        },
    ];

    return (
        <MainLayout>
            <Head title="آلية العمل - Sovereign Capital" />

            <div className="min-h-screen bg-[#0b1c2d] text-right relative overflow-hidden">
                {/* إضاءة خلفية ذهبية */}
                <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    {/* رأس الصفحة */}
                    <div className="mb-24 border-r-4 border-accent pr-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            آلية <span className="text-accent">العمل</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                            نظام متكامل يربط بين الذكاء التقني والرؤية
                            الاستثمارية، مصمم لخدمة كبار المستثمرين والوسطاء في
                            Sovereign Capital.
                        </p>
                    </div>

                    {/* شبكة الخطوات */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <div key={index} className="relative group">
                                {/* رقم الخطوة خلفية */}
                                <div className="absolute -top-10 -left-4 text-white/5 text-9xl font-black group-hover:text-accent/10 transition-colors">
                                    {step.id}
                                </div>

                                <div className="relative p-10 bg-white/5 border border-white/10 rounded-3xl hover:border-accent/30 transition-all duration-500 backdrop-blur-sm">
                                    <div className="size-16 bg-accent text-[#0b1c2d] rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-accent/20">
                                        <span className="material-symbols-outlined text-3xl font-bold">
                                            {step.icon}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* زر العودة الديناميكي بنفس التنسيق */}
                    <div className="w-full flex justify-center mt-32 mb-10">
                        <Link
                            href="/"
                            className="w-full max-w-[280px] bg-accent text-[#0b1c2d] font-black py-4 rounded-2xl 
                                       transition-all duration-300 uppercase tracking-widest text-[12px] 
                                       shadow-xl shadow-accent/20 hover:scale-105 active:scale-95
                                       justify-center gap-3 inline-flex items-center"
                        >
                            <span
                                className="material-symbols-outlined text-sm"
                                style={{ transform: "scaleX(1.5)" }}
                            >
                                arrow_forward
                            </span>
                            العودة للقائمة الرئيسية
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

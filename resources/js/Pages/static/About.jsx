import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function About() {
    return (
        <MainLayout>
            <Head title="من نحن - Sovereign Capital" />

            <div className="min-h-screen bg-[#0b1c2d] text-right relative overflow-hidden">
                {/* إضاءة دائرية خلفية ناعمة */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    {/* قسم العنوان والتعريف */}
                    <div className="mb-24 border-r-4 border-accent pr-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            من <span className="text-accent">نحن</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
                            نحن مؤسسة مالية تقنية رائدة، نسعى لإعادة تعريف مفهوم
                            الاستثمار السيادي عبر دمج الحلول الرقمية المتقدمة مع
                            الخبرة المالية العميقة لتوفير بيئة آمنة وفخمة لنخبة
                            المستثمرين.
                        </p>
                    </div>

                    {/* شبكة القيم والرؤية */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        {/* بطاقة الرؤية */}
                        <div className="p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
                            <span className="material-symbols-outlined absolute -left-4 -bottom-4 text-white/5 text-9xl">
                                visibility
                            </span>
                            <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined">
                                    auto_awesome
                                </span>
                                رؤيتنا
                            </h3>
                            <p className="text-slate-300 leading-relaxed relative z-10">
                                أن نكون الوجهة الأولى عالمياً في إدارة الأصول
                                الرقمية والتقليدية، حيث تلتقي التكنولوجيا
                                بالسيادة المالية لتشكيل مستقبل الاستثمار الذكي.
                            </p>
                        </div>

                        {/* بطاقة المهمة */}
                        <div className="p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm relative overflow-hidden group">
                            <span className="material-symbols-outlined absolute -left-4 -bottom-4 text-white/5 text-9xl">
                                military_tech
                            </span>
                            <h3 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined">
                                    verified
                                </span>
                                مهمتنا
                            </h3>
                            <p className="text-slate-300 leading-relaxed relative z-10">
                                تمكين شركائنا من الوصول إلى فرص استثمارية
                                استثنائية من خلال منصة تقنية متطورة تضمن
                                الشفافية المطلقة، الأمان المتناهي، والنمو
                                المستدام.
                            </p>
                        </div>
                    </div>

                    {/* إحصائيات سريعة (أرقام ملكية) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/10">
                        <div className="text-center">
                            <div className="text-3xl font-black text-white mb-1">
                                +500
                            </div>
                            <div className="text-[10px] text-accent uppercase tracking-widest font-bold">
                                مستثمر سيادي
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white mb-1">
                                99%
                            </div>
                            <div className="text-[10px] text-accent uppercase tracking-widest font-bold">
                                معدل الأمان
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white mb-1">
                                +1B
                            </div>
                            <div className="text-[10px] text-accent uppercase tracking-widest font-bold">
                                أصول مدارة
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white mb-1">
                                24/7
                            </div>
                            <div className="text-[10px] text-accent uppercase tracking-widest font-bold">
                                دعم تقني
                            </div>
                        </div>
                    </div>

                    {/* زر العودة الديناميكي بنفس التنسيق المعتمد */}
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

import React from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";

export default function Security() {
    return (
        <MainLayout>
            <Head title="الأمان والخصوصية - Sovereign Capital" />

            <div className="min-h-screen bg-[#0b1c2d] text-right overflow-hidden relative">
                {/* تأثير خلفية مضيئة خلف المحتوى */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    {/* العنوان الرئيسي مع خط ذهبي عمودي */}
                    <div className="mb-20 border-r-4 border-accent pr-6">
                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                            الأمان <span className="text-accent">السيادي</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                            في Sovereign Capital، نعتبر أمان بياناتك واستثماراتك
                            حجر الزاوية في منظومتنا. نطبق بروتوكولات حماية
                            عالمية لضمان بيئة عمل رقمية منيعة.
                        </p>
                    </div>

                    {/* شبكة الأمان - Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* بطاقة 1: التشفير */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="size-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                                <span className="material-symbols-outlined text-accent group-hover:text-[#0b1c2d] text-3xl">
                                    encrypted
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                تشفير End-to-End
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                يتم تشفير كافة المراسلات والبيانات الحساسة بين
                                الزبائن والوسطاء باستخدام تقنيات تشفير عسكرية
                                تمنع أي طرف ثالث من الوصول إليها.
                            </p>
                        </div>

                        {/* بطاقة 2: الهوية الرقمية */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="size-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                                <span className="material-symbols-outlined text-accent group-hover:text-[#0b1c2d] text-3xl">
                                    fingerprint
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                التحقق الثنائي (2FA)
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                نطبق أنظمة تحقق صارمة لضمان أن صاحب الحساب فقط
                                هو من يملك صلاحية الوصول إلى لوحة التحكم وإدارة
                                العروض والطلبات.
                            </p>
                        </div>

                        {/* بطاقة 3: مراقبة النزاهة */}
                        <div className="group p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                            <div className="size-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                                <span className="material-symbols-outlined text-accent group-hover:text-[#0b1c2d] text-3xl">
                                    gpp_maybe
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">
                                مراقبة على مدار الساعة
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                أنظمة الحماية لدينا تراقب النشاطات المشبوهة بشكل
                                لحظي لحماية المنصة من أي محاولات اختراق أو
                                احتيال رقمي.
                            </p>
                        </div>
                    </div>

                    {/* قسم إضافي: الثقة */}
                    <div className="mt-20 p-10 bg-gradient-to-l from-accent/20 to-transparent border-r-2 border-accent rounded-l-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                هل لديك استفسار أمني؟
                            </h2>
                            <p className="text-slate-400">
                                فريقنا التقني جاهز للإجابة على كافة تساؤلاتكم
                                حول حماية البيانات.
                            </p>
                        </div>
                        <a
                            href={`https://wa.me/+963982057009?text=${encodeURIComponent(`مرحباً، أنا مهتم بالتواصل مع قسم الأمان في Sovereign Capital بخصوص استفسار حول حماية البيانات.`)}`}
                            className="px-8 py-4 bg-accent text-[#0b1c2d] font-black rounded-xl hover:scale-105 transition-transform shadow-xl shadow-accent/20 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">
                                support_agent
                            </span>
                            تواصل مع القسم التقني
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center mt-32 mb-20">
                {" "}
                {/* حاوية لتوسيط الزر */}
                <Link
                    href="/"
                    /* التحكم الديناميكي:
           - max-w-[300px]: يحدد أقصى عرض للزر ليبقى فخماً.
           - py-4: تقليل الارتفاع من 6 إلى 4 ليكون أكثر رشاقة.
           - scale-95: تأثير ضغط بسيط عند النقر.
        */
                    className="w-full max-w-[280px] bg-accent text-[#0b1c2d] font-black py-4 rounded-2xl 
                   transition-all duration-300 uppercase tracking-widest text-[12px] 
                   shadow-xl shadow-accent/20 hover:scale-105 active:scale-95
                   justify-center gap-4 inline-flex items-center"
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
        </MainLayout>
    );
}

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function IDashboard() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <AuthenticatedLayout>
            <Head title="لوحة تحكم المستثمر | VIP" />

            {/* تخصيص الـ CSS للهوية البصرية داخل الصفحة */}
            <style>{`
                .clip-path-shield {
                    clip-path: polygon(50% 0%, 100% 15%, 100% 70%, 50% 100%, 0% 70%, 0% 15%);
                }
                .bg-gold-gradient {
                    background: linear-gradient(135deg, #c5a059 0%, #ecd09b 50%, #c5a059 100%);
                }
            `}</style>

            <div
                className="min-h-screen bg-[#13191f] text-slate-100 font-sans"
                dir="rtl"
            >
                {/* Hero Section - ترحيب المستثمر */}
                <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
                    <section className="py-12 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
                                    دخول حصري
                                </span>
                                <h1 className="text-4xl md:text-5xl font-light tracking-tighter text-slate-100">
                                    فرص استثمارية
                                </h1>
                            </div>

                            <div className="flex gap-4">
                                {/* تفعيل زر الفلترة */}
                                <button
                                    onClick={() =>
                                        setIsFilterOpen(!isFilterOpen)
                                    }
                                    className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all ${isFilterOpen ? "bg-accent text-primary" : "bg-[#0b1c2d] border border-slate-700 text-slate-300"}`}
                                >
                                    <span className="material-symbols-outlined text-sm">
                                        filter_list
                                    </span>
                                    {isFilterOpen
                                        ? "إغلاق الفلترة"
                                        : "تصفية النتائج"}
                                </button>
                            </div>
                        </div>

                        {/* لوحة الفلترة المتحركة */}
                        <div
                            className={`overflow-hidden transition-all duration-500 ${isFilterOpen ? "max-h-96 opacity-100 mt-8" : "max-h-0 opacity-0"}`}
                        >
                            <div
                                className="bg-[#0b1c2d] border border-slate-800 p-8 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 text-right"
                                dir="rtl"
                            >
                                <div className="space-y-2">
                                    <label className="text-xs text-accent uppercase font-black tracking-widest">
                                        نطاق السعر
                                    </label>
                                    <select className="w-full bg-[#13191f] border-slate-700 rounded-lg text-sm text-white focus:border-accent">
                                        <option>الكل</option>
                                        <option>أعلى من 10 مليون $</option>
                                        <option>أعلى من 50 مليون $</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-accent uppercase font-black tracking-widest">
                                        الموقع الاستراتيجي
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="مثلاً: دبي، لندن..."
                                        className="w-full bg-[#13191f] border-slate-700 rounded-lg text-sm text-white focus:border-accent"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <button className="w-full py-3 bg-accent/10 border border-accent text-accent rounded-lg text-xs font-bold uppercase hover:bg-accent hover:text-primary transition-all">
                                        تطبيق المعايير
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* قائمة العقارات (Cards) */}
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* بطاقة عقار 1 */}
                        <div className="group relative bg-[#0b1c2d]/40 border border-slate-800 rounded-xl overflow-hidden hover:border-[#c5a059]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#c5a059]/5">
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
                                    alt="Luxury Villa"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-[#c5a059]/90 backdrop-blur text-[#0b1c2d] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                                        أولوية قصوى
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 bg-[#13191f]/60 backdrop-blur px-3 py-1 rounded-lg">
                                    <span className="text-slate-100 text-xs font-medium">
                                        $42.5M
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-medium text-slate-100">
                                        قصر بل-إير | سري للغاية
                                    </h3>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                                        إقامة سرية تتميز بإطلالات بانورامية لا
                                        مثيل لها ومعرض فني تحت الأرض.
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                    <div className="flex gap-4 text-slate-500">
                                        <span className="flex items-center gap-1.5 text-xs uppercase tracking-tighter">
                                            <span className="material-symbols-outlined text-sm">
                                                bed
                                            </span>{" "}
                                            7 غرف
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs uppercase tracking-tighter">
                                            <span className="material-symbols-outlined text-sm">
                                                bathtub
                                            </span>{" "}
                                            9 حمام
                                        </span>
                                    </div>
                                    <button className="text-[#c5a059] text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
                                        عرض الملف{" "}
                                        <span className="material-symbols-outlined">
                                            chevron_left
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* بطاقة عقار 2 (بسيطة للتوضيح) */}
                        <div className="group relative bg-[#0b1c2d]/40 border border-slate-800 rounded-xl overflow-hidden hover:border-[#c5a059]/40 transition-all duration-500">
                            <div className="aspect-[16/10] overflow-hidden relative">
                                <img
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
                                    alt="Penthouse"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="bg-slate-100/10 backdrop-blur text-slate-100 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-500/30">
                                        فرصة استراتيجية
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 bg-[#13191f]/60 backdrop-blur px-3 py-1 rounded-lg">
                                    <span className="text-slate-100 text-xs font-medium">
                                        $18.2M
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 space-y-6 text-right">
                                <h3 className="text-xl font-medium text-slate-100">
                                    بنتهاوس كوت دازور
                                </h3>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    وصول مباشر للشاطئ مع إطلالات 360 درجة ومهبط
                                    طائرات هليكوبتر خاص.
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                    <button className="text-[#c5a059] text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-3 transition-all">
                                        عرض الملف{" "}
                                        <span className="material-symbols-outlined">
                                            chevron_left
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* قسم التواصل مع الخبير الخاص */}
                    <section className="mt-20 py-12 border-t border-slate-800/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-[#0b1c2d] border border-slate-800 rounded-2xl p-8 lg:p-12 relative overflow-hidden text-right">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-[#c5a059]/5 rounded-full -ml-32 -mt-32 blur-3xl"></div>
                            <div className="space-y-4 max-w-xl z-10">
                                <h2 className="text-3xl font-light text-slate-100">
                                    تواصل مع خبيرك الخاص
                                </h2>
                                <p className="text-slate-400 font-light leading-relaxed">
                                    اتصال فوري لأعضاء VIP. احصل على تنبيهات في
                                    الوقت الفعلي للفرص قبل طرحها في السوق.
                                </p>
                            </div>
                            <div className="z-10 w-full md:w-auto">
                                <Link
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="w-full md:w-auto px-12 py-5 bg-[#c5a059] text-[#0b1c2d] rounded-xl text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform shadow-2xl shadow-[#c5a059]/20"
                                >
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>
                                    تسجيل الخروج الآمن
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                {/* تذييل الصفحة */}
                <footer className="border-t border-slate-800/30 py-12 px-6 lg:px-20 bg-[#13191f]">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 opacity-50">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-sm">
                                lock
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                                بوابة VIP الآمنة v2.4
                            </span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-600 tracking-widest uppercase">
                            © 2026 ELITE REAL ESTATE PORTFOLIO
                        </p>
                    </div>
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}

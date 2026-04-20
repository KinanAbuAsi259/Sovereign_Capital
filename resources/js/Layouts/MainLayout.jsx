import React, { useState } from "react";
import { Link } from "@inertiajs/react";

export default function MainLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div
            className="min-h-screen bg-[#13191f] text-slate-100 font-sans"
            dir="rtl"
        >
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-background-dark/80 backdrop-blur-sm border-b border-white/5">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* هنا نضيف الشعار على اليسار */}

                    {/* href="/assets/logo.png" */}
                    {/* الشعار على اليسار - تم استدعاؤه كصور */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 group transition-transform duration-300 hover:scale-130"
                    >
                        {/* استدعاء الأيقونة الذهبية */}
                        <img
                            src="/assets/logo.png"
                            alt="أيقونة Sovereign Capital"
                            // h-16 (64px) في الجوال و h-20 (80px) في الشاشات الأكبر
                            // يمكنك تجربة w-auto للحفاظ على أبعاد الشعار الأصلية
                            className="h-16 md:h-18 w-auto object-contain transition-transform hover:scale-105"
                        />

                        {/* تم دمج النص هنا ليكون داخل Link مباشرة */}
                        <div
                            className="flex flex-row md:flex-row gap-2 md:gap-3 text-[10px] sm:text-[12px] md:text-[15px] 
                font-black uppercase 
                tracking-[0.15em] md:tracking-[0.4em] 
                text-slate-400"
                        >
                            <span className="hover:text-accent cursor-pointer transition-colors duration-500">
                                Capital
                            </span>
                            <span className="hover:text-accent cursor-pointer transition-colors duration-500 ">
                                Sovereign
                            </span>
                        </div>
                    </Link>
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-4">
                        {[
                            { name: "من نحن", routeName: "about" },
                            { name: "آلية العمل", routeName: "workflow" },
                            { name: "الأمان", routeName: "security" },
                        ].map((item) => (
                            <Link
                                key={item.routeName}
                                href={route(item.routeName)}
                                className="px-4 py-1.5 border border-white/10 rounded-full bg-white/5 hover:border-accent/40 hover:text-accent transition-all text-[11px] font-bold uppercase tracking-wider"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("login")}
                            className="flex items-center justify-center gap-4 
            bg-accent text-[#0b1c2d] font-black 
            rounded-xl transition-all duration-300 
            hover:scale-105 hover:brightness-110
            /* --- تحكم بالأبعاد من هنا --- */
            w-[120px] h-[40px]   /* العرض والارتفاع الثابت */
            text-sm              /* حجم الخط */
            shadow-lg shadow-accent/20
        "
                        >
                            <span
                                className="material-symbols-outlined text-xl"
                                style={{
                                    transform: "scaleX(1.1)", // تمدد معقول (مره ونصف) لمنع التشويه
                                    display: "inline-block",
                                }}
                            >
                                vpn_key
                            </span>
                            <span className="tracking-tight">دخول</span>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 bg-[#0b1c2d] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4">
                        {["من نحن", "آلية العمل", "الأمان"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-slate-300 hover:text-accent py-3 border-b border-white/5 font-bold"
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <Link
                                href={route("login")}
                                className="text-center bg-accent text-[#0b1c2d] font-black py-3 rounded-xl text-sm"
                            >
                                دخول
                            </Link>
                        </div>
                    </nav>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-20 min-h-screen">{children}</main>

            {/* Footer */}
            <footer className="w-full py-8 px-6 border-t border-white/5 bg-[#0b1c2d]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* اللوجو أو اسم الشركة */}
                    <div className="text-slate-500 text-[10px] font-bold">
                        © 2026 SOVEREIGN CAPITAL
                    </div>

                    {/* الروابط الجديدة - في الجوال تظهر كأسفل الصفحة بشكل مرتب */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[11px] font-black uppercase tracking-[0.2em]">
                        <Link
                            href={route("about")}
                            className="text-slate-400 hover:text-accent transition-all duration-300"
                        >
                            من نحن
                        </Link>
                        <Link
                            href={route("workflow")}
                            className="text-slate-400 hover:text-accent transition-all duration-300"
                        >
                            آلية العمل
                        </Link>
                        <Link
                            href={route("security")}
                            className="text-slate-400 hover:text-accent transition-all duration-300"
                        >
                            الأمان
                        </Link>
                    </div>

                    {/* رقم الإصدار - يظهر فقط في الشاشات الكبيرة */}
                    <div className="hidden md:block text-slate-700 text-[9px] font-mono">
                        SYSTEM_VAULT_V2.5_STABLE
                    </div>
                </div>
            </footer>
        </div>
    );
}

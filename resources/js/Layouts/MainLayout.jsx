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
                            className="size-11 object-contain"
                        />

                        {/* تم دمج النص هنا ليكون داخل Link مباشرة */}
                        <div className="flex flex-row-reverse md:flex-row gap-2 md:gap-3 
                text-[10px] sm:text-[12px] md:text-[15px] 
                font-black uppercase 
                tracking-[0.15em] md:tracking-[0.4em] 
                text-slate-400">
    <span className="hover:text-accent cursor-pointer transition-colors duration-500">
        Sovereign
    </span>
    <span className="hover:text-accent cursor-pointer transition-colors duration-500 text-accent/50 md:text-slate-400">
        Capital
    </span>
</div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-4">
                        {["من نحن", "آلية العمل", "الأمان"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="px-4 py-1.5 border border-white/10 rounded-full bg-white/5 hover:border-accent/40 hover:text-accent transition-all text-[11px] font-bold uppercase tracking-wider"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3">
    {/* زر تسجيل الدخول - تم تعديله ليظهر في الجوال (نزعنا hidden) */}
    <Link
        href={route("login")}
        className="flex items-center gap-2 bg-accent text-[#0b1c2d] px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase hover:brightness-110 transition-all shadow-xl shadow-accent/10"
    >
        <span className="material-symbols-outlined text-sm">
            vpn_key
        </span>
        <span>دخول</span>
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
                            <Link
                                href={route("register")}
                                className="text-center border border-accent text-accent font-black py-3 rounded-xl text-sm"
                            >
                                تسجيل
                            </Link>
                        </div>
                    </nav>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-20 min-h-screen">{children}</main>

            {/* Footer */}
            <footer className="bg-[#0b1c2d] border-t border-white/5 py-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="space-y-4 text-center md:text-right">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-white font-bold text-lg">
                            <img
                                src="/assets/logo.jpg"
                                alt="أيقونة Sovereign Capital"
                                className="size-10 object-contain"
                            />
                            SOVEREIGN CAPITAL
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs relative z-10 p-5">
                            نكرس جهودنا لربط رأس المال العالمي بالفرص
                            الاستراتيجية الفاخرة.
                        </p>
                    </div>

                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
                        <span className="hover:text-accent cursor-pointer transition-colors">
                            Privacy
                        </span>
                        <span className="hover:text-accent cursor-pointer transition-colors">
                            Terms
                        </span>
                        <span className="hover:text-accent cursor-pointer transition-colors">
                            Vault v2.4
                        </span>
                    </div>

                    <p className="text-[10px] font-medium text-slate-500 tracking-widest uppercase">
                        © 2026 Sovereign Capital Luxe
                    </p>
                </div>
            </footer>
        </div>
    );
}

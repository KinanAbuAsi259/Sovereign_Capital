import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Authenticated({ user, header, children, setViewMode, setIsAddBrokerOpen}) {
    // const isAdmin = user?.role === 'admin';
    const { auth } = usePage().props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#13191f] font-sans" dir="rtl">
            {/* البرواز الذهبي المحيط بالصفحة مع تأثير البريق */}
            <div className="fixed inset-0 pointer-events-none z-[100] border-[1px] border-accent/30 m-1">
                {/* تأثير البريق المتحرك */}
                <style>{`
        @keyframes shine {
            0% { top: -100%; left: -100%; }
            50% { top: 100%; left: 100%; }
            100% { top: 100%; left: 100%; }
        }
        .shimmer-effect {
            position: absolute;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                45deg,
                transparent 45%,
                rgba(197, 160, 89, 0.4) 50%,
                transparent 55%
            );
            // animation: shine 6s infinite linear;
        }
    `}</style>
                <div className="shimmer-effect"></div>

                {/* الإطار الداخلي الثابت لتعزيز الفخامة */}
                <div className="absolute inset-0 border-[3px] border-accent/10 m-[2px]"></div>
                <div className="absolute inset-0 border-[1px] border-accent/60 m-[1px]"></div>
            </div>
            {/* البرواز الذهبي المحيط بالصفحة (Fixed Frame) */}
            <div className="fixed inset-0 pointer-events-none z-[100] border-[3px] border-accent/10">
                <div className="absolute inset-0 border-[1px] border-accent/80 m-[2px]"></div>
            </div>
            {/* الشريط العلوي - الترتيب الجديد */}
            <div className="fixed inset-0 pointer-events-none z-[100] border-[4px] border-accent/20">
                <div className="absolute inset-0 border-[1px] border-accent/40 m-[2px]"></div>
            </div>

            {/* خلفية حيوية (Ambient Glow) */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

            <header className="fixed top-1 z-50 w-[calc(100%-10px)] right-[5px] border-b border-white/5 bg-[#13191f]/60 backdrop-blur-xl px-4 lg:px-10 py-4 flex flex-row items-center justify-between shadow-2xl rounded-2xl">
                {/* 1. زر القائمة الذهبي (أصبح الآن في أقصى اليمين بفضل flex-row-reverse) */}
                <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b1c2d] border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0b1c2d] transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] group active:scale-90"
                >
                    <span className="material-symbols-outlined font-black transition-transform group-hover:rotate-180">
                        menu
                    </span>
                </button>

                {/* 2. شعار الموقع أو اسم المستخدم (سيصبح تلقائياً في اليسار) */}
                <div className="flex items-center gap-4">
                    {/* يمكنك وضع اللوغو هنا أو اسم اللوحة */}
                    {/* استدعاء الأيقونة الذهبية */}
                    <img
                        src="/assets/logo.jpg"
                        alt="أيقونة Sovereign Capital"
                        className="size-11 object-contain"
                    />
                    <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.3em] hidden sm:block">
                        Sovereign Admin Panel
                    </span>
                </div>
            </header>

            {/* الـ Drawer الجانبي */}
            <div
                className={`fixed inset-0 z-[100] transition-all duration-500 ${isDrawerOpen ? "visible" : "invisible"}`}
            >
                {/* Overlay: خلفية ضبابية تغلق القائمة عند الضغط عليها */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsDrawerOpen(false)}
                ></div>

                {/* القائمة الجانبية: استخدام fixed لضمان عدم تحركها مع الصفحة */}
                <div
                    className={`absolute right-0 top-0 h-full w-[280px] md:w-80 bg-[#0b1c2d] border-l border-white/5 shadow-2xl transition-transform duration-500 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <div className="p-8 flex flex-col h-full text-white overflow-y-auto">
                        {/* زر الإغلاق العلوي */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-white/50 hover:text-white transition-colors p-2"
                            >
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </button>
                        </div>

                        {/* القسم الدائري الفخم */}
                        <div className="flex flex-col items-center mb-8 space-y-4 shrink-0">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl"></div>
                                <div className="relative h-24 w-24 rounded-full bg-primary border-2 border-accent/40 flex items-center justify-center overflow-hidden">
                                    <div className="shimmer-effect opacity-30"></div>
                                    <span className="material-symbols-outlined text-4xl text-accent font-light">
                                        {auth.user?.role === "broker"
                                            ? "handshake"
                                            : "diamond"}
                                    </span>
                                </div>
                                <div className="absolute bottom-1 right-1 h-5 w-5 bg-[#13191f] rounded-full flex items-center justify-center">
                                    <div className="h-3 w-3 bg-green-500 rounded-full border border-primary"></div>
                                </div>
                            </div>

                            <div className="text-center space-y-3">
                                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
                                    {auth.user.name}
                                </h3>
                                <div className="inline-block px-4 py-1 rounded-full bg-accent/10 border border-accent/20">
                                    <p className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">
                                        {auth.user.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* الروابط التنقلية */}
                        {/* resources/js/Layouts/AuthenticatedLayout.jsx */}

<nav className="space-y-4 flex-1">
    {/* رابط مشترك: جدول الطلبات */}
    {user?.role === 'broker' && (
        <Link
        href={route("broker.dashboard")}
        className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
            route().current("broker.dashboard") ? "bg-[#d4af37] text-[#0b1c2d]" : "hover:bg-white/5 text-white"
        }`}
    >
        <span className="material-symbols-outlined font-bold">dashboard_customize</span>
        <span className="text-sm font-medium">جدول العمليات</span>
    </Link>
    )}

    {/* 2. زر العودة لوحة الإدارة (يظهر فقط للأدمن) */}
    {user?.role === 'admin' && (
        <Link
            href={route("admin.dashboard")} // تأكد أن هذا هو اسم مسار الأدمن (الذي كان فيه bdashboard)
            className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
                route().current("admin.dashboard") ? "bg-[#d4af37] text-[#0b1c2d]" : "hover:bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
            }`}
        >
            <div className="h-8 w-8 rounded-lg bg-[#d4af37]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm font-black">admin_panel_settings</span>
            </div>
            <span className="text-sm font-black uppercase tracking-tighter">اللوحة الإدارية</span>
        </Link>
    )}

    

    {/* فاصل مرئي */}
    <div className="h-[1px] bg-white/5 my-4"></div>



    {/* --- خيارات مخصصة للأدمن فقط --- */}
    {user?.role === 'admin' && (
        <>
            <div className="h-[1px] bg-white/5 my-4 mx-2"></div>
            <p className="text-[10px] text-white/20 font-black uppercase px-4 tracking-[0.2em]">الإدارة العليا</p>
            
            {/* زر إدارة الصلاحيات (السيادي) */}
            <button
                onClick={() => setViewMode("admin")}
                className="w-full group flex items-center gap-4 p-4 rounded-[1.5rem] bg-[#d4af37]/5 border border-[#d4af37]/10 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10 transition-all relative overflow-hidden shadow-xl"
            >
                <div className="h-10 w-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0b1c2d] transition-all duration-500 shadow-inner">
                    <span className="material-symbols-outlined text-lg font-black transition-transform group-hover:rotate-[360deg] duration-700">
                        security
                    </span>
                </div>
                <div className="flex flex-col items-start relative z-10">
                    <span className="text-white font-black text-[11px] uppercase tracking-wider group-hover:text-[#d4af37]">إدارة الوسطاء</span>
                    <span className="text-white/30 text-[8px] font-medium tracking-tight">Access Control</span>
                </div>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-[#d4af37] text-[#0b1c2d] text-[7px] font-black rounded-full">Pro</span>
            </button>

            {/* زر إضافة وسيط */}
            <button 
                onClick={() => setIsAddBrokerOpen(true)}
                className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-emerald-500/10 text-emerald-400 border border-transparent hover:border-emerald-500/20 transition-all group"
            >
                <div className="h-10 w-10 rounded-xl bg-emerald-500/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                </div>
                <span className="text-sm font-bold">إضافة وسيط جديد</span>
            </button>
        </>
    )}
    {/* 3. إدارة البيانات الشخصية (مشترك) */}
    <Link
        href={route("profile.edit")}
        className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
            route().current("profile.edit") ? "bg-[#d4af37] text-[#0b1c2d]" : "hover:bg-white/5 text-white"
        }`}
    >
        <span className="material-symbols-outlined">manage_accounts</span>
        <span className="text-sm font-medium">إعدادات الحساب</span>
    </Link>

    {/* خط فاصل قبل تسجيل الخروج */}
    <div className="h-[1px] bg-white/5 my-6"></div>

    <Link
        method="post"
        href={route("logout")}
        as="button"
        className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-rose-500/10 text-rose-500 border border-transparent hover:border-rose-500/20 transition-all text-right group"
    >
        <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">
            logout
        </span>
        <span className="text-sm font-black uppercase tracking-widest">إنهاء الجلسة</span>
    </Link>
</nav>
                    </div>
                </div>
            </div>

            {/* المحتوى الرئيسي المتجاوب */}
            <main className="pt-24 px-4 md:px-0 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}

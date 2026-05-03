import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function VisitorDataView({
    auth,
    visitors,
    totalVisitorsCount,
}) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="سجل الزوار - التتبع السيادي" />

            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* الهيدر العلوي */}
                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
                        <div className="text-right">
                            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                                سجل حركة الزوار
                            </h2>
                            <p className="text-accent-gold/60 text-sm font-medium text-white">
                                البيانات الجيوسياسية والتقنية لزوار المنصة
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-[2rem] shadow-xl backdrop-blur-sm">
                            <div className="text-[10px] text-accent-gold uppercase tracking-widest text-white mb-1">
                                إجمالي الزيارات
                            </div>
                            <div className="text-2xl text-white text-white">
                                {totalVisitorsCount.toLocaleString()}{" "}
                                {/* سيظهر الرقم كاملاً مثل 1,250 */}
                            </div>
                        </div>
                    </div>

                    {/* الحاوية الملكية للجدول */}
                    <div className="bg-[#0b1c2d] border border-accent-gold/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="sticky top-0 z-10 bg-gradient-to-l from-[#d4af37] via-[#f2d472] to-[#d4af37] text-[#0b1c2d] uppercase text-[13px] md:text-[15px] font-black tracking-[0.15em] shadow-xl">
                                        <th className="p-6 border-b border-black/5">
                                            الموقع الجغرافي
                                        </th>
                                        <th className="p-6 border-b border-black/5 text-center">
                                            عنوان IP
                                        </th>
                                        <th className="p-6 border-b border-black/5">
                                            النشاط والمسار
                                        </th>
                                        <th className="p-6 border-b border-black/5">
                                            بيانات المتصفح
                                        </th>
                                        <th className="p-6 border-b border-black/5 text-left">
                                            التوقيت والوقت
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {visitors.data.map((visitor) => (
                                        <tr
                                            key={visitor.id}
                                            className="hover:bg-white/[0.03] transition-all group duration-300"
                                        >
                                            {/* الموقع */}
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-[#0b1c2d] transition-all shadow-inner">
                                                        <span className="material-symbols-outlined text-lg">
                                                            public
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold text-sm mb-0.5">
                                                            {visitor.country ||
                                                                "غير محدد"}
                                                        </div>
                                                        <div className="text-accent-gold/50 text-white text-[11px] font-medium uppercase tracking-wider">
                                                            {visitor.city ||
                                                                "نطاق غير معروف"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* الـ IP */}
                                            <td className="p-6 text-center">
                                                <span className="bg-white/5 border border-white/10 text-white font-mono text-xs px-4 py-2 rounded-full shadow-inner tracking-wider">
                                                    {visitor.ip_address}
                                                </span>
                                            </td>

                                            {/* المسار */}
                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-slate-300 text-xs font-medium dir-ltr inline-block text-right overflow-hidden text-ellipsis max-w-[250px]">
                                                        {visitor.page_visited.replace(
                                                            window.location
                                                                .origin,
                                                            "",
                                                        ) || "/الرئيسية"}
                                                    </span>
                                                </div>
                                            </td>
                                            {/* المسار */}
                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-slate-300 text-xs font-medium dir-ltr inline-block text-right overflow-hidden text-ellipsis max-w-[250px]">
                                                        {visitor.user_agent
                                                            ? visitor.user_agent.substring(
                                                                  0,
                                                                  50,
                                                              ) + "..."
                                                            : "Unknown Browser"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* التوقيت */}
                                            <td className="p-6 text-left">
                                                <div className="flex flex-col items-end">
                                                    <div className="text-white font-black text-sm mb-1">
                                                        {new Date(
                                                            visitor.created_at,
                                                        ).toLocaleDateString(
                                                            "ar-SY",
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-accent-gold/60 font-bold text-[10px] text-white">
                                                        <span className="material-symbols-outlined text-xs text-white">
                                                            schedule
                                                        </span>
                                                        {new Date(
                                                            visitor.created_at,
                                                        ).toLocaleTimeString(
                                                            "ar-SY",
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* روابط التنقل بين الصفحات */}
                        {/* نظام التنقل الملكي */}
                        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 pb-10">
                            {visitors.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    // لتنظيف الكلمات مثل "Next" و "Previous" من أي رموز إضافية
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                                        link.active
                                            ? "bg-gradient-to-r from-[#d4af37] to-[#f2d472] text-[#0b1c2d] border-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                            : "bg-[#0b1c2d]/50 text-slate-400 border-white/10 hover:border-accent-gold/40 hover:text-white"
                                    } ${!link.url ? "opacity-30 cursor-not-allowed hidden" : ""}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

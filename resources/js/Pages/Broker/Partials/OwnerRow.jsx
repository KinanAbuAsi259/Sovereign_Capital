// resources/js/Pages/Broker/Partials/OwnerRow.jsx
import React from "react";

const OwnerRow = ({ item, onUpdate, setSelectedMedia }) => {
    // if (!owners) return <div className="text-white">جاري تحميل بيانات المالك...</div>;
    return (
        <tr className="hover:bg-white/[0.02] transition-all group border-b border-white/5">
            {/* 1. الاسم والتاريخ */}
            <td className="p-6">
                <div className="font-black text-white text-[15px] group-hover:text-[#d4af37] transition-colors">
                    {item.name}
                </div>
                <div className="text-white/30 text-[10px] mt-1 font-mono uppercase tracking-tighter">
                    {new Date(item.created_at).toLocaleDateString("ar-EG")}
                </div>
            </td>

            {/* 2. الهاتف والمحافظة */}
            <td className="p-6">
                <div
                    className="font-bold text-[#d4af37] tracking-widest"
                    dir="ltr"
                >
                    {item.phone}
                </div>
                <div className="text-white/40 text-[11px] mt-1 italic">
                    {item.governorate}
                </div>
            </td>

            {/* 3. تفاصيل العقار */}
            <td className="p-6">
                <div className="text-white text-[13px] font-bold">
                    {item.property_type}
                </div>
                <div className="text-white/40 text-[11px] mt-1">
                    {item.location} —{" "}
                    <span className="text-[#d4af37]/60">{item.area} م²</span>
                </div>
            </td>

            {/* 4. الوسائط */}

            <td className="p-3 md:p-6 text-center">
                <div className="flex justify-center items-center gap-3">
                    {item.media && item.media.length > 0 ? (
                        <button
                            onClick={() => setSelectedMedia(item.media)}
                            className="flex flex-col items-center group outline-none"
                        >
                            <span className="material-symbols-outlined text-2xl text-[#d4af37] animate-pulse group-hover:scale-125 transition-all">
                                grid_view
                            </span>
                            <span className="text-[10px] text-[#d4af37] font-bold mt-1">
                                {item.media.length} وسائط
                            </span>
                        </button>
                    ) : (
                        <span className="material-symbols-outlined text-xl text-white/5">
                            image_not_supported
                        </span>
                    )}
                </div>
            </td>

            {/* 5. حالة التواصل (تفاعلية) */}
            <td className="p-6 text-center">
                <button
                    onClick={() => onUpdate(item.id, "owner")}
                    className={`px-5 py-2 rounded-full text-[10px] font-black transition-all duration-500 border ${
                        item.status === "تم التواصل"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                    }`}
                >
                    {item.status}
                </button>
            </td>

            {/* 6. إجراء الاتصال السريع */}
            <td className="p-6 text-center">
                <div className="flex items-center justify-center gap-2">
                    {/* زر الواتساب الفني */}
                    <a
                        href={`https://wa.me/${item.phone.replace("+", "")}?text=${encodeURIComponent(`تحية طيبة، أنا الوسيط من Sovereign Capital، أتواصل معك بخصوص طلبك لـ ${item.property_type || "العقار"}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/wa flex items-center justify-center p-2 rounded-full hover:bg-green-500/10 transition-colors"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 fill-[#25D366] group-hover/wa:scale-110 transition-transform"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.391.079 11.99c0 2.112.553 4.177 1.604 6.012L0 24l6.163-1.617a11.831 11.831 0 005.883 1.576h.004c6.603 0 11.97-5.392 11.973-11.991a11.85 11.85 0 00-3.414-8.475z" />
                        </svg>
                    </a>

                    {/* زر الاتصال التقليدي */}
                    <a
                        href={`tel:${item.phone}`}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-[#d4af37] hover:text-[#0b1c2d] transition-all duration-300"
                        title="اتصال هاتفي"
                    >
                        <span className="material-symbols-outlined text-sm">
                            call
                        </span>
                    </a>
                </div>
            </td>
        </tr>
    );
};

export default OwnerRow;

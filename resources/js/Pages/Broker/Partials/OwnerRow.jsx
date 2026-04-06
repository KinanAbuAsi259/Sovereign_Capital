// resources/js/Pages/Broker/Partials/OwnerRow.jsx
import React from 'react';

const OwnerRow = ({ item, onUpdate }) => {
    return (
        <tr className="hover:bg-white/[0.02] transition-all group border-b border-white/5">
            {/* 1. الاسم والتاريخ */}
            <td className="p-6">
                <div className="font-black text-white text-[15px] group-hover:text-[#d4af37] transition-colors">{item.name}</div>
                <div className="text-white/30 text-[10px] mt-1 font-mono uppercase tracking-tighter">
                    {new Date(item.created_at).toLocaleDateString('ar-EG')}
                </div>
            </td>

            {/* 2. الهاتف والمحافظة */}
            <td className="p-6">
                <div className="font-bold text-[#d4af37] tracking-widest" dir="ltr">{item.phone}</div>
                <div className="text-white/40 text-[11px] mt-1 italic">{item.governorate}</div>
            </td>

            {/* 3. تفاصيل العقار */}
            <td className="p-6">
                <div className="text-white text-[13px] font-bold">{item.property_type}</div>
                <div className="text-white/40 text-[11px] mt-1">
                    {item.location} — <span className="text-[#d4af37]/60">{item.area} م²</span>
                </div>
            </td>

            {/* 4. الوسائط */}
            <td className="p-6 text-center">
                <div className="flex justify-center">
                    <span className={`material-symbols-outlined text-xl ${item.media?.length > 0 ? 'text-[#d4af37] animate-pulse' : 'text-white/10'}`}>
                        {item.media?.length > 0 ? 'gallery_thumbnail' : 'hide_image'}
                    </span>
                </div>
            </td>

            {/* 5. حالة التواصل (تفاعلية) */}
            <td className="p-6 text-center">
                <button 
                    onClick={() => onUpdate(item.id, 'owner')}
                    className={`px-5 py-2 rounded-full text-[10px] font-black transition-all duration-500 border ${
                        item.status === 'تم التواصل' 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
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
            href={`https://wa.me/${item.phone.replace('+', '')}?text=${encodeURIComponent(`تحية طيبة، أنا الوسيط من Sovereign Capital، أتواصل معك بخصوص طلبك لـ ${item.property_type || 'العقار'}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group/wa w-10 h-10 rounded-xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-lg hover:shadow-emerald-500/20"
            title="تواصل عبر واتساب"
        >
            <span className="material-symbols-outlined text-sm group-hover/wa:scale-110 transition-transform">
                chat
            </span>
        </a>

        {/* زر الاتصال التقليدي */}
        <a 
            href={`tel:${item.phone}`} 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 hover:bg-[#d4af37] hover:text-[#0b1c2d] transition-all duration-300"
            title="اتصال هاتفي"
        >
            <span className="material-symbols-outlined text-sm">call</span>
        </a>
    </div>
</td>
        </tr>
    );
};

export default OwnerRow;
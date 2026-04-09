import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import OwnerRow from "./Partials/OwnerRow";
import InvestorRow from "./Partials/InvestorRow";
import CustomerRow from "./Partials/CustomerRow";

export default function BrokerDashboard({
    auth,
    owners,
    investors,
    customers,
}) {
    const [activeTab, setActiveTab] = useState("owners");
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [viewMode, setViewMode] = useState("text");
    const [showCopyNotify, setShowCopyNotify] = useState(false);

    const showToast = () => {
        setShowCopyNotify(true);
        setTimeout(() => setShowCopyNotify(false), 3000); // يختفي بعد 3 ثوانٍ
    };

    // أضف هذه الدالة داخل المكون الرئيسي BrokerDashboard
    const copyToClipboard = (item) => {
        // 1. تحديد نوع الطلب وتفاصيله بشكل ديناميكي
        let typeLabel = "";
        let details = "";

        if (activeTab === "owners") {
            typeLabel = "عرض بيع (بائع)";
            details = item.additional_details || "لا يوجد تفاصيل إضافية";
        } else if (activeTab === "investors") {
            typeLabel = "طلب استثمار (مستثمر)";
            details = item.investment_goal || "لا يوجد هدف استثماري محدد";
        } else if (activeTab === "customers") {
            typeLabel = "طلب شراء (زبون)";
            details = item.additional_details || "لا يوجد مواصفات مطلوبة";
        }

        // 2. تنسيق النص المنسوخ الفخم
        const textToCopy = `✨ Sovereign Capital | ${typeLabel} ✨
-------------------------------
👤 الاسم: ${item.name}
📞 الهاتف: ${item.phone}
📍 المحافظة: ${item.governorate}
🏠 النوع: ${item.property_type || "غير محدد"}
📏 المساحة/الميزانية: ${item.area || item.capital_range || "غير محدد"}
🗺️ الموقع: ${item.location}
💬 التفاصيل/الهدف: ${details}
📊 الحالة: ${item.status}
-------------------------------
✅ تم النسخ من لوحة عمليات الوسيط`;

        // 3. تنفيذ عملية النسخ (مع الخطة البديلة)
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textToCopy).then(() => showToast());
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy");
                showToast();
            } catch (err) {
                alert("عذراً، فشل النسخ التلقائي");
            }
            document.body.removeChild(textArea);
        }
    };

    // تحديد البيانات النشطة بناءً على التبويب
    const getCurrentData = () => {
        if (activeTab === "owners") return owners?.data || owners || [];
        if (activeTab === "investors")
            return investors?.data || investors || [];
        return customers?.data || customers || [];
    };

    const currentData = getCurrentData();
    // دالة تحديث الحالة (تم التواصل / لم يتم التواصل)
    const handleStatusUpdate = (id, type) => {
        router.post(
            route("admin.updateStatus", { id, type }),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // تمرير الأيقونات والتبويبات الخاصة بالوسيط فقط للـ Drawer
            sidebarItems={[
                {
                    id: "owners",
                    label: "عقارات المالك",
                    icon: "real_estate_agent",
                },
                {
                    id: "investors",
                    label: "طلبات المستثمرين",
                    icon: "monitoring",
                },
                {
                    id: "customers",
                    label: "طلبات الزبائن",
                    icon: "person_search",
                },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            <Head title="لوحة العمليات - الوسيط" />

            <div
                className="py-12 bg-[#050c14] min-h-screen text-right"
                dir="rtl"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* تبديل وضع العرض */}
                    <div className="flex justify-between items-center mb-8 bg-[#0b1c2d] p-2 rounded-2xl border border-white/5">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setViewMode("text")}
                                className={`px-6 py-2 rounded-xl font-bold transition-all ${viewMode === "text" ? "bg-[#d4af37] text-[#0b1c2d]" : "text-white/60 hover:text-white"}`}
                            >
                                <span className="material-symbols-outlined align-middle ml-2">
                                    description
                                </span>
                                عرض النصوص
                            </button>
                            <button
                                onClick={() => setViewMode("table")}
                                className={`px-6 py-2 rounded-xl font-bold transition-all ${viewMode === "table" ? "bg-[#d4af37] text-[#0b1c2d]" : "text-white/60 hover:text-white"}`}
                            >
                                <span className="material-symbols-outlined align-middle ml-2">
                                    table_chart
                                </span>
                                عرض الجدول
                            </button>
                        </div>
                    </div>

                    {/* هيدر الصفحة المطوّر */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8">
                        <div className="flex items-center gap-4 md:gap-6 w-full">
                            <div className="bg-[#d4af37] p-2.5 md:p-4 rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(212,175,55,0.15)] shrink-0">
                                <span className="material-symbols-outlined text-[#0b1c2d] text-xl md:text-3xl font-black">
                                    {activeTab === "owners"
                                        ? "real_estate_agent"
                                        : activeTab === "investors"
                                          ? "monitoring"
                                          : "person_search"}
                                </span>
                            </div>

                            <div>
                                <h1 className="text-xl md:text-3xl font-black text-white italic tracking-tighter leading-tight">
                                    إدارة{" "}
                                    <span className="text-[#d4af37]">
                                        {activeTab === "owners"
                                            ? "عقارات المالك"
                                            : activeTab === "investors"
                                              ? "طلبات المستثمرين"
                                              : "طلبات الزبائن"}
                                    </span>
                                </h1>
                                <p className="text-white/30 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-0.5">
                                    Operational Control Center
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className="flex flex-wrap gap-4 p-2 bg-[#0b1c2d]/50 backdrop-blur-md rounded-2xl border border-white/10 w-fit mb-8">
                        <TabButton
                            active={activeTab === "owners"}
                            onClick={() => setActiveTab("owners")}
                            label="عروض البائعين"
                            count={owners.length}
                            icon="sell"
                        />
                        <TabButton
                            active={activeTab === "investors"}
                            onClick={() => setActiveTab("investors")}
                            label="طلبات المستثمرين"
                            count={investors.length}
                            icon="account_balance"
                        />
                        <TabButton
                            active={activeTab === "customers"}
                            onClick={() => setActiveTab("customers")}
                            label="طلبات الزبائن"
                            count={customers.length}
                            icon="shopping_cart"
                        />
                    </div>

                    {/* المحتوى الديناميكي */}
                    {viewMode === "text" ? (
                        /* --- نمط عرض النصوص (البطاقات الفخمة) --- */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentData.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#0b1c2d] border border-[#d4af37]/20 rounded-[2rem] p-8 relative group hover:border-[#d4af37]/50 transition-all shadow-2xl"
                                >
                                    {/* زر النسخ */}
                                    <button
                                        onClick={() => copyToClipboard(item)}
                                        className="absolute top-6 left-6 text-[#d4af37] hover:scale-125 transition-all bg-[#d4af37]/10 p-2 rounded-xl border border-[#d4af37]/20 active:bg-[#d4af37] active:text-[#0b1c2d]"
                                        title="نسخ البيانات"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            content_copy
                                        </span>
                                    </button>

                                    <div className="space-y-3 text-slate-200">
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                الاسم:
                                            </span>{" "}
                                            {item.name}
                                        </p>
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                رقم الهاتف:
                                            </span>{" "}
                                            {item.phone}
                                        </p>
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                المحافظة:
                                            </span>{" "}
                                            {item.governorate}
                                        </p>
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                نوع العقار:
                                            </span>{" "}
                                            {item.property_type}
                                        </p>
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                الموقع:
                                            </span>{" "}
                                            {item.location}
                                        </p>
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                المساحة/الميزانية:
                                            </span>{" "}
                                            {item.area || item.capital_range}
                                        </p>
                                        <p>
                                            <span className="text-[#d4af37] font-bold ml-2">
                                                حالة التواصل:
                                            </span>
                                            <span className="mr-2 px-3 py-1 rounded-full bg-white/5 text-[12px]">
                                                {item.status}
                                            </span>
                                        </p>
                                    </div>

                                    {/* أزرار الإجراءات السريعة في الكرت */}
                                    <div className="mt-6 pt-6 border-t border-white/5 flex gap-4">
                                        <button
                                            onClick={() =>
                                                setSelectedMedia(item.media)
                                            }
                                            className="text-[#d4af37] text-sm font-bold flex items-center"
                                        >
                                            <span className="material-symbols-outlined ml-1">
                                                grid_view
                                            </span>{" "}
                                            الوسائط
                                        </button>
                                        <a
                                            href={`https://wa.me/${item.phone?.replace("+", "")}`}
                                            target="_blank"
                                            className="text-green-500 text-sm font-bold flex items-center"
                                        >
                                            <span className="material-symbols-outlined ml-1">
                                                chat
                                            </span>{" "}
                                            واتساب
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* --- نمط عرض الجدول الذهبي الملكي --- */
                        <div className="bg-[#0b1c2d] border border-[#d4af37]/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                            <div className="overflow-x-auto">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="sticky top-0 z-10 bg-gradient-to-l from-[#d4af37] via-[#f2d472] to-[#d4af37] text-[#0b1c2d] uppercase text-[12px] md:text-[14px] font-bold tracking-normal md:tracking-[0.1em] shadow-xl">
                                            <th className="p-3 md:p-6 border-b border-black/5 whitespace-nowrap">
                                                الاسم / التاريخ
                                            </th>
                                            <th className="p-3 md:p-6 border-b border-black/5 whitespace-nowrap">
                                                الهاتف / المحافظة
                                            </th>
                                            {activeTab === "owners" && (
                                                <th className="p-6 border-b border-black/5">
                                                    نوع العقار / الموقع /
                                                    المساحة
                                                </th>
                                            )}
                                            {activeTab === "investors" && (
                                                <>
                                                    <th className="p-6 border-b border-black/5">
                                                        الميزانية / الهدف
                                                    </th>
                                                    <th className="p-6 border-b border-black/5 text-center">
                                                        المساحة المطلوبة
                                                    </th>
                                                </>
                                            )}
                                            {activeTab === "customers" && (
                                                <th className="p-6 border-b border-black/5">
                                                    طلب الزبون / الموقع
                                                </th>
                                            )}
                                            <th className="p-6 border-b border-black/5 text-center">
                                                الوسائط
                                            </th>
                                            <th className="p-6 border-b border-black/5 text-center">
                                                حالة التواصل
                                            </th>
                                            <th className="p-6 border-b border-black/5 text-center">
                                                الإجراء
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-white text-[15px] divide-y divide-white/5">
                                        {activeTab === "owners" &&
                                            (owners?.data || owners || []).map(
                                                (owner) => (
                                                    <OwnerRow
                                                        key={owner.id}
                                                        item={owner}
                                                        setSelectedMedia={
                                                            setSelectedMedia
                                                        }
                                                        onUpdate={
                                                            handleStatusUpdate
                                                        }
                                                    />
                                                ),
                                            )}
                                        {activeTab === "investors" &&
                                            investors.map((item) => (
                                                <InvestorRow
                                                    key={item.id}
                                                    item={item}
                                                    onUpdate={
                                                        handleStatusUpdate
                                                    }
                                                />
                                            ))}
                                        {activeTab === "customers" &&
                                            customers.map((item) => (
                                                <CustomerRow
                                                    key={item.id}
                                                    item={item}
                                                    onUpdate={
                                                        handleStatusUpdate
                                                    }
                                                />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* مودال الوسائط */}
                {selectedMedia && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                        <div className="bg-[#0b1c2d] border border-[#d4af37]/30 rounded-[2rem] max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                <h3 className="text-[#d4af37] font-bold">
                                    معرض الوسائط المرفوعة
                                </h3>
                                <button
                                    onClick={() => setSelectedMedia(null)}
                                    className="text-white hover:text-[#d4af37]"
                                >
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                                {selectedMedia.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video"
                                    >
                                        {file.file_type === "video" ? (
                                            <video
                                                src={`/storage/${file.file_path}`}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        ) : (
                                            <img
                                                src={`/storage/${file.file_path}`}
                                                className="w-full h-full object-cover"
                                                alt="Property"
                                            />
                                        )}
                                        <a
                                            href={`/storage/${file.file_path}`}
                                            download
                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-white text-3xl">
                                                download
                                            </span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* إشعار النسخ الذهبي */}
            {showCopyNotify && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000] animate-bounce">
                    <div className="bg-gradient-to-r from-[#d4af37] to-[#f2d472] text-[#0b1c2d] px-10 py-4 rounded-2xl font-black shadow-[0_15px_50px_rgba(212,175,55,0.3)] flex items-center gap-3 border border-white/30">
                        <span className="material-symbols-outlined font-black">
                            content_paste_go
                        </span>
                        تم نسخ بيانات الـ
                        {activeTab === "owners"
                            ? "بائع"
                            : activeTab === "investors"
                              ? "مستثمر"
                              : "زبون"}{" "}
                        بنجاح!
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
const TabButton = ({ active, onClick, label, count, icon }) => (
    <button
        onClick={onClick}
        className={`
            relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 group
            ${
                active
                    ? "bg-accent text-[#0b1c2d] shadow-lg shadow-accent/20 scale-105"
                    : "bg-white/5 text-accent hover:bg-white/10 animate-gold-pulse"
            }
        `}
    >
        {/* الأيقونة الذهبية */}
        <span
            className={`
            material-symbols-outlined text-xl transition-transform duration-300 group-hover:scale-110
            ${active ? "text-[#0b1c2d]" : "text-accent"}
        `}
        >
            {icon}
        </span>

        {/* النص */}
        <span className="font-black text-xs uppercase tracking-wider">
            {label}
        </span>

        {/* العداد */}
        <span
            className={`
            px-2 py-0.5 rounded-md text-[10px] font-bold
            ${active ? "bg-[#0b1c2d]/10 text-[#0b1c2d]" : "bg-accent/20 text-accent"}
        `}
        >
            {count}
        </span>

        {/* خط توهج سفلي عند التفعيل */}
        {active && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-accent blur-sm rounded-full" />
        )}
    </button>
);

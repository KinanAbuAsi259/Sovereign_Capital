import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm, usePage } from "@inertiajs/react";

const StatusBadge = ({ status }) => (
    <span
        className={`px-4 py-1.5 rounded-full text-[10px] font-black border tracking-widest uppercase transition-all duration-500
        ${
            status === "تم التواصل"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
        }`}
    >
        {status}
    </span>
);

// 2. مكونات الصفوف (Rows)
const OwnerRow = ({ item, onUpdate, setSelectedMedia }) => (
    <tr className="hover:bg-white/[0.02] text-[15px] transition-all duration-300 group border-b border-white/5 last:border-0">
        <td className="p-6">
            <div className="font-black text-white text-[15px] tracking-tight">
                {item.name}
            </div>
            <div className="text-accent-gold/40 text-[10px] mt-1">
                {item.created_at}
            </div>
        </td>
        <td className="p-6">
            <div className="text-white font-bold text-[15px] mb-1">
                {item.phone}
            </div>
            <div className="text-white/30 text-[12px]">{item.governorate}</div>
        </td>
        <td className="p-6">
            <div className="bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                <div className="text-accent-gold font-black text-[15px]">
                    نوع: {item.property_type}
                </div>
                <div className="text-white/50 text-[12px]">
                    الموقع: {item.location} | {item.area} م²
                </div>
            </div>
        </td>
        <td className="p-6 text-center">
            {item.media?.length > 0 ? (
                <button
                    onClick={() => setSelectedMedia(item.media)}
                    className="bg-[#d4af37]/10 p-2 rounded-xl border border-[#d4af37]/20 text-[#d4af37] hover:scale-110 transition-transform"
                >
                    <span className="material-symbols-outlined text-xl">
                        grid_view
                    </span>
                </button>
            ) : (
                <span className="text-white/10 text-[10px]">بلا وسائط</span>
            )}
        </td>
        <td className="p-6 text-center">
            <button
                onClick={() => onUpdate(item.id, "owner")}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/40 hover:bg-accent-gold hover:text-primary transition-all flex items-center justify-center mx-auto"
            >
                <span className="material-symbols-outlined text-lg">
                    sync_alt
                </span>
            </button>
        </td>
    </tr>
);
const InvestorRow = ({ item, onUpdate }) => (
    <tr className="hover:bg-white/[0.02] transition-all duration-300 border-b border-white/5 last:border-0 group">
        <td className="p-6 font-black text-white text-[15px]">{item.name}</td>
        <td className="p-6">
            <div className="text-white font-bold text-[15px]">{item.phone}</div>
            <div className="text-accent-gold/50 text-[12px] mt-1 italic">
                {item.governorate}
            </div>
        </td>
        <td className="p-6">
            <div className="bg-accent-gold/5 border border-accent-gold/10 p-3 rounded-2xl inline-block">
                <div className="text-accent-gold font-black text-[15px] underline decoration-accent-gold/30 underline-offset-4">
                    {item.capital_range}
                </div>
                <div className="text-white/40 text-[10px] mt-1 uppercase tracking-tighter italic">
                    الهدف: {item.investment_goal}
                </div>
            </div>
        </td>
        <td className="p-6 text-center text-white/80 font-bold text-[15px] tracking-widest">
            {item.area}{" "}
            <span className="text-[12px] text-white/30 font-normal">م²</span>
        </td>
        <td className="p-6 text-center text-white/10 italic text-[12px]">
            بلا ميديا
        </td>
        <td className="p-6 text-center">
            <StatusBadge status={item.status} />
        </td>
        <td className="p-6 text-center">
            <button
                onClick={() => onUpdate(item.id, "investor")}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/20 hover:bg-accent-gold hover:text-primary transition-all flex items-center justify-center mx-auto"
            >
                <span className="material-symbols-outlined text-sm">sync</span>
            </button>
        </td>
    </tr>
);

// 3. مكون سطر الزبون (Customer)
const CustomerRow = ({ item, onUpdate }) => (
    <tr className="hover:bg-white/[0.02] transition-all duration-300 border-b border-white/5 last:border-0 group">
        <td className="p-6 font-black text-white text-[15px] tracking-tight">
            {item.name}
        </td>
        <td className="p-6 text-white font-bold text-[15px]">
            {item.post}
            {item.phone}
            <div className="text-accent-gold/50 text-[12px] mt-1 italic">
                {item.governorate}
            </div>
        </td>
        <td className="p-6">
            <div className="text-accent-gold font-bold text-[15px] mb-1">
                يبحث عن: {item.property_type}
            </div>
            <div className="text-white/40 text-[12px]">
                في: {item.preferred_location}
            </div>
        </td>
        <td className="p-6 text-center text-white/80 font-bold text-[15px] italic">
            لا ميديا
        </td>
        <td className="p-6 text-center">
            <StatusBadge status={item.status} />
        </td>
        <td className="p-6 text-center">
            <button
                onClick={() => onUpdate(item.id, "customer")}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/20 hover:bg-accent-gold hover:text-primary transition-all flex items-center justify-center mx-auto"
            >
                <span className="material-symbols-outlined text-sm">
                    cached
                </span>
            </button>
        </td>
    </tr>
);
const countryCodes = [
    { code: "+963", label: "🇸🇾 SY", name: "سوريا" },
    { code: "+966", label: "🇸🇦 SA", name: "السعودية" },
    { code: "+971", label: "🇦🇪 AE", name: "الإمارات" },
    { code: "+965", label: "🇰🇼 KW", name: "الكويت" },
    { code: "+974", label: "🇶🇦 QA", name: "قطر" },
    { code: "+973", label: "🇧🇭 BH", name: "البحرين" },
    { code: "+968", label: "🇴🇲 OM", name: "عُمان" },
    { code: "+962", label: "🇯🇴 JO", name: "الأردن" },
    { code: "+961", label: "🇱🇧 LB", name: "لبنان" },
    { code: "+20", label: "🇪🇬 EG", name: "مصر" },
    { code: "+964", label: "🇮🇶 IQ", name: "العراق" },
    { code: "+90", label: "🇹🇷 TR", name: "تركيا" },
    { code: "+49", label: "🇩🇪 DE", name: "ألمانيا" },
    { code: "+44", label: "🇬🇧 GB", name: "بريطانيا" },
    { code: "+1", label: "🇺🇸 US", name: "أمريكا" },
    { code: "+33", label: "🇫🇷 FR", name: "فرنسا" },
    { code: "other", label: "🌐 أخرى", name: "دولة أخرى" }, // إضافة خيار أخرى
];

export default function BDashboard({
    data,
    auth,
    owners,
    investors,
    customers,
    all_brokers,
}) {
    console.log("البيانات المستلمة:", { investors, customers, owners });
    console.log("هل المستخدم أدمن؟", auth.isAdmin);
    console.log("البيانات القادمة من السيرفر:", {
        auth,
        owners,
        investors,
        customers,
        all_brokers,
    });
    const [activeTab, setActiveTab] = useState("owners");
    const [viewMode, setViewMode] = useState("data"); // 'data' or 'admin'
    const [isAddBrokerOpen, setIsAddBrokerOpen] = useState(false);
    const [displayType, setDisplayType] = useState("text"); // نوع العرض داخل البيانات (نص/جدول)
    const [showCopyNotify, setShowCopyNotify] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
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
✅ تم النسخ من لوحة العمليات `;

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
    // // تحديد البيانات النشطة بناءً على التبويب
    const getCurrentData = () => {
        if (activeTab === "owners") return owners?.data || owners || [];
        if (activeTab === "investors")
            return investors?.data || investors || [];
        return customers?.data || customers || [];
    };
    const currentData = getCurrentData();

    const addBrokerForm = useForm({
        name: "",
        email: "",
        phone: "",
        country_code: "+963", // افتراضي لسوريا
        password: "",
        role: "broker", // ثابت لهذا الفورم
        can_view_owners: false,
        can_view_investors: false,
        can_view_customers: false,
    });

    const handleAddBroker = (e) => {
        e.preventDefault();
        addBrokerForm.post(route("admin.addBroker"), {
            onSuccess: () => {
                setIsAddBrokerOpen(false);
                addBrokerForm.reset();
                toast.success("تم تعيين الوسيط بنجاح في النظام");
            },
        });
    };
    useEffect(() => {
        // قراءة المعامل 'view' من الرابط
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("view") === "admin") {
            setViewMode("admin");
        }
    }, []);

    // دالة تحديث الحالة (تغيير من لم يتم التواصل إلى تم التواصل والعكس)
    const handleStatusUpdate = (id, type) => {
        router.post(
            route("bdashboard.updateStatus", { id, type }),
            {},
            {
                onSuccess: () => toast.success("تم تحديث حالة العميل بنجاح"),
                preserveScroll: true,
            },
        );
    };
    const getHeaders = () => {
        const common = ["الاسم / التاريخ", "الهاتف / المحافظة"];
        if (activeTab === "owners")
            return [
                ...common,
                "تفاصيل العقار / المساحة",
                "الوسائط",
                "الحالة",
                "إجراء",
            ];
        if (activeTab === "investors")
            return [
                ...common,
                "الميزانية / الهدف",
                "المساحة المطلوبة",
                "الحالة",
                "إجراء",
            ];
        return [...common, "الطلب / الموقع", "الوسائط", "الحالة", "إجراء"];
    };

    return (
        // في سطر الـ return
        <AuthenticatedLayout
            user={auth.user}
            setViewMode={setViewMode} // مررها هنا لكي يراها الزر في القائمة الجانبية
            setIsAddBrokerOpen={setIsAddBrokerOpen}
        >
            <div className="py-12 px-4 md:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* --- القسم الثاني: واجهة إدارة الوسطاء (تظهر في وضع admin) --- */}
                    {viewMode === "admin" && auth.isAdmin && (
                        <div className="animate-fade-in space-y-10">
                            {/* هيدر قسم الإدارة - يحتوي على العنوان وزر الإضافة */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-7 bg-[#0b1c2d]/50 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                                <div className="flex items-center gap-6">
                                    <div className="bg-[#d4af37] p-5 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                        <span className="material-symbols-outlined text-[#0b1c2d] text-2xl font-black">
                                            admin_panel_settings
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white italic">
                                            إدارة{" "}
                                            <span className="text-[#d4af37]">
                                                صلاحيات الفريق
                                            </span>
                                        </h3>
                                        <p className="text-white/30 text-[9px] font-bold uppercase tracking-[0.2em] gap-3 py-2">
                                            Security Control Center
                                        </p>
                                    </div>
                                </div>

                                {/* 🛑 زر إضافة وسيط - هنا سيعمل لأن setIsAddBrokerOpen معرفة في نفس الملف */}
                                <button
                                    onClick={() => setIsAddBrokerOpen(true)}
                                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#d4af37] text-[#0b1c2d] font-black text-xs uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-sm font-black">
                                        person_add
                                    </span>
                                    إضافة وسيط جديد
                                </button>
                            </div>

                            {/* [جدول الوسطاء الملكي يوضع هنا] */}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-between items-center mb-8 bg-[#0b1c2d] p-2 rounded-2xl border border-white/5"></div>

            {/* --- القسم الثالث: النافذة المنبثقة (Modal) --- */}
            {/* توضع هنا في نهاية الـ return لتكون فوق كل شيء */}
            {isAddBrokerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c2d]/80 backdrop-blur-sm">
                    <div
                        className="relative w-full max-w-2xl bg-[#0b1c2d] border border-white/10 rounded-[2rem] shadow-2xl 
                    max-h-[90vh] flex flex-col overflow-hidden"
                    >
                        {/* هيدر النافذة (ثابت) */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
                            <h2 className="text-white font-black uppercase tracking-widest text-sm">
                                إصدار وثيقة تعيين
                            </h2>
                            <button
                                onClick={() => setIsAddBrokerOpen(false)}
                                className="text-white/40 hover:text-white"
                            >
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </button>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar flex-1">
                            <form
                                onSubmit={handleAddBroker}
                                className="p-5 md:p-10 space-y-6"
                                dir="rtl"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                                    {/* الاسم */}

                                    <div className="space-y-2">
                                        <label className="text-white/40 text-[10px] font-black mr-2 uppercase">
                                            الاسم الكامل
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="أدخل اسم الوسيط"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-[#d4af37] outline-none transition-all"
                                            value={addBrokerForm.data.name}
                                            onChange={(e) =>
                                                addBrokerForm.setData(
                                                    "name",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        {addBrokerForm.errors.name && (
                                            <p className="text-rose-500 text-[10px] mt-1 mr-2">
                                                {addBrokerForm.errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* البريد */}
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-[10px] font-black mr-2 uppercase">
                                            البريد الإلكتروني
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="email@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-left focus:border-[#d4af37] outline-none transition-all"
                                            value={addBrokerForm.data.email}
                                            onChange={(e) =>
                                                addBrokerForm.setData(
                                                    "email",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>

                                    {/* رمز الدولة + الهاتف */}
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-[10px] font-black mr-2 uppercase">
                                            رقم الهاتف
                                        </label>
                                        <div className="flex gap-2" dir="ltr">
                                            <select
                                                type="text"
                                                placeholder="+963"
                                                className="w-14 bg-white/5 border border-white/10 rounded-2xl px-2 py-3 text-white text-center focus:border-[#d4af37] outline-none"
                                                value={
                                                    addBrokerForm.data
                                                        .country_code
                                                }
                                                onChange={(e) =>
                                                    addBrokerForm.setData(
                                                        "country_code",
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                {countryCodes.map((c) => (
                                                    <option
                                                        key={c.code}
                                                        value={c.code}
                                                        className="bg-background-dark text-white"
                                                    >
                                                        {c.label}{" "}
                                                        {c.code !== "other"
                                                            ? c.code
                                                            : ""}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="9xxxxxxxx"
                                                className=" w-48.5 flex-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-[#d4af37] outline-none"
                                                value={addBrokerForm.data.phone}
                                                onChange={(e) =>
                                                    addBrokerForm.setData(
                                                        "phone",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* كلمة المرور */}
                                    <div className="space-y-2">
                                        <label className="text-white/40 text-[10px] font-black mr-2 uppercase">
                                            كلمة المرور
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-left focus:border-[#d4af37] outline-none transition-all"
                                            value={addBrokerForm.data.password}
                                            onChange={(e) =>
                                                addBrokerForm.setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[#d4af37] text-[10px] font-black uppercase tracking-widest mr-2 block">
                                        امتيازات الوصول السيادية:
                                    </label>
                                    {/* في الجوال: عمودين، في الشاشات الكبيرة: 3 أعمدة */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 bg-white/5 p-3 md:p-5 rounded-[1.5rem] md:rounded-[2rem] border border-white/10">
                                        {[
                                            "owners",
                                            "investors",
                                            "customers",
                                        ].map((f) => (
                                            <button
                                                key={f}
                                                type="button"
                                                onClick={() =>
                                                    addBrokerForm.setData(
                                                        `can_view_${f}`,
                                                        !addBrokerForm.data[
                                                            `can_view_${f}`
                                                        ],
                                                    )
                                                }
                                                className={`flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-500
                    ${addBrokerForm.data[`can_view_${f}`] ? "bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "bg-white/5 border-white/5"}`}
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-xl md:text-2xl ${addBrokerForm.data[`can_view_${f}`] ? "text-[#d4af37]" : "text-white/20"}`}
                                                >
                                                    {addBrokerForm.data[
                                                        `can_view_${f}`
                                                    ]
                                                        ? "verified_user"
                                                        : "shield_lock"}
                                                </span>
                                                <span className="text-[9px] md:text-[10px] text-white font-black uppercase tracking-tighter">
                                                    {f === "owners"
                                                        ? "بائعين"
                                                        : f === "investors"
                                                          ? "مستثمرين"
                                                          : "زبائن"}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* زر الإرسال السيادي: تقليل الـ padding في الجوال */}
                                <button
                                    disabled={addBrokerForm.processing}
                                    className="w-full py-4 md:py-6 rounded-xl md:rounded-[2rem] bg-[#d4af37] text-[#0b1c2d] font-black uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] shadow-2xl hover:shadow-[#d4af37]/30 transition-all disabled:opacity-50"
                                >
                                    {addBrokerForm.processing
                                        ? "جاري منح الصلاحيات..."
                                        : "إصدار وثيقة التعيين"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Head title="لوحة العمليات السيادية" />
            <Toaster position="top-center" />

            {/* بدلاً من py-12 الثابتة، اجعلها py-6 في الجوال و py-12 في الشاشات الكبيرة */}
            {/* حذفنا py-12 واستبدلناها بـ pt-2 للجوال و pt-12 للكمبيوتر */}
            <div
                className="pt-2 md:pt-12 pb-12 px-4 md:px-8 bg-[#0b1c2d] min-h-screen"
                dir="rtl"
            >
                <div className="max-w-7xl mx-auto space-y-4 md:space-y-8">
                    <div className="space-y-10">
                        {/* إذا كنا في وضع البيانات العادي */}
                        {viewMode === "data" && (
                            <div className="animate-fade-in space-y-10">
                                {/* Header Section - التنسيق الذهبي المطابق للصورة */}
                                {/* التعديل هنا: pb-6 للجوال بدلاً من 10، mb-6 بدلاً من 10، و gap-4 بدلاً من 8 */}
                                {/* تم تقليل mb-10 إلى mb-4 و pb-10 إلى pb-4 في الجوال */}
                                <div
                                    className="relative flex flex-col md:flex-row justify-between items-center border-b border-[#d4af37]/10 pb-4 md:pb-10 mb-4 md:mb-10 gap-4"
                                    dir="rtl"
                                >
                                    <div className="relative z-10 w-full">
                                        {/* الحاوية الذهبية: جعلناها أصغر في الجوال لترتفع للأعلى */}
                                        <div className="flex items-center gap-3 md:gap-6 p-2 md:p-4 bg-[#d4af37] rounded-xl md:rounded-[2rem] shadow-xl transition-all duration-500">
                                            {/* أيقونة العنوان - تصغير إضافي للجوال */}
                                            <div className="bg-[#0b1c2d]/20 p-1.5 md:p-3 rounded-lg md:rounded-2xl shrink-0">
                                                <span className="material-symbols-outlined text-[#0b1c2d] text-lg md:text-3xl font-black">
                                                    dashboard_customize
                                                </span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-base md:text-3xl font-black text-[#0b1c2d] italic tracking-tighter leading-none">
                                                    إدارة{" "}
                                                    <span className="underline decoration-[#0b1c2d]/20 underline-offset-4">
                                                        الصفقات الاستراتيجية
                                                    </span>
                                                </h2>
                                                <p className="text-[#0b1c2d]/60 text-[7px] md:text-[10px] font-black uppercase tracking-widest mt-1 md:mt-4">
                                                    Sovereign Operations Center
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Live Market Feed - تصغير الحجم لعدم أخذ مساحة طولية */}
                                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 scale-90 md:scale-100">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <p className="text-[#d4af37] text-[8px] md:text-[11px] font-black uppercase">
                                            Live Feed
                                        </p>
                                    </div>
                                </div>
                                {/* أزرار اختيار نمط العرض: نصي أو جدول */}
                                <div className="flex bg-[#0b1c2d] p-1.5 rounded-2xl border border-white/5 w-fit mb-8 shadow-2xl">
                                    <button
                                        onClick={() => setDisplayType("text")}
                                        className={`px-6 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${displayType === "text" ? "bg-[#d4af37] text-[#0b1c2d]" : "text-white/40 hover:text-white"}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            description
                                        </span>
                                        عرض النصوص
                                    </button>
                                    <button
                                        onClick={() => setDisplayType("table")}
                                        className={`px-6 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${displayType === "table" ? "bg-[#d4af37] text-[#0b1c2d]" : "text-white/40 hover:text-white"}`}
                                    >
                                        <span className="material-symbols-outlined text-sm">
                                            table_chart
                                        </span>
                                        عرض الجدول
                                    </button>
                                </div>

                                {/* Tabs Navigation */}
                                <div className="flex flex-wrap gap-4 p-2 bg-[#0b1c2d]/50 backdrop-blur-md rounded-2xl border border-white/10 w-fit">
                                    <TabButton
                                        active={activeTab === "owners"}
                                        onClick={() => setActiveTab("owners")}
                                        label="عروض البائعين"
                                        count={owners.length}
                                        icon="sell"
                                    />
                                    <TabButton
                                        active={activeTab === "investors"}
                                        onClick={() =>
                                            setActiveTab("investors")
                                        }
                                        label="طلبات المستثمرين"
                                        count={investors.length}
                                        icon="account_balance"
                                    />
                                    <TabButton
                                        active={activeTab === "customers"}
                                        onClick={() =>
                                            setActiveTab("customers")
                                        }
                                        label="طلبات الزبائن"
                                        count={customers.length}
                                        icon="shopping_cart"
                                    />
                                </div>
                                {/* [نمط عرض النصوص للأدمن] */}
                                {displayType === "text" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                                        {currentData.map((item) => (
                                            <div
                                                key={item.id}
                                                className="bg-[#0b1c2d] border border-[#d4af37]/20 rounded-[2.2rem] p-7 relative hover:border-[#d4af37]/50 transition-all shadow-2xl group"
                                            >
                                                {/* زر النسخ */}
                                                <button
                                                    onClick={() =>
                                                        copyToClipboard(item)
                                                    }
                                                    className="absolute top-6 left-6 text-[#d4af37] bg-[#d4af37]/10 p-2 rounded-xl hover:scale-110 transition-transform border border-[#d4af37]/20"
                                                >
                                                    <span className="material-symbols-outlined text-sm">
                                                        content_copy
                                                    </span>
                                                </button>

                                                <div className="space-y-3 mt-2 text-[14px]">
                                                    <p>
                                                        <span className="text-[#d4af37] font-bold">
                                                            👤 الاسم:
                                                        </span>{" "}
                                                        <span className="text-white">
                                                            {item.name}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="text-[#d4af37] font-bold">
                                                            📞 الهاتف:
                                                        </span>{" "}
                                                        <span
                                                            className="text-white"
                                                            dir="ltr"
                                                        >
                                                            {item.phone}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="text-[#d4af37] font-bold">
                                                            📍 المحافظة:
                                                        </span>{" "}
                                                        <span className="text-white">
                                                            {item.governorate}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="text-[#d4af37] font-bold">
                                                            🏠 النوع:
                                                        </span>{" "}
                                                        <span className="text-white">
                                                            {item.property_type ||
                                                                "غير محدد"}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="text-[#d4af37] font-bold">
                                                            📏
                                                            الميزانية/المساحة:
                                                        </span>{" "}
                                                        <span className="text-white">
                                                            {item.area ||
                                                                item.capital_range}
                                                        </span>
                                                    </p>

                                                    <div className="pt-4 flex gap-4 border-t border-white/5 mt-4">
                                                        <button
                                                            onClick={() =>
                                                                setSelectedMedia(
                                                                    item.media,
                                                                )
                                                            }
                                                            className="flex items-center gap-1.5 text-[#d4af37] text-xs font-black uppercase"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">
                                                                grid_view
                                                            </span>{" "}
                                                            الوسائط
                                                        </button>
                                                        <a
                                                            href={`https://wa.me/${item.phone?.replace("+", "")}`}
                                                            target="_blank"
                                                            className="flex items-center gap-1.5 text-green-500 text-xs font-black uppercase"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">
                                                                chat
                                                            </span>{" "}
                                                            واتساب
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    /* الجدول الذهبي الملكي */
                                    <div className="bg-[#0b1c2d] border border-accent-gold/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-right border-collapse">
                                                {/* 1. رأس الجدول - العناوين تظهر هنا بالتحديد */}
                                                <thead>
                                                    {/* تأكد من أن هذا الصف هو أول عنصر داخل الجدول */}
                                                    <tr className="sticky top-0 z-10 bg-gradient-to-l from-[#d4af37] via-[#f2d472] to-[#d4af37] text-[#0b1c2d] uppercase text-[15px] font-black tracking-[0.15em] shadow-xl">
                                                        <th className="p-5 border-b border-white/10 text-right">
                                                            الاسم / التاريخ
                                                        </th>
                                                        <th className="p-5 border-b border-white/10 text-right">
                                                            الهاتف / المحافظة
                                                        </th>

                                                        {/* الحقول الديناميكية */}
                                                        {activeTab ===
                                                            "owners" && (
                                                            <th className="p-5 border-b border-white/10 text-right">
                                                                نوع العقار /
                                                                الموقع / المساحة
                                                            </th>
                                                        )}

                                                        {activeTab ===
                                                            "investors" && (
                                                            <>
                                                                <th className="p-5 border-b border-white/10 text-right">
                                                                    الميزانية /
                                                                    الهدف
                                                                </th>
                                                                <th className="p-5 border-b border-white/10 text-center">
                                                                    المساحة
                                                                    المطلوبة
                                                                </th>
                                                            </>
                                                        )}

                                                        {activeTab ===
                                                            "customers" && (
                                                            <th className="p-5 border-b border-white/10 text-right">
                                                                طلب الزبون /
                                                                الموقع
                                                            </th>
                                                        )}

                                                        {/* الحقول الثابتة */}
                                                        <th className="p-5 border-b border-white/10 text-center">
                                                            الوسائط
                                                        </th>
                                                        <th className="p-5 border-b border-white/10 text-center">
                                                            حالة التواصل
                                                        </th>
                                                        <th className="p-5 border-b border-white/10 text-center">
                                                            الإجراء
                                                        </th>
                                                    </tr>
                                                </thead>

                                                {/* 2. جسم الجدول - البيانات تظهر هنا */}
                                                <tbody className="text-white text-[15px] divide-y divide-white/5">
                                                    {activeTab === "owners" &&
                                                        currentData.map(
                                                            (item) => (
                                                                <OwnerRow
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    item={item}
                                                                    onUpdate={
                                                                        handleStatusUpdate
                                                                    }
                                                                    setSelectedMedia={
                                                                        setSelectedMedia
                                                                    }
                                                                />
                                                            ),
                                                        )}

                                                    {activeTab ===
                                                        "investors" &&
                                                        investors.map(
                                                            (item) => (
                                                                <InvestorRow
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    item={item}
                                                                    onUpdate={
                                                                        handleStatusUpdate
                                                                    }
                                                                />
                                                            ),
                                                        )}

                                                    {activeTab ===
                                                        "customers" &&
                                                        customers.map(
                                                            (item) => (
                                                                <CustomerRow
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    item={item}
                                                                    onUpdate={
                                                                        handleStatusUpdate
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                </tbody>
                                            </table>
                                            {/* قسم التحكم بالوسطاء - الأدمن فقط */}
                                            {/* قسم التحكم بالوسطاء - نسخة الجدول الملكي */}
                                            {auth.isAdmin && (
                                                <div className="mt-20 space-y-8 animate-fade-in">
                                                    {/* عنوان القسم بتنسيق فخم */}
                                                    <div className="flex items-center gap-3 md:gap-6 p-2.5 md:p-4 bg-[#0b1c2d]/50 backdrop-blur-xl rounded-2xl md:rounded-[2rem] border border-white/10 w-fit max-w-full">
                                                        {/* أيقونة الصلاحيات: صغرت في الجوال p-2.5 و text-xl */}
                                                        <div className="bg-[#d4af37] p-2.5 md:p-3 rounded-xl md:rounded-2xl shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                                            <span className="material-symbols-outlined text-[#0b1c2d] text-xl md:text-2xl font-black">
                                                                admin_panel_settings
                                                            </span>
                                                        </div>

                                                        <div className="min-w-0">
                                                            {/* العنوان: صغر الخط من 2xl إلى lg لضمان عدم انكسار السطر */}
                                                            <h3 className="text-lg md:text-2xl font-black text-white italic tracking-tighter leading-tight truncate">
                                                                إدارة{" "}
                                                                <span className="text-[#d4af37]">
                                                                    صلاحيات
                                                                    الفريق
                                                                </span>
                                                            </h3>

                                                            {/* النص الفرعي: تقليل التباعد tracking في الجوال */}
                                                            <p className="text-white/30 text-[7px] md:text-[9px] font-bold uppercase tracking-[0.15em] md:tracking-[0.3em] mt-0.5 md:mt-1 truncate">
                                                                Operational
                                                                Security Center
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* الجدول الذهبي الموحد */}
                                                    <div className="bg-[#0b1c2d] border border-[#d4af37]/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full text-right border-collapse">
                                                                <thead>
                                                                    <tr className="sticky top-0 z-10 bg-gradient-to-l from-[#d4af37] via-[#f2d472] to-[#d4af37] text-[#0b1c2d] uppercase text-[11px] font-black tracking-[0.2em] shadow-md">
                                                                        <th className="p-6 border-b border-white/10 text-right">
                                                                            الوسيط
                                                                            الرقمي
                                                                            /
                                                                            المعرف
                                                                        </th>
                                                                        <th className="p-6 border-b border-white/10 text-center">
                                                                            عروض
                                                                            البائعين
                                                                        </th>
                                                                        <th className="p-6 border-b border-white/10 text-center">
                                                                            المستثمرين
                                                                        </th>
                                                                        <th className="p-6 border-b border-white/10 text-center">
                                                                            الزبائن
                                                                        </th>
                                                                        <th className="p-6 border-b border-white/10 text-center">
                                                                            تحديث
                                                                            الحالة
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="text-white text-[15px] divide-y divide-white/5">
                                                                    {all_brokers.map(
                                                                        (
                                                                            broker,
                                                                        ) => (
                                                                            <BrokerPermissionRow
                                                                                key={
                                                                                    broker.id
                                                                                }
                                                                                broker={
                                                                                    broker
                                                                                }
                                                                            />
                                                                        ),
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* رسالة في حال عدم وجود بيانات */}
                                            {(activeTab === "owners"
                                                ? owners
                                                : activeTab === "investors"
                                                  ? investors
                                                  : customers
                                            ).length === 0 && (
                                                <div className="p-20 text-center bg-white/5 text-white/20 italic">
                                                    لا توجد سجلات حالياً في هذا
                                                    القسم.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {viewMode === "admin" && auth.isAdmin && (
                            <div className="mt-10 space-y-8 animate-fade-in">
                                {/* عنوان القسم مع زر العودة */}
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-6"></div>

                                {/* الجدول الذهبي الموحد للوسطاء */}
                                <div className="bg-[#0b1c2d] border border-[#d4af37]/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-right border-collapse min-w-[1000px]">
                                            <thead>
                                                <tr className="sticky top-0 z-10 bg-gradient-to-l from-[#d4af37] via-[#f2d472] to-[#d4af37] text-[#0b1c2d] uppercase text-[11px] font-black tracking-[0.2em] shadow-md">
                                                    <th className="p-6 border-b border-white/10 text-right">
                                                        الوسيط الرقمي
                                                    </th>
                                                    <th className="p-6 border-b border-white/10 text-center">
                                                        بيانات الوصول
                                                        (Email/Pass)
                                                    </th>
                                                    <th className="p-6 border-b border-white/10 text-center">
                                                        بائعين
                                                    </th>
                                                    <th className="p-6 border-b border-white/10 text-center">
                                                        مستثمرين
                                                    </th>
                                                    <th className="p-6 border-b border-white/10 text-center">
                                                        زبائن
                                                    </th>
                                                    <th className="p-6 border-b border-white/10 text-center">
                                                        إدارة
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-white text-[15px] divide-y divide-white/5">
                                                {all_brokers.map((broker) => (
                                                    <BrokerPermissionRow
                                                        key={broker.id}
                                                        broker={broker}
                                                        // 🛑 قمنا بحذف onUpdate لأن المكون يعالج الحفظ داخلياً
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* معرض الوسائط المفقود */}
                {/* معرض الوسائط الملكي للأدمن */}
                {selectedMedia && (
                    <div
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <div
                            className="bg-[#0b1c2d] border border-[#d4af37]/30 rounded-[2.5rem] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.2)]"
                            onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط داخل المعرض
                        >
                            {/* الهيدر */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                <div>
                                    <h3 className="text-[#d4af37] text-2xl font-black italic tracking-widest">
                                        MEDIA ASSETS
                                    </h3>
                                    <p className="text-white/20 text-[10px] uppercase mt-1">
                                        Sovereign Capital Administrative Review
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedMedia(null)}
                                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-rose-500/20 hover:text-rose-500 transition-all"
                                >
                                    <span className="material-symbols-outlined text-3xl">
                                        close
                                    </span>
                                </button>
                            </div>

                            {/* شبكة الوسائط */}
                            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 custom-scrollbar">
                                {selectedMedia.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative group rounded-[2rem] overflow-hidden border border-white/10 bg-black/40 aspect-video shadow-2xl"
                                    >
                                        {file.file_type === "video" ? (
                                            <video
                                                src={`/storage/${file.file_path.replace("public/", "")}`}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        ) : (
                                            <img
                                                src={`/storage/${file.file_path.replace("public/", "")}`}
                                                className="w-full h-full object-cover"
                                                alt="Property Asset"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "/images/placeholder.jpg";
                                                }} // صورة بديلة في حال الخطأ
                                            />
                                        )}

                                        {/* طبقة التحميل عند التمرير */}
                                        <a
                                            href={`/storage/${file.file_path.replace("public/", "")}`}
                                            download
                                            target="_blank"
                                            className="absolute inset-0 bg-[#d4af37]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 backdrop-blur-sm"
                                        >
                                            <div className="bg-[#0b1c2d] p-4 rounded-2xl shadow-2xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="material-symbols-outlined text-[#d4af37] text-4xl">
                                                    download_for_offline
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* إشعار النسخ */}
                {showCopyNotify && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] animate-bounce">
                        <div className="bg-[#d4af37] text-[#0b1c2d] px-10 py-4 rounded-2xl font-black shadow-2xl flex items-center gap-4 border-2 border-white/20">
                            <span className="material-symbols-outlined font-black text-2xl">
                                content_paste_go
                            </span>
                            <span className="tracking-widest uppercase text-xs">
                                Data Copied Successfully
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

// مكونات فرعية متكررة
function StatusCell({ status }) {
    const isContacted = status === "تم التواصل";

    return (
        <td className="p-6 text-center">
            <span
                className={`px-4 py-1.5 rounded-full text-[15px] font-black uppercase tracking-widest shadow-lg ${
                    isContacted
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
            >
                {status}
            </span>
        </td>
    );
}

function ActionCell({ id, type, onUpdate }) {
    return (
        <td className="p-6 text-center">
            <button
                onClick={() => onUpdate(id, type)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-accent-gold hover:text-primary border border-white/10 px-4 py-2 rounded-xl text-[15px] font-black transition-all duration-300"
            >
                تغيير الحالة
                <span className="material-symbols-outlined text-sm">
                    sync_alt
                </span>
            </button>
        </td>
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

const BrokerPermissionRow = ({ broker }) => {
    // 1. معالجة البيانات لضمان تحويل 1/0 إلى true/false
    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
    } = useForm({
        // نستخدم التحويل لـ Boolean لأن قاعدة البيانات ترسل 0 أو 1
        can_view_owners: !!Number(broker.can_view_owners),
        can_view_investors: !!Number(broker.can_view_investors),
        can_view_customers: !!Number(broker.can_view_customers),
    });

    // تحديث الحالة عند الضغط
    const toggle = (field) => {
        setData(field, !data[field]);
    };

    const save = () => {
        console.log("محاولة إرسال البيانات للوسيط ID:", broker.id); // 🛑 هل تظهر هذه في الكونسول؟

        post(route("admin.updatePermissions", broker.id), {
            preserveScroll: true,
            onStart: () => console.log("بدأ الإرسال فعلياً..."),
            onSuccess: () => toast.success("تم الحفظ"),
            onError: (errors) => console.error("أخطاء السيرفر:", errors),
        });
    };

    // 3. دالة الحفظ الحقيقية
    const submitUpdate = () => {
        post(route("admin.updatePermissions", broker.id), {
            preserveScroll: true,
            onSuccess: () => toast.success(`تم تحديث صلاحيات ${broker.name}`),
            onError: () => toast.error("حدث خطأ أثناء التحديث"),
        });
    };

    // 4. دالة الحذف الحقيقية
    const handleDelete = () => {
        if (
            confirm(`تحذير: هل أنت متأكد من حذف الوسيط ${broker.name} نهائياً؟`)
        ) {
            destroy(route("admin.deleteBroker", broker.id), {
                preserveScroll: true,
                onSuccess: () => toast.success("تم شطب الوسيط من النظام"),
            });
        }
    };

    return (
        <tr className="hover:bg-white/[0.02] transition-all group border-b border-white/5">
            {/* 1. الهوية */}
            <td className="p-6">
                <div className="font-black text-white text-[15px]">
                    {broker.name}
                </div>
                <div className="text-[#d4af37]/40 text-[9px] italic tracking-widest uppercase">
                    Agent ID: {broker.id}
                </div>
            </td>

            {/* 2. البريد وكلمة المرور - استخدمنا التحقق الاختياري ?. لضمان عدم الانهيار */}
            <td className="p-6 text-center">
                <div className="text-white font-bold text-[13px]">
                    {broker.email || "N/A"}
                </div>
                <div
                    className="text-[#d4af37]/30 text-[9px] mt-1 font-mono truncate max-w-[150px] mx-auto"
                    dir="ltr"
                >
                    {broker.password
                        ? `${broker.password.substring(0, 15)}...`
                        : "NO_HASH_FOUND"}
                </div>
            </td>

            {/* 3. مربعات الصلاحيات - ربطناها بـ toggleField */}
            {[
                "can_view_owners",
                "can_view_investors",
                "can_view_customers",
            ].map((f) => (
                <td key={f} className="p-6 text-center">
                    <button
                        type="button"
                        onClick={() => toggle(f)}
                        className={`w-8 h-8 rounded-lg border transition-all ${data[f] ? "bg-[#d4af37] border-[#d4af37]" : "bg-white/5 border-white/10"}`}
                    >
                        {data[f] && (
                            <span className="material-symbols-outlined text-[#0b1c2d] text-sm font-black">
                                check
                            </span>
                        )}
                    </button>
                </td>
            ))}

            {/* 4. أزرار التحكم - Save & Delete */}
            <td className="p-6 text-center">
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={submitUpdate}
                        disabled={processing}
                        className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0b1c2d] transition-all flex items-center justify-center shadow-lg disabled:opacity-30"
                    >
                        <span className="material-symbols-outlined text-lg">
                            {processing ? "sync" : "save"}
                        </span>
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={processing}
                        className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center border border-rose-500/20 shadow-lg"
                    >
                        <span className="material-symbols-outlined text-lg">
                            delete_forever
                        </span>
                    </button>
                </div>
            </td>
        </tr>
    );
};
function BrokerRow({ broker }) {
    const { data, setData, post, processing } = useForm({
        can_view_owners: broker.can_view_owners,
        can_view_investors: broker.can_view_investors,
        can_view_customers: broker.can_view_customers,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.updatePermissions", broker.id), {
            preserveScroll: true,
            onSuccess: () => alert("تم تحديث الصلاحيات بنجاح"),
        });
    };

    return (
        <tr className="bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group">
            <td className="px-6 py-5">
                <div className="flex flex-col">
                    <span className="text-white font-bold">{broker.name}</span>
                    <span className="text-white/30 text-xs">
                        {broker.phone}
                    </span>
                </div>
            </td>
            {[
                "can_view_owners",
                "can_view_investors",
                "can_view_customers",
            ].map((field) => (
                <td key={field} className="px-6 py-5 text-center">
                    <input
                        type="checkbox"
                        checked={data[field]}
                        onChange={(e) => setData(field, e.target.checked)}
                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-accent-gold focus:ring-accent-gold transition-all"
                    />
                </td>
            ))}
            <td className="px-6 py-5 text-center">
                <button
                    onClick={submit}
                    disabled={processing}
                    className="bg-accent-gold text-primary text-[10px] font-black px-6 py-2 rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 transition-all uppercase"
                >
                    {processing ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
            </td>
        </tr>
    );
}

{
}

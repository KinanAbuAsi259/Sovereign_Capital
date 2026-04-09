import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "@/Layouts/MainLayout";
import { useState } from 'react';

export default function Investor_page() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        phone: "",
        country_code: "+963",
        email: "",
        governorate: "",
        capital_range: "",
        property_type: "",
        company_name: "",
        location: "",
        area: "",
        investment_goal: "",
    });
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

    const governorates = [
        "دمشق",
        "ريف دمشق",
        "حلب",
        "حمص",
        "حماة",
        "اللاذقية",
        "طرطوس",
        "دير الزور",
        "الرقة",
        "إدلب",
        "الحسكة",
        "درعا",
        "السويداء",
        "القنيطرة",
    ];
    // إذا كنت تستخدم Inertia.js أو React hooks العادية
const [selectedCurrency, setSelectedCurrency] = useState("دولار");

// تعريف الخيارات ككائن ثابت خارج أو داخل المكون
const budgetOptions = {
    "دولار": [
        "10-50 ألف دولار",
        "50-200 ألف دولار",
        "200-500 ألف دولار",
        "500-900 ألف دولار",
        "+1 مليون دولار"
    ],
    "سوري": [
        "100-500 مليون ليرة سوري",
        "500-900 مليون ليرة سوري",
        "1-5 مليار ليرة سوري",
        "5-10 مليار ليرة سوري",
        "+10 مليار ليرة سوري"
    ]
};

    const submit = (e) => {
        e.preventDefault();
        console.log("🚀 تم الضغط على زر الإرسال الآن!");
        post(route("lead.store"), {
            onSuccess: () =>
                toast.success("تم استلام طلبك بنجاح، سنتواصل معك قريباً!"),
            onError: () =>
                toast.error("يرجى تصحيح الأخطاء في الحقول المطلوبة."),
        });
    };
    // مكون فرعي للسهم لتقليل تكرار الكود
    const ArrowIcon = () => (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
                className="w-5 h-5 text-accent-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    );

    return (
        <MainLayout>
            <Head title="طلب استثمار استراتيجي" />
            <Toaster position="top-center" reverseOrder={false} />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-16" dir="rtl">
                <div className="bg-white/5 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="text-center mb-10">
                        <h2 className="text-accent-gold text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            بوابة المستثمرين
                        </h2>
                        <h1 className="text-white text-3xl md:text-4xl font-black mb-4">
                            تقديم طلب استثمار
                        </h1>
                        <p className="text-slate-400 text-sm">
                            يرجى ملء كافة الحقول المطلوبة (*) لنتمكن من دراسة
                            طلبكم بدقة.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* المعلومات الأساسية */}
                        {/* الاسم والهاتف بتوزيع 2 إلى 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* حقل الاسم يأخذ عمودين */}
                            <div className="md:col-span-2 space-y-2 text-right">
                                <label className="text-slate-300 text-sm mr-2">
                                    الاسم الكامل *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none"
                                    placeholder="أدخل اسمك الكامل"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* حقل الهاتف يأخذ عمود واحد فقط */}
                            {/* حقل الهاتف مدمج مع رمز الدولة */}
                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
                                    رقم الهاتف *
                                </label>
                                <div className="flex flex-row-reverse shadow-inner bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-accent-gold transition-all">
                                    {/* اختيار الدولة على اليمين */}
                                    <select
                                        className="bg-background-dark/50 border-0 border-l border-white/10 text-white px-3 outline-none text-sm cursor-pointer hover:bg-white/5 transition-colors"
                                        style={{ minWidth: "110px" }}
                                        value={data.country_code}
                                        onChange={(e) =>
                                            setData(
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

                                    {/* حقل الرقم على اليسار */}
                                    <input
                                        type="tel"
                                        dir="ltr"
                                        className="flex-1 bg-transparent border-0 text-white p-4 outline-none text-left placeholder:text-right"
                                        placeholder="9xx xxx xxx"
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    "",
                                                );
                                            setData("phone", value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-5 text-right flex flex-col gap-2"
                        />
                       {/* شبكة الحقول */}
                       
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
        {
            id: "governorate",
            label: "المحافظة *",
            options: ["دمشق", "ريف دمشق", "حلب", "حمص", "حماة", "اللاذقية", "طرطوس", "دير الزور", "الرقة", "إدلب", "الحسكة", "درعا", "السويداء", "القنيطرة"],
        },
        {
            id: "currency",
            label: "نوع العملة *",
            options: ["دولار", "سوري"],
        },
        {
            id: "capital_range",
            label: "الميزانية (اختياري)",
            // هنا التغيير الديناميكي: نختار المصفوفة بناءً على الحالة
            options: budgetOptions[selectedCurrency],
        },
        {
            id: "property_type",
            label: "نوع العقار *",
            options: ["سكن", "تجاري", "زراعي", "صناعي"],
        },
    ].map((field) => (
        <div key={field.id} className="space-y-2 relative text-right">
            <label className="text-slate-300 text-sm mr-2 font-bold">
                {field.label}
            </label>
            <div className="relative">
                <select
                    className="w-full bg-background-dark border border-white/10 rounded-xl text-white p-4 appearance-none focus:border-accent-gold outline-none shadow-inner"
                    value={data[field.id]} // تأكد من ربط القيمة بـ data
                    onChange={(e) => {
                        const val = e.target.value;
                        setData(field.id, val);
                        
                        // إذا تم تغيير العملة، نحدث الحالة فوراً لتتحدث خيارات الميزانية
                        if (field.id === "currency") {
                            setSelectedCurrency(val);
                            // اختياري: تصغير الميزانية الحالية لتجنب تعارض القيم
                            setData("capital_range", ""); 
                        }
                    }}
                >
                    <option value="">اختر..</option>
                    {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                {/* أيقونة السهم */}
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    ))}
</div>

                        {/* الموقع والمساحة */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium mr-1">
                                    الموقع  *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none"
                                    placeholder="المنطقة أو الحي"
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                />
                                {errors.location && (
                                    <span className="text-red-500 text-xs mt-1">
                                        املأ الحقل المطلوب.
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white text-sm font-medium mr-1">
                                    المساحة المطلوبة *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none"
                                    placeholder="المساحة بـ م²"
                                    onChange={(e) =>
                                        setData("area", e.target.value)
                                    }
                                />
                                {errors.area && (
                                    <span className="text-red-500 text-xs mt-1">
                                        املأ الحقل المطلوب.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white text-sm font-medium mr-1">
                                الهدف من الاستثمار *
                            </label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 h-32 focus:border-accent-gold outline-none resize-none"
                                placeholder=" للسكن/ خاص/ للتجارة/ للأجار"
                                onChange={(e) =>
                                    setData("investment_goal", e.target.value)
                                }
                            ></textarea>
                            {errors.investment_goal && (
                                <span className="text-red-500 text-xs mt-1">
                                    املأ الحقل المطلوب.
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-accent-gold text-primary font-bold py-3 rounded-lg hover:bg-white transition-all text-center bg-accent text-[#0b1c2d] font-black py-3 rounded-xl text-sm"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center gap-2">
                                    جاري معالجة الطلب...
                                </span>
                            ) : (
                                "إرسال الطلب الآن"
                            )}
                        </button>
                    </form>
                     {/* زر العودة الذكي */}
                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="w-full bg-accent text-[#0b1c2d] font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-xl hover:opacity-90 disabled:opacity-70 justify-center gap-3 inline-flex items-center"
                    >
                        <span className="material-symbols-outlined text-sm">
                            arrow_forward
                        </span>
                        العودة للقائمة الرئيسية
                    </Link>
                </div>
                </div>
            </div>
        </MainLayout>
    );
}



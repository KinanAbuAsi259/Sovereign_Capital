import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "@/Layouts/MainLayout";

export default function Customer_page() {
    const { data, setData, post, processing, errors, transform } = useForm({
        name: "",
        phone: "",
        country_code: "+963",
        email: "",
        governorate: "",
        property_type: "",
        other_property_type: "", // للحقل الديناميكي
        preferred_location: "",
        required_area: "",
        additional_details: "",
    });
    transform((data) => ({
        ...data,
        // إذا كان النوع "غير ذلك"، أرسل النص المدخل، وإلا أرسل النوع المختار
        property_type:
            data.property_type === "غير ذلك"
                ? data.other_property_type
                : data.property_type,
    }));

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // سيتم الآن إرسال property_type بالقيمة النهائية الصحيحة
    //     post(route("customer.store"));
    // };

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
        { code: "other", label: "🌐 أخرى", name: "دولة أخرى" },
    ];

    const submit = (e) => {
        e.preventDefault();
        post(route("customer.store"), {
            onSuccess: () => {
                toast.success("تم استلام طلبك بنجاح!");
                reset(); // أضف هذه لتفريغ الحقول ومنع المستخدم من الضغط ثانية
            },
            onError: () => toast.error("يرجى ملء كافة الحقول."),
        });
    };

    return (
        <MainLayout>
            <Head title="طلب البحث عن عقار" />
            <Toaster position="top-center" />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-16" dir="rtl">
                <div className="bg-white/5 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="text-center mb-10">
                        <h2 className="text-accent-gold text-xs font-bold tracking-[0.3em] uppercase mb-3">
                            Customer Portal
                        </h2>
                        <h1 className="text-white text-3xl md:text-4xl font-black mb-4">
                            ابحث عن عقار أحلامك
                        </h1>
                        <p className="text-slate-400 text-sm italic leading-relaxed">
                            أخبرنا بما ترغب به، وسنقوم بتوفير الخيارات الأمثل
                            لك.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* الاسم والهاتف */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
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

                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
                                    رقم الهاتف *
                                </label>
                                <div className="flex flex-row-reverse shadow-inner bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-accent-gold">
                                    <select
                                        className="bg-background-dark/50 border-0 border-l border-white/10 text-white px-3 outline-none text-xs cursor-pointer"
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
                                                {c.label} {c.code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        dir="ltr"
                                        className="flex-1 bg-transparent border-0 text-white p-4 outline-none text-left"
                                        placeholder="9xx xxx xxx"
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* الموقع والمساحة والبريد */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
                                    المحافظة *
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none appearance-none"
                                    onChange={(e) =>
                                        setData("governorate", e.target.value)
                                    }
                                >
                                    {/* إضافة ألوان صريحة للخيارات لحل مشكلة اللون الأبيض */}
                                    <option
                                        value=""
                                        className="bg-slate-800 text-white"
                                    >
                                        اختر..
                                    </option>
                                    {[
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
                                    ].map((gov) => (
                                        <option
                                            key={gov}
                                            value={gov}
                                            className="bg-slate-800 text-white"
                                        >
                                            {gov}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
                                    الموقع المفضل *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none"
                                    placeholder="المنطقة أو الحي"
                                    onChange={(e) =>
                                        setData(
                                            "preferred_location",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
                                    المساحة المطلوبة *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none"
                                    placeholder="مثال: 150 م²"
                                    onChange={(e) =>
                                        setData("required_area", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* نوع العقار - الحقل الديناميكي */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm mr-2 font-bold">
                                    نوع العقار *
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none appearance-none"
                                    onChange={(e) =>
                                        setData("property_type", e.target.value)
                                    }
                                >
                                    {/* تطبيق نفس الحل هنا */}
                                    <option
                                        value=""
                                        className="bg-slate-800 text-white"
                                    >
                                        اختر النوع..
                                    </option>
                                    {[
                                        "بيت",
                                        "فيلا",
                                        "أرض",
                                        "شاليه",
                                        "غير ذلك",
                                    ].map((t) => (
                                        <option
                                            key={t}
                                            value={t}
                                            className="bg-slate-800 text-white"
                                        >
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {data.property_type === "غير ذلك" && (
                                <div className="space-y-2 animate-fade-in">
                                    <label className="text-accent-gold text-sm mr-2 font-black">
                                        يرجى تحديد النوع المطلوب *
                                    </label>
                                    <input
                                        className="w-full bg-white/5 border border-accent-gold/40 rounded-xl text-white p-4 focus:border-accent-gold outline-none shadow-[0_0_15px_rgba(197,160,89,0.1)] placeholder-white/40"
                                        placeholder="مثال: مكتب تجاري، مستودع..."
                                        onChange={(e) =>
                                            setData(
                                                "other_property_type",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        {/* البريد الإلكتروني وتفاصيل إضافية */}
                        <div className="space-y-2">
                            <label className="text-slate-300 text-sm mr-2 font-bold">
                                البريد الإلكتروني (اختياري)
                            </label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 focus:border-accent-gold outline-none"
                                placeholder="example@mail.com"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-slate-300 text-sm mr-2 font-bold">
                                تفاصيل إضافية
                            </label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-xl text-white p-4 h-32 focus:border-accent-gold outline-none resize-none"
                                placeholder="أي تفاصيل أخرى تود إضافتها (مواصفات خاصة، طابق معين، الخ..)"
                                onChange={(e) =>
                                    setData(
                                        "additional_details",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-accent text-[#0b1c2d] font-black py-5 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-xl hover:opacity-90 disabled:opacity-70"
                            >
                                {processing
                                    ? "جاري المعالجة..."
                                    : "إرسال طلب البحث الآن"}
                            </button>
                        </div>
                    </form>
                </div>
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
        </MainLayout>
    );
}

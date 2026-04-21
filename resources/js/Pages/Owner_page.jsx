import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "@/Layouts/MainLayout";
import axios from "axios";
import { useState } from "react";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default function Owner_page() {
    // 1. إعداد النموذج وربط الحقول (نفس الحقول في الـ Controller)
    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            name: "",
            phone: "",
            country_code: "+963",
            governorate: "",
            property_type: "",
            other_property_type: "", // الحقل الديناميكي
            location: "",
            area: "",
            email: "",
            additional_details: "",
            media: [],
        });
    const [uploading, setUploading] = useState(false);
    // القيمة أولاً ثم الدالة
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // 1. فحص الحجم
        const maxSize = 100 * 1024 * 1024;
        if (files.some((f) => f.size > maxSize)) {
            alert("عذراً، أحد الملفات يتجاوز 100 ميجابايت!");
            return;
        }

        // 2. بدء الرفع الفوري
        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        files.forEach((file) => formData.append("media[]", file));

        try {
            const response = await axios.post("/upload-temp", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                    );
                    // setData(
                    //     "uploaded_media_paths",
                    //     response.data.files.map((f) => f.path),
                    // );
                    setUploadProgress(percentCompleted);
                },
            });

            // تخزين المسارات المؤقتة في النموذج لإرسالها عند الضغط على "إرسال الطلب"
            setData(
                "uploaded_media_paths",
                response.data.files.map((f) => f.path),
            );
            setUploading(false);
        } catch (error) {
            console.error("Upload error:", error);
            alert("فشل الرفع، يرجى المحاولة مرة أخرى");
            setUploading(false);
        }
    };

    // قائمة الدول (نفس القائمة لتوحيد التجربة)
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

    const submit = (e) => {
        e.preventDefault();
        post(route("owner.store"), {
            onSuccess: () => {
                toast.success(
                    "تم استلام عرض البيع بنجاح، فريقنا سيتواصل معك قريباً!",
                );
                reset(); // تصفير الفورم بعد النجاح
            },
            onError: () =>
                toast.error("يرجى التأكد من ملء الحقول المطلوبة بدقة."),
        });
    };

    return (
        <MainLayout>
            <Head title="خدمة بيع العقار - Sovereign Capital" />
            <Toaster position="top-center" />

            <div className="max-w-4xl mx-auto px-4 py-8 md:py-20" dir="rtl">
                <div className="bg-white/5 backdrop-blur-xl p-6 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Header القسم */}
                    <div className="text-center mb-12">
                        <h2 className="text-accent-gold text-xs font-black tracking-[0.4em] uppercase mb-4 opacity-80">
                            Asset Disposal Service
                        </h2>
                        <h1 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tighter">
                            إدراج عقار{" "}
                            <span className="text-accent-gold italic">
                                للبيع
                            </span>
                        </h1>
                        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed font-light">
                            نستقبل عروضكم العقارية ونؤمن لكم أفضل المشترين
                            والمستثمرين بكفاءة وسرية تامة.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {/* المعلومات الشخصية */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                    الاسم الكامل الرسمي *
                                </label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-white p-5 focus:border-accent-gold outline-none transition-all placeholder:opacity-20"
                                    placeholder="أدخل اسمك الثلاثي"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                    رقم التواصل *
                                </label>
                                <div className="flex flex-row-reverse bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-accent-gold transition-all">
                                    <select
                                        className="bg-background-dark/80 border-0 border-l border-white/10 text-white px-1 outline-none cursor-pointer text-xs"
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
                                                className="bg-background-dark"
                                            >
                                                {c.label} {c.code}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            // الحل لمشكلة uncontrolled input: نضع || ""
                                            value={data.phone || ""}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className={`w-full bg-white/5 border ${errors.phone ? "border-rose-500 animate-shake" : "border-white/10"} rounded-2xl px-4 py-4 text-white outline-none transition-all`}
                                        />

                                        {/* عرض رسالة الخطأ المحددة من السيرفر */}
                                        {errors.phone && (
                                            <p className="text-rose-500 text-xs mt-2 mr-2 font-bold flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">
                                                    error
                                                </span>
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* تفاصيل العقار */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                    المحافظة *
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-white p-5 focus:border-accent-gold outline-none appearance-none"
                                    onChange={(e) =>
                                        setData("governorate", e.target.value)
                                    }
                                >
                                    <option value="">اختر..</option>
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
                                            className="bg-background-dark"
                                        >
                                            {gov}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                    نوع العقار *
                                </label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-white p-5 focus:border-accent-gold outline-none appearance-none"
                                    onChange={(e) =>
                                        setData("property_type", e.target.value)
                                    }
                                >
                                    <option value="">اختر النوع..</option>
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
                                            className="bg-background-dark"
                                        >
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                    المساحة *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl text-white p-5 focus:border-accent-gold outline-none"
                                    placeholder="مثال: 200 م²"
                                    onChange={(e) =>
                                        setData("area", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {/* الحقل الديناميكي لنوع العقار */}
                        {data.property_type === "غير ذلك" && (
                            <div className="animate-fade-in space-y-2">
                                <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2 underline">
                                    يرجى تحديد النوع بدقة *
                                </label>
                                <input
                                    className="w-full bg-white/5 border border-accent-gold/30 rounded-2xl text-white p-5 focus:border-accent-gold outline-none shadow-[0_0_20px_rgba(197,160,89,0.05)]"
                                    placeholder="مثال: مكتب تجاري، مستودع، محل.."
                                    onChange={(e) =>
                                        setData(
                                            "other_property_type",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                الموقع التفصيلي *
                            </label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl text-white p-5 focus:border-accent-gold outline-none"
                                placeholder="مثال: دمشق - المالكي - شارع الجلاء"
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            />
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
                            <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                تفاصيل إضافية (اختياري)
                            </label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-2xl text-white p-5 h-32 focus:border-accent-gold outline-none resize-none"
                                placeholder="اذكر أي تفاصيل تزيد من قيمة العقار (إطلالة، كسوة سوبر ديلوكس، الخ..)"
                                onChange={(e) =>
                                    setData(
                                        "additional_details",
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-accent-gold text-[10px] font-black uppercase tracking-widest mr-2">
                                صور وفيديوهات العقار (يمكنك اختيار ملفات متعددة)
                            </label>
                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-accent-gold/40 transition-colors bg-white/5">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-4xl text-accent-gold mb-2 block">
                                        cloud_upload
                                    </span>
                                    <p className="text-slate-400 text-sm">
                                        اسحب الملفات هنا أو اضغط للاختيار
                                    </p>
                                </label>

                                {/* عرض عدد الملفات المختارة */}
                                {data.media.length > 0 && (
                                    <p className="mt-4 text-accent-gold text-xs font-bold animate-pulse">
                                        تم اختيار {data.media.length} ملفات
                                        جاهزة للرفع
                                    </p>
                                )}
                                {uploading && (
                                    <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                                        <div
                                            className="bg-accent-gold h-2 rounded-full transition-all"
                                            style={{
                                                width: `${uploadProgress}%`,
                                            }}
                                        ></div>
                                        <p className="text-white text-[10px] mt-1 text-center font-bold">
                                            جاري الرفع الفوري: {uploadProgress}%
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing || uploading} // تعطيل الزر أثناء الرفع الفوري
                            className="w-full bg-accent text-[#0b1c2d] font-black py-4 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-xl hover:opacity-90 disabled:opacity-70 justify-center gap-3 inline-flex items-center"
                        >
                            {uploading
                                ? "جاري رفع الملفات..."
                                : processing
                                  ? "جاري الحفظ..."
                                  : "إرسال الطلب"}
                        </button>
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

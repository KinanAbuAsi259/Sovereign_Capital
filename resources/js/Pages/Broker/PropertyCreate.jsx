import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function PropertyCreate() {
    // 1. إعداد النموذج باستخدام useForm لربط الحقول بالـ Backend
    const { data, setData, post, processing, errors, progress } = useForm({
        title: "",
        location: "",
        price: "",
        type: "villa", // القيمة الافتراضية
        area: "",
        description: "",
        images: [], // مصفوفة لتخزين الملفات المرفوعة
    });

    // 2. دالة معالجة الإرسال
    const submit = (e) => {
        e.preventDefault();
        // إرسال البيانات إلى مسار property.store الذي عرفناه في web.php
        post(route("property.store"), {
            forceFormData: true, // ضروري جداً لرفع الصور والملفات
            onSuccess: () => alert("تم إرسال العقار للمراجعة بنجاح!"),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="إضافة عقار استراتيجي - Sovereign Capital" />

            <div
                className="max-w-4xl mx-auto py-12 px-6 space-y-12 text-right"
                dir="rtl"
            >
                {/* Header الفخم */}
                <header className="space-y-2">
                    <span className="text-accent text-[10px] font-black uppercase tracking-[0.4em] border-r-2 border-accent pr-3">
                        Asset Acquisition
                    </span>
                    <h2 className="text-4xl font-light text-white italic tracking-tighter">
                        إدراج <span className="text-accent">عقار جديد</span> في
                        المحفظة
                    </h2>
                </header>

                <form onSubmit={submit} className="space-y-10">
                    {/* قسم رفع الصور (Media) */}
                    <section className="space-y-5 bg-[#0b1c2d]/50 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent text-2xl font-light">
                                image
                            </span>
                            الوسائط المرئية
                        </h3>

                        <div className="group relative flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl bg-[#13191f]/50 hover:border-accent/50 transition-all cursor-pointer">
                            {/* حقل اختيار الملفات المتعددة */}
                            <input
                                type="file"
                                multiple
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                                onChange={(e) =>
                                    setData("images", e.target.files)
                                } // تخزين الملفات في الحالة
                            />

                            <div className="flex flex-col items-center text-center p-8">
                                <div className="mb-5 p-5 bg-primary/80 rounded-full border border-white/5 shadow-xl text-accent group-hover:scale-110 transition-all">
                                    <span className="material-symbols-outlined text-5xl font-light">
                                        cloud_upload
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-white">
                                    ارفع صور العقار (عالية الجودة)
                                </p>
                                <p className="text-slate-500 text-sm mt-2">
                                    يمكنك اختيار عدة صور معاً بحد أقصى 10 صور
                                </p>
                            </div>

                            {/* شريط تقدم الرفع (ظهر ديناميكياً) */}
                            {progress && (
                                <div className="absolute bottom-0 left-0 w-full bg-accent/20 h-1">
                                    <div
                                        className="bg-accent h-full transition-all"
                                        style={{
                                            width: `${progress.percentage}%`,
                                        }}
                                    ></div>
                                </div>
                            )}
                        </div>
                        {errors.images && (
                            <p className="text-red-400 text-xs font-bold">
                                {errors.images}
                            </p>
                        )}
                    </section>

                    {/* المعلومات الأساسية */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0b1c2d]/50 border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                اسم العقار
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-[#13191f]/80 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent outline-none transition-all"
                                placeholder="مثال: قصر السيادة - يعفور"
                            />
                            {errors.title && (
                                <p className="text-red-400 text-xs">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                المساحة (م²)
                            </label>
                            <input
                                type="number"
                                value={data.area}
                                onChange={(e) =>
                                    setData("area", e.target.value)
                                }
                                className="w-full bg-[#13191f]/80 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent outline-none transition-all"
                                placeholder="500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                السعر المطلوب (USD)
                            </label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                className="w-full bg-[#13191f]/80 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent outline-none transition-all"
                                placeholder="1,200,000"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                الوصف الاستراتيجي
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="w-full bg-[#13191f]/80 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent outline-none transition-all h-32"
                                placeholder="صِف الميزات التنافسية للعقار..."
                            />
                        </div>
                    </section>

                    {/* أزرار التحكم */}
                    <div className="pt-6 flex justify-between items-center">
                        <button className="text-slate-500 hover:text-white transition-colors">
                            إلغاء العملية
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-accent text-primary px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
                        >
                            {processing
                                ? "جاري المعالجة..."
                                : "إدراج العقار في النظام"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

import { useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
    const { temp_lead_data, flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        role: "investor",
        country_code: "+963",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();
        // عند نجاح هذا الطلب، الكنترولر سيرد بـ redirect('dashboard')
        // و Inertia ستقوم بالتنقل تلقائياً
        post(route("register"));
    };
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

    return (
        <div
            className="min-h-screen bg-background-dark text-white p-6"
            dir="rtl"
        >
            <Toaster />
            <div className="max-w-md mx-auto bg-white/5 border border-white/10 p-8 rounded-xl shadow-2xl">
                {/* العنوان في المنتصف */}
                <h1 className="text-2xl font-bold mb-6 text-accent-gold uppercase tracking-widest text-center">
                    تسجيل مستخدم
                </h1>
                <p className="text-slate-400 text-sm mb-8 italic text-right">
                    يرجى اختيار كلمة مرور قوية لحماية حسابك الاستثماري.
                </p>

                <form onSubmit={submit} className="space-y-4">
                    {/* الحقول (المحاذاة لليمين) */}
                    <div className="text-right">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-right"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="الاسم"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* حقل الهاتف مع النداء الدولي (على اليمين) */}
                    <div className="mt-4">
                        <label className="text-white">رقم الهاتف *</label>
                        <div className="flex flex-row-reverse bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-accent-gold transition-all">
                            <select
                                className="bg-background-dark/50 border-0 border-l border-white/10 text-white px-3 outline-none text-sm cursor-pointer"
                                value={data.country_code}
                                onChange={(e) =>
                                    setData("country_code", e.target.value)
                                }
                            >
                                {countryCodes.map((c) => (
                                    <option
                                        key={c.code}
                                        value={c.code}
                                        className="text-black"
                                    >
                                        {c.label}{" "}
                                        {c.code !== "other" ? c.code : ""}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                dir="ltr"
                                className="flex-1 bg-transparent border-0 text-white p-4 outline-none text-left"
                                placeholder="9xx xxx xxx"
                                onChange={(e) =>
                                    setData(
                                        "phone",
                                        e.target.value.replace(/\D/g, ""),
                                    )
                                }
                                required
                            />
                        </div>
                        {errors.phone && (
                            <div className="text-red-500 text-xs">
                                {errors.phone}
                            </div>
                        )}
                    </div>
                    {/* البريد الإلكتروني (اختياري) */}
                    <div className="mt-4">
                        <label className="text-white">
                            البريد الإلكتروني (اختياري)
                        </label>
                        <input
                            type="email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 space-y-2 relative text-right">
                        <label className="text-slate-300 text-sm mr-2 font-bold">
                            أنا أسجل كـ *
                        </label>
                        <div className="relative">
                            <select
                                className="w-full bg-background-dark border border-white/10 rounded-xl text-white p-4 appearance-none focus:border-accent-gold outline-none"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="investor">مستثمر</option>
                                <option value="broker">وسيط عقاري</option>
                            </select>

                            {/* السهم الذهبي الاحترافي */}
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-accent-gold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.role && (
                            <p className="text-red-500 text-xs">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-right"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="كلمة المرور"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="text-right">
                        <input
                            type="password"
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-right"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="تأكيد كلمة المرور"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-accent-gold text-primary font-bold py-3 rounded-lg hover:bg-white transition-all"
                    >
                        {processing ? "جاري المعالجة..." : "إنشاء الحساب "}
                    </button>
                </form>
            </div>
        </div>
    );
}

import { useEffect } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "", // الحقل الموحد
        password: "",
        country_code: "+963",
        remember: false,
    });

    useEffect(() => {
        if (flash?.error) toast.error(flash.error);
        if (flash?.success) toast.success(flash.success);
    }, [flash]);

    const isPhone = /^\d+$/.test(data.login.replace("+", ""));

    const submit = (e) => {
        e.preventDefault(); // يمنع المتصفح من إعادة تحميل الصفحة (Reload) بشكل تقليدي

        post(route("login"), {
            // يرسل البيانات (login, password, etc) إلى مسار الـ login في لارافل
            onFinish: () => reset("password"), // دالة تُنفذ فور انتهاء الطلب (سواء نجح أو فشل) لمسح حقل الباسورد للأمان
        });
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
            className="min-h-screen bg-background-dark text-white flex items-center justify-center p-6"
            dir="rtl"
        >
            <Toaster />
            <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                <Head title="تسجيل الدخول" />

                <h1 className="text-3xl font-black mb-2 text-accent-gold text-center">
                    مرحباً بك
                </h1>
                <p className="text-slate-400 text-sm mb-8 text-center italic">
                    سجل دخولك لمتابعة استثماراتك العقارية
                </p>

                <form onSubmit={submit} className="space-y-6">
                    {/* حقل الإيميل أو الهاتف */}
                    <div className="text-right">
                        <label className="text-slate-300 text-sm mr-2 mb-2 block font-bold">
                            البريد أو الهاتف
                        </label>
                        <div className="flex flex-row-reverse bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-accent-gold transition-all">
                            {isPhone && (
                                <select
                                    className="bg-background-dark/80 border-0 border-l border-white/10 text-white px-2 outline-none text-xs"
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
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <input
                                type="text"
                                className="flex-1 bg-transparent border-0 text-white p-4 outline-none text-right"
                                placeholder="رقم الهاتف أو البريد"
                                value={data.login}
                                onChange={(e) =>
                                    setData("login", e.target.value)
                                }
                            />
                        </div>
                        {errors.login && (
                            <p className="text-red-500 text-xs mt-2 pr-2">
                                {errors.login}
                                {/* <pre className="text-red-500">{JSON.stringify(errors, null, 2)}</pre> */}
                            </p>
                        )}
                    </div>

                    {/* حقل كلمة المرور */}
                    <div className="text-right">
                        <label className="text-slate-300 text-sm mr-2 mb-2 block font-bold">
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-accent-gold outline-none text-right transition-all"
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-2 pr-2">
                                {errors.password}
                                {/* <pre className="text-red-500">{JSON.stringify(errors, null, 2)}</pre> */}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-accent text-[#0b1c2d] font-black py-4 rounded-xl hover:bg-white transition-all shadow-lg shadow-accent-gold/20"
                    >
                        {processing ? "جاري التحقق..." : "تسجيل الدخول"}
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
    );
}

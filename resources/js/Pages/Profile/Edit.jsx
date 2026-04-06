import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, usePage, Head } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function Edit() {
    const { auth } = usePage().props;

    // 1. نموذج تحديث البيانات الأساسية
    const {
        data: profileData,
        setData: setProfileData,
        patch: patchProfile,
        errors: profileErrors,
        processing: profileProcessing,
        recentlySuccessful: profileSuccessful,
    } = useForm({
        name: auth.user.name,
        phone: auth.user.phone || "",
    });

    // 2. نموذج تحديث كلمة المرور
    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        recentlySuccessful: passwordSuccessful,
        reset: resetPassword, // أضفنا reset لتصفير الحقول
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

   const submitProfile = (e) => {
    e.preventDefault();
    console.log("البيانات المرسلة للتحديث:", profileData); // للتأكد في الكونسول
    patchProfile(route("profile.update"), { 
        preserveScroll: true,
        onSuccess: () => toast.success("تم تحديث بيانات الهوية بنجاح")
    });
};

    const submitPassword = (e) => {
        e.preventDefault();
        putPassword(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => resetPassword(), // تصفير كل حقول كلمة المرور عند النجاح
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="إعدادات الهوية - Sovereign Capital" />

            <div
                className="max-w-4xl mx-auto py-12 px-6 space-y-12 text-right"
                dir="rtl"
            >
                {/* العنوان الرئيسي */}
                <header className="space-y-2">
                    <span className="text-accent text-[10px] font-black uppercase tracking-[0.5em] border-r-2 border-accent pr-3">
                        Vault Settings
                    </span>
                    <h2 className="text-4xl font-light text-white italic tracking-tighter">
                        إدارة{" "}
                        <span className="text-accent">الهوية الرقمية</span>
                    </h2>
                </header>

                {/* القسم الأول: المعلومات الأساسية */}
                <section className="bg-[#0b1c2d]/50 border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <form onSubmit={submitProfile} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                    الاسم الرسمي
                                </label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) =>
                                        setProfileData("name", e.target.value)
                                    }
                                    className="w-full bg-[#13191f]/60 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent focus:ring-0 transition-all outline-none placeholder:text-white/20"
                                />
                                {profileErrors.name && (
                                    <p className="text-red-400 text-xs mt-1 font-bold">
                                        {profileErrors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                    رقم التواصل (WhatsApp)
                                </label>
                                <input
                                    type="text"
                                    value={profileData.phone}
                                    onChange={(e) =>
                                        setProfileData("phone", e.target.value)
                                    }
                                    className="w-full bg-[#13191f]/60 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent focus:ring-0 transition-all outline-none placeholder:text-white/20"
                                    placeholder="+963..."
                                />
                                {profileErrors.phone && (
                                    <p className="text-red-400 text-xs mt-1 font-bold">
                                        {profileErrors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                disabled={profileProcessing}
                                className="bg-accent text-primary px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-accent/10"
                            >
                                حفظ البيانات الجديدة
                            </button>

                            <Transition
                                show={profileSuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-green-400 text-sm font-bold">
                                    ✓ تم التحديث بنجاح
                                </p>
                            </Transition>
                        </div>
                    </form>
                </section>

                {/* القسم الثاني: تحديث كلمة المرور */}
                <section className="bg-[#0b1c2d]/50 border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500/30 group-hover:bg-accent transition-colors"></div>
                    <header className="mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <span className="material-symbols-outlined text-accent text-2xl font-light">
                                lock_reset
                            </span>
                            تحديث مفاتيح الدخول الآمن
                        </h3>
                    </header>

                    <form onSubmit={submitPassword} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* حقل كلمة المرور الحالية */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                    كلمة المرور الحالية
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.current_password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "current_password",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-[#13191f]/60 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent focus:ring-0 transition-all outline-none"
                                />
                                {passwordErrors.current_password && (
                                    <p className="text-red-400 text-xs mt-1 font-bold">
                                        {passwordErrors.current_password}
                                    </p>
                                )}
                            </div>

                            {/* كلمة المرور الجديدة */}
                            <div className="space-y-2">
                                <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                    كلمة المرور الجديدة
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-[#13191f]/60 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent focus:ring-0 transition-all outline-none"
                                />
                                {passwordErrors.password && (
                                    <p className="text-red-400 text-xs mt-1 font-bold">
                                        {passwordErrors.password}
                                    </p>
                                )}
                            </div>

                            {/* تأكيد كلمة المرور الجديدة (هذا الحقل هو الذي كان ينقصك) */}
                            <div className="space-y-2">
                                <label className="text-accent text-[10px] font-black uppercase tracking-widest mr-2">
                                    تأكيد كلمة المرور
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-[#13191f]/60 border-white/10 rounded-xl text-white py-4 px-6 focus:border-accent focus:ring-0 transition-all outline-none"
                                />
                                {passwordErrors.password_confirmation && (
                                    <p className="text-red-400 text-xs mt-1 font-bold">
                                        {passwordErrors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                disabled={passwordProcessing}
                                className="bg-primary border border-accent/30 text-accent px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-accent hover:text-primary transition-all shadow-lg"
                            >
                                تحديث كلمة المرور
                            </button>

                            <Transition
                                show={passwordSuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-green-400 text-sm font-bold animate-pulse">
                                    ✓ تم تحديث المفاتيح
                                </p>
                            </Transition>
                        </div>
                    </form>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

import { useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import MainLayout from "@/Layouts/MainLayout";

export default function LandingPage() {
    // جلب البيانات من props الخاصة بـ Inertia
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash && flash.success) {
            toast.success(flash.success, { id: "success-toast" }); // استخدام id ثابت يمنع التكرار
            flash.success = null; // تنظيف الرسالة يدوياً
        }
    }, [flash]); // ستعمل الدالة فور تغير قيمة flash

    return (
        <MainLayout>
            <Head title="الرئيسية - Sovereign Capital" />

            {/* هذا المكون ضروري جداً لظهور الرسالة على الشاشة */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* Hero Section */}
            {/* القسم الرئيسي يغطي كامل الشاشة ويتمركز فيه كل شيء */}
            <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden bg-[#0b1c2d]">
                {/* خلفية ساحة الأمويين الثابتة */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] scale-105"
                    style={{
                        backgroundImage: "url('/assets/background.png')",
                        backgroundBlendMode: "multiply",
                        opacity: 0.2, // تعميق الصورة لبروز المحتوى الذهبي
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#0b1c2d]/20 via-[#0b1c2d]/20 to-[#0b1c2d]"></div>

                {/* ⭕️ السر هنا: هذه الحاوية تجمع الشعار والنص وتضعهما في منتصف الصورة تماماً */}
                <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-center w-full">
                    {/* الـ Grid الداخلي يحافظ على ترتيبك (3 شعار : 9 نص) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center w-full">
                        {/* Column 1: الشعار (يبقى على اليسار في الترتيب ولكن داخل المجموعة المتمركزة) */}
                        {/* Column 1: الشعار */}
                        <div className="md:col-span-4 flex justify-center md:justify-end">
                            <Link
                                href="/"
                                className="group transition-transform duration-500 hover:scale-110 block relative z-10 p-0.15"
                                // ❌ حذفنا الـ transform اليدوي الثابت هنا لضمان التوسط
                            >
                                <div className="relative p-0.21 flex justify-center">
                                    <div className="absolute inset-0 bg-accent-gold opacity-10 blur-3xl rounded-full scale-150"></div>
                                    <img
                                        src="/assets/logo.png"
                                        alt="أيقونة Sovereign Capital"
                                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            // جعل الحجم مرناً أكثر: في الجوال 200px وفي الشاشات الكبيرة يصل لـ 400px
                                            width: "clamp(200px, 25vw, 400px)",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Column 2: النصوص (تبقى على اليمين في الترتيب) */}
                        <div className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-right space-y-6 md:space-y-8">
                            <h1 className="text-4xl md:text-3xl lg:text-24xl font-black text-white leading-tight tracking-tighter">
                                فرص استثمارية{" "}
                                <span className="text-accent-gold italic relative">
                                    حصرية
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-accent-gold rounded-full opacity-50"></span>
                                </span>{" "}
                                في سوريا
                            </h1>

                            <p className="text-slate-200 text-lg md:text-1xl font-light leading-relaxed max-w-2xl opacity-90 tracking-wide">
                                المنصة الأولى لاستقبال طلبات الشركات الاستثمارية
                                والمستثمرين في الخارج، لنفتح لك أبواب الاستثمار
                                الآمن والمربح بفضل شبكة علاقاتنا الواسعة
                            </p>

                            {/* الأزرار */}
                            <div className="flex flex-col sm:flex-row gap-5 items-center pt-4 w-full sm:w-auto">
                                <Link
                                    href="/investor-page"
                                    className="flex items-center justify-center bg-accent-gold text-[#0b1c2d] font-black py-4 px-8 rounded-xl text-lg shadow-2xl hover:scale-110 transition-all duration-300 min-w-[200px] text-center bg-accent text-[#0b1c2d] font-black py-3 rounded-xl text-sm
                        "
                                >
                                    تقديم طلب الاستثمار
                                </Link>

                                <Link
                                    href={route("services")} // تأكد من استخدام route() إذا كنت تستخدم Ziggy
                                    className="flex items-center justify-center border-2 border-white/20 text-white px-10 py-4 rounded-xl text-lg font-bold tracking-widest uppercase transition-all duration-300 min-w-[200px] hover:border-accent-gold/60 hover:bg-accent-gold/10 hover:text-accent-gold hover:shadow-[0_0_20px_rgba(197,160,89,0.2)]"
                                >
                                    اكتشف خدماتنا
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* باقي الأجزاء (Cards, Why Choose Us) تعمل بشكل صحيح */}
            {/* Cards Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {[
                        {
                            title: "خدمة بيع العقار",
                            desc: "نستقبل العروض ونؤمن زبائن بكفاءة عالية",
                            img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
                            url: route("owner.page"), // الواجهة الخاصة بالبائعين
                        },
                        {
                            title: "أصول مميزة",
                            desc: "أراضي وفلل ومجمعات",
                            img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
                            url: route("customer.page"), // الواجهة الخاصة بالزبائن (شراء)
                        },
                        {
                            title: "عقارات سكنية",
                            desc: "شقق فاخرة وتصاميم حديثة",
                            img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
                            url: route("customer.page"), // الواجهة الخاصة بالزبائن (شراء)
                        },
                    ].map((card, index) => (
                        <Link
                            key={index}
                            href={card.url}
                            className="group relative aspect-[4/5] md:aspect-[5/6] rounded-xl overflow-hidden cursor-pointer border border-white/10 p-2 bg-background-dark/50 hover:border-accent-gold/50 transition-all duration-300 block"
                        >
                            <div className="relative w-full h-full rounded-lg overflow-hidden">
                                <img
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    src={card.img}
                                    alt={card.title}
                                />
                                {/* Overlay التدرج اللوني */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                                    <h4 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2">
                                        {card.title}
                                    </h4>
                                    <p className="text-accent-gold text-xs md:text-sm font-medium">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            {/* تصغير القسم قليلاً لزيادة التركيز py-12 md:py-24 */}
            <section className="relative overflow-hidden py-12 md:py-20 px-4 text-center border-y border-white/5 bg-[#0b1c2d]">
                {/* 1. الطبقة المخططة الأساسية (The Stripted Pattern) */}
                {/* ⭕️ الحل الجذري: نضع النمط المخطط كخلفية للقسم نفسه عبر الـ style لضمان ظهوره */}
                <div
                    className="absolute inset-0 opacity-[0.06]" // شفافية خفيفة جداً ليكون النمط ناعماً
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, #c5a059 0px, #c5a059 1px, transparent 1px, transparent 8px)`,
                        // تكرار خط رفيع ذهبي (1px) يليه فراغ شفاف (8px) لنمط مخطط فخم
                    }}
                ></div>

                {/* 2. طبقة التوهج الذهبي المركزي (Radial Glow) لبروز النص */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(197,160,89,0.08)_0%,_transparent_75%)]"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-4 md:space-y-6 flex flex-col items-center justify-center">
                    {/* شارة علوية مدعومة بخطوط ذهبية فخمة */}
                    <div className="inline-flex items-center gap-3 mb-1">
                        <span className="h-[1px] w-8 bg-accent-gold/40"></span>
                        <h3 className="text-accent-gold font-black uppercase tracking-[0.4em] text-xs md:text-xs">
                            لماذا تختارنا؟
                        </h3>
                        <span className="h-[1px] w-8 bg-accent-gold/40"></span>
                    </div>

                    {/* ⭕️ تعديل تصغير الخط: تم تصغير خط العنوان الرئيسي ليكون أكثر رزانة (من text-4xl إلى text-3xl) */}
                    <h2 className="text-white text-2xl md:text-3xl font-black leading-tight drop-shadow-2xl max-w-xl">
                        شبكة وسطاء بخبرة تتجاوز{" "}
                        <span className="text-accent-gold">15 عاماً</span> في
                        الصفقات الكبرى
                    </h2>

                    {/* ⭕️ تعديل تصغير الخط: تم تصغير خط الوصف ليكون أكثر نعومة (من text-lg إلى text-base) */}
                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed max-w-lg opacity-90">
                        اغتنم الفرصة الذهبية في الاستثمار في أفضل المواقع في
                        سوريا مع Sovereign Capital
                    </p>

                    <div className="pt-6 md:pt-8 flex justify-center items-center">
                        <Link
                            href="/investor-page"
                            className="group relative inline-flex items-center gap-3 bg-accent-gold text-primary px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:scale-105 shadow-[0_10px_30px_rgba(197,160,89,0.15)] text-center bg-accent text-[#0b1c2d] font-black py-3 rounded-xl text-sm"
                        >
                            تقديم طلب الاستثمار
                            {/* أيقونة فخمة للأمان والاستثمار */}
                            <span className="material-symbols-outlined text-sm">
                                verified_user
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import OwnerRow from './Partials/OwnerRow';
import InvestorRow from './Partials/InvestorRow';
import CustomerRow from './Partials/CustomerRow';

export default function BrokerDashboard({ auth, owners, investors, customers }) {
    const [activeTab, setActiveTab] = useState('owners');

    // دالة تحديث الحالة (تم التواصل / لم يتم التواصل)
    const handleStatusUpdate = (id, type) => {
        router.post(route('admin.updateStatus', { id, type }), {}, {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            // تمرير الأيقونات والتبويبات الخاصة بالوسيط فقط للـ Drawer
            sidebarItems={[
                { id: 'owners', label: 'عقارات الملاك', icon: 'real_estate_agent' },
                { id: 'investors', label: 'طلبات المستثمرين', icon: 'monitoring' },
                { id: 'customers', label: 'طلبات الزبائن', icon: 'person_search' },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            <Head title="لوحة العمليات - الوسيط" />

            <div className="py-12 px-4 md:px-8 bg-[#0b1c2d] min-h-screen">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* هيدر الصفحة */}
                    {/* هيدر الصفحة المطوّر */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
    <div className="flex items-center gap-4 md:gap-6 w-full">
        {/* الأيقونة: صغرت من p-4 إلى p-2.5 في الجوال */}
        <div className="bg-[#d4af37] p-2.5 md:p-4 rounded-2xl md:rounded-3xl shadow-[0_0_20px_rgba(212,175,55,0.15)] shrink-0">
            <span className="material-symbols-outlined text-[#0b1c2d] text-xl md:text-3xl font-black">
                {activeTab === 'owners' ? 'real_estate_agent' : activeTab === 'investors' ? 'monitoring' : 'person_search'}
            </span>
        </div>
        
        <div>
            {/* العنوان: صغر من 3xl إلى xl في الجوال */}
            <h1 className="text-xl md:text-3xl font-black text-white italic tracking-tighter leading-tight">
                إدارة <span className="text-[#d4af37]">
                    {activeTab === 'owners' ? 'عقارات الملاك' : activeTab === 'investors' ? 'طلبات المستثمرين' : 'طلبات الزبائن'}
                </span>
            </h1>
            <p className="text-white/30 text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-0.5">
                Operational Control Center
            </p>
        </div>
    </div>
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

                    {/* الجدول الذهبي الملكي */}
                    <div className="bg-[#0b1c2d] border border-[#d4af37]/20 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md">
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="sticky top-0 z-10 bg-gradient-to-l from-[#d4af37] via-[#f2d472] to-[#d4af37] text-[#0b1c2d] uppercase text-[14px] font-black tracking-[0.15em] shadow-xl">
                                        <th className="p-6 border-b border-black/5">الاسم / التاريخ</th>
                                        <th className="p-6 border-b border-black/5">الهاتف / المحافظة</th>

                                        {activeTab === "owners" && (
                                            <th className="p-6 border-b border-black/5">نوع العقار / الموقع / المساحة</th>
                                        )}

                                        {activeTab === "investors" && (
                                            <>
                                                <th className="p-6 border-b border-black/5">الميزانية / الهدف</th>
                                                <th className="p-6 border-b border-black/5 text-center">المساحة المطلوبة</th>
                                            </>
                                        )}

                                        {activeTab === "customers" && (
                                            <th className="p-6 border-b border-black/5">طلب الزبون / الموقع</th>
                                        )}

                                        <th className="p-6 border-b border-black/5 text-center">الوسائط</th>
                                        <th className="p-6 border-b border-black/5 text-center">حالة التواصل</th>
                                        <th className="p-6 border-b border-black/5 text-center">الإجراء</th>
                                    </tr>
                                </thead>

                                <tbody className="text-white text-[15px] divide-y divide-white/5">
                                    {activeTab === "owners" && owners.map((item) => (
                                        <OwnerRow key={item.id} item={item} onUpdate={handleStatusUpdate} />
                                    ))}

                                    {activeTab === "investors" && investors.map((item) => (
                                        <InvestorRow key={item.id} item={item} onUpdate={handleStatusUpdate} />
                                    ))}

                                    {activeTab === "customers" && customers.map((item) => (
                                        <CustomerRow key={item.id} item={item} onUpdate={handleStatusUpdate} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
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
<?php

// namespace App\Http\Controllers;

// use App\Models\CustomerRequest;
// use App\Models\InvestorRequest;
// use App\Models\OwnerRequest;
// use Inertia\Inertia;
// use Illuminate\Http\Request;

// class BDashboardController extends Controller
// {
//     public function index()
//     {
//         // جلب البيانات مع التأكد من تحويلها لمصفوفة
//         $investors = InvestorRequest::latest()->get();
//         $customers = CustomerRequest::latest()->get();
//         $owners = OwnerRequest::with('media')->latest()->get();

//         // تأكد أن الأسماء (keys) هنا تطابق تماماً ما نكتبه في React
//         return Inertia::render('Broker/BDashboard', [
//             'investors' => $investors,
//             'customers' => $customers,
//             'owners'    => $owners,
//         ]);
//     }

//     // دالة لتغيير حالة الطلب (تم التواصل / لم يتم)
//    public function updateStatus(Request $request, $id, $type)
// {
//     $model = match($type) {
//         'customer' => \App\Models\CustomerRequest::findOrFail($id),
//         'owner' => \App\Models\OwnerRequest::findOrFail($id),
//         'investor' => \App\Models\InvestorRequest::findOrFail($id),
//     };

//     // تبديل الحالة برمجياً
//     $newStatus = ($model->status === 'لم يتم التواصل') ? 'تم التواصل' : 'لم يتم التواصل';
//     $model->update(['status' => $newStatus]);

//     return redirect()->back()->with('success', "تم تحديث الحالة إلى: $newStatus");
// }
// }

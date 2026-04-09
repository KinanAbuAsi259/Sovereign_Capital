<?php

use App\Http\Controllers\BDashboardController;
use App\Http\Controllers\CustomerPageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OwnerPageController;
use App\Http\Controllers\ProfileController; // استيراد الـ Controller الجديد
use App\Http\Controllers\PropertyController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/setup-admin', function () {
//     // 1. حذف أي مستخدم قديم بنفس الإيميل لتجنب التكرار
//     User::where('email', 'kinanabuasi.ka@gmail.com')->delete();

//     // 2. إنشاء حساب الأدمن الجديد
//     $user = User::create([
//         'name' => 'Kinan Admin',
//         'email' => 'kinanabuasi.ka@gmail.com',
//         'phone' => '982057009',
//         'country_code' => '+963',
//         'password' => Hash::make('0909090909Ss$'), // كلمة السر
//         'role' => 'admin',
//         'can_view_owners' => true,
//         'can_view_investors' => true,
//         'can_view_customers' => true,
//     ]);

//     return "تم إنشاء حساب الأدمن بنجاح! يمكنك الآن تسجيل الدخول بكلمة سر: 0909090909Ss$";
// });

// [1] مسارات عامة للجميع (بدون أي ميدلوير)
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('landing');
// مسارات خدمة بيع العقار (عامة)
Route::get('/owner-page', [OwnerPageController::class, 'index'])->name('owner.page');
Route::post('/owner-page', [OwnerPageController::class, 'store'])->name('owner.store');

Route::get('/customer-page', [CustomerPageController::class, 'index'])->name('customer.page');
Route::post('/customer-page', [CustomerPageController::class, 'store'])->name('customer.store');
Route::post('/update-status/{id}/{type}', [DashboardController::class, 'updateStatus'])
        ->name('admin.updateStatus');

Route::post('/investor-page', [LeadController::class, 'store'])->name('lead.store');
Route::get('/investor-page', [LeadController::class, 'index'])->name('investor.page');
Route::post('/upload-temp', [LeadController::class, 'uploadTemp'])->name('upload.temp');
// [2] مسارات الضيوف فقط (الذين لم يسجلوا دخولهم)

Route::middleware('guest')->group(function () {
    // تأكد أنه خارج أي Group يخص الـ auth
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // مسارات التسجيل والدخول يتم استدعاؤها من auth.php تلقائياً
});
Route::get('/test-safe', function () {
    return 'I AM ALIVE';
});

// [3] المسارات المحمية (للمسجلين فقط بناءً على الدور)
// في ملف web.php
// web.php
Route::middleware(['auth'])->group(function () {
    // المسار الموحد للوحة التحكم
    Route::post('/admin/add-broker', [DashboardController::class, 'addBroker'])->name('admin.addBroker');
    Route::post('/admin/update-permissions/{id}', [DashboardController::class, 'updatePermissions'])->name('admin.updatePermissions');
Route::delete('/admin/delete-broker/{user}', [DashboardController::class, 'deleteBroker'])->name('admin.deleteBroker');
Route::get('/bdashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

Route::get('/broker/dashboard', [DashboardController::class, 'brokerIndex'])->name('broker.dashboard');

    // مسار تحديث الحالة
    Route::post('/bdashboard/status/{id}/{type}', [DashboardController::class, 'updateStatus'])->name('bdashboard.updateStatus');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    Route::get('/properties/create', [PropertyController::class, 'create'])->name('property.create');
    Route::post('/properties', [PropertyController::class, 'store'])->name('property.store');

    // Route::get('/bdashboard', [BDashboardController::class, 'index'])->name('bdashboard.index');
}
);

require __DIR__.'/auth.php';

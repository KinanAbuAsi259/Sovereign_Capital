<?php

use App\Http\Controllers\CustomerPageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\OwnerPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StaticController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/about', [StaticController::class, 'about'])->name('about');
Route::get('/workflow', [StaticController::class, 'workflow'])->name('workflow');
Route::get('/security', [StaticController::class, 'security'])->name('security');
Route::get('/services', function () {
    return Inertia::render('ServicesPage'); // اسم ملف الـ React الجديد
})->name('services');
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

    // مسارات تحديث الملاحظات المنفصلة
    Route::post('/admin/notes/owner/{id}', [DashboardController::class, 'updateOwnerNote'])->name('admin.owner.note');
    Route::post('/admin/notes/investor/{id}', [DashboardController::class, 'updateInvestorNote'])->name('admin.investor.note');
    Route::post('/admin/notes/customer/{id}', [DashboardController::class, 'updateCustomerNote'])->name('admin.customer.note');
    Route::get('/broker/dashboard', [DashboardController::class, 'brokerIndex'])->name('broker.dashboard');

    // مسار تحديث الحالة
    Route::post('/bdashboard/status/{id}/{type}', [DashboardController::class, 'updateStatus'])->name('bdashboard.updateStatus');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

}
);

require __DIR__.'/auth.php';

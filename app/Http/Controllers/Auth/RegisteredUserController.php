<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

// class RegisteredUserController extends Controller
// {
//     /**
//      * عرض صفحة التسجيل (هذه هي الدالة التي كانت مفقودة)
//      */
//     public function create(): Response
//     {
//         return Inertia::render('Auth/Register');
//     }

//     /**
//      * معالجة طلب التسجيل وحفظ البيانات
//      */
//     public function store(Request $request): RedirectResponse
//     {
//         $request->validate([
//             'name' => 'required|string|max:255',
//             'email' => 'nullable|string|lowercase|email|max:255|unique:'.User::class, // أصبح nullable
//             'phone' => 'required|string|max:20|unique:'.User::class, // التحقق من الهاتف
//             'country_code' => 'required|string',
//             'role' => 'required|in:investor,broker',
//             'password' => ['required', 'confirmed', Rules\Password::defaults()],
//         ], [
//             'phone.unique' => 'رقم الهاتف مسجل مسبقاً لدينا.',
//             'email.email' => 'يرجى إدخال بريد إلكتروني صحيح.',
//         ]);

//         // داخل RegisteredUserController.php في دالة store

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'phone' => $request->phone,
//             'country_code' => $request->country_code,
//             'password' => Hash::make($request->password),
//             'role' => $request->role, // التأكد من تخزين الدور
//         ]);

//         event(new Registered($user));

//         Auth::login($user); // تسجيل الدخول يدوياً للمستخدم الجديد

//         // هنا السر: استخدم متغير $user الذي أنشأناه فوق مباشرة
//         $targetRoute = ($user->role === 'broker') ? 'broker.dashboard' : 'investor.dashboard';

//         return redirect()->route($targetRoute);

//     }
// }

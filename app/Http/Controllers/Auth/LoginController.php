<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'login_id' => 'required', 
        'password' => 'required',
    ]);

    $loginValue = $request->login_id;
    $fieldType = filter_var($loginValue, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

    if (Auth::attempt(['email' => $email, 'password' => $password], $remember = true)) {
    
        $user = Auth::user();

        // ⭕️ القفل الأمني الذكي
        if ($user->role === 'admin') {
            $request->session()->regenerate();
            return redirect()->intended(route('admin.dashboard'));
        }

        if ($user->role === 'broker') {
            $request->session()->regenerate();
            return redirect()->intended(route('broker.dashboard'));
        }

        // إذا كان مستخدم عادي، نخرجه
        Auth::logout();
        return back()->withErrors(['login_id' => 'عذراً، هذه المنطقة مخصصة للإدارة فقط.']);
    }

    return back()->withErrors(['login_id' => 'بيانات الدخول غير صحيحة.']);
}
//     public function login(Request $request)
// {
//     $request->validate([
//         'login_id' => 'required', 
//         'password' => 'required',
//     ]);

//     $loginValue = $request->login_id;
//     $fieldType = filter_var($loginValue, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

//     if (Auth::attempt([$fieldType => $loginValue, 'password' => $request->password])) {
//         $user = Auth::user();

//         // ⭕️ القفل الأمني: السماح فقط للوسيط أو المدير بالدخول للوحة التحكم
//         if (in_array($user->role, ['broker', 'admin'])) {
//             $request->session()->regenerate();
//             return redirect()->intended(route('broker.dashboard'));
//         }

//         // إذا كان مستخدم عادي (زبون)، نخرجه فوراً
//         Auth::logout();
//         return back()->withErrors(['login_id' => 'عذراً، هذه المنطقة مخصصة للإدارة فقط.']);
//     }

//     return back()->withErrors(['login_id' => 'بيانات الدخول غير صحيحة.']);
// }
    
}

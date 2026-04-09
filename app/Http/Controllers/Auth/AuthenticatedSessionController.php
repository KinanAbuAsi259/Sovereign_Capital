<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        $loginValue = $request->login;
        $field = filter_var($loginValue, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        if (Auth::attempt([$field => $loginValue, 'password' => $request->password], $request->remember)) {
            $request->session()->regenerate();
            $user = Auth::user();

            // 🛑 الحل السحري: استخراج القيمة من الـ Enum أو النص
            $roleValue = $user->role instanceof \UnitEnum ? $user->role->value : $user->role;
            $cleanRole = strtolower(trim((string) $roleValue));

            if ($cleanRole === 'admin') {
                return redirect()->intended('/bdashboard');
            }

            if ($cleanRole === 'broker') {
                return redirect()->intended('/broker/dashboard');
            }

            Auth::logout();

            return back()->withErrors(['login' => 'رتبة الحساب غير مدعومة.']);
        }

        return back()->withErrors(['login' => __('auth.failed')]);
    }

    //     public function store(LoginRequest $request): RedirectResponse
    // {
    //     $request->authenticate();
    //     $request->session()->regenerate();
    //     // السطر السحري لمسح الذاكرة القديمة للروابط
    //     session()->forget('url.intended');
    //     $user = Auth::user();
    //     // التوجيه الصارم للمسار الجديد
    //     return redirect()->to('/bdashboard');
    // }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // إرسال Headers تمنع المتصفح من الاحتفاظ بالصفحة السابقة في الكاش
        return redirect('/')
            ->header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT');
    }
}

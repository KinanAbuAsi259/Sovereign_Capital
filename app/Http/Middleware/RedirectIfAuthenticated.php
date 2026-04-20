<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // app/Http/Middleware/RedirectIfAuthenticated.php
    // app/Http/Middleware/RedirectIfAuthenticated.php
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $role = Auth::user()->role;
                if ($role === 'admin') {
                    return redirect('/admin/dashboard');
                }

                return redirect('/broker/dashboard');
            }
            // if (Auth::guard($guard)->check()) {
            //     $user = Auth::guard($guard)->user();

            //     // استخدام محاولة (Try-Catch) أو التأكد من وجود المسار قبل التوجيه
            //     // if ($user->role === 'admin' && Route::has('admin.dashboard')) {
            //     //     return redirect()->route('admin.dashboard');
            //     // }

            //     // if (Route::has('broker.dashboard')) {
            //     //     return redirect()->route('broker.dashboard');
            //     // }

            // return redirect('/'); // مسار آمن في حال تعطلت الروابط الأخرى
        }

        return $next($request);
    }
    // public function handle(Request $request, Closure $next, string ...$guards): Response
    // {
    //     $guards = empty($guards) ? [null] : $guards;

    //     foreach ($guards as $guard) {
    //         if (Auth::guard($guard)->check()) {
    //             // توجيه موحد للوحة التحكم الجديدة
    //             return redirect()->to('/bdashboard');
    //         }
    //     }

    //     return $next($request);
    // }
}

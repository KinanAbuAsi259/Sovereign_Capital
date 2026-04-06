<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // ray('داخل الميدلوير')->blue();
        if (! $request->user()) {
            return redirect()->route('login');
        }

        if (! in_array($request->user()->role, $roles)) {
            // فحص سريع: ماذا يوجد في الدور حالياً؟
            // dd($request->user()->role);
            return redirect()->route('login')->with('error', 'غير مصرح لك');
        }

        return $next($request);
    }
}

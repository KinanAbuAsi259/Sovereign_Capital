<?php

namespace App\Http\Middleware;

use App\Models\VisitorLog;
use Closure;
use Illuminate\Http\Request;
use Stevebauman\Location\Facades\Location;

class LogVisitor
{
    public function handle(Request $request, Closure $next)
    {
        $ip = $request->ip();
        // تجربة الموقع محلياً تعطي 127.0.0.1 وهذا لا يعطي بيانات جغرافية
        $location = Location::get($ip == '127.0.0.1' ? '8.8.8.8' : $ip);

        VisitorLog::create([
            'ip_address' => $ip,
            'country' => $location ? $location->countryName : 'Unknown',
            'city' => $location ? $location->cityName : 'Unknown',
            'region' => $location ? $location->regionName : 'Unknown',
            'user_agent' => $request->header('User-Agent'),
            'page_visited' => $request->fullUrl(),
        ]);

        return $next($request);
    }
}

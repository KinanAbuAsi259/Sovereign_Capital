<?php

namespace App\Http\Controllers;

use App\Models\CustomerRequest;
use App\Models\Lead;
use App\Models\OwnerRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // في ملف الـ Controller

    /**
     * العرض الرئيسي للوحة التحكم (المدير + الوسيط)
     */
    public function index()
    {

        $user = Auth::user();

        // التأكد من قيمة الـ Role سواء كانت نصاً أو Enum
        $role = is_object($user->role) ? $user->role->value : $user->role;
        $isAdmin = ($role === 'admin');

        // تجهيز البيانات بناءً على الصلاحيات
        // إذا كان أدمن يرى كل شيء، إذا كان وسيط يرى ما سمح له به (أو مصفوفة فارغة)
        $data = [
            'owners' => ($isAdmin || $user->can_view_owners)
                ? OwnerRequest::with('media')->latest()->get()
                : [],

            'investors' => ($isAdmin || $user->can_view_investors)
                ? Lead::latest()->get()
                : [],

            'customers' => ($isAdmin || $user->can_view_customers)
                ? CustomerRequest::latest()->get()
                : [],

            // نمرر بيانات المستخدم الحالي وصلاحياته للفرونت إند
            'auth' => [
                'user' => $user,
                'isAdmin' => $isAdmin,
            ],
        ];

        // ميزة إضافية: إذا كان الداخل هو الأدمن، نرسل له قائمة بكافة الوسطاء للتحكم بهم
        if ($isAdmin) {
            $data['all_brokers'] = User::where('role', 'broker')
                // 🛑 أضفنا email و password هنا لكي يظهرا في الجدول
                ->select('id', 'name', 'email', 'password', 'phone', 'can_view_owners', 'can_view_investors', 'can_view_customers')
                ->get();
        }

        return Inertia::render('Broker/BDashboard', $data);
    }

    public function updateStatus(Request $request, $id, $type)
    {

        $model = match ($type) {
            'customer' => \App\Models\CustomerRequest::findOrFail($id),
            'owner' => \App\Models\OwnerRequest::findOrFail($id),
            'investor' => \App\Models\Lead::findOrFail($id),
        };

        // التبديل بين الحالتين فقط
        $newStatus = ($model->status === 'لم يتم التواصل') ? 'تم التواصل' : 'لم يتم التواصل';

        $model->update(['status' => $newStatus]);

        return redirect()->back();
    }

    /**
     * للأدمن فقط: تحديث صلاحيات الوسيط
     */
    public function updatePermissions(Request $request, $id)
    {
        // dd($request->all());
        // التأكد أنك أدمن
        $user = \App\Models\User::findOrFail($id);

        // 🛑 الخطوة 2: تحديث القيم يدوياً (تجنب $request->validate)
        $user->can_view_owners = $request->has('can_view_owners') ? $request->boolean('can_view_owners') : $user->can_view_owners;
        $user->can_view_investors = $request->has('can_view_investors') ? $request->boolean('can_view_investors') : $user->can_view_investors;
        $user->can_view_customers = $request->has('can_view_customers') ? $request->boolean('can_view_customers') : $user->can_view_customers;

        // 🛑 الخطوة 3: الحفظ القسري
        if ($user->save()) {
            // إذا وصلنا هنا، يعني التعديل تم في قاعدة البيانات
            return back()->with('success', 'تم التحديث بنجاح');
        }

        // سيظهر لك في المتصفح هل القيمة فعلاً true أم ظلت false
        // dd([
        //     'Sent From React' => $request->all(),
        //     'Database After Save' => [
        //         'owners' => $freshUser->can_view_owners,
        //         'investors' => $freshUser->can_view_investors,
        //         'customers' => $freshUser->can_view_customers,
        //     ]
        // ]);
        // $all_brokers = User::where('role', 'broker')->get();
        // $user->update($validated);
        // return back()->with('success', 'تم تحديث الصلاحيات بنجاح');
        return back()->with('error', 'المستخدم غير موجود');
    }

    public function addBroker(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|unique:users,phone',
            'country_code' => 'required|string|max:5',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
            'can_view_owners' => 'boolean',
            'can_view_investors' => 'boolean',
            'can_view_customers' => 'boolean',
        ], [
            'email.unique' => 'هذا البريد الإلكتروني مسجل مسبقاً في النظام.',
            'phone.unique' => 'رقم الهاتف هذا مسجل مسبقاً.',
            'password.min' => 'يجب أن لا تقل كلمة المرور عن 8 رموز لأسباب أمنية.',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'country_code' => $validated['country_code'],
            'password' => Hash::make($validated['password']),
            'role' => 'broker',
            'can_view_owners' => $request->boolean('can_view_owners'),
            'can_view_investors' => $request->boolean('can_view_investors'),
            'can_view_customers' => $request->boolean('can_view_customers'),
        ]);

        return back();
    }

    public function deleteBroker(User $user)
    {
        // لا تسمح للأدمن بحذف نفسه!
        if ($user->id === auth()->id()) {
            return back()->with('error', 'لا يمكنك حذف حسابك الخاص');
        }

        $user->delete();

        return back()->with('success', 'تم حذف الوسيط من النظام');
    }

    public function brokerIndex()
    {
        $user = auth()->user();

        // إذا كان أدمن، أعطه كل الصلاحيات لرؤية الجداول الثلاثة
        $isAdmin = (string) ($user->role->value ?? $user->role) === 'admin';

        return Inertia::render('Broker/BrokerDashboard', [
            'owners' => ($isAdmin || $user->can_view_owners)
                ? \App\Models\OwnerRequest::with('media')->latest()->get() : [],
            'investors' => ($isAdmin || $user->can_view_investors)
                ? \App\Models\Lead::latest()->get() : [],
            'customers' => ($isAdmin || $user->can_view_customers)
                ? \App\Models\CustomerRequest::latest()->get() : [],
        ]);
    }

    // داخل DashboardController

    public function updateOwnerNote(Request $request, $id)
    {
        \App\Models\OwnerRequest::findOrFail($id)->update(['admin_notes' => $request->note]);

        return back()->with('success', 'تم تحديث ملاحظة المالك');
    }

    public function updateInvestorNote(Request $request, $id)
    {
        \App\Models\Lead::findOrFail($id)->update(['admin_notes' => $request->note]);

        return back()->with('success', 'تم تحديث ملاحظة المستثمر');
    }

    public function updateCustomerNote(Request $request, $id)
    {
        \App\Models\CustomerRequest::findOrFail($id)->update(['admin_notes' => $request->note]);

        return back()->with('success', 'تم تحديث ملاحظة الزبون');
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\ArbitrationController;
use App\Http\Controllers\Api\AdministrativeOfficerController;
use App\Http\Controllers\Api\AdminReviewController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

/* ================= AUTH ================= */

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');


/* ================= USER ARBITRATION WIZARD ================= */

Route::middleware('auth:sanctum')->group(function(){

    Route::get('/arbitration/draft',[ArbitrationController::class,'getDraft']);
    Route::post('/arbitration/step/{step}',[ArbitrationController::class,'saveStep']);
    Route::post('/arbitration/submit',[ArbitrationController::class,'submit']);

     // 🔥 PDF DOWNLOAD
     Route::get('/arbitration/pdf/{id}',[ArbitrationController::class,'downloadPdf']);
     Route::get('/arbitration/my-cases',[ArbitrationController::class,'myCases']);
     Route::get('/arbitration/dashboard-summary',[ArbitrationController::class,'dashboardSummary']);
     
     


});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/notifications', function(Request $request){

    return \App\Models\Notification::where('user_id',$request->user()->id)
        ->latest()
        ->take(20)
        ->get();
});

Route::post('/change-password', function(Request $request){

    $request->validate([
        'current_password' => 'required',
        'password' => 'required|min:6|confirmed'
    ]);

    $user = $request->user();

    // check old password
    if(!Hash::check($request->current_password,$user->password)){
        return response()->json([
            'message' => 'Current password is incorrect'
        ],422);
    }

    // update password
    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json([
        'message' => 'Password changed successfully'
    ]);

})->middleware('auth:sanctum');
/* ================= ADMIN ================= */

Route::middleware(['auth:sanctum','role:admin'])->group(function () {

    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::post('/admin/create-user', [AdminController::class, 'createUser']);

    // Route::get('/admin/cases', [AdminReviewController::class,'index']);
    // Route::post('/admin/cases/{id}/approve', [AdminReviewController::class,'approve']);
    // Route::post('/admin/cases/{id}/reject', [AdminReviewController::class,'reject']);

});


/* ================= ACCOUNTS ================= */

Route::middleware(['auth:sanctum','role:accounts'])->group(function () {

    Route::get('/accounts/dashboard',[AccountsController::class,'dashboard']);
    
    });
    
    
    /* ================= CASE FILER + CAUSE LIST ================= */
    
    Route::middleware(['auth:sanctum','role:case_filer_manager'])->group(function () {
    
    Route::get('/cause-list',[CauseListController::class,'index']);
    
    });

/* ================= AO ================= */

Route::middleware(['auth:sanctum','role:administrative_officer'])->group(function () {

    Route::get('/ao/cases', [AdministrativeOfficerController::class, 'cases']);
    Route::post('/ao/review/{id}', [AdministrativeOfficerController::class, 'review']);
    Route::get('/ao/case-preview/{id}', [AdministrativeOfficerController::class, 'preview']);

});
Route::get('/ao/case-preview/{id}', [AdministrativeOfficerController::class, 'preview']);

/* ================= CAPTCHA ================= */

Route::get('/captcha', function () {

    $code = Str::upper(Str::random(5));
    session(['captcha' => $code]);

    return response()->json([
        'captcha' => $code
    ]);
});

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ArbitrationCase;
use App\Models\Notification;
use Barryvdh\DomPDF\Facade\Pdf;

class AdministrativeOfficerController extends Controller
{
    /* ================= AO PENDING CASES ================= */
    public function cases()
    {
        $cases = ArbitrationCase::with('user')   // 🔥 VERY IMPORTANT
            ->where('status','submitted')
            ->where('review_status','pending')
            ->latest()
            ->get();

        return response()->json($cases);
    }

    /* ================= REVIEW ACTION ================= */
    public function review(Request $request,$id)
    {
        $request->validate([
            'action' => 'required|in:approved,rejected',
            'note'   => 'nullable|string'
        ]);

        $case = ArbitrationCase::findOrFail($id);

        if($request->action === 'rejected' && !$request->note){
            return response()->json([
                'message'=>'Rejection note required'
            ],422);
        }

        $case->update([
            'review_status'=>$request->action,
            'review_note'=>$request->note,
            'reviewed_by'=>$request->user()->id
        ]);

        Notification::create([
            'user_id' => $case->user_id,
            'title'   => $request->action === 'approved'
                ? 'Case Approved'
                : 'Case Rejected',
            'message' => $request->note ?? 'Administrative Officer reviewed your case.'
        ]);

        return response()->json([
            'status'=>true,
            'message'=>'Case reviewed successfully'
        ]);
    }

    public function preview($id)
{
    $case = ArbitrationCase::with('user')->findOrFail($id);

    $data = $case->data_json;

    $pdf = Pdf::loadView('pdf.case_preview', [
        'case' => $case,
        'data' => $data
    ]);

    return $pdf->stream("case-$id.pdf");
}
}

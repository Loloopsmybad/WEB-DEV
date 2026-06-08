<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ArbitrationCase;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Notification;


class ArbitrationController extends Controller
{
    /* ================= LOAD DRAFT ================= */
    // public function getDraft(Request $request)
    // {
    //     $case = ArbitrationCase::firstOrCreate(
    //         [
    //             'user_id' => $request->user()->id,
    //         ],
    //         [
    //             'status' => 'draft',
    //             'data_json' => [],
    //             'current_step' => 1
    //         ]
    //     );

    //     return response()->json($case);
    // }

    public function getDraft(Request $request)
{
    $case = ArbitrationCase::where('user_id',$request->user()->id)
        ->where('status','draft')
        ->latest()
        ->first();

    if(!$case){
        $case = ArbitrationCase::create([
            'user_id'=>$request->user()->id,
            'status'=>'draft',
            'current_step'=>1,
            'data_json'=>[]
        ]);
    }

    return response()->json($case);
}

    /* ================= SAVE STEP ================= */
    public function saveStep(Request $request, $step)
    {
        $case = ArbitrationCase::where('user_id', $request->user()->id)
            ->where('status', 'draft')
            ->firstOrFail();

        $data = $case->data_json ?? [];

        /**
         * 🔥 IMPORTANT FIX
         * Frontend se data { data:{} } me aa raha hai
         */
        $stepData = $request->input('data');

        /**
         * 🔥 STEP KEY MAP
         */
        $map = [
            1 => 'court',
            2 => 'arbitrator',
            3 => 'claimants',
            4 => 'respondents',
            5 => 'documents'
        ];

        $key = $map[$step] ?? $step;

        $data[$key] = $stepData;

        $case->update([
            'data_json'   => $data,
            'current_step'=> $step
        ]);

        return response()->json([
            'status' => true,
            'message' => "Step {$step} saved successfully"
        ]);
    }

    public function downloadPdf($id)
{
    $case = ArbitrationCase::where('id',$id)
        ->where('user_id',auth()->id())
        ->firstOrFail();

    $data = $case->data_json ?? [];

    $pdf = Pdf::loadView('pdf.arbitration',[
        'case' => $case,
        'data' => $data
    ]);

    return $pdf->download('arbitration-case-'.$case->id.'.pdf');
}



    /* ================= FINAL SUBMIT ================= */
   /* ================= FINAL SUBMIT ================= */
   public function submit(Request $request)
   {

   
       $case = ArbitrationCase::where('user_id', $request->user()->id)
           ->where('status', 'draft')
           ->firstOrFail();
   
       $data = $case->data_json ?? [];
   
       /* ================= NORMAL JSON DATA ================= */
   
       $data['court']       = json_decode($request->court, true);
       $data['arbitrator']  = json_decode($request->arbitrator, true);
       $data['claimants']   = json_decode($request->claimants, true);
       $data['respondents'] = json_decode($request->respondents, true);
   
       /* ================= ENSURE DOCUMENT ARRAY EXISTS ================= */
   
       if (!isset($data['documents'])) {
           $data['documents'] = [];
       }
   
       /* ================= FILE UPLOAD ================= */
   
       // 🔵 Reference Order
       if ($request->hasFile('reference_order')) {
   
           $file = $request->file('reference_order');
   
           $path = $file->store('arbitration', 'public');
   
           $data['documents']['reference_order'] = [
               'name' => $file->getClientOriginalName(),
               'path' => $path
           ];
       }
   
       // 🔵 Memo of Parties
       if ($request->hasFile('memo_parties')) {
   
           $file = $request->file('memo_parties');
   
           $path = $file->store('arbitration', 'public');
   
           $data['documents']['memo_parties'] = [
               'name' => $file->getClientOriginalName(),
               'path' => $path
           ];
       }
   
       // 🔵 Other Docs (Multiple)
       if ($request->hasFile('other_docs')) {
   
           $data['documents']['other_docs'] = [];
   
           foreach ($request->file('other_docs') as $file) {
   
               $path = $file->store('arbitration', 'public');
   
               $data['documents']['other_docs'][] = [
                   'name' => $file->getClientOriginalName(),
                   'path' => $path
               ];
           }
       }
   
       // 🔵 Declaration Boolean Fix
       $data['documents']['declaration'] =
           $request->declaration === "true" || $request->declaration === true;
   
       /* ================= UPDATE CASE ================= */
   
       $case->update([
           'data_json'     => $data,
           'status'        => 'submitted',
           'review_status' => 'pending',
           'current_step'  => 5
       ]);
   
       /* ================= USER NOTIFICATION ================= */
   
       Notification::create([
           'user_id' => $request->user()->id,
           'title'   => 'Case Submitted',
           'message' => 'Your arbitration case submitted successfully.'
       ]);
   
       return response()->json([
           'status'   => true,
           'message'  => 'Submitted successfully',
           'redirect' => '/dashboard'
       ]);
   }

    /* ================= USER CASE LIST ================= */
public function myCases(Request $request)
{
    $cases = ArbitrationCase::where('user_id',$request->user()->id)
        ->latest()
        ->get(['id','status','review_note','review_status']);

    return response()->json([
        'status'=>true,
        'data'=>$cases
    ]);
}



    
}

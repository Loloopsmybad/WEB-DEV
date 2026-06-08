<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body{
    font-family: DejaVu Sans;
    font-size:14px;
}
h2{
    margin-bottom:20px;
}
.box{
    margin-bottom:15px;
}
</style>
</head>

<body>

<h2>Arbitration Case Details</h2>

<div class="box">
<b>Diary Number:</b>
{{ $data['court']['diary_number'] ?? '-' }}
</div>

<div class="box">
<b>Justice Name:</b>
{{ $data['court']['justice_name'] ?? '-' }}
</div>

<div class="box">
<b>Petition Type:</b>
{{ $data['court']['petition_type'] ?? '-' }}
</div>

<div class="box">
<b>Case Title:</b>
{{ $data['court']['case_title'] ?? '-' }}
</div>

<hr>

<h3>Arbitrator Details</h3>

<div class="box">
Appointed By Court:
{{ $data['arbitrator']['appointedByCourt'] ?? 'No' }}
</div>

<hr>

<h3>Claimants</h3>

@if(!empty($data['claimants']))
    @foreach($data['claimants'] as $c)
        <div>{{ $c['name'] ?? '-' }}</div>
    @endforeach
@endif

</body>
</html>

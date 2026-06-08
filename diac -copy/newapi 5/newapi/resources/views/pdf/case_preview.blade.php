<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">

<style>

body{
font-family: DejaVu Sans;
font-size:13px;
line-height:1.6;
}

.container{
width:100%;
}

.section-title{
font-weight:bold;
margin-top:20px;
}

.highlight{
background:#fff59d;
padding:2px 4px;
}

ul{
margin-top:5px;
}

.party-block{
page-break-inside: avoid;
}

</style>

</head>

<body>

<div class="container">

<p>
To<br>
The Coordinator/Registrar<br>
Harmony Nexus Arbitration Centre<br>
69, 1st Floor, DDA Flat, Astha Kunj,<br>
Link Road, Near Bhai Joga Singh School,<br>
Karol Bagh, New Delhi -110005
</p>

<p>
<b>Subject:</b>
Reference of Arbitration Matter for Registration pursuant to Order dated
<span>{{ $data['court']['order_date'] ?? '' }}</span>
passed by the Hon'ble
<span>{{ $data['court']['justice_name'] ?? '' }}</span>
</p>

<p>Madam / Sir,</p>

<p>
I am directed to forward herewith, for necessary registration and further action,
the details of an arbitration matter referred to you pursuant to the order passed
by the Hon'ble
<span>{{ $data['court']['court_name'] ?? '' }}</span>
in accordance with the provisions of the Arbitration and Conciliation Act, 1996.
</p>

<p>
2. The reference has been transmitted electronically through the authorised
digital interface of the Registry along with the
<b>Arbitration Reference Information Form (Digital)</b>.
</p>

<ul>

<li>
Name of the Court :
<span>High Court of Delhi</span>
</li>

<li>
Name of Hon'ble Judge :
<span>{{ $data['court']['justice_name'] ?? '' }}</span>
</li>

<li>
Date of Order :
<span>{{ $data['court']['order_date'] ?? '' }}</span>
</li>

<li>
Petition Number and Type :
<span>{{ $data['court']['petition_type'] ?? '' }} {{ $data['court']['petition_number'] ?? '' }} Of {{ $data['court']['year'] ?? '' }}</span>
</li>

<li>
Case Title :
<span>{{ $data['court']['case_title'] ?? '' }}</span>
</li>

</ul>

<p><b>3. In terms of the said order:</b></p>

<p>
☐ An Arbitrator has been appointed by the Hon'ble Court
</p>

<p>
☐ No Arbitrator has been appointed and the matter is referred for further steps.
</p>

<p class="section-title">Details of the Ld. Arbitrator, parties, and counsel have been duly captured in the digital reference form.</p>
<p class="section-title">Details of the Learned Arbitrator(s)</p>

<ul>
<li>Name : {{ $data['arbitrator']['name'] ?? '' }}</li>
<li>Email : {{ $data['arbitrator']['email'] ?? '' }}</li>
<li>Mobile : {{ $data['arbitrator']['mobile'] ?? '' }}</li>
<li>Address : {{ $data['arbitrator']['address'] ?? '' }}</li>
</ul>


<p class="section-title">
Details of the Claimant(s)
</p>

@foreach(($data['claimants']['claimants'] ?? []) as $c)

<div class="party-block">

<p><b>Claimant {{ $loop->iteration }}</b></p>

<p class="field">
Name - {{ $c['name'] ?? '' }}
</p>

<p class="field">
Email - {{ $c['email'] ?? '' }}
</p>

<p class="field">
Mobile - {{ $c['mobile'] ?? '' }}
</p>

<p class="field">
Address - {{ $c['address'] ?? '' }}
</p>

</div>

@endforeach


<p class="section-title">
Details of the Claimant's Counsel(s)
</p>

@foreach(($data['counsels'] ?? []) as $cc)

<div class="party-block">

<p><b>Counsel {{ $loop->iteration }}</b></p>

<p>Name - {{ $cc['name'] ?? '' }}</p>
<p>Email - {{ $cc['email'] ?? '' }}</p>
<p>Mobile - {{ $cc['mobile'] ?? '' }}</p>
<p>Address - {{ $cc['address'] ?? '' }}</p>

</div>

@endforeach

<p class="section-title">
Details of the Respondent(s)
</p>

@foreach(($data['respondents']['respondents'] ?? []) as $r)

<div class="party-block">

<p><b>Respondent {{ $loop->iteration }}</b></p>

<p class="field">
Name - {{ $r['name'] ?? '' }}
</p>

<p class="field">
Email - {{ $r['email'] ?? '' }}
</p>

<p class="field">
Mobile - {{ $r['mobile'] ?? '' }}
</p>

<p class="field">
Address - {{ $r['address'] ?? '' }}
</p>

</div>

@endforeach

<p class="section-title">
Details of the Respondent's Counsel(s)
</p>

@foreach(($data['respondent_counsels']['list'] ?? []) as $index => $rc)

<div class="party-block">

<p><b>Counsel {{ $loop->iteration }}</b></p>

<p class="field">
Name - {{ $rc['name'] ?? '' }}
</p>

<p class="field">
Email - {{ $rc['email'] ?? '' }}
</p>

<p class="field">
Mobile - {{ $rc['mobile'] ?? '' }}
</p>

<p class="field">
Address - {{ $rc['address'] ?? '' }}
</p>

</div>

@endforeach


<p class="section-title">Documents Uploaded</p>

<ul>
<li>Copy of the reference order passed by the Hon’ble Court</li>
<li>Memo of Parties</li>
<li>Any other document as forming part of the judicial record</li>
</ul>

<p>
It is certified that the information transmitted has been entered correctly
and accurately as per the official court record.
</p>

<p>
You are requested to kindly register the arbitration case,
assign a diary number for your reference,
generate case number,
and proceed further in accordance with your institutional rules.
</p>

<p>
This communication is issued with the approval of the competent authority.
</p>

<br>

<p>
Yours Sincerely,
</p>

<p>
User Name<br>
<span>Registry Clerk</span><br>
High Court of Delhi
</p>

<p>
Date :
<span>{{ now()->format('d.m.Y') }}</span>
<br>
Place :
<span>Delhi</span>
</p>

</div>

</body>
</html>
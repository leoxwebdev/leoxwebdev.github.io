<!--#include file="allcode.asp"-->
<!--#include file="secureUtils.asp"-->
<%

Response.CacheControl = "Private"
Response.expires      = -1000

'Add-ons
if trim(request.form("chkresAddVEP"))="" then chkresAddVEP="N" else chkresAddVEP="Y"
if trim(request.form("chkresAddRRP"))="" then chkresAddRRP="N" else chkresAddRRP="Y"
if trim(request.form("chkresAddPAP"))="" then chkresAddPAP="N" else chkresAddPAP="Y"
if trim(request.form("chkresAddCCP"))="" then chkresAddCCP="N" else chkresAddCCP="Y"

'//Bfasts
if trim(request.form("bfastWER"))="" then bfastWER="N" else bfastWER="Y"
if trim(request.form("bfastLSR"))="" then bfastLSR="N" else bfastLSR="Y"
if trim(request.form("bfastLVR"))="" then bfastLVR="N" else bfastLVR="Y"
if trim(request.form("bfastPS"))="" then bfastPS="N" else bfastPS="Y"
if trim(request.form("bfastSIR"))="" then bfastSIR="N" else bfastSIR="Y"
if trim(request.form("bfastFR"))="" then bfastFR="N" else bfastFR="Y"
if trim(request.form("bfastOneBS"))="" then bfastOneBS="N" else bfastOneBS="Y"
if trim(request.form("bfastTwoBS"))="" then bfastTwoBS="N" else bfastTwoBS="Y"
if trim(request.form("bfastQV"))="" then bfastQV="N" else bfastQV="Y"
if trim(request.form("bfastPhS"))="" then bfastPhS="N" else bfastPhS="Y"
if trim(request.form("bfastRB"))="" then bfastRB="N" else bfastRB="Y"

''//Treats
optTreats = request.form("optTreats")

''//Name - Res Details
guestPrefix = request.form("Gprefix")
guestFName = request.form("Gfname")
guestLName = request.form("Glname")
guestAdult = request.form("resparamAdult")
guestChild = request.form("resparamChild")
resArrivalDate = request.form("resArrivalDate")
resDepartureDate = request.form("resDepartureDate")
resparamStay = request.form("resparamStay") ''Combined Arrival and Departure Date Text. for Stay:

''yourprefix=cleanInput(request.form("yourprefix"))
''otherguest=cleanInput(request.form("otherguest"))

''//contactinfo
contactHomeAdd = request.form("contactHomeAdd")
contactEmail = request.form("contactEmail")
contactTel = request.form("contactTel")
contactFax = request.form("contactFax")
contactMobilenum = request.form("contactMobilenum")

''//credit card info
ccType = cleanInput(request.form("ccType"))
ccNumber = cleanInput(request.form("ccNumber"))
ccNumber = encrypt (guestLName,ccNumber,0) 'encrypted
ccHolderName = cleanInput(request.form("ccHolderName"))
ccExpiry = cleanInput(request.form("ccExpiry"))
ccBatchCode = cleanInput(request.form("ccBatchCode"))
ccBillingAdd = cleanInput(request.form("ccBillingAdd"))

''//Request and Flight Details
resAddDetails = cleanInput(request.form("resAddDetails"))
resArrivalTime = cleanInput(request.form("resArrivalTime"))
resFlightNum = cleanInput(request.form("resFlightNum"))
resCityOrigin = cleanInput(request.form("resCityOrigin"))

''//Email
if trim(request.form("chkSendEmail"))="" then chkSendEmail="N" else chkSendEmail="Y"
resAddEmail = trim(request.form("resAddEmail"))

''CANCELLATION NOTICE / Conditions Applied 
cancelNotice = request.form("cancelNotice")

''resRoomTypes = request.form("resRoomTypes")
WER = request.form("WER")
LSR = request.form("LSR")
LVR = request.form("LVR")
PS = request.form("PS")
SIR = request.form("SIR")
FR = request.form("FR")
OneBS = request.form("OneBS")
TwoBS = request.form("TwoBS")
QV = request.form("QV")
PhS = request.form("PhS")
RB = request.form("RB")

dim RoomTypeShort(11)

RoomTypeShort(1)=WER
RoomTypeShort(2)=LSR
RoomTypeShort(3)=LVR
RoomTypeShort(4)=PS
RoomTypeShort(5)=SIR
RoomTypeShort(6)=FR
RoomTypeShort(7)=OneBS
RoomTypeShort(8)=TwoBS
RoomTypeShort(9)=QV
RoomTypeShort(10)=PhS
RoomTypeShort(11)=RB

dim RoomTypeId(11)
'"WER=7","LSR=6","LVR=5","PS=1","SIR=13","FR=15","OneBS=8","TwoBS=9","QV=12","PhS=11","RB=10"
RoomTypeId(1)= 7
RoomTypeId(2)= 6
RoomTypeId(3)= 5
RoomTypeId(4)= 1
RoomTypeId(5)= 13
RoomTypeId(6)= 15
RoomTypeId(7)= 8
RoomTypeId(8)= 9
RoomTypeId(9)= 12
RoomTypeId(10)= 11
RoomTypeId(11)= 10

'add confirmation for add-on packages ????????????????????????????????????????????????????????????????????????
''if vep="Y" or rrp="Y" or ccp="Y" or  gsp="Y" or  tsp="Y" or  pap="Y" then

''  if (Instr(session("ConditionsApplied"),"ADD ON SERVICES PACKAGE"))<=0 then 
''	session("ConditionsApplied")=replace(session("ConditionsApplied"),"<p><b><FONT face=Arial>Reservations Notes:</FONT>","<p><font color=blue>ADD ON SERVICES PACKAGE</font> <BR>You have reserved our Add-on Services Package. A full advance payment is required to avail of these services and packages.</p><p><b><FONT face=Arial>Reservations Notes:</FONT>")
''  end if

''end if


dim objRec,objCmd,A2ZConn

initialize

'get conversion rate of the date the booking is made
ConversionRate=ReturnRoomConversion

'Get a Confirmation Number
strSQL = "SELECT ConfirmationNum from guestconfnum where cdate='"&ConvertDateformat(now())&"'"
objCmd.CommandText = strSQL
Set objRec = objCmd.Execute

if not objRec.EOF then
	ConfirmationNum=Cint(objrec("ConfirmationNum")) + 1
	''strSQL = "Update guestconfnum set ConfirmationNum='"&ConfirmationNum&"'"
	strSQL = "Update guestconfnum set ConfirmationNum='"&ConfirmationNum&"' where cdate='"&ConvertDateformat(now())&"'"
	objCmd.CommandText = strSQL
	objCmd.Execute
	''session("ConfNo")="RS"&Right(year(now),2)&Right("0"&month(now),2)&Right("0"&Day(now),2)&"M"&Right("0"&ConfirmationNum,2)
	ConfirmationNum = "RS"&Right(year(now),2)&Right("0"&month(now),2)&Right("0"&Day(now),2)&"M"&Right("0"&ConfirmationNum,2)
else
	strSQL = "Insert into guestconfnum(ConfirmationNum,cdate) values('1','"& ConvertDateformat(now()) &"')"
	objCmd.CommandText = strSQL
	objCmd.Execute
	''session("ConfNo")="RS"&Right(year(now),2)&Right("0"&month(now),2)&Right("0"&Day(now),2)&"M01"
	ConfirmationNum = "RS"&Right(year(now),2)&Right("0"&month(now),2)&Right("0"&Day(now),2)&"M01"
end if

sqlString = "INSERT INTO guestrecord (GuestPrefix,OtherPrefix,GuestLast,GuestFirst,DepartureDate,ArrivalDate,Adults,Children," & _
			"ConfirmationNum,NType,NNo,NExpire,NName,NBatch,NAdd,ModeOfPayment,ContactInfo,PrimaryEmail," & _
			"Telephone,Mobilenum,Fax,OriginCity,MeEmail,OtherEmailNotify,ETA,FlightNumber,Remarks," & _
			"RandomNum,VEP,RRP,CCP,PAP,PSBF,FABF,LVBF,LSBF,WEBF,OBKBF,TKKBF,RBBF,PHBF,QVBF,SPABF" & _
			",RoomConversion,ConditionsApplied,GSP,GSPNR,GSPOption,TSP,TSPNR,OtherAdults) " & _
			" VALUES ('" & guestPrefix & "','','" & guestLName & "','" & guestFName & "','" & resDepartureDate & "','" & resArrivalDate & "'," & guestAdult & _
			"," & guestChild & ",'" & ConfirmationNum & "','" & ccType & "','" & ccNumber & "','" & ccExpiry & "','" & ccHolderName & "','" & ccBatchCode & _
			"','" & ccBillingAdd & "','creditcard','" & contactHomeAdd & "','" & contactEmail & "'," & _
			"'" & contactTel & "','" & contactMobilenum & "','" & contactFax & "','" & resCityOrigin & "','" & chkSendEmail & "','" & resAddEmail & _
			"','" & resArrivalTime & "','" & resFlightNum & "','" & resAddDetails & "'," & _
			"'" & optTreats & "','" & chkresAddVEP & "','" & chkresAddRRP & "','" & chkresAddCCP & "','" & chkresAddPAP & "','" & bfastPS & _
			"','" & bfastFR & "','" & bfastLVR & "','" & bfastLSR & "','" & bfastWER & "','" & bfastOneBS & "','" & bfastTwoBS & "','" & bfastRB & _
			"','" & bfastPhS & "','" & bfastQV & "','" & bfastSIR & "'," & ConversionRate & ",'" & cancelNotice & "','N',0,'','N',0,'')"
			

''COMMAND TO SAVE			
objCmd.CommandText = sqlString
objCmd.Execute

strSQL = "SELECT LAST_INSERT_ID() as GuestID"
objCmd.CommandText = strSQL
Set objRec = objCmd.Execute

if not objRec.EOF then
	Session("GuestID")=objrec("GuestID")
end if

for RoomTypeCnt=1 to 11
	if RoomTypeShort(RoomTypeCnt)<>"" then
		'Save Rooms Reserve by Guest @ guestreservert
		strSQL1 = "Insert into guestreservert(GuestID,RTID,NumberOfRooms) values('" & Session("GuestID") &"','"& RoomTypeId(RoomTypeCnt)  &"','"& RoomTypeShort(RoomTypeCnt) &"')"
		objCmd.CommandText = strSQL1
		objCmd.Execute

		'Deduct from room availability calendar.'
		datedifference=Datediff("d",resArrivalDate,resDepartureDate)
		for m=0 to datedifference-1
			dt=dateadd("d",m,ArrivalDate)
			'select number of reservations per room type per date
			strSQL = "SELECT RsvnRooms from roomsetcalendar where cdate='"& ConvertDateformat(dt) &"' and rtid='"& RoomTypeId(d) &"'"
			objCmd.CommandText = strSQL
			Set objRec = objCmd.Execute
						
			if not objRec.EOF then				
				rs=Cint(objrec("RsvnRooms"))
			end if																
						
			CheckCalendar "","",dt,RoomTypeId(RoomTypeCnt),rs+RoomTypeShort(RoomTypeCnt)
		next
	end if										
Next
					
''end if

objRec.close()
set objRec = nothing

resetVar


'//Analyze whether advancepayment is required
''if trim(advancepay)<>"" then
''  response.redirect("Advancestep.asp")

''elseif (vep="Y" or gsp="Y" or tsp="Y" or rrp="Y" or pap="Y" or ccp="Y") then
''  response.redirect("Advancestep.asp")
''else
''  response.redirect("Confirmation.asp")
''end if
%>
<html>
<head>
	<title>Reservation</title>
</head>
<body background="sand.jpg">
<form name="form1" id="form1" method="post" action="confirm.php">
	<input type="hidden" name="ConfirmationNum" value="<%=ConfirmationNum%>">
</form>
<script>document.form1.submit();</script>
</body>
</html>





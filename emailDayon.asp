<!--#include file="allcode.asp"-->
<% 
Response.CacheControl = "Private"
Response.expires      = -1000

dim objRec,objCmd,A2ZConn

initialize

ConfNo = request.form("ConfNo")
''ConfNo = "RS140429M05"

strSQL = "SELECT * from guestrecord where ConfirmationNum='"&ConfNo&"'"
objCmd.CommandText = strSQL

Set objRec = objCmd.Execute

if not objRec.EOF then

    SendEmail=objrec("SendEmail")

	if SendEmail<>"Y" then

	    meEmail=objrec("meEmail")
		OtherEmailNotify=objrec("OtherEmailNotify")
		PrimaryEmail=objrec("PrimaryEmail")										
		FName=cleanInputRev(objrec("GuestFirst"))
		LName=cleanInputRev(objrec("GuestLast"))
		
		'' CONFIG DO NOT CHANGE
		Dim ObjSendMail
		Set ObjSendMail = CreateObject("CDO.Message") 

		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2 'Send the message using the network (SMTP over the network).
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpserver") ="plantationbay.com"
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25 
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = False 'Use SSL for the connection (True or False)
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 60
			 
		' If your server requires outgoing authentication uncomment the lines bleow and use a valid email address and password.
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = 1
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/sendusername") ="onlinesend@plantationbay.com"
		ObjSendMail.Configuration.Fields.Item ("http://schemas.microsoft.com/cdo/configuration/sendpassword") ="0NLIN3s3nd2013$$$"
			 
		ObjSendMail.Configuration.Fields.Update
		
		'' END - CONFIG DO NOT CHANGE

		fromsname="Plantation Bay Resort and Spa"
		subject="Online Reservation"
		toname = FName & " " & LName
		senderEmail="rsvns@plantationbay.com"

		if Trim(meEmail)="Y" then
			ObjSendMail.To = toname & " <" & PrimaryEmail & ">"
		end if
		
		ObjSendMail.Subject = subject
		ObjSendMail.From = fromsname & " <" & senderEmail & ">"
		ObjSendMail.CreateMHTMLBody "https://online.plantationbay.com/leox/confirmleox.php?ConfirmationNum="&ConfNo

		if trim(OtherEmailNotify) <> "" then
			otherEmail=""
			if instr(OtherEmailNotify,";") <> 0 then
				arrcc = Split(OtherEmailNotify, ";")
				for i = 0 to ubound(arrcc)
					if i<>ubound(arrcc) then
						otherEmail=otherEmail & Trim(arrcc(i)) & ";" 
					else
						otherEmail=otherEmail & Trim(arrcc(i))
					end if 					

					ObjSendMail.Cc = otherEmail
				Next					 


			elseif instr(OtherEmailNotify,",") <> 0 then
				arrcc = Split(OtherEmailNotify, ",")
				for i = 0 to ubound(arrcc)
					if i<>ubound(arrcc) then
						otherEmail=otherEmail & Trim(arrcc(i)) & ";" 
					else
						otherEmail=otherEmail & Trim(arrcc(i))
					end if 					

					ObjSendMail.Cc = otherEmail
				Next					 

			else
				ObjSendMail.Cc = OtherEmailNotify
			end if					   					  
		end if

			  
		On Error Resume Next
		ObjSendMail.Send


		If Err <> 0 Then
			strSQL = "Update guestrecord set SendEmail='N' WHERE ConfirmationNum='"&ConfNo&"'"
			objCmd.CommandText = strSQL
			objCmd.Execute
		else
			strSQL = "Update guestrecord set SendEmail='Y' WHERE ConfirmationNum='"&ConfNo&"'"
			objCmd.CommandText = strSQL
			objCmd.Execute
		end if
					   
		'reservation copy

		fromsname = FName & " " & LName
		senderEmail=PrimaryEmail

		ObjSendMail.Subject = "New Booking"
		ObjSendMail.From = fromsname & " <" & senderEmail & ">"
		ObjSendMail.To = "rsvns@plantationbay.com"
		ObjSendMail.CreateMHTMLBody  "https://online.plantationbay.com/leox/confirmleox.php?ConfirmationNum="&ConfNo

		On Error Resume Next
		ObjSendMail.Send
		'Set ObjSendMail = Nothing
	
	end if
end if			  

objRec.close()
set objRec = nothing

%>
<html>
<head>
<title>Reservation</title>
</head>
<body>
</body>
</html>

<%
resetVar
%>
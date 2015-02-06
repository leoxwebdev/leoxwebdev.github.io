<%
function cleanInput(InputVar)
   dim InputVarX, regex, reslt, sss
   reslt = trim(InputVar)
   'define special characters to replace'
   dim Word2ReplaceArray(1,1)
   Word2ReplaceArray(0,0) = "'"
   Word2ReplaceArray(0,1) = "’"
   Word2ReplaceArray(1,0) = """"
   Word2ReplaceArray(1,1) = "”"
   set regex = New RegExp
   regex.IgnoreCase = true
   regex.global  = true
   for sss = 0 to ubound(Word2ReplaceArray,1)
      regex.pattern = Word2ReplaceArray(sss,0)
      reslt = regex.replace(reslt, Word2ReplaceArray(sss,1))
   next
   cleanInput = reslt
   set regex = nothing
end function

function ConvertDateformat(InputVar)
   InputVar=CDate(InputVar)
   ConvertDateformat=year(InputVar) & "-"  & Right("0" & Month(InputVar), 2) & "-" & Right("0" & day(InputVar), 2)
end function

Function PCase(ByVal strInput)' As String
        Dim I 'As Integer
        Dim CurrentChar, PrevChar 'As Char
        Dim strOutput 'As String

        PrevChar = ""
        strOutput = ""

        For I = 1 To Len(strInput)
            CurrentChar = Mid(strInput, I, 1)

            Select Case PrevChar
                Case "", " ", ".", "-", ",", """", "'"
                    strOutput = strOutput & UCase(CurrentChar)
                Case Else
                    strOutput = strOutput & LCase(CurrentChar)
            End Select

            PrevChar = CurrentChar
        Next 'I

        PCase = strOutput
    End Function 


function cleanInputRev(InputVar)
   dim InputVarX, regex, reslt, sss
   reslt = trim(InputVar)
   'define special characters to replace'
   dim Word2ReplaceArray(1,1)
   Word2ReplaceArray(0,0) = "&#39;"
   Word2ReplaceArray(0,1) = "’"
   Word2ReplaceArray(1,0) = "&#34;"
   Word2ReplaceArray(1,1) = "”"
   set regex = New RegExp
   regex.IgnoreCase = true
   regex.global  = true
   for sss = 0 to ubound(Word2ReplaceArray,1)
      regex.pattern = Word2ReplaceArray(sss,0)
      reslt = regex.replace(reslt, Word2ReplaceArray(sss,1))
   next
   cleanInputRev = reslt
   set regex = nothing
end function


sub CheckCalendar(nr,st,dt,rt,rs)
	if rs>0 then
	  'update row for actual reservation booking recording
	   strSQL = "Update roomsetcalendar set RsvnRooms='"&rs&"' where cdate='"& ConvertDateformat(dt) &"' and rtid='"& rt &"'"
	   objCmd.CommandText = strSQL
	   objCmd.Execute
	  
	else
	    if rt=0 then
		'change datestatus only
			strSQL = "SELECT count(caid) as numrec From roomsetcalendar where cdate='"& ConvertDateformat(dt) &"'"
			objCmd.CommandText = strSQL
			Set objRec = objCmd.Execute
			if not objRec.EOF then
					caid=trim(objRec("numrec"))
			end if

		    'update record if found with rec
			if Cint(caid)>0 then
			   strSQL = "Update roomsetcalendar set DStat='"&st&"' where cdate='"& ConvertDateformat(dt) &"'"
			   objCmd.CommandText = strSQL
			   objCmd.Execute
			
			else
		    'insert date to table
				strSQL = "Insert into roomsetcalendar(cdate,dstat) values('" &  ConvertDateformat(dt)&"','"& st&"')"
				objCmd.CommandText = strSQL
				objCmd.Execute
	        	end if

	    else
		'check if date is in the database to update record
		caid=0
			strSQL = "SELECT caid From roomsetcalendar where cdate='"& ConvertDateformat(dt) &"' and rtid='"& rt &"'"
			objCmd.CommandText = strSQL
			Set objRec = objCmd.Execute
			if not objRec.EOF then
					caid=trim(objRec("caid"))
			end if

		    'update record if found with rec
			if Cint(caid)>0 then
			   strSQL = "Update roomsetcalendar set setRooms='"&nr&"', DStat='"&st&"' where cdate='"& ConvertDateformat(dt) &"' and rtid='"& rt &"'"
			   objCmd.CommandText = strSQL
			   objCmd.Execute
			
			else
		    'insert date to table
				strSQL = "Insert into roomsetcalendar(cdate,rtid,setrooms,dstat) values('" &  ConvertDateformat(dt)&"','" &rt &"','"& nr &"','"& st&"')"
				objCmd.CommandText = strSQL
				objCmd.Execute
	        	end if
	    end if
	end if
end sub

function ReturnDateStat(dt)
			strSQL = "SELECT Dstat From roomsetcalendar where cdate='"& ConvertDateformat(dt) &"'"
			objCmd.CommandText = strSQL
			Set objRec = objCmd.Execute
			if not objRec.EOF then
					Dstat=trim(objRec("Dstat"))
			end if
			ReturnDateStat=Dstat
end function

function ReturnDateStatAmt(dt,rtid)
			strSQL = "SELECT Dstat,SetRooms,RsvnRooms From roomsetcalendar where cdate='"& ConvertDateformat(dt) &"' and rtid='" & rtid & "'"
			objCmd.CommandText = strSQL
			Set objRec = objCmd.Execute
			if not objRec.EOF then
					Dstat=trim(objRec("Dstat"))
					SetRooms=trim(objRec("SetRooms"))
					RsvnRooms=trim(objRec("RsvnRooms"))
			end if
			if SetRooms>RsvnRooms then
					Dstat=Dstat & "<A"
			else
					Dstat=Dstat & "<F"
			end if
			
			ReturnDateStatAmt=Dstat
end function


function ReturnRoomConversion
			strSQL = "SELECT * From roomconversion"
			objCmd.CommandText = strSQL
			Set objRec = objCmd.Execute
			if not objRec.EOF then
					roomconversion=trim(objRec("roomconversion"))
			end if
			ReturnRoomConversion=roomconversion
end function


function isCreditCard(cardNo) 
        isCreditCard = false 
        lCard=len(cardNo) 
        lC=right(cardNo,1) 

        cStat=0 
        for i=(lCard-1) to 1 step -1 
            tempChar= mid(cardNo,i,1) 
            d=cint(tempChar) 
            if lcard mod 2 = 1 then 
                temp=d*(1+((i+1) mod 2)) 

            else 
                temp=d*(1+(i mod 2)) 
            end if 
            if temp < 10 then 
                cStat = cStat + temp  
            else 
                cStat = cStat + temp - 9 

            end if 
        next 
        cStat = (10-(cStat mod 10)) mod 10 
        if cint(lC) = cStat then isCreditCard = true 
    end function 
%>


<!--#include file="dbase.asp"-->
<!--#include file="DBsecureUtils.asp"-->

<%
        Application("base_url") = "http://www.plantationbay.com"
		''Application("Scriptbase_url") = "https://plantationbay.com"
        ''Application("Subbase_url") = "https://online.plantationbay.com/en"
		
			sub initialize()
			   'Instantiate an ADO Connection Object & initialization of database
			   set A2ZConn = Server.CreateObject("ADODB.Connection")
			   strA2ZConn = GlobCDB_OnlineBooking
			   A2ZConn.Open strA2ZConn
			   Set objRec = Server.CreateObject ("ADODB.Recordset")
			   Set objCmd = Server.CreateObject ("ADODB.Command")
			   Set objCmd.ActiveConnection = A2ZConn
			   objCmd.CommandType = 1
			end sub
			

			sub resetVar()
			   'close ObjRec
			   if IsObject(ObjRec) then
					if not ObjRec is Nothing Then
						 if ObjRec.state <> 0 then
							  ObjRec.close
						 end if
						 set ObjRec = Nothing
					end if
			   end if
			   'close connection object
			   if IsObject(A2Zconn) then
					if not A2Zconn is Nothing Then
						 if A2Zconn.state <> 0 then
							  A2Zconn.close
						 end if
						 set A2Zconn = Nothing
					end if
			   end if
			   Set objcmd = nothing
			end sub


			sub initializePB()
			   'Instantiate an ADO Connection Object & initialization of database
			   set PBConn = Server.CreateObject("ADODB.Connection")
			   strPBConn = GlobCDB_OnlineBooking
			   PBConn.Open strPBConn
			   Set EmpRec = Server.CreateObject ("ADODB.Recordset")
			   Set EmpCmd = Server.CreateObject ("ADODB.Command")
			   Set EmpCmd.ActiveConnection = PBConn
			   EmpCmd.CommandType = 1
			end sub
			

			sub resetVarPB()
			   'close EmpRec
			   if IsObject(EmpRec) then
					if not EmpRec is Nothing Then
						 if EmpRec.state <> 0 then
							  EmpRec.close
						 end if
						 set EmpRec = Nothing
					end if
			   end if
			   'close connection object
			   if IsObject(PBConn) then
					if not PBConn is Nothing Then
						 if PBConn.state <> 0 then
							  PBConn.close
						 end if
						 set PBConn = Nothing
					end if
			   end if
			   Set EmpCmd = nothing
			end sub
%>
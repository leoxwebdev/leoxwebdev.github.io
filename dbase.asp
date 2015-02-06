<%
dim DBType,DBUserID,DBPath,DBPathBmXT,DBUseDSN,DBPasswd,DBCard,DSN,IniString,tmp
dim GlobCDB_card,GlobCDB_PlantationBay,GlobCDB_Accounts,GlobCDB_postcard,GlobCDB_GuestComments,GlobCDB_Sales,GlobCDB_OnlineBooking
  'on error resume next

  ' Choose a database type (connection strings will vary depending on database):
  'DBType = "Access97"
  DBType = "Access2000"
  'DBType = "SQLServer"

  ' Choose if you are using a DSN or not: values = "yes" or "no"
  DBUseDSN = "yes"

  ' Choose a path to where your databases are (absolute but based on your virtual directory)
  ' This is not used if you are using a DSN
  DBPath       = "c:/wwwserver/Plantationbay.com/ODBC"
  DBPathBmXT   = "c:/wwwserver/a2zglobe.com/ODBC"

  ' ---- DO NOT CHANGE ANY LINES BELOW IF U DON'T KNOW WHAT UR DOING

  ' Username and password of databases
  DBUserID = "plantbay"
  DBPasswd = "5G8JZBK7BEZ2vT5s"
 ' DBUserID = "root"
  'DBPasswd = "r3s0rt"
  DBEmailUsers = "EmailUsers"
  DBAddgroup   = "Addgroup"
  DBAccounts   = "Accounts"

  ' Names of the databases we use (should be name of file, DSN or actual name of database)
  DBCard     = "CardPost"

  if DBType = "Access97" then
    if DBUseDSN = "yes" then
      tmp = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
      tmp = tmp + "DSN="
      GlobCDB_card       = tmp & "plantbay." & DBCard
      GlobCDB_EmailUsers = tmp & "plantbay." & DBEmailUsers
      GlobCDB_Addgroup   = tmp & "plantbay." & DBAddgroup
      GlobCDB_Accounts   = tmp & "BmXT." & DBAccounts
    else
      tmp = "DRIVER={Microsoft Access Driver (*.mdb)}; "
      tmp = tmp + "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
      tmp = tmp + "DBQ="
      GlobCDB_card     = tmp & DBPath & "/" & DBCard & ".mdb"
      GlobCDB_EmailUsers = tmp & DBPath & "/" & DBEmailUsers & ".mdb"
      GlobCDB_Addgroup   = tmp & DBPath & "/" & DBAddgroup & ".mdb"
      GlobCDB_Accounts   = tmp & DBPathBmXT & "/" & DBAccounts & ".mdb"
    end if
  else

  if DBType = "Access2000" then
    if DBUseDSN = "yes" then
      tmp = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
      tmp = tmp + "Data Source="
      GlobCDB_card       = tmp & "plantbay." & DBCard
      GlobCDB_EmailUsers = tmp & "plantbay." & DBEmailUsers
      GlobCDB_Addgroup   = tmp & "plantbay." & DBAddgroup
      GlobCDB_Accounts   = tmp & "BmXT." & DBAccounts
    else
      tmp = "Provider=Microsoft.Jet.OLEDB.4.0; "
      tmp = tmp + "Persist Security Info=False; "
      'tmp = tmp + "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "  'set this if security is true
      tmp = tmp + "Data Source="
      GlobCDB_card     = tmp & DBPath & "/" & DBCard & ".mdb"
      GlobCDB_EmailUsers = tmp & DBPath & "/" & DBEmailUsers & ".mdb"
      GlobCDB_Addgroup   = tmp & DBPath & "/" & DBAccounts & ".mdb"
      GlobCDB_Accounts   = tmp & DBPathBmXT & "/" & DBAccounts & ".mdb"
    end if
  end if
  end if

  'MySQL Databases
   DSN = "DSN=PlantationBay"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_PlantationBay = IniString + DSN

	' for paypal payments
   DSN = "DSN=Accounts"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_Accounts = IniString + DSN

   DSN = "DSN=postcard"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_postcard = IniString + DSN

   DSN = "DSN=apps"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_Appraisal = IniString + DSN

   DSN = "DSN=OnlineBooking"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_OnlineBooking = IniString + DSN

   DSN = "DSN=sales"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_sales = IniString + DSN

   DSN = "DSN=Guestcomments"
   IniString      = "uid=" & DBUserID & "; " & "pwd=" & DBPasswd & "; "
   GlobCDB_GuestComments = IniString + DSN

  'for Database already transferred to SQL - sample only
  'tmp = "User ID=" & DBUserID & "; " & "Password=" & DBPasswd & "; "
  'tmp = tmp + "DSN=a2zdata."
  'GlobCDB_fonebook = tmp & DBFoneBook
%>

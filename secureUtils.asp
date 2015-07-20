<%

'global variable for encryption code
dim placement,longer,thirdwrite,ref,secondWrite,firstWrite,enc
thirdwrite = ""
dim alphabet(35)
   alphabet(0) = "0@"
   alphabet(1) = "1#"
   alphabet(2) = "2$"
   alphabet(3) = "3%"
   alphabet(4) = "4^"
   alphabet(5) = "5&"
   alphabet(6) = "6*"
   alphabet(7) = "7 = "
   alphabet(8) = "8-"
   alphabet(9) = "9+"
   alphabet(10) = "Aa"
   alphabet(11) = "Bb"
   alphabet(12) = "Cc"
   alphabet(13) = "Dd"
   alphabet(14) = "Ee"
   alphabet(15) = "Ff"
   alphabet(16) = "Gg"
   alphabet(17) = "Hh"
   alphabet(18) = "Ii"
   alphabet(19) = "Jj"
   alphabet(20) = "Kk"
   alphabet(21) = "Ll"
   alphabet(22) = "Mm"
   alphabet(23) = "Nn"
   alphabet(24) = "Oo"
   alphabet(25) = "Pp"
   alphabet(26) = "Qq"
   alphabet(27) = "Rr"
   alphabet(28) = "Ss"
   alphabet(29) = "Tt"
   alphabet(30) = "Uu"
   alphabet(31) = "Vv"
   alphabet(32) = "Ww"
   alphabet(33) = "Xx"
   alphabet(34) = "Yy"
   alphabet(35) = "Zz"
'end of encryption code global variable


'encryptioncode
function RandomLetters(ID)
   dim rndPattern,xlen,xloop,xtemp,i,x,xRndmNO,encryptID
   rndPattern = split("1,3,2,4",",")  'sequence = start,increment1, increment2 ...
   'the total digit of sequence should not greater than upper_bnd
   const upper_bnd = 2000000
   const lower_bnd = 100000
   dim rndmNO
   dim ctr
   rnd -1
   randomize
   rndmNO = replace(Cstr(int((upper_bnd - lower_bnd + 1) * rnd + lower_bnd)),".","")
   rndmNO = replace(rndmNO,"E+","")
   xlen = len(rndmNO)
   xloop = int(xlen/2)
   xtemp = RndmNO
   for i=1 to xloop
      x = left(xtemp,2)
      if (x > 47 and x < 58) or (x > 64 and x < 91) or (x > 96 and x < 122) then
         x = x
      elseif x <= 48 then
         x = 48
      elseif (x >= 58 and x <= 64) then
         x = 65
      elseif (x >= 91 and x <= 96) then
         x = 121
      end if
      xRndmNO = xRndmNO & chr(x)
      xtemp = mid(xtemp,3,len(xtemp))
   Next
   encryptID = mid(xRndmNO,1,rndPattern(0)-1)
   ctr = 1
   for i=1 to len(ID)
      encryptID = encryptID & mid(ID,i,1) & mid(xRndmNO,rndPattern(ctr)+1,rndPattern(ctr)-1)
      ctr = ctr + 1
      if ctr > ubound(rndPattern) then
         ctr = 0
      end if
   next
   RandomLetters = encrypt("Email Express",encryptID,0)
end function

function encrypt(codeWord, text, code)
   dim result
   longer = len(codeWord) - 1
   placement = 0
   ref = 0
   secondWrite = ""
   firstWrite = ""
   thirdWrite = ""
   encrypt = code1(codeWord, text, longer, code)
end function

function findshift(letter,x)
   dim i
   for i = 0 to 35
      if mid(alphabet(i),1,1) = letter or mid(alphabet(i),2,1) = letter then
         if mid(alphabet(i),1,1) = letter then x = 0
         if mid(alphabet(i),2,1) = letter then x = 1
         findshift = i
      end if
   next
end function

function check(letter)
   dim bill, i
   bill = "no"
   for i = 0 to 35
      if mid(cstr(alphabet(i)),1,1) = letter or mid(cstr(alphabet(i)),2,1) = letter then bill = "yes"
   next
   if bill = "yes" then check = true else check = false
end function

function fixoffset(takin)
   if takin > 35 then fixoffset = takin - 36 else  fixoffset = takin
end function

function code1(inval1,inval2,inval3,sage)
dim shift,orig,one,x
while placement < len(inval2)
   if check(mid(inval2,placement+1,1)) then
      if check(mid(inval1,ref+1,1)) then
         if sage = 0 then
            shift = findshift(mid(inval1,ref+1,1),x)
         end if
         if sage = 1 then
            shift = 36 - findshift(mid(inval1,ref+1,1),x)
         end if
      else
         shift = 0
      end if
      orig = findshift(mid(inval2,placement+1,1),x)
      firstWrite = firstWrite & mid(alphabet(fixoffset(orig+shift)),x+1,1)
   else
      firstWrite = firstWrite & mid(inval2,placement+1,1)
   end if
   secondWrite = right(inval2,len(inval2)-(placement+1))
   thirdWrite  = firstWrite & secondWrite
   if ref = inval3 then
      ref = 0
   else
      ref = ref + 1
   end if
   placement = placement + 1
wend
code1 = thirdWrite
end function
'end of encryption code

%>
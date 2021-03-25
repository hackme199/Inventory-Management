@Echo Off
:A
echo enter password to activate program, make sure no-one is looking!
set/p "pass=>"
cls
if NOT %pass%== aerocon goto :FAIL

E:
cd E:\ACP\A
start /min ng serve & start /min json-server db.json
timeout 20
start http://localhost:4200

:FAIL
echo Invalid Password
goto :end
:end


@ECHO OFF
Title Fetch data from git repository
ECHO ==========================================================================
ECHO Hello Dear! First step get repository from git...
ECHO ==========================================================================

call git pull origin master
call npm i --force
ECHO Your local repository is updated.

Title Building Otamin.ir
ECHO ==========================================================================
ECHO The second step create a build file...
ECHO ==========================================================================

call ng build --configuration production --aot
ECHO Your build file was created on the dist path successfully.

xcopy /s liara\liara_nginx.conf dist\ /K /D /H /Y
xcopy /s liara\liara.json dist\ /K /D /H /Y

cd dist
liara deploy

PAUSE

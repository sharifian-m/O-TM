#!/bin/bash

function pause(){
   read -p "$*"
}

echo "=========================================================================="
echo "Hello Dear! First step get repository from git..."
echo "=========================================================================="

git pull origin master
echo "Your local repository is updated."

echo "=========================================================================="
echo "The second step create a build file..."
echo "=========================================================================="

ng build
echo "Your build file was created on the dist path successfully."

cp -rf "$PWD"/liara/liara_nginx.conf dist/
cp -rf "$PWD"/liara/liara.json dist/

cd dist
liara deploy

pause 'Press [Enter] key to exit...'

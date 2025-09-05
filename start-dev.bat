@echo off
start cmd.exe /k "cd /d C:\Program Files\MongoDB\Server\8.0\bin && mongod.exe"
start cmd.exe /k "cd /d C:\wamp64\www\api-rest-music-app && npm run dev"

@echo off
chcp 65001 > nul
echo ====================================
echo OpenClaw - claw123 项目启动器
echo ====================================
echo.
cd /d "%~dp0"
"D:\Reportmaster\reportmaster\projects\node-v20.11.1-win-x64\node.exe" "node_modules\next\dist\bin\next" dev
pause

@echo off
title Brusk IT Website Server
cd /d "%~dp0"

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
) else (
    echo Python not detected. Opening website directly in your browser...
    start "" "index.html"
)

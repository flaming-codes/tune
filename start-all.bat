@echo off
title Tierarztpraxis - Starting All Servers
echo ============================================
echo  Starting both servers...
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo pnpm not found, installing via corepack...
    corepack enable
    corepack prepare pnpm@latest --activate
)

echo [1/3] Installing dependencies...
call pnpm install --frozen-lockfile
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo [2/3] Building all applications...
call pnpm build
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Running database migrations...
call pnpm db:migrate
if %ERRORLEVEL% neq 0 (
    echo WARNING: Database migration had issues.
)

echo.
echo ============================================
echo  Starting Web on http://localhost:3000
echo  Starting Signatures on http://localhost:3001
echo ============================================
echo.

REM Start web in a new window
start "Web Server (port 3000)" cmd /k "cd apps\web && pnpm start"

REM Wait a moment, then start signatures in a new window
timeout /t 3 /nobreak >nul
start "Signatures Server (port 3001)" cmd /k "cd apps\signatures && pnpm start"

echo Both servers are starting in separate windows.
echo Close this window or press any key to exit.
pause

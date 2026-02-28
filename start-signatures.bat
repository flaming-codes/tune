@echo off
title Tierarztpraxis - Signatures Server
echo ============================================
echo  Tierarztpraxis - Signatures Server
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

echo [1/4] Installing dependencies...
call pnpm install --frozen-lockfile
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo [2/4] Building signatures application...
call pnpm build:signatures
if %ERRORLEVEL% neq 0 (
    echo ERROR: Build failed.
    pause
    exit /b 1
)

echo.
echo [3/4] Running database migrations...
call pnpm db:migrate:signatures
if %ERRORLEVEL% neq 0 (
    echo WARNING: Database migration had issues. The app may still work if the database is up to date.
)

echo.
echo ============================================
echo  [4/4] Starting server on http://localhost:3001
echo  Press Ctrl+C to stop
echo ============================================
echo.

cd apps\signatures
call pnpm start
pause
